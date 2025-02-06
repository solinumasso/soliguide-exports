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
import { Directive } from "@angular/core";
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
  ValidatorFn,
} from "@angular/forms";

export const appForbiddenWordsInPublicsValidator = (): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    const forbiddenWords = [
      /inscription/i,
      /orientation/i,
      /rdv/i,
      /rendez-vous/i,
      /rendez vous/i,
    ];

    for (const word of forbiddenWords) {
      if (word.test(control.value)) {
        return { appForbiddenWordsInPublics: { value: control.value } };
      }
    }

    return null;
  };
};

@Directive({
  selector: "[appForbiddenWordsInPublics]",
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: ForbiddenValidatorDirective,
      multi: true,
    },
  ],
})
export class ForbiddenValidatorDirective implements Validator {
  public validate(control: AbstractControl): ValidationErrors | null {
    return appForbiddenWordsInPublicsValidator()(control);
  }
}
