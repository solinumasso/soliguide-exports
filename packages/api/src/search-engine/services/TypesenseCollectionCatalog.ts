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
import type { CollectionCreateSchema } from "typesense/lib/Typesense/Collections";

import { CONFIG } from "../../_models";
import { TypesenseCollectionName } from "../enums";
import { placeSchema } from "../schemas";

export class TypesenseCollectionCatalog {
  static #instance: TypesenseCollectionCatalog | null = null;
  private readonly collectionNames: {
    [key in TypesenseCollectionName]: string;
  };
  private readonly schemas: {
    [key in TypesenseCollectionName]: CollectionCreateSchema;
  };
  private readonly prefix: string;

  private buildCollectionName(name: TypesenseCollectionName) {
    return `${this.prefix}${name}`;
  }

  private buildSchema(
    name: TypesenseCollectionName,
    partialSchema: Omit<CollectionCreateSchema, "name">
  ) {
    return {
      name: this.collectionNames[name],
      ...partialSchema,
    };
  }

  private constructor() {
    this.prefix =
      CONFIG.TYPESENSE_COLLECTIONS_PREFIX ?? CONFIG.ENV === "test"
        ? "test-"
        : "";
    this.collectionNames = {
      [TypesenseCollectionName.PLACES]: this.buildCollectionName(
        TypesenseCollectionName.PLACES
      ),
    };
    this.schemas = {
      [TypesenseCollectionName.PLACES]: this.buildSchema(
        TypesenseCollectionName.PLACES,
        placeSchema
      ),
    };
  }

  public getCollectionName(name: TypesenseCollectionName): string {
    return this.collectionNames[name];
  }

  public getSchema(name: TypesenseCollectionName): CollectionCreateSchema {
    return this.schemas[name];
  }

  public getCollectionNames(): string[] {
    return Object.values(this.collectionNames);
  }

  public static get instance(): TypesenseCollectionCatalog {
    if (TypesenseCollectionCatalog.#instance === null) {
      TypesenseCollectionCatalog.#instance = new TypesenseCollectionCatalog();
    }
    return TypesenseCollectionCatalog.#instance;
  }
}
