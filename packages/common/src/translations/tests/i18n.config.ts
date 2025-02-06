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
/* eslint-disable @typescript-eslint/no-explicit-any */
import i18next, { i18n, use } from "i18next";

import Backend from "i18next-fs-backend";

import { join } from "path";
import { SUPPORTED_LANGUAGES } from "../constants";
import { SupportedLanguagesCode } from "../enums";

const options = {
  backend: {
    loadPath: join(__dirname, "../locales/{{lng}}.json"),
  },
  fallbackLng: SupportedLanguagesCode.FR,
  initImmediate: false,
  preload: SUPPORTED_LANGUAGES,
  supportedLngs: SUPPORTED_LANGUAGES,
};

use(Backend)
  .init(options, (err: any) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("i18next is ready...");
  })
  .catch((e: any) => {
    console.log(e);
  });

export const translator: i18n = i18next;
