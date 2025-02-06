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
import { TERRITORIES_NOTIF, AnyDepartmentCode } from "@soliguide/common";

export const getSenderData = (
  territory: AnyDepartmentCode | null,
  key: "senderEmail" | "senderFirstName" | "senderName"
): string => {
  const defaultValues = {
    senderEmail: "contact@solinum.org",
    senderFirstName: "L'équipe Soliguide",
    senderName: "Soliguide France",
  };

  if (territory) {
    const territoryNotifInformations = TERRITORIES_NOTIF[territory];
    if (
      territoryNotifInformations &&
      typeof territoryNotifInformations[key] !== "undefined"
    ) {
      return territoryNotifInformations[key];
    }
  }

  return defaultValues[key];
};
