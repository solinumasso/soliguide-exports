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
import { Component, Input, OnInit } from "@angular/core";
import {
  AbstractControl,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";

import { CommonPlaceDocument, Modalities } from "@soliguide/common";
import { ToastrService } from "ngx-toastr";
import { UploadService } from "../../../services/upload.service";
import { UploadResponse, validateUpload } from "../../../../../shared";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-upload-doc",
  templateUrl: "./upload-doc.component.html",
  styleUrls: ["./upload-doc.component.css"],
})
export class UploadDocComponent implements OnInit {
  @Input() public modalities!: Modalities;

  @Input() public placeId!: number;
  @Input() public serviceId: number | null;

  public uploadResponse: UploadResponse;

  public submitted: boolean;
  public uploadForm!: UntypedFormGroup;

  public uploadError: {
    fileSize: boolean;
    fileType: boolean;
  };

  constructor(
    private readonly formBuilder: UntypedFormBuilder,
    private readonly toastr: ToastrService,
    private readonly uploadService: UploadService,
    private readonly translateService: TranslateService
  ) {
    this.serviceId = null;
    this.uploadResponse = { status: "", message: 0, filePath: "" };
    this.submitted = false;

    this.uploadError = {
      fileSize: false,
      fileType: false,
    };
  }

  public ngOnInit(): void {
    this.uploadResponse = { status: "", message: 0, filePath: "" };

    this.uploadForm = this.formBuilder.group({
      fileSource: ["", [Validators.required, validateUpload("DOCS")]],
      file: ["", Validators.required],
      name: ["", Validators.required],
    });
  }

  public get u(): {
    [key: string]: AbstractControl;
  } {
    return this.uploadForm.controls;
  }

  public onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;

    if (!input.files?.length) {
      return;
    }

    const file = input.files[0];

    const validFileExtensions = [
      "image/jpg",
      "image/jpeg",
      "image/png",
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/vnd.oasis.opendocument.text",
    ];
    const type = file.type;
    const size = file.size;
    this.uploadError = {
      fileSize: size > 1024 * 1024 * 10,
      fileType: !validFileExtensions.includes(type),
    };

    if (!this.uploadError.fileSize && !this.uploadError.fileType) {
      this.uploadForm.controls.fileSource.setValue(file);
    } else {
      this.translateService.instant("CHECK_THE_FORM_FIELDS");
    }
  }

  public submitFile() {
    this.submitted = true;

    if (this.uploadForm.invalid) {
      this.toastr.error(this.translateService.instant("CHECK_THE_FORM_FIELDS"));
      return;
    }

    const formData = new FormData();
    formData.append("file", this.uploadForm.controls.fileSource.value);
    formData.append("name", this.uploadForm.controls.name.value);

    if (this.serviceId !== null) {
      formData.append("serviceId", this.serviceId.toString());
    }

    this.uploadService.upload(formData, this.placeId, "documents").subscribe({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      next: (res: any) => {
        this.uploadResponse = res;
        if (
          typeof this.uploadResponse.success !== "undefined" &&
          this.uploadResponse.success
        ) {
          // We add the doc to the table of the Docs already present
          this.modalities.docs.push(
            new CommonPlaceDocument(this.uploadResponse.body)
          );
          this.uploadForm.reset();
          this.submitted = false;
          this.toastr.success(
            this.translateService.instant("DOCUMENT_SUCCESSFULLY_UPLOADED")
          );
          this.uploadError = {
            fileSize: false,
            fileType: false,
          };
        }
      },
      error: () => {
        this.toastr.error(
          this.translateService.instant("DOCUMENT_UPLOAD_FAIL")
        );
      },
    });
  }
}
