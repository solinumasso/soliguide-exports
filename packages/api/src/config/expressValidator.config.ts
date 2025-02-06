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
import { ExistsOptions } from "express-validator/lib/chain";
import { NormalizeEmailOptions } from "express-validator/lib/options";

export const EMAIL_NORMALIZE_OPTIONS: NormalizeEmailOptions = {
  all_lowercase: true,
  gmail_remove_dots: false,
  gmail_remove_subaddress: false,
  icloud_remove_subaddress: false,
  outlookdotcom_remove_subaddress: false,
  yahoo_remove_subaddress: false,
};

export const PASSWORD_REGEX_VALIDATOR =
  // eslint-disable-next-line no-useless-escape
  /^(?=.*?\d)(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[!"#$%&'()*+,-.\/:;<=>?@[\]^_`{|}~]).{8,200}$/;

export const CHECK_STRING_NULL: ExistsOptions = {
  checkFalsy: true,
  checkNull: true,
};
