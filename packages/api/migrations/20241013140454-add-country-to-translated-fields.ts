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
import { CountryCodes, SupportedLanguagesCode } from "@soliguide/common";
import {
  ApiTranslatedFieldContent,
  ApiTranslatedPlaceContent,
} from "../src/translations/classes";

const message = "Create new fields for translation";

async function findPlacesIdsByCountry(
  db: Db,
  country: CountryCodes
): Promise<number[]> {
  if (!Object.values(CountryCodes).includes(country)) {
    throw new Error(`Invalid country code : ${country}`);
  }

  try {
    const pipeline = [
      {
        $match: {
          $or: [
            { "position.country": country },
            { "parcours.0.position.country": country },
          ],
        },
      },
      {
        $project: {
          lieu_id: 1,
        },
      },
      {
        $group: {
          _id: null,
          ids: { $push: "$lieu_id" },
        },
      },
    ];

    const result = await db.collection("lieux").aggregate(pipeline).toArray();

    const lieuIds = result[0]?.ids || [];

    logger.info(`${country} :  ${lieuIds.length} places`);

    return lieuIds;
  } catch (error) {
    logger.error(`Cannot get places for ${country} :`, error);
    throw error;
  }
}

export const up = async (db: Db) => {
  logger.info(`[MIGRATION] - ${message}`);

  const spainIds = await findPlacesIdsByCountry(db, CountryCodes.ES);

  logger.info("\n \n 🇪🇸 Migrate spain translated fields & places");

  const spainPlaces = await db.collection("lieux").updateMany(
    {
      lieu_id: { $in: spainIds },
    },
    {
      $set: {
        sourceLanguage: SupportedLanguagesCode.CA,
        country: CountryCodes.ES,
      },
    }
  );

  const spainTranslatedFields = await db
    .collection("translatedFields")
    .updateMany(
      {
        lieu_id: { $in: spainIds },
      },
      [
        {
          $set: {
            sourceLanguage: SupportedLanguagesCode.CA,
            position: {
              departmentCode: "$departementCode",
              regionCode: null,
              country: CountryCodes.ES,
            },
            "languages.fr": new ApiTranslatedFieldContent(),
            "languages.ro": new ApiTranslatedFieldContent(),
          },
        },
        {
          $unset: [
            "languages.ps",
            "languages.ka",
            "languages.ca",
            "languages.fa",
          ],
        },
      ]
    );

  const spainTranslatedPlaces = await db
    .collection("translatedPlaces")
    .updateMany(
      {
        lieu_id: { $in: spainIds },
      },
      [
        {
          $set: {
            sourceLanguage: SupportedLanguagesCode.CA,
            position: {
              departmentCode: "$departementCode",
              regionCode: null,
              country: CountryCodes.ES,
            },
            "languages.fr": new ApiTranslatedPlaceContent(),
          },
        },
        {
          $unset: [
            "languages.ps",
            "languages.ka",
            "languages.ca",
            "languages.fa",
            "needRebuild",
          ],
        },
      ]
    );

  logger.info(`${spainPlaces.modifiedCount} places updated `);
  logger.info(
    `${spainTranslatedFields.modifiedCount} translated fields updated `
  );
  logger.info(
    `${spainTranslatedPlaces.modifiedCount} translated places updated `
  );

  logger.info(" 🇦🇩 Migrate andorra's translated fields & places");

  const andorraIds = await findPlacesIdsByCountry(db, CountryCodes.AD);

  const andorraPlaces = await db.collection("lieux").updateMany(
    {
      lieu_id: { $in: andorraIds },
    },
    {
      $set: {
        sourceLanguage: SupportedLanguagesCode.CA,
        country: CountryCodes.AD,
      },
    }
  );

  const andorraTranslatedFields = await db
    .collection("translatedFields")
    .updateMany(
      {
        lieu_id: { $in: andorraIds },
      },
      [
        {
          $set: {
            sourceLanguage: SupportedLanguagesCode.CA,
            position: {
              departmentCode: "$departementCode",
              regionCode: null,
              country: CountryCodes.AD,
            },
            "languages.fr": new ApiTranslatedFieldContent(),
            "languages.es": new ApiTranslatedFieldContent(),
          },
        },
        {
          $unset: [
            "languages.ro",
            "languages.ka",
            "languages.ca",
            "languages.fa",
            "languages.ps",
          ],
        },
      ]
    );

  const andorraTranslatedPlaces = await db
    .collection("translatedPlaces")
    .updateMany(
      {
        lieu_id: { $in: andorraIds },
      },
      [
        {
          $set: {
            sourceLanguage: SupportedLanguagesCode.CA,
            position: {
              departmentCode: "$departementCode",
              regionCode: null,
              country: CountryCodes.AD,
            },
            "languages.fr": new ApiTranslatedPlaceContent(),
            "languages.es": new ApiTranslatedPlaceContent(),
          },
        },
        {
          $unset: [
            "languages.ro",
            "languages.ka",
            "languages.ca",
            "languages.fa",
            "languages.ps",
            "needRebuild",
          ],
        },
      ]
    );
  logger.info(`🇦🇩 ${andorraPlaces.modifiedCount} places updated `);
  logger.info(`🇦🇩 ${andorraTranslatedFields.modifiedCount} fields updated `);
  logger.info(`🇦🇩 ${andorraTranslatedPlaces.modifiedCount} places updated `);

  logger.info("");
  logger.info(" 🇫🇷  Migrate France's translated fields & places");

  const francePlaces = await db.collection("lieux").updateMany(
    {
      "position.country": null,
    },
    {
      $set: {
        sourceLanguage: SupportedLanguagesCode.FR,
        country: CountryCodes.FR,
      },
    }
  );

  const franceTranslatedFields = await db
    .collection("translatedFields")
    .updateMany(
      {
        "position.country": null,
      },
      [
        {
          $set: {
            sourceLanguage: SupportedLanguagesCode.FR,
            position: {
              departmentCode: "$departementCode",
              regionCode: null,
              country: CountryCodes.FR,
            },
          },
        },
      ]
    );

  const franceTranslatedPlaces = await db
    .collection("translatedPlaces")
    .updateMany(
      {
        "position.country": null,
      },
      [
        {
          $set: {
            sourceLanguage: SupportedLanguagesCode.FR,
            position: {
              departmentCode: "$departementCode",
              regionCode: null,
              country: CountryCodes.FR,
            },
          },
        },
        {
          $unset: ["needRebuild"],
        },
      ]
    );

  logger.info(`🇫🇷 ${francePlaces.modifiedCount} places updated `);
  logger.info(`🇫🇷 ${franceTranslatedFields.modifiedCount} fields updated `);
  logger.info(`🇫🇷 ${franceTranslatedPlaces.modifiedCount} places updated `);

  const deleteDepartmeentCodeTranslatedFields = await db
    .collection("translatedFields")
    .updateMany(
      {},
      {
        $unset: {
          departementCode: null,
        },
      }
    );

  const deleteDepartmeentCodeTranslatedPlace = await db
    .collection("translatedPlaces")
    .updateMany(
      {},
      {
        $unset: {
          departementCode: null,
        },
      }
    );

  logger.info(
    ` ${deleteDepartmeentCodeTranslatedFields.modifiedCount} fields updated - delete DepartementCode`
  );
  logger.info(
    `🇫🇷 ${deleteDepartmeentCodeTranslatedPlace.modifiedCount} places updated - delete DepartementCode `
  );
};

export const down = () => {
  logger.info(`[ROLLBACK] - ${message}`);
};
