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
import { Component, OnInit } from "@angular/core";
import {
  UntypedFormGroup,
  AbstractControl,
  Validators,
  UntypedFormBuilder,
} from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute } from "@angular/router";

import { ChangeEvent } from "@ckeditor/ckeditor5-angular";

// skipcq: JS-C1003
import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import { ToastrService } from "ngx-toastr";

import { EMAIL_TYPE_LABELS } from "../../constants";

import { EmailsService } from "../../services/emails.service";

import { EmailTemplates } from "../../types";

import { User } from "../../../users/classes";

import { CK_EDITOR_CONF } from "../../../../shared/constants";
import { EmailValidator, noWhiteSpace } from "../../../../shared";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-edit-email-templates",
  templateUrl: "./edit-email-templates.component.html",
  styleUrls: ["./edit-email-templates.component.css"],
})
export class EditEmailTemplatesComponent implements OnInit {
  public emailTemplates: EmailTemplates;

  public templateEditForm: UntypedFormGroup;

  public me!: User | null;

  public loading: boolean;
  public submitted: boolean;

  public editor = ClassicEditor;
  public editorConfig = CK_EDITOR_CONF;

  public readonly EMAIL_TYPE_LABELS = EMAIL_TYPE_LABELS;

  constructor(
    private readonly formBuilder: UntypedFormBuilder,
    private readonly emailService: EmailsService,
    private readonly route: ActivatedRoute,
    private readonly titleService: Title,
    private readonly toastr: ToastrService,
    private readonly translateService: TranslateService
  ) {
    this.loading = false;
    this.submitted = false;
    this.emailTemplates = null;
  }

  public ngOnInit(): void {
    this.titleService.setTitle(
      this.translateService.instant("EDIT_EMAIL_TEMPLATES")
    );

    if (this.route.snapshot.params.territory) {
      const territory = this.route.snapshot.params.territory;

      this.emailService.getMyTemplates(territory).subscribe({
        next: (emailTemplates: EmailTemplates) => {
          this.loading = false;
          this.emailTemplates = emailTemplates;
          this.initForm();
        },
        error: () => {
          this.toastr.error(this.translateService.instant("SEARCH_ERROR"));
        },
      });
    }
  }

  public get f(): {
    [key: string]: AbstractControl;
  } {
    return this.templateEditForm.controls;
  }

  public onCkEditorChange = (fieldToEdit: string, { editor }: ChangeEvent) => {
    this.f[fieldToEdit].setValue(editor.getData());
  };

  public initForm = (): void => {
    this.templateEditForm = this.formBuilder.group({
      senderEmail: [
        this.emailTemplates.senderEmail,
        [Validators.required, EmailValidator],
      ],
      senderName: [
        this.emailTemplates.senderName,
        [Validators.required, noWhiteSpace],
      ],

      CAMPAGNE_COMPTES_PRO: [
        this.emailTemplates.emails.CAMPAGNE_COMPTES_PRO.content,
        [Validators.required, Validators.minLength(200)],
      ],
      CAMPAGNE_INVITATIONS: [
        this.emailTemplates.emails.CAMPAGNE_INVITATIONS.content,
        [Validators.required, Validators.minLength(200)],
      ],
      RELANCE_CAMPAGNE_COMPTES_PRO: [
        this.emailTemplates.emails.RELANCE_CAMPAGNE_COMPTES_PRO.content,
        [Validators.required, Validators.minLength(200)],
      ],
      RELANCE_CAMPAGNE_INVITATIONS: [
        this.emailTemplates.emails.RELANCE_CAMPAGNE_INVITATIONS.content,
        [Validators.required, Validators.minLength(200)],
      ],
      RELANCE_TERMINER_MAJ: [
        this.emailTemplates.emails.RELANCE_TERMINER_MAJ.content,
        [Validators.required, Validators.minLength(200)],
      ],
    });
  };

  public patchEmailTemplates = (): void => {
    this.submitted = true;

    if (this.templateEditForm.invalid) {
      this.toastr.error(this.translateService.instant("INCORRECT_FIELDS"));
    } else {
      this.loading = true;

      this.emailService
        .patchMyTemplates(this.templateEditForm.value, this.emailTemplates._id)
        .subscribe({
          next: () => {
            this.toastr.success(
              this.translateService.instant("SUCCESSFUL_ADDITION")
            );
            this.loading = false;
          },
          error: () => {
            this.loading = false;
            this.toastr.error(
              this.translateService.instant("PLEASE_CHECK_FORM_FIELDS")
            );
          },
        });
    }
  };
}
