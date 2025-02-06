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
import { AirtableEntityType, AirtableRecordType } from "../../_models/airtable";

import {
  PLACE_FIELDS_NAME,
  USER_FIELDS_NAME,
} from "../../airtable/constants/AT_FIELDS_NAMES.const";
import * as AirtableService from "../../airtable/services/airtable.service";

import { logger } from "../../general/logger";

import { UserModel } from "../../user/models/user.model";

import { PlaceModel } from "../../place/models/place.model";

export const restoreSynchro = async () => {
  logger.info("[RESTORE-SYNC] Remets à jour les airtableId de la BDD");

  logger.info(
    "[RESTORE-SYNC] [PLACES] Remets à jour les airtableId des places"
  );

  logger.info("Récupération des airtableId...");
  try {
    let atPlaces = (await AirtableService.findEntitiesByFormula(
      AirtableEntityType.PLACE,
      `{${PLACE_FIELDS_NAME.FICHE_ID}} != BLANK()`
    )) as AirtableRecordType[];

    const nbPlaces = atPlaces.length;

    if (nbPlaces > 0) {
      logger.info(`${nbPlaces} places à refaire matcher`);

      const atPlaceIds: number[] = [];

      atPlaces = atPlaces.filter((atPlace) => {
        const atPlaceId = parseInt(
          atPlace.fields[PLACE_FIELDS_NAME.FICHE_ID],
          10
        );

        if (Number.isFinite(atPlaceId)) {
          atPlaceIds.push(atPlaceId);
          return true;
        }

        return false;
      });

      const places = await PlaceModel.find({ lieu_id: { $in: atPlaceIds } })
        .lean()
        .exec();

      if (atPlaceIds.length) {
        const queries = places.map((place: any) => {
          const lieu_id = place.lieu_id;
          const query = {
            updateOne: {
              filter: { lieu_id },
              update: {
                $set: {
                  "atSync.airtableId": atPlaces[atPlaceIds.indexOf(lieu_id)].id,
                },
              },
            },
          };
          return query;
        });

        if (queries.length) {
          await PlaceModel.bulkWrite(queries);
        }
      }
    }

    logger.info(
      "[RESTORE-SYNC] [PLACES] Remise à jour des airtableId des places terminée"
    );
  } catch (e) {
    logger.info("Issues when restoring airtable ids of places");
    logger.error(e);
  }

  logger.info("[RESTORE-SYNC] [USERS] Remets à jour les airtableId des users");

  logger.info("Récupération des airtableId...");

  try {
    let atUsers = (await AirtableService.findEntitiesByFormula(
      AirtableEntityType.USER,
      `{${USER_FIELDS_NAME.USER_ID}} != BLANK()`
    )) as AirtableRecordType[];

    const nbUser = atUsers.length;

    if (nbUser > 0) {
      logger.info(`${nbUser} users à refaire matcher`);

      const atUserIds: number[] = [];

      atUsers = atUsers.filter((atUser) => {
        const atUserId = parseInt(atUser.fields[USER_FIELDS_NAME.USER_ID], 10);

        if (Number.isFinite(atUserId)) {
          atUserIds.push(atUserId);
          return true;
        }
        return false;
      });

      const users = await UserModel.find({
        user_id: { $in: atUserIds },
      })
        .lean()
        .exec();

      if (atUserIds.length) {
        const queries = users.map((user: any) => {
          const user_id = user.user_id;
          const query = {
            updateOne: {
              filter: { user_id },
              update: {
                $set: {
                  "atSync.airtableId": atUsers[atUserIds.indexOf(user_id)].id,
                },
              },
            },
          };
          return query;
        });

        if (queries.length) {
          await UserModel.bulkWrite(queries);
        }
      }
    }

    logger.info(
      "[RESTORE-SYNC] [USERS] Remise à jour les airtableId des users terminées"
    );
  } catch (e) {
    logger.info("Issues when restoring airtable ids of users");
    logger.error(e);
  }

  logger.info("[RESTORE-SYNC] Remise à jour des airtableId terminée ✅");
};
