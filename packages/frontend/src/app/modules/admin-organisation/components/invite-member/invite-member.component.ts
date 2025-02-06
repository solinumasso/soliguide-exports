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
  AbstractControl,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import isEmail from "validator/lib/isEmail";
import { ToastrService } from "ngx-toastr";
import { map, type Observable, of, Subscription } from "rxjs";
import { TranslateService } from "@ngx-translate/core";

import {
  EMAIL_VALIDATOR_CONFIG,
  UserRole,
  UserStatus,
  validateUserStatusWithEmail,
} from "@soliguide/common";
import type { PosthogProperties } from "@soliguide/common-angular";

import { Organisation } from "../../interfaces";
import { InviteUserService } from "../../services/invite-user.service";
import { OrganisationService } from "../../services/organisation.service";
import type { InvitationFormData, PlaceForOrganization } from "../../types";

import { CurrentLanguageService } from "../../../general/services/current-language.service";
import { THEME_CONFIGURATION } from "../../../../models";
import { EmailValidator, noWhiteSpace } from "../../../../shared";
import { PosthogService } from "../../../analytics/services/posthog.service";
import { phoneValidator } from "../../../shared/components/form-phone-input/validators";

@Component({
  selector: "app-invite-member",
  templateUrl: "./invite-member.component.html",
  styleUrls: ["./invite-member.component.css"],
})
export class InviteMemberComponent implements OnInit, OnDestroy {
  public readonly THEME_CONFIGURATION = THEME_CONFIGURATION;
  private readonly subscription = new Subscription();
  public inviteForm!: UntypedFormGroup;

  public organisation: Organisation;

  public places: string[];

  public loading: boolean;
  public submitted: boolean;

  constructor(
    private readonly inviteUserService: InviteUserService,
    private readonly formBuilder: UntypedFormBuilder,
    private readonly organisationService: OrganisationService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly titleService: Title,
    private readonly toastr: ToastrService,
    private readonly currentLanguageService: CurrentLanguageService,
    private readonly translateService: TranslateService,
    private readonly posthogService: PosthogService
  ) {
    this.loading = false;
    this.submitted = false;
    this.places = [];

    this.organisation = new Organisation();
  }

  public ngOnInit(): void {
    this.titleService.setTitle(
      this.translateService.instant("INVITE_A_COLLABORATOR")
    );

    this.subscription.add(
      this.route.params.subscribe((params) => {
        const id = params.id.toString();
        this.subscription.add(
          this.organisationService.get(id).subscribe({
            next: (organisation: Organisation) => {
              this.organisation = organisation;

              organisation.places.map((place: PlaceForOrganization) => {
                this.places.push(place._id);
              });

              this.initForm();
            },
            error: () => {
              this.router.navigate([
                this.currentLanguageService.routePrefix,
                "404",
              ]);
              this.toastr.warning(
                this.translateService.instant(
                  "SEARCHED_ORGA_COULD_NOT_BE_IDENTIFIED"
                )
              );
            },
          })
        );
      })
    );
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public initForm = (): void => {
    this.inviteForm = this.formBuilder.group({
      lastname: ["", [Validators.required, noWhiteSpace]],
      mail: [
        "",
        [Validators.required, EmailValidator],
        this.validateUniqueEmailInOrga.bind(this),
      ],
      name: ["", [Validators.required, noWhiteSpace]],
      organization: [
        {
          disabled: true,
          value: this.organisation._id,
        },
        Validators.required,
      ],
      organizationName: [
        {
          disabled: true,
          value: this.organisation.name,
        },
        Validators.required,
      ],
      phone: [null, [phoneValidator]],
      role: [UserRole.OWNER, Validators.required],
      title: [""],
    });
  };

  public get f(): {
    [key: string]: AbstractControl;
  } {
    return this.inviteForm.controls;
  }

  public sendInvite = (): void => {
    this.submitted = true;

    if (this.inviteForm.invalid) {
      this.toastr.error(this.translateService.instant("INCORRECT_FIELDS"));
      return;
    }

    if (
      validateUserStatusWithEmail(UserStatus.PRO, this.f.mail.value) !== null
    ) {
      this.toastr.error(this.translateService.instant("INCORRECT_FIELDS"));
      return;
    }

    this.loading = true;

    const invitationForm: InvitationFormData = {
      lastname: this.f.lastname.value,
      mail: this.f.mail.value,
      name: this.f.name.value,
      organization: this.f.organization.value,
      password: "password-to-delete",
      phone: this.f.phone.value,
      places: this.places,
      role: this.f.role.value,
      title: this.f.title.value,
      country: THEME_CONFIGURATION.country,
    };

    this.captureEvent("click-send-invite", { ...invitationForm });

    this.subscription.add(
      this.inviteUserService.sendInvite(invitationForm).subscribe({
        next: () => {
          this.loading = false;
          this.toastr.success(
            this.translateService.instant("INVITATION_HAS_BEEN_SENT")
          );
          this.router.navigate([
            this.currentLanguageService.routePrefix,
            "organisations",
            this.organisation.organization_id,
          ]);
        },
        error: () => {
          this.loading = false;
          this.toastr.error(
            this.translateService.instant("SENDING_INVITATION_NOT_AVAILABLE")
          );
        },
      })
    );
  };

  public validateUniqueEmailInOrga = (
    control: AbstractControl
  ): Observable<{ emailInOrga: boolean }> => {
    if (isEmail(control?.value.trim(), EMAIL_VALIDATOR_CONFIG)) {
      return this.inviteUserService
        .checkEmailAlreadyUsedInOrga(control.value, this.organisation._id)
        .pipe(
          map((res: boolean) => {
            return res === false ? null : { emailInOrga: true };
          })
        );
    } else {
      return of(null);
    }
  };

  public captureEvent(eventName: string, properties?: PosthogProperties): void {
    this.posthogService.capture(`invite-member-${eventName}`, {
      organizationId: this.organisation._id,
      organization_id: this.organisation.organization_id,
      ...properties,
    });
  }
}
