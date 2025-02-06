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
  ApiPlace,
  CommonPlaceParcours,
  PlaceStatus,
  PlaceType,
  PositionSlugs,
} from "@soliguide/common";
import { Db, WithId } from "mongodb";
import { logger } from "../src/general/logger";

const message =
  "Update slugs for 'parcours' whitout region / department / city ";

export const up = async (db: Db) => {
  logger.info(message);

  const request = {
    status: PlaceStatus.ONLINE,
    placeType: PlaceType.ITINERARY,

    "parcours.$[].slugs.region": null,
  };

  const countBefore = await db.collection("lieux").countDocuments(request);

  console.log(`Found ${countBefore} documents to migrate`);

  const places: WithId<ApiPlace>[] = await db
    .collection<ApiPlace>("lieux")
    .find(request, {
      projection: {
        _id: 1,
        parcours: 1,
      },
    })
    .toArray();

  const operations: any = [];

  places.forEach((doc) => {
    const updatedParcours = doc.parcours.map((step: CommonPlaceParcours) => {
      step.position.slugs = new PositionSlugs(step.position);
      return step;
    });

    operations.push({
      updateOne: {
        filter: { _id: doc._id },
        update: { $set: { parcours: updatedParcours } },
      },
    });
  });

  if (operations.length > 0) {
    await db.collection("lieux").bulkWrite(operations);
  }

  const countAfter = await db.collection("lieux").countDocuments(request);

  logger.info("✅ Migration completed:");
  logger.info(`- Documents processed: ${operations.length}`);
  logger.info(`- Remaining documents with null region: ${countAfter}`);
};

export const down = () => {
  logger.info(`🔃 Cannot rollback '${message}'`);
};
