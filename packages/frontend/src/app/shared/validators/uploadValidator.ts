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
import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const extensionsAvailables = {
  DOCS: [
    "image/jpg",
    "image/jpeg",
    "image/png",
    "image/gif",
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.oasis.opendocument.text",
  ],
  PHOTOS: ["image/jpg", "image/jpeg", "image/png", "image/gif"],
};

export const validateUpload = (uploadType: "DOCS" | "PHOTOS"): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    const file = control.value;
    if (file) {
      const hasGoodSize = file.size < 10000000;
      const hasGoodExtension = extensionsAvailables[uploadType].includes(
        file.type
      );

      if (!hasGoodSize || !hasGoodExtension) {
        const errors: {
          fileSize?: boolean;
          fileType?: boolean;
        } = {};

        if (!hasGoodSize) {
          errors.fileSize = true;
        }
        if (!hasGoodExtension) {
          errors.fileType = true;
        }
        return errors;
      }
      return null;
    }
    return { required: true };
  };
};
