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
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";
import { RouterModule } from "@angular/router";

import { LegalNoticesSoliguideFrComponent } from "./components/legal-notices/legal-notices-soliguide-fr/legal-notices-soliguide-fr.component";
import { LegalNoticesSoliguiaCaComponent } from "./components/legal-notices/legal-notices-soliguia-ca/legal-notices-soliguia-ca.component";
import { LegalNoticesSoliguiaEsComponent } from "./components/legal-notices/legal-notices-soliguia-es/legal-notices-soliguia-es.component";
import { PrivacyPolicySoliguideFrComponent } from "./components/privacy-policy/privacy-policy-soliguide-fr/privacy-policy-soliguide-fr.component";
import { PrivacyPolicySoliguiaCaComponent } from "./components/privacy-policy/privacy-policy-soliguia-ca/privacy-policy-soliguia-ca.component";
import { PrivacyPolicySoliguiaEsComponent } from "./components/privacy-policy/privacy-policy-soliguia-es/privacy-policy-soliguia-es.component";
import { getLocalRoutesByTheme } from "./static-pages.routes";
import { DataProcessingAgreementSoliguideFrComponent } from "./components/data-processing-agreement/data-processing-agreement-soliguide-fr/data-processing-agreement-soliguide-fr.component";
import { DataProcessingAgreementSoliguiaCaComponent } from "./components/data-processing-agreement/data-processing-agreement-soliguia-ca/data-processing-agreement-soliguia-ca.component";
import { DataProcessingAgreementSoliguiaEsComponent } from "./components/data-processing-agreement/data-processing-agreement-soliguia-es/data-processing-agreement-soliguia-es.component";
import { CookiePolicySoliguideFrComponent } from "./components/cookie-policy/cookie-policy-soliguide-fr/cookie-policy-soliguide-fr.component";
import { CookiePolicySoliguiaCaComponent } from "./components/cookie-policy/cookie-policy-soliguia-ca/cookie-policy-soliguia-ca.component";
import { CookiePolicySoliguiaEsComponent } from "./components/cookie-policy/cookie-policy-soliguia-es/cookie-policy-soliguia-es.component";
import { GcuSoliguideFrComponent } from "./components/gcu/gcu-soliguide-fr/gcu-soliguide-fr.component";
import { GcuSoliguiaCaComponent } from "./components/gcu/gcu-soliguia-ca/gcu-soliguia-ca.component";
import { GcuSoliguiaEsComponent } from "./components/gcu/gcu-soliguia-es/gcu-soliguia-es.component";
import { themeService } from "../../shared/services";

@NgModule({
  declarations: [
    LegalNoticesSoliguideFrComponent,
    LegalNoticesSoliguiaCaComponent,
    LegalNoticesSoliguiaEsComponent,
    PrivacyPolicySoliguiaCaComponent,
    PrivacyPolicySoliguiaEsComponent,
    PrivacyPolicySoliguideFrComponent,
    DataProcessingAgreementSoliguideFrComponent,
    DataProcessingAgreementSoliguiaCaComponent,
    DataProcessingAgreementSoliguiaEsComponent,
    CookiePolicySoliguideFrComponent,
    CookiePolicySoliguiaCaComponent,
    CookiePolicySoliguiaEsComponent,
    GcuSoliguideFrComponent,
    GcuSoliguiaCaComponent,
    GcuSoliguiaEsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(getLocalRoutesByTheme(themeService.getTheme())),
    TranslateModule,
  ],
})
export class StaticPagesModule {}
