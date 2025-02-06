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
import { Db } from "mongodb";

import { logger } from "../src/general/logger";

const message = "Migration purpose";

export const up = async (db: Db) => {
  const beforeCoteDOr = await db
    .collection("lieux")
    .countDocuments({ "position.slugs.department": "cote-dor" });

  const beforeCoteDArmor = await db
    .collection("lieux")
    .countDocuments({ "position.slugs.department": "cotes-darmor" });

  await db
    .collection("lieux")
    .updateMany(
      { "position.slugs.department": "cote-dor" },
      { $set: { "position.slugs.department": "cote-d-or" } }
    );

  await db
    .collection("lieux")
    .updateMany(
      { "position.slugs.department": "cotes-darmor" },
      { $set: { "position.slugs.department": "cotes-d-armor" } }
    );

  // Vérification du nombre de documents mis à jour
  const updatedCoteDOr = await db
    .collection("lieux")
    .countDocuments({ "position.slugs.department": "cote-d-or" });

  const updatedCoteDArmor = await db
    .collection("lieux")
    .countDocuments({ "position.slugs.department": "cotes-d-armor" });

  logger.info(
    `Nombre de documents mis à jour pour Côte-d'Or ${updatedCoteDOr}/${beforeCoteDOr}`
  );
  logger.info(
    `Nombre de documents mis à jour pour Côtes-d'Armor ${updatedCoteDArmor}/${beforeCoteDArmor}`
  );
};

export const down = async (db: Db) => {
  logger.info(`[ROLLBACK] - ${message}`);
  await db.collection("lieux").findOne();
};
