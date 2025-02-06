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
import { Component, OnDestroy, OnInit } from "@angular/core";
import {
  UntypedFormGroup,
  UntypedFormBuilder,
  AbstractControl,
  Validators,
} from "@angular/forms";
import { Title } from "@angular/platform-browser";

import { TranslateService } from "@ngx-translate/core";

import { SupportedLanguagesCode, UserStatus } from "@soliguide/common";

import { ToastrService } from "ngx-toastr";

import { Subscription } from "rxjs";

import { User } from "../../classes";
import { AuthService } from "../../services/auth.service";
import { UsersService } from "../../services/users.service";
import { UserEdit } from "../../types";

import { CurrentLanguageService } from "../../../general/services/current-language.service";

import { noWhiteSpace } from "../../../../shared";
import { phoneValidator } from "../../../shared/components/form-phone-input/validators";
import { THEME_CONFIGURATION } from "../../../../models";

@Component({
  selector: "app-my-account",
  templateUrl: "./my-account.component.html",
  styleUrls: ["./my-account.component.css"],
})
export class MyAccountComponent implements OnInit, OnDestroy {
  public readonly THEME_CONFIGURATION = THEME_CONFIGURATION;
  private readonly subscription = new Subscription();
  public routePrefix: string;
  public updateForm!: UntypedFormGroup;

  public user: User;
  public me!: User | null;

  public loading: boolean;
  public submitted: boolean;

  public namePlaceholder: string;

  constructor(
    private readonly authService: AuthService,
    private readonly formBuilder: UntypedFormBuilder,
    private readonly titleService: Title,
    private readonly toastr: ToastrService,
    private readonly translateService: TranslateService,
    private readonly usersService: UsersService,
    private readonly currentLanguageService: CurrentLanguageService
  ) {
    this.loading = false;
    this.submitted = false;
    this.namePlaceholder = "";
    this.me = null;
    this.user = new User();
    this.routePrefix = this.currentLanguageService.routePrefix;
  }

  public ngOnInit(): void {
    this.titleService.setTitle(
      this.translateService.instant("UPDATE_SOLIGUIDE_PROFILE", {
        brandName: THEME_CONFIGURATION.brandName,
      })
    );

    this.subscription.add(
      this.currentLanguageService.subscribe(
        () => (this.routePrefix = this.currentLanguageService.routePrefix)
      )
    );

    this.user = this.authService.currentUserValue as User;
    this.me = this.authService.currentUserValue;

    // Languages are capitalized by the frontend
    this.user.languages = this.user.languages.map(
      (language: SupportedLanguagesCode) =>
        (language as string).toLowerCase() as SupportedLanguagesCode
    );

    this.initForm();
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public get f(): { [key: string]: AbstractControl } {
    return this.updateForm.controls;
  }

  public initForm = (): void => {
    this.namePlaceholder =
      this.user.translator && this.user.status === UserStatus.SIMPLE_USER
        ? "NAME"
        : "PSEUDO";

    this.updateForm = this.formBuilder.group({
      languages: [
        this.user.languages,
        this.user.translator ? Validators.required : null,
      ],
      lastname: [this.user.lastname, [Validators.required, noWhiteSpace]],
      mail: [
        {
          disabled: true,
          value: this.user.mail,
        },
      ],
      name: [this.user.name, [Validators.required, noWhiteSpace]],
      phone: [this.user.phone, [phoneValidator]],
      territories: [this.user.territories],
      title: [this.user.title],
      translator: [this.user.translator, Validators.required],
    });

    this.subscription.add(
      this.f.translator.valueChanges.subscribe((value: boolean) => {
        this.updateForm
          .get("languages")
          ?.setValidators(value ? Validators.required : null);
        this.updateForm.get("languages")?.updateValueAndValidity();
      })
    );
  };

  public getFormValue = (): UserEdit => {
    return {
      languages: this.f.languages.value,
      lastname: this.f.lastname.value,
      mail: this.f.mail.value,
      name: this.f.name.value,
      phone: this.f.phone.value,
      territories: this.f.territories.value,
      title: this.f.title.value,
      translator: this.f.translator.value,
    };
  };

  public update = (): void => {
    this.submitted = true;
    this.loading = true;

    if (this.updateForm.invalid) {
      this.toastr.error(this.translateService.instant("INCORRECT_FIELDS"));
      this.loading = false;
      return;
    }

    this.loading = true;

    this.subscription.add(
      this.usersService.updateMyAccount(this.getFormValue()).subscribe({
        error: () => {
          this.loading = false;
          this.toastr.error(
            this.translateService.instant("INFORMATION_UPDATE_FAIL")
          );
        },
        next: (me: User) => {
          this.loading = false;
          this.submitted = false;
          this.authService.updateCurrentUser(me);
          this.me = me;
          this.toastr.success(
            this.translateService.instant("INFORMATION_SUCCESSFULLY_UPDATED")
          );
        },
      })
    );
  };
}
