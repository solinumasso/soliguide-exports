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
import { CONFIG } from "../../../_models";
import { Themes } from "@soliguide/common";
import { getThemeFromOrigin } from "../services/getThemeFromOrigin.service";

jest.mock("../../../_models", () => {
  return {
    CONFIG: {
      SOLIGUIA_AD_DOMAIN_NAME: "soliguia.ad",
      SOLIGUIA_ES_DOMAIN_NAME: "soliguia.es",
      SOLIGUIDE_FR_DOMAIN_NAME: "soliguide.fr",
    },
  };
});

describe("getThemeFromOrigin", () => {
  const originalImplementation = jest.requireActual("../../../_models");

  beforeEach(() => {
    jest.resetModules();
    jest.mock("../../../_models", () => ({
      CONFIG: {
        SOLIGUIA_AD_DOMAIN_NAME: "custom.ad",
        SOLIGUIA_ES_DOMAIN_NAME: "custom.es",
        SOLIGUIDE_FR_DOMAIN_NAME: "app.soliguide.fr",
      },
    }));
  });

  afterEach(() => {
    // Restaurer l'implémentation originale
    jest.resetModules();
    jest.mock("../../../_models", () => originalImplementation);
  });

  it("should set theme to SOLIGUIA_AD when origin is SOLIGUIA_AD domain", () => {
    expect(getThemeFromOrigin("https://soliguia.ad")).toEqual(
      Themes.SOLIGUIA_AD
    );
  });

  it("should set theme to SOLIGUIA_ES when origin is SOLIGUIA_ES domain", () => {
    expect(getThemeFromOrigin("https://soliguia.es")).toEqual(
      Themes.SOLIGUIA_ES
    );
  });

  it("should set theme to SOLIGUIDE_FR when origin is SOLIGUIDE_FR domain", () => {
    expect(getThemeFromOrigin("https://soliguide.fr")).toEqual(
      Themes.SOLIGUIDE_FR
    );
  });

  it("should set theme to SOLIGUIDE_FR when origin is app.soliguide.fr", () => {
    expect(
      getThemeFromOrigin(
        "https://app.soliguide.fr/ro/places?lang=fr&location=63bis-rue-victor-hugo-94140-alfortville&latitude=2.42236&longitude=48.804131&type=position&label=63bis+Rue+Victor+Hugo%2C+94140+Alfortville&category=food"
      )
    ).toEqual(Themes.SOLIGUIDE_FR);
  });

  it("should set theme to SOLIGUIDE_FR when origin is SOLIGUIDE_FR domain", () => {
    expect(
      getThemeFromOrigin(`https://${CONFIG.SOLIGUIDE_FR_DOMAIN_NAME}`)
    ).toEqual(Themes.SOLIGUIDE_FR);
  });

  it("should set theme to null when origin is not a known domain", () => {
    expect(getThemeFromOrigin("https://unknown.com")).toEqual(null);
  });
});
