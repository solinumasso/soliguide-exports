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
import {
  UntypedFormGroup,
  AbstractControl,
  ValidationErrors,
} from "@angular/forms";
import { differenceInCalendarDays, isValid } from "date-fns";

export const endDateAfterBeginDateValidator = ({
  beginDateControlName,
  endDateControlName,
}: {
  beginDateControlName: string;
  endDateControlName: string;
}) => {
  return (formGroup: UntypedFormGroup): ValidationErrors | null => {
    const beginDateControl = formGroup.controls[beginDateControlName];
    const endDateControl = formGroup.controls[endDateControlName];

    return endDateAfterBeginDateCheck(beginDateControl, endDateControl);
  };
};

export const endDateAfterBeginDateCheck = (
  beginDateControl: AbstractControl,
  endDateControl: AbstractControl
): ValidationErrors | null => {
  if (beginDateControl.value && endDateControl.value) {
    const beginDateValid = isValid(new Date(beginDateControl.value));
    const endDateValid = isValid(new Date(endDateControl.value));

    if (!beginDateValid || !endDateValid) {
      return null;
    }

    const beginDate = new Date(beginDateControl.value);
    const endDate = new Date(endDateControl.value);

    if (isNaN(beginDate.getTime()) || isNaN(endDate.getTime())) {
      return null;
    }

    if (differenceInCalendarDays(endDate, beginDate) >= 0) {
      return null;
    }

    endDateControl.setErrors({ endDateAfterBeginDate: true });
    return { endDateAfterBeginDate: true };
  }
  return null;
};
