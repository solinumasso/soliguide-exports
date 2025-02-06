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
import type {
  CountryCodes,
  AnyTimeZone,
  WelcomedPublics,
  PublicsAdministrative,
  PublicsFamily,
  PublicsGender,
  PublicsOther,
  PlaceStatus,
  PlaceVisibility,
  Modalities,
  ApiPlace,
  AnyDepartmentCode,
  AnyRegionCode,
} from "@soliguide/common";
import type { ITypesenseDocument } from "./ITypesenseDocument";

export class TypesenseAccessConditionsSubDocument {
  public readonly unconditional: boolean;
  public readonly appointment: boolean;
  public readonly registration: boolean;
  public readonly orientation: boolean;
  public readonly price?: boolean;
  public readonly animal?: boolean;
  public readonly person_with_reduced_mobility?: boolean;

  public constructor(accessConditions: TypesenseAccessConditionsSubDocument) {
    Object.assign(this, accessConditions);
  }

  public static fromModalities(
    modalities: Modalities
  ): TypesenseAccessConditionsSubDocument {
    const accessConditions = {
      unconditional: modalities.inconditionnel,
      appointment: modalities.appointment.checked ?? false,
      registration: modalities.inscription.checked ?? false,
      orientation: modalities.orientation.checked ?? false,
      price: modalities.price.checked,
      animal: modalities.animal.checked,
      person_with_reduced_mobility: modalities.pmr.checked,
    };
    return new TypesenseAccessConditionsSubDocument(accessConditions);
  }
}

export class TypesensePlaceDocument implements ITypesenseDocument {
  // Primary keys
  public readonly id: string;
  public readonly lieu_id: number;
  public readonly seo_url: string;

  // General information
  public readonly name: string;
  public readonly description?: string;

  // Crucial information for filtering based on rights
  public readonly status: PlaceStatus;
  public readonly visibility: PlaceVisibility;

  // Misc
  public readonly priority: boolean;
  public readonly is_open_today: boolean;
  public readonly languages: string[];
  public readonly access_conditions: TypesenseAccessConditionsSubDocument;

  // Geo position
  public readonly coordinates?: number[];
  public readonly address?: string;
  public readonly additional_information?: string;
  public readonly city?: string;
  public readonly city_code?: string;
  public readonly postal_code?: string;
  public readonly department?: string;
  public readonly department_code?: AnyDepartmentCode;
  public readonly region?: string;
  public readonly region_code?: AnyRegionCode;
  public readonly country?: CountryCodes;
  public readonly time_zone?: AnyTimeZone;

  // Welcomed publics information
  public readonly publics_welcomed: WelcomedPublics;
  public readonly publics_administrative_situation: PublicsAdministrative[];
  public readonly age: { min: number; max: number };
  public readonly publics_family_situation: PublicsFamily[];
  public readonly publics_gender: PublicsGender[];
  public readonly publics_other: PublicsOther[];

  public constructor(place: TypesensePlaceDocument) {
    Object.assign(this, place);
  }

  public static fromApiPlace(place: ApiPlace): TypesensePlaceDocument {
    if (!place._id) {
      throw new Error(
        "Cannot build a TypesensePlaceDocument without an _id in ApiPlace"
      );
    }
    const placeDocument = {
      id: place._id,
      lieu_id: place.lieu_id,
      seo_url: place.seo_url,

      name: place.name,
      description: place.description ?? undefined,

      status: place.status,
      visibility: place.visibility,

      priority: place.priority ?? false,
      is_open_today: place.isOpenToday,
      languages: place.languages,
      access_conditions: TypesenseAccessConditionsSubDocument.fromModalities(
        place.modalities
      ),

      coordinates:
        place.position?.location?.coordinates?.length >= 2
          ? [
              place.position.location.coordinates[1],
              place.position.location.coordinates[0],
            ]
          : undefined,

      publics_welcomed: place.publics.accueil,
      age: place.publics.age,
      publics_administrative_situation: place.publics.administrative,
      publics_family_situation: place.publics.familialle,
      publics_gender: place.publics.gender,
      publics_other: place.publics.other,
    };
    return new TypesensePlaceDocument(placeDocument);
  }
}
