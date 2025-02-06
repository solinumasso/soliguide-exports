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
import { TestAccounts } from "./endPointTester.type";

export const ACCOUNTS_FOR_TEST: { [_key in TestAccounts]: string } = {
  USER_ADMIN_SOLIGUIDE: "admin-solinum@solinum.org",
  USER_ADMIN_TERRITORY: "admin.territory@soliguide.fr",
  USER_API_ALIMENTATION: "alimentation.api@soliguide.dev",
  USER_API_BLOCKED: "bloque.api@soliguide.dev",
  USER_API_DEFAULT: "default.api@soliguide.dev",
  USER_API_PARIS: "paris.api@soliguide.dev",
  USER_PRO_EDITOR: "editor@soliguide.dev",
  USER_PRO_OWNER: "admin@soliguide.dev",
  USER_PRO_OWNER_ORGA1_EDITOR_ORGA2: "owner.editor@soliguide.dev",
  USER_PRO_READER: "reader@soliguide.dev",
  USER_TRANSLATOR_EN_AR: "traducteur.enar@soliguide.dev",
};
