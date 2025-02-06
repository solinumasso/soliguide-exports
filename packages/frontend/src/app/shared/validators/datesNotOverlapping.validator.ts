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
import type { ValidatorFn, UntypedFormGroup } from "@angular/forms";

import type { TempInfo } from "@soliguide/common";

import { isValid, areIntervalsOverlapping, isWithinInterval } from "date-fns";

import { parseDateFromNgb } from "../bootstrap-util";

export const datesNotOverlappingValidator = ({
  beginDateControlName,
  endDateControlName,
  intervals,
}: {
  beginDateControlName: string;
  endDateControlName: string;
  intervals: TempInfo[];
}): ValidatorFn => {
  return (formGroup: UntypedFormGroup) => {
    const beginDateControl = formGroup.controls[beginDateControlName];
    const endDateControl = formGroup.controls[endDateControlName];

    if (beginDateControl.value && endDateControl.value) {
      const beginDate = isValid(beginDateControl.value)
        ? beginDateControl.value
        : parseDateFromNgb(beginDateControl.value);
      const endDate = isValid(endDateControl.value)
        ? endDateControl.value
        : parseDateFromNgb(endDateControl.value);

      try {
        for (const [index, interval] of intervals.entries()) {
          if (
            formGroup.controls._id?.toString() !== interval._id.toString() &&
            ((!endDate &&
              (!interval.dateFin ||
                (interval.dateDebut &&
                  isWithinInterval(beginDate, {
                    end: interval.dateFin,
                    start: interval.dateDebut,
                  })))) ||
              (endDate &&
                interval.dateDebut &&
                ((!interval.dateFin &&
                  isWithinInterval(interval.dateDebut, {
                    end: endDate,
                    start: beginDate,
                  })) ||
                  (interval.dateFin &&
                    areIntervalsOverlapping(
                      {
                        end: interval.dateFin,
                        start: interval.dateDebut,
                      },
                      {
                        end: endDate,
                        start: beginDate,
                      }
                    )))))
          ) {
            beginDateControl.setErrors({ dateOverlapping: true });
            endDateControl.setErrors({ dateOverlapping: true });
            return { indexDateOverlapping: index };
          }
        }
      } catch {
        beginDateControl.setErrors(null);
        endDateControl.setErrors(null);
        return null;
      }
    }

    beginDateControl.setErrors(null);
    endDateControl.setErrors(null);
    return null;
  };
};
