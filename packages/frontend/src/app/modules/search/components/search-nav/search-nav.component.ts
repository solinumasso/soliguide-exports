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
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from "@angular/core";

import { Subscription } from "rxjs";

import { SEARCH_OPTIONAL_PARAMS } from "../../constants";
import { Search } from "../../interfaces";

import { CurrentLanguageService } from "../../../general/services/current-language.service";
import { SearchFilterParams } from "../../../../models/search-places";
import { PosthogService } from "../../../analytics/services/posthog.service";
import {
  FlatCategoriesTreeNode,
  getCategoriesService,
} from "@soliguide/common";

@Component({
  selector: "app-search-nav",
  templateUrl: "./search-nav.component.html",
  styleUrls: ["./search-nav.component.css"],
})
export class SearchNavComponent implements OnInit, OnDestroy, OnChanges {
  private readonly subscription = new Subscription();
  public routePrefix: string;

  public readonly CATEGORIES_ROOTS =
    getCategoriesService().getOrderRootCategoriesIds();

  public categoryParentNode: FlatCategoriesTreeNode;

  public searchParams: SearchFilterParams;

  @Input() public search!: Search;

  constructor(
    private readonly currentLanguageService: CurrentLanguageService,
    private readonly posthogService: PosthogService
  ) {
    this.routePrefix = this.currentLanguageService.routePrefix;
  }

  public ngOnInit(): void {
    this.subscription.add(
      this.currentLanguageService.subscribe(
        () => (this.routePrefix = this.currentLanguageService.routePrefix)
      )
    );

    const categoryParent = getCategoriesService().getParentsCategories(
      this.search.category
    )[0];

    this.categoryParentNode = categoryParent
      ? getCategoriesService().getFlatCategoryTreeNode(categoryParent)
      : this.search.category
      ? getCategoriesService().getFlatCategoryTreeNode(this.search.category)
      : null;
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    for (const change in changes) {
      if (change === "search") {
        this.buildQueryParams();
      }
    }
  }

  private readonly buildQueryParams = (): void => {
    this.searchParams = {};

    for (const param of SEARCH_OPTIONAL_PARAMS) {
      if (this.search[param]) {
        if (typeof this.search[param] === "object") {
          for (const key of Object.keys(this.search[param])) {
            this.searchParams[key] = Array.isArray(this.search[param][key])
              ? this.search[param][key][0]
              : this.search[param][key];
          }
        } else if (
          typeof this.search[param] === "string" ||
          typeof this.search[param] === "boolean"
        ) {
          this.searchParams[param] = this.search[param];
        }
      }
    }

    const categoryParent = getCategoriesService().getParentsCategories(
      this.search.category
    )[0];

    this.categoryParentNode = categoryParent
      ? getCategoriesService().getFlatCategoryTreeNode(categoryParent)
      : this.search.category
      ? getCategoriesService().getFlatCategoryTreeNode(this.search.category)
      : null;
  };

  public captureEvent(eventName: string) {
    this.posthogService.capture(`search-nav-${eventName}`, {
      search: this.search,
    });
  }
}
