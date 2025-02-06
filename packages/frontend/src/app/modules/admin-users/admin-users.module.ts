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
import { AdminPlaceSharedModule } from "./../admin-place-shared/admin-place-shared.module";
import { ManageCommonModule } from "./../manage-common/manage-common.module";
import { ClipboardModule } from "@angular/cdk/clipboard";
import { CommonModule } from "@angular/common";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { TranslateModule } from "@ngx-translate/core";
import { AdminUsersRoutingModule } from "./admin-users-routing.module";
import { AdminUserComponent } from "./components/admin-user/admin-user.component";
import { ManageApiUsersComponent } from "./components/manage-api-users/manage-api-users.component";
import { ManageUsersComponent } from "./components/manage-users/manage-users.component";
import { AdminUsersService } from "./services/admin-users.service";
import { PlaceModule } from "../place/place.module";
import { SharedModule } from "../shared/shared.module";
import { UsersModule } from "../users/users.module";
import { FormPhoneInputComponent } from "../shared/components/form-phone/form-phone-input.component";

@NgModule({
  declarations: [
    AdminUserComponent,
    ManageApiUsersComponent,
    ManageUsersComponent,
  ],
  imports: [
    AdminPlaceSharedModule,
    ManageCommonModule,
    AdminUsersRoutingModule,
    ClipboardModule,
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    NgbModule,
    PlaceModule,
    ReactiveFormsModule,
    SharedModule,
    TranslateModule,
    UsersModule,
    FormPhoneInputComponent,
  ],
  providers: [AdminUsersService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AdminUsersModule {}
