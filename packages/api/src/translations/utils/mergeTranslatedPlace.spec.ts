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
  ApiPlace,
  SupportedLanguagesCode,
  WelcomedPublics,
} from "@soliguide/common";

import { mergeTranslatedPlace } from "./mergeTranslatedPlace";

import {
  ONLINE_PLACE,
  MCP_PLACE,
  TRANSLATED_PLACE,
} from "../../../mocks/places";

describe("Merge place", () => {
  it("should translate place's root elements", () => {
    const mergedPlace = mergeTranslatedPlace(
      MCP_PLACE as ApiPlace,
      TRANSLATED_PLACE,
      SupportedLanguagesCode.EN
    );

    expect(mergedPlace.publics.accueil).toEqual(WelcomedPublics.PREFERENTIAL);
    expect(mergedPlace.modalities.animal).toEqual({
      checked: false,
    });

    expect(mergedPlace.modalities.appointment).toEqual({
      checked: false,
      precisions: "Précisions du rendez-vous",
    });

    expect(mergedPlace.modalities.inscription.precisions).toBeNull();
    expect(mergedPlace.modalities.price.precisions).toBeNull();

    expect(mergedPlace.description).toEqual(
      "This reception center dedicated to women in very great exclusion aims to meet their basic needs by offering shower, laundry, rest area, snacks, SIAO U<p></p><p> Initiate and / or carry out socio-educational follow-up, networking for orientation adapted to the needs of people, psychological and medical permanence</p><p> Initiate the process of personal reconstruction through workshops, cultural actions etc.</p><p></p><p> By appointment in the afternoon. Open on public holidays from 9 a.m. to 4 p.m. (Sunday hours).</p>"
    );

    expect(mergedPlace.tempInfos.closure.description).toEqual(
      "Temporary move to the Carreau du temple: https://soliguide.fr/fr/fiche/8062"
    );
  });

  it("should translate services' elements", () => {
    const mergedPlace = mergeTranslatedPlace(
      ONLINE_PLACE,
      TRANSLATED_PLACE,
      SupportedLanguagesCode.EN
    );
    expect(mergedPlace.services_all).toBeDefined();

    if (mergedPlace.services_all) {
      expect(mergedPlace.services_all[0].description).toEqual(
        "English service Translate"
      );

      expect(
        mergedPlace.services_all[0].modalities.orientation.precisions
      ).toEqual("Orientation précision FR");
    }
  });
});
