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
import { PlaceType, PositionSlugs } from "@soliguide/common";

const message = "Fix slugs in position & itineraries";
const BATCH_SIZE = 2500;

export const countPlacesNotMigrated = async (db: Db) => {
  return await db.collection("lieux").countDocuments({ migrated: false });
};

export const getPlacesNotMigrated = async (db: Db) => {
  return await db
    .collection("lieux")
    .find({ migrated: false })
    .project({
      _id: 1,
      placeType: 1,
      position: 1,
      parcours: 1,
    })
    .limit(BATCH_SIZE)
    .toArray();
};

export const up = async (db: Db) => {
  await db.collection("lieux").updateMany({}, { $set: { migrated: false } });

  const total = await db.collection("lieux").countDocuments();
  let cpt = 0;
  while ((await countPlacesNotMigrated(db)) > 0) {
    const bulkOperations = [];
    const places = await getPlacesNotMigrated(db);

    if (!places?.length) {
      return;
    }

    cpt = cpt + places.length;
    logger.info(`${cpt}/${total} places migrated`);

    for (const place of places) {
      if (place.placeType === PlaceType.PLACE && place?.position) {
        place.position.slugs = new PositionSlugs(place.position);

        bulkOperations.push({
          updateOne: {
            collection: "lieux",
            filter: { _id: place._id },
            update: {
              $set: {
                position: place.position,
                migrated: true,
              },
            },
          },
        });
      } else if (
        place.placeType === PlaceType.ITINERARY &&
        place?.parcours?.length
      ) {
        for (const position of place.parcours) {
          position.slugs = new PositionSlugs(position);
        }

        bulkOperations.push({
          updateOne: {
            collection: "lieux",
            filter: { _id: place._id },
            update: {
              $set: {
                parcours: place.parcours,
                migrated: true,
              },
            },
          },
        });
      } else {
        bulkOperations.push({
          updateOne: {
            collection: "lieux",
            filter: { _id: place._id },
            update: {
              $set: {
                migrated: true,
              },
            },
          },
        });
      }
    }

    if (bulkOperations?.length > 0) {
      await db.collection("lieux").bulkWrite(bulkOperations);
    }

    logger.info(`Migrated batch of ${places.length} places`);
  }

  logger.info("Migration completed successfully");
  await db.collection("lieux").updateMany({}, { $unset: { migrated: null } });
};

export const down = async (db: Db) => {
  logger.info(`[ROLLBACK] - ${message}`);
  await db.collection("lieux").findOne();
};
