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
import { Component, Input } from "@angular/core";
import type { UntypedFormGroup } from "@angular/forms";

@Component({
  selector: "app-user-password-form",
  templateUrl: "./user-password-form.component.html",
  styleUrls: ["./user-password-form.component.css"],
})
export class UserPasswordFormComponent {
  @Input() public submitted!: boolean;
  @Input() public parentFormGroup!: UntypedFormGroup;

  public hidePassword: boolean;
  public hidePasswordConfirmationation: boolean;

  public password: string;
  public passwordConfirmation: string;

  constructor() {
    this.submitted = false;
    this.hidePassword = true;
    this.hidePasswordConfirmationation = true;
    this.password = "";
    this.passwordConfirmation = "";
  }

  public setPassword(value: string): void {
    this.parentFormGroup.controls.password.setValue(value);
  }

  public setPasswordConfirmation(value: string): void {
    this.parentFormGroup.controls.passwordConfirmation.setValue(value);
  }

  public togglePassword(): void {
    this.hidePassword = !this.hidePassword;
  }

  public togglePasswordConfirmation(): void {
    this.hidePasswordConfirmationation = !this.hidePasswordConfirmationation;
  }
}
