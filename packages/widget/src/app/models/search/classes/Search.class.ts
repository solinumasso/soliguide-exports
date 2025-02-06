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
  Categories,
  GeoPosition,
  SearchModalities,
  SearchPublics,
  SupportedLanguagesCode,
  WidgetId,
} from "@soliguide/common";

export class Search {
  public category?: Categories;
  public categories?: Categories[];
  public word?: string;

  public widgetId: WidgetId;

  public location: GeoPosition;
  public locations: Partial<GeoPosition>[];

  public modalities?: SearchModalities;
  public publics?: SearchPublics;

  public options: {
    limit?: number;
    page?: number;
  };

  public lang: SupportedLanguagesCode;

  constructor(data?: Partial<Search>) {
    if (data?.category) {
      this.category = data.category;
    } else if (data?.categories?.length) {
      this.categories = data.categories;
    } else {
      this.word = data?.word;
    }

    this.widgetId = data?.widgetId ?? WidgetId.SOLINUM;
    this.location = data?.location ?? new GeoPosition({});
    this.locations = data?.locations ?? [];
    this.lang = data?.lang ?? SupportedLanguagesCode.FR;
    this.modalities = data?.modalities;
    this.publics = data?.publics;

    this.options = data?.options ?? {
      limit: 10,
      page: 1,
    };
  }
}
