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
import mongoose from "mongoose";
import { UserStatus, UserTypeLogged } from "@soliguide/common";
import { ABSTRACT_USER } from "./ABSTRACT_USER.mock";

export const USER_PRO: any = {
  ...ABSTRACT_USER,
  ...{
    _id: new mongoose.Types.ObjectId("5fd78bb917e8c5648075c785"),
    blocked: false,
    createdAt: new Date("2020-12-14T15:58:49.902Z"),
    lastname: "Nom-pro",
    mail: "mail-user-pro@structure.fr",
    name: "Marcel",
    organizations: [
      {
        _id: "5fb648823cb90874d9ab1bef",
        name: "Organisme de test",
        organization_id: 2316,
        territories: ["75"],
      },
    ],
    password: "$2a$0xoksopkwpoxkswpokxopwskopxswSCxd/KTIjJNe",
    userRights: [new mongoose.Types.ObjectId("61162ee115b29bc0c080db98")],
    selectedOrgaIndex: 0,
    status: UserStatus.PRO,
    territories: ["75"],
    title: "Président de la structure",
    updatedAt: new Date("2020-12-14T16:28:23.676Z"),
    user_id: 451,
    type: UserTypeLogged.LOGGED,
    isLogged() {
      return true;
    },
  },
};
