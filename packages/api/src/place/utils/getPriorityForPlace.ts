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
import { CommonNewPlaceService, PlaceStatus } from "@soliguide/common";
import { PRIORITARY_CATEGORIES } from "../../categories/constants/prioritary-categories.const";

export const getPriorityForPlace = (
  services_all: CommonNewPlaceService[],
  status: PlaceStatus
): boolean => {
  const containPriorityService = services_all.reduce(
    (priority: boolean, service: CommonNewPlaceService) =>
      priority ||
      !!(service.category && PRIORITARY_CATEGORIES.includes(service.category)),
    false
  );

  return (
    (status === PlaceStatus.ONLINE || status === PlaceStatus.OFFLINE) &&
    containPriorityService
  );
};
