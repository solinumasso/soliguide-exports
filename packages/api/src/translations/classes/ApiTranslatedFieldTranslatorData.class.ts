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
  TranslatedFieldLanguageStatus,
  TranslatedFieldTranslatorData,
} from "@soliguide/common";

import mongoose from "mongoose";

export class ApiTranslatedFieldTranslatorData
  implements TranslatedFieldTranslatorData
{
  public content: string;
  public status: TranslatedFieldLanguageStatus;
  public translatorName: string | null;
  public translator: mongoose.Types.ObjectId | null;
  public updatedAt: Date;

  constructor(
    translatedFieldTranslatorData?: Partial<ApiTranslatedFieldTranslatorData>
  ) {
    this.content = translatedFieldTranslatorData?.content ?? "";
    this.status =
      translatedFieldTranslatorData?.status ??
      TranslatedFieldLanguageStatus.NOT_TRANSLATED;
    this.translatorName = translatedFieldTranslatorData?.translatorName ?? "";
    this.translator = translatedFieldTranslatorData?.translator ?? null;
    this.updatedAt = translatedFieldTranslatorData?.updatedAt ?? new Date();
  }
}
