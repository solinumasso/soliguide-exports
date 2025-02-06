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
  ADMINISTRATIVE_DEFAULT_VALUES,
  FAMILY_DEFAULT_VALUES,
  GENDER_DEFAULT_VALUES,
  OTHER_DEFAULT_VALUES,
  Publics,
  WelcomedPublics,
} from "../../publics";

/**
 * The 'welcomed publics' which are not unconditional must have at least one variatation
 * in default values.
 * If we indicate 'preferential' or 'exclusive', it is necessary to indicate at least a discriminating element
 * In welcomed audiences
 *
 * @param {Publics} publics
 * @returns {boolean}
 */
export const publicsValuesAreCoherent = (publics: Publics): boolean => {
  if (publics.accueil === WelcomedPublics.UNCONDITIONAL) {
    return true;
  }

  return (
    publics.gender.length !== GENDER_DEFAULT_VALUES.length ||
    publics.administrative.length !== ADMINISTRATIVE_DEFAULT_VALUES.length ||
    publics.familialle.length !== FAMILY_DEFAULT_VALUES.length ||
    publics.other.length !== OTHER_DEFAULT_VALUES.length ||
    publics.age.min !== 0 ||
    publics.age.max !== 99
  );
};
