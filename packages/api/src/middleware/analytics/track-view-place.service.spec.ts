/*
 * Soliguide: Useful information for those who need it
 *
 * SPDX-FileCopyrightText: © 2024 Solinum
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */
import "../../config/database/connection";
import "../../place/models/place.model";

import {
  CountryCodes,
  SupportedLanguagesCode,
  slugLocation,
} from "@soliguide/common";

import {
  getPlacePropertiesFromRequest,
  trackViewPlace,
} from "./track-view-place.service";
import { getUserForLogs } from "../logging";

import {
  ExpressRequest,
  ExpressResponse,
  Origin,
  UserForLogs,
  UserPopulateType,
} from "../../_models";

import { generateFullName } from "../../_utils";

import {
  ABSTRACT_ORIGIN_REQUEST,
  ONLINE_PLACE,
  USER_ADMIN_SOLIGUIDE,
  USER_PRO,
} from "../../../mocks";

import { PosthogClient } from "../../analytics/services";
import { TRACKED_EVENTS } from "../../analytics/constants";
import { RequestInformation } from "../request";

jest.useFakeTimers();

const posthogClient = PosthogClient.instance;

describe("To test the trackViewPlace middleware", () => {
  const trackedEvent = TRACKED_EVENTS.API_VIEW_PLACE;
  const baseDistinctId = "michel";
  const baseSessionId = "isabelle";
  const posthogCapture = jest.spyOn(posthogClient, "capture");

  const baseReq = {
    lieu: ONLINE_PLACE,
    log: jest.fn(),
    get: jest.fn((key: string) => {
      switch (key) {
        case "X-Ph-User-Distinct-Id":
          return baseDistinctId;
        case "X-Ph-User-Session-Id":
          return baseSessionId;
        case "origin":
          return "https://soliguide.fr";
        default:
          return null;
      }
    }),
    requestInformation: {},
  };

  baseReq.requestInformation = new RequestInformation(
    baseReq as unknown as ExpressRequest
  );

  const baseExpectedProperties = {
    place: ONLINE_PLACE._id,
    location: {
      areas: {
        postalCode: slugLocation(ONLINE_PLACE.position.postalCode),
        department: slugLocation(ONLINE_PLACE.position.department),
        region: slugLocation(ONLINE_PLACE.position.region),
        city: slugLocation(ONLINE_PLACE.position.city),
      },
      postalCode: slugLocation(ONLINE_PLACE.position.postalCode),
      department: slugLocation(ONLINE_PLACE.position.department),
      region: slugLocation(ONLINE_PLACE.position.region),
      city: slugLocation(ONLINE_PLACE.position.city),
      country: CountryCodes.FR,
      coordinates: ONLINE_PLACE.position.location.coordinates,
      address: slugLocation(ONLINE_PLACE.position.address),
    },
    placeType: ONLINE_PLACE.placeType,
    seoUrl: ONLINE_PLACE.seo_url,
    sourceLanguage: SupportedLanguagesCode.FR,
    country: ONLINE_PLACE.country,
    services: [ONLINE_PLACE.services_all[0].category],
    status: ONLINE_PLACE.status,
    visibility: ONLINE_PLACE.visibility,
  };

  const reqGetImplementation = (name: string, lang: string): string | null => {
    if (name === "origin") {
      if (lang === SupportedLanguagesCode.FR) {
        return "https://soliguide.fr";
      }
      return "https://solinum.org";
    }
    if (name === "X-Ph-User-Distinct-Id") {
      return baseDistinctId;
    }
    if (name === "X-Ph-User-Session-Id") {
      return baseSessionId;
    }
    return null;
  };

  const generateTestCase = (
    lang: SupportedLanguagesCode,
    user: UserPopulateType,
    originForLogs: string
  ): [string, ExpressRequest, Record<"userData", UserForLogs>] => [
    `should log the consultation of ${trackedEvent} in ${lang} with ${user.status}`,
    {
      ...ABSTRACT_ORIGIN_REQUEST,
      get: jest
        .fn()
        .mockImplementation((name) => reqGetImplementation(name, lang)),
      requestInformation: {
        ...ABSTRACT_ORIGIN_REQUEST.requestInformation,
        originForLogs,
      },
      params: { lang },
      user,
    } as unknown as ExpressRequest,
    {
      userData: {
        email: user.mail,
        orgaId: user.organizations[0]?.organization_id ?? null,
        orgaName: user.organizations[0]?.name ?? null,
        origin:
          lang === SupportedLanguagesCode.FR
            ? Origin.SOLIGUIDE
            : Origin.SOLINUM_ORG,
        referrer: null,
        role: null,
        status: user.status,
        territory: user.territories[0],
        userName: generateFullName(user.name, user.lastname),
        user_id: user.user_id,
        language: lang,
      },
    },
  ];

  it.each([
    generateTestCase(SupportedLanguagesCode.FR, USER_PRO, Origin.SOLIGUIDE),
    generateTestCase(
      SupportedLanguagesCode.FR,
      USER_ADMIN_SOLIGUIDE,
      Origin.SOLIGUIDE
    ),
    generateTestCase(SupportedLanguagesCode.ES, USER_PRO, Origin.SOLINUM_ORG),
    generateTestCase(
      SupportedLanguagesCode.ES,
      USER_ADMIN_SOLIGUIDE,
      Origin.SOLINUM_ORG
    ),
  ])("%s", (_, userForLogs, expectedProperties) => {
    const req = {
      ...(baseReq as any),
      userForLogs: getUserForLogs(userForLogs),
    } as ExpressRequest;
    const res = {} as ExpressResponse;

    const properties = getPlacePropertiesFromRequest(req);

    trackViewPlace(req, res);

    expect(properties).toEqual({
      ...baseExpectedProperties,
      ...expectedProperties,
    });

    expect(req.get).toHaveBeenCalledWith("X-Ph-User-Distinct-Id");
    expect(req.get).toHaveReturnedWith(baseDistinctId);
    expect(req.get).toHaveBeenCalledWith("X-Ph-User-Session-Id");
    expect(req.get).toHaveReturnedWith(baseSessionId);

    expect(posthogCapture).toHaveBeenCalledTimes(1);
    expect(posthogCapture).toHaveBeenCalledWith({
      event: trackedEvent,
      req,
      properties,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
