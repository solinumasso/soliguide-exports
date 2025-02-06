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
import { TranslatedPlaceContent } from "@soliguide/common";

export class ApiTranslatedPlaceContent implements TranslatedPlaceContent {
  public place: {
    description: string | null;
    modalities: {
      appointment: { precisions: string | null };
      inscription: { precisions: string | null };
      orientation: { precisions: string | null };
      other: string | null;
      price: { precisions: string | null };
    };
    publics: {
      description: string | null;
    };
    services_all: [];
    tempInfos: {
      closure: {
        description: string | null;
      };
      hours: {
        description: string | null;
      };
      message: {
        description: string | null;
        name: string | null;
      };
    };
  };

  public translationRate: number;

  constructor(data?: Partial<ApiTranslatedPlaceContent>) {
    this.translationRate = data?.translationRate ?? 0;
    this.place = data?.place ?? {
      description: null,
      modalities: {
        appointment: { precisions: null },
        inscription: { precisions: null },
        orientation: { precisions: null },
        other: null,
        price: { precisions: null },
      },
      publics: {
        description: null,
      },
      services_all: [],
      tempInfos: {
        closure: {
          description: null,
        },
        hours: {
          description: null,
        },
        message: {
          description: null,
          name: null,
        },
      },
    };
  }
}
