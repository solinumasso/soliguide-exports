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
import { LegalNoticesSoliguideFrComponent } from "../components/legal-notices/legal-notices-soliguide-fr/legal-notices-soliguide-fr.component";
import { LegalNoticesSoliguiaCaComponent } from "../components/legal-notices/legal-notices-soliguia-ca/legal-notices-soliguia-ca.component";
import { LegalNoticesSoliguiaEsComponent } from "../components/legal-notices/legal-notices-soliguia-es/legal-notices-soliguia-es.component";
import { getStaticPageComponentByName } from "./static-pages.service";
import { componentStaticPage } from "../models";

@Injectable({
  providedIn: "root",
})
export class LegalNoticesService {
  private readonly allLegalNoticeTheme: componentStaticPage[] = [
    {
      theme: Themes.SOLIGUIDE_FR,
      lang: SupportedLanguagesCode.FR,
      component: LegalNoticesSoliguideFrComponent,
      defaultTheme: true,
      default: true,
    },
    {
      theme: Themes.SOLIGUIA_ES,
      lang: SupportedLanguagesCode.ES,
      component: LegalNoticesSoliguiaEsComponent,
      defaultTheme: true,
      default: false,
    },
    {
      theme: Themes.SOLIGUIA_AD,
      lang: SupportedLanguagesCode.CA,
      component: LegalNoticesSoliguiaCaComponent,
      defaultTheme: false,
      default: false,
    },
  ];

  getLegalNoticeComponentByName(theme: string, lang: string) {
    return getStaticPageComponentByName(this.allLegalNoticeTheme, theme, lang);
  }
}
