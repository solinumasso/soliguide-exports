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
import delay from "delay";

import fse from "fs-extra";

import path from "path";

import { parentPort } from "worker_threads";

import * as XLSX from "xlsx";

import { slugString } from "@soliguide/common";

import { readGsheetFile } from "./readGsheetFile";

import { CONFIG } from "../../_models";

import { logger } from "../../general/logger";

import { AutoCompleteModel } from "../../search/models/auto-complete.model";

export const importCategories = async () => {
  if (!CONFIG.SYNONYMS_GOOGLE_DOCS_LINK) {
    logger.warn(
      "[IMPORT EVENTS]: SYNONYMS_GOOGLE_DOCS_LINK not provided, not importing events."
    );
    return;
  }
  const localFilePath = path.resolve(
    __dirname,
    "../../../resources/categories.xlsx"
  );
  await fse.remove(localFilePath);

  logger.info("[IMPORT CATEGORIES]: Download Excel file");

  const url = CONFIG.SYNONYMS_GOOGLE_DOCS_LINK;

  // Get Excel file and fetch it
  const w = await readGsheetFile(url, localFilePath);

  w.on("finish", async () => {
    logger.info("[IMPORT CATEGORIES]: Remove old categories");

    // Delete old values
    await AutoCompleteModel.deleteMany();

    const results = XLSX.readFile(localFilePath);

    const newAutocompletes = [];

    for (const result of XLSX.utils.sheet_to_json(
      results.Sheets.DATA
    ) as any[]) {
      logger.info(
        `[IMPORT CATEGORIES]: Importing '${result.TYPE}': ${result["ID CATEGORY"]}`
      );
      newAutocompletes.push({
        categoryId: result["ID CATEGORY"] || null,
        description: result["DESCRIPTION (max 220 caractères)"],
        expressionId: result["ID EXPRESSION"] || null,
        label: result["LABEL POUR TRADUCTION"],
        seo: result["URL ASSOCIÉ"],
        synonyms: slugString(result["SYNONYMES (séparés par une virgule)"]),
        type: result.TYPE,
      });
    }

    if (newAutocompletes.length) {
      await AutoCompleteModel.insertMany(newAutocompletes);
    }

    await delay(500);

    logger.info("[IMPORT CATEGORIES]: End import");

    if (parentPort) {
      parentPort.postMessage("done");
    }
  });
};
