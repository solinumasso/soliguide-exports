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
import { CountryCodes, PostOrganizationPayload } from "@soliguide/common";

export const CREATE_ORGA_OK_SIMPLE: PostOrganizationPayload = {
  description: "",
  facebook: "",
  fax: "",
  mail: "",
  name: "Orga de test",
  phone: null,
  relations: ["ASSOCIATION"],
  territories: ["75"],
  website: "",
  country: CountryCodes.FR,
};

export const CREATE_ORGA_OK_COMPLETE: PostOrganizationPayload = {
  description:
    " Amet fugiat ullamco do magna cillum nulla. Et duis mollit aliqua consectetur laborum anim anim mollit aliquip. Sint ex veniam in voluptate ipsum amet proident anim nulla proident ullamco ullamco labore magna. ",
  facebook: "",
  fax: "",
  mail: "testjimmy@jimmy.fr",
  name: "Organisation sans aucun soucis",
  phone: null,
  relations: ["ASSOCIATION", "API"],
  territories: ["75"],
  website: "https://orgaok.fr",
  country: CountryCodes.FR,
};
