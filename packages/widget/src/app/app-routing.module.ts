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
import { RouterModule, Routes } from "@angular/router";

import { GcuComponent } from "./modules/general/components/gcu/gcu.component";
import { HelpSearchComponent } from "./modules/general/components/help-search/help-search.component";
import { NotFoundComponent } from "./modules/general/components/not-found/not-found.component";
import { PersonalDataProtectionAgreementComponent } from "./modules/general/components/personal-data-protection-agreement/personal-data-protection-agreement.component";

import { IframeFormComponent } from "./modules/iframe-generator/components/iframe-form/iframe-form.component";

const routes: Routes = [
  {
    path: "",
    component: IframeFormComponent,
  },
  {
    path: "cgu",
    component: GcuComponent,
  },
  {
    path: "help-search",
    component: HelpSearchComponent,
  },
  {
    path: "accord-protection-donnees",
    component: PersonalDataProtectionAgreementComponent,
  },
  {
    path: "search",
    loadChildren: () =>
      import("./modules/search/search.module").then((mod) => mod.SearchModule),
  },
  {
    path: "**",
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
