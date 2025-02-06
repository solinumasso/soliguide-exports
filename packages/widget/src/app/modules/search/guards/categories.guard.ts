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
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Router } from "@angular/router";
import {
  Categories,
  LEGACY_CATEGORIES_SEO,
  getCategoryFromLegacyCategory,
} from "@soliguide/common";

@Injectable({ providedIn: "root" })
export class CategoriesGuard {
  constructor(private readonly router: Router) {}

  public canActivate(
    route: ActivatedRouteSnapshot
  ): Promise<boolean> | boolean {
    const legacyCategoryInParams =
      LEGACY_CATEGORIES_SEO[route.params["category"]];

    const legacyCategoriesInQueryParams = route.queryParams["categories"]
      ? route.queryParams["categories"]
          .split(",")
          .map((category: string) => parseInt(category, 10))
      : [];

    if (
      !Object.values(Categories).includes(route.params["category"]) &&
      typeof legacyCategoryInParams === "number"
    ) {
      return this.router.navigate(
        [
          "search",
          route.params["widgetId"],
          route.params["lang"],
          getCategoryFromLegacyCategory(legacyCategoryInParams),
        ],
        {
          replaceUrl: true,
        }
      );
    } else if (legacyCategoriesInQueryParams[0]) {
      return this.router.navigate(
        [
          "search",
          route.params["widgetId"],
          route.params["lang"],
          route.params["category"],
        ],
        {
          queryParams: {
            ...route.queryParams,
            categories: legacyCategoriesInQueryParams
              .map((legacyCategory: number) =>
                getCategoryFromLegacyCategory(legacyCategory)
              )
              .toString(),
          },
        }
      );
    }

    return true;
  }
}
