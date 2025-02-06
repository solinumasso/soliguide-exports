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
import { Injectable } from "@angular/core";
import { Themes, SupportedLanguagesCode } from "@soliguide/common";
import { getStaticPageComponentByName } from "./static-pages.service";
import { PrivacyPolicySoliguideFrComponent } from "../components/privacy-policy/privacy-policy-soliguide-fr/privacy-policy-soliguide-fr.component";
import { PrivacyPolicySoliguiaCaComponent } from "../components/privacy-policy/privacy-policy-soliguia-ca/privacy-policy-soliguia-ca.component";
import { PrivacyPolicySoliguiaEsComponent } from "../components/privacy-policy/privacy-policy-soliguia-es/privacy-policy-soliguia-es.component";
import { componentStaticPage } from "../models";

@Injectable({
  providedIn: "root",
})
export class PrivacyPolicyService {
  private readonly allPrivacyPolicyTheme: componentStaticPage[] = [
    {
      theme: Themes.SOLIGUIDE_FR,
      lang: SupportedLanguagesCode.FR,
      component: PrivacyPolicySoliguideFrComponent,
      defaultTheme: true,
      default: true,
    },
    {
      theme: Themes.SOLIGUIA_ES,
      lang: SupportedLanguagesCode.ES,
      component: PrivacyPolicySoliguiaEsComponent,
      defaultTheme: true,
      default: false,
    },
    {
      theme: Themes.SOLIGUIA_AD,
      lang: SupportedLanguagesCode.CA,
      component: PrivacyPolicySoliguiaCaComponent,
      defaultTheme: false,
      default: false,
    },
  ];

  getPrivacyPolicyComponentByName(theme: string, lang: string) {
    return getStaticPageComponentByName(
      this.allPrivacyPolicyTheme,
      theme,
      lang
    );
  }
}
