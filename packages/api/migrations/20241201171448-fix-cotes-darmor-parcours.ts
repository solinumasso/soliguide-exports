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
  // Comptage avant mise à jour pour les documents contenant Côte-d'Or
  const beforeCoteDOr = await db
    .collection("lieux")
    .countDocuments({ "parcours.position.slugs.department": "cote-dor" });

  // Comptage avant mise à jour pour les documents contenant Côtes-d'Armor
  const beforeCoteDArmor = await db
    .collection("lieux")
    .countDocuments({ "parcours.position.slugs.department": "cotes-darmor" });

  // Mise à jour de position dans tous les éléments du tableau parcours pour Côte-d'Or
  await db
    .collection("lieux")
    .updateMany(
      { "parcours.position.slugs.department": "cote-dor" },
      { $set: { "parcours.$[].position.slugs.department": "cote-d-or" } }
    );

  // Mise à jour de position dans tous les éléments du tableau parcours pour Côtes-d'Armor
  await db
    .collection("lieux")
    .updateMany(
      { "parcours.position.slugs.department": "cotes-darmor" },
      { $set: { "parcours.$[].position.slugs.department": "cotes-d-armor" } }
    );

  // Vérification du nombre de documents mis à jour
  const updatedCoteDOr = await db
    .collection("lieux")
    .countDocuments({ "parcours.position.slugs.department": "cote-d-or" });

  const updatedCoteDArmor = await db
    .collection("lieux")
    .countDocuments({ "parcours.position.slugs.department": "cotes-d-armor" });

  // Logging des résultats
  logger.info(
    `Nombre de documents mis à jour pour Côte-d'Or : ${updatedCoteDOr}/${beforeCoteDOr}`
  );
  logger.info(
    `Nombre de documents mis à jour pour Côtes-d'Armor : ${updatedCoteDArmor}/${beforeCoteDArmor}`
  );
};
export const down = async (db: Db) => {
  logger.info(`[ROLLBACK] - ${message}`);
  await db.collection("lieux").findOne();
};
