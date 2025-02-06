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
import {
  CampaignSource,
  PlaceChangesSection,
  PlaceType,
  SupportedLanguagesCode,
  UserRole,
  UserStatus,
} from "@soliguide/common";
import { PlaceChanges } from "../../src/place-changes/interfaces/PlaceChanges.interface";

export const PLACE_CHANGES_MOCK: Partial<PlaceChanges> = {
  campaignName: null,
  isCampaign: false,
  lieu_id: 0,
  source: CampaignSource.CALL,
  placeType: PlaceType.ITINERARY,
  userName: "x",
  new: {
    field: "value",
    fieldNumber: 2,
    fieldObject: {
      subfield: "subvalue",
    },
  },
  old: {
    field: "value",
    fieldNumber: 1,
    fieldObject: {
      subfield: "subvalue",
    },
  },
  section: PlaceChangesSection.place,
  territory: "01",
  userData: {
    orgaId: 0,
    language: SupportedLanguagesCode.EN,
    user_id: 1,
    userName: "Test",
    orgaName: "test",
    email: "test@test.fr",
    referrer: "xx",
    role: UserRole.OWNER,
    status: UserStatus.PRO,
    territory: "01",
  },
};
