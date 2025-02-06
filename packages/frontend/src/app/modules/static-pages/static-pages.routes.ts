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
import { Routes } from "@angular/router";
import { Themes } from "@soliguide/common";
import { LegalNoticesComponent } from "./components/legal-notices/legal-notices.component";
import { LanguageGuard } from "../../guards/language.guard";
import { PrivacyPolicyComponent } from "./components/privacy-policy/privacy-policy.component";
import { DataProcessingAgreementComponent } from "./components/data-processing-agreement/data-processing-agreement.component";
import { CookiePolicyComponent } from "./components/cookie-policy/cookie-policy.component";
import { GcuComponent } from "./components/gcu/gcu.component";
import { THEME_CONFIGURATION } from "../../models";
import { PathStaticPageType } from "./models";

export const LOCAL_PATH_ROUTES_BY_THEME: PathStaticPageType = {
  "legal-notices": {
    [Themes.SOLIGUIDE_FR]: "mentions-legales",
    [Themes.SOLIGUIA_AD]: "avis-legal",
    [Themes.SOLIGUIA_ES]: "informacion-legal",
  },
  "privacy-policy": {
    [Themes.SOLIGUIDE_FR]: "politique-confidentialite",
    [Themes.SOLIGUIA_AD]: "politica-privacitat",
    [Themes.SOLIGUIA_ES]: "politica-privacidad",
  },
  "data-processing-agreement": {
    [Themes.SOLIGUIDE_FR]: "accord-protection-donnees",
    [Themes.SOLIGUIA_AD]: "acord-proteccio-dades",
    [Themes.SOLIGUIA_ES]: "acuerdo-proteccion-datos",
  },
  "cookie-policy": {
    [Themes.SOLIGUIDE_FR]: "politique-cookies",
    [Themes.SOLIGUIA_AD]: "politica-cookies",
    [Themes.SOLIGUIA_ES]: "politica-cookies",
  },
  gcu: {
    [Themes.SOLIGUIDE_FR]: "cgu",
    [Themes.SOLIGUIA_AD]: "cgu",
    [Themes.SOLIGUIA_ES]: "cgu",
  },
};

export function getLocalPathByTheme(theme: Themes, lang: string = ":lang") {
  return {
    "legal-notices": `${lang}/${LOCAL_PATH_ROUTES_BY_THEME["legal-notices"][theme]}`,
    "privacy-policy": `${lang}/${LOCAL_PATH_ROUTES_BY_THEME["privacy-policy"][theme]}`,
    "data-processing-agreement": `${lang}/${LOCAL_PATH_ROUTES_BY_THEME["data-processing-agreement"][theme]}`,
    "cookie-policy": `${lang}/${LOCAL_PATH_ROUTES_BY_THEME["cookie-policy"][theme]}`,
    gcu: `${lang}/${LOCAL_PATH_ROUTES_BY_THEME["gcu"][theme]}`,
  };
}

export function getLocalRoutesByTheme(theme: Themes): Routes {
  return [
    {
      path: getLocalPathByTheme(theme)["legal-notices"],
      component: LegalNoticesComponent,
      canActivate: [LanguageGuard],
    },
    {
      path: getLocalPathByTheme(theme)["privacy-policy"],
      component: PrivacyPolicyComponent,
      canActivate: [LanguageGuard],
    },
    {
      path: getLocalPathByTheme(theme)["data-processing-agreement"],
      component: DataProcessingAgreementComponent,
      canActivate: [LanguageGuard],
    },
    {
      path: getLocalPathByTheme(theme)["cookie-policy"],
      component: CookiePolicyComponent,
      canActivate: [LanguageGuard],
    },
    {
      path: getLocalPathByTheme(theme)["gcu"],
      component: GcuComponent,
      canActivate: [LanguageGuard],
    },
    {
      path: LOCAL_PATH_ROUTES_BY_THEME["legal-notices"][theme],
      redirectTo: `${
        getLocalPathByTheme(theme, THEME_CONFIGURATION.defaultLanguage)[
          "legal-notices"
        ]
      }`,
    },
    {
      path: "privacy-policy",
      redirectTo: `${
        getLocalPathByTheme(theme, THEME_CONFIGURATION.defaultLanguage)[
          "privacy-policy"
        ]
      }`,
    },
    {
      path: "cookie-policy",
      redirectTo: `${
        getLocalPathByTheme(theme, THEME_CONFIGURATION.defaultLanguage)[
          "cookie-policy"
        ]
      }`,
    },
    {
      path: "data-processing-agreement",
      redirectTo: `${
        getLocalPathByTheme(theme, THEME_CONFIGURATION.defaultLanguage)[
          "data-processing-agreement"
        ]
      }`,
    },
    {
      path: "gcu",
      redirectTo: `${
        getLocalPathByTheme(theme, THEME_CONFIGURATION.defaultLanguage)["gcu"]
      }`,
    },
  ];
}
