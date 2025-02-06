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
import { Client, SearchClient } from "typesense";
import type { ConfigurationOptions } from "typesense/lib/Typesense/Configuration";
import type { SearchResponse } from "typesense/lib/Typesense/Documents";

import { CONFIG } from "../../_models";
import type { ITypesenseDocument, TypesensePlaceDocument } from "../documents";
import { TypesenseCollectionCatalog } from "./TypesenseCollectionCatalog";
import type {
  ITypesenseSearchQuery,
  TypesensePlaceFilterBy,
  TypesensePlaceQueryBy,
  TypesensePlaceSearchQuery,
} from "../queries";
import { TypesenseCollectionName } from "../enums";

export class TypesenseClient {
  static #instance: TypesenseClient | null = null;
  private readonly configurationOptions: ConfigurationOptions;
  private readonly client: Client;
  private readonly searchClient: SearchClient;

  public constructor() {
    if (!TypesenseClient.isTypesenseEnabled) {
      throw new Error("Typesense is not enabled in this environment");
    }
    const nodes = CONFIG.TYPESENSE_NODES_URL.split(",").map((node) => ({
      url: node,
    }));
    const logLevel = CONFIG.TYPESENSE_LOG_LEVEL ?? "info";
    const apiKey = CONFIG.TYPESENSE_API_KEY!;
    this.configurationOptions = {
      nodes,
      apiKey,
      numRetries: 3, // A total of 4 tries (1 original try + 3 retries)
      connectionTimeoutSeconds: 10,
      logLevel,
    };
    this.client = new Client(this.configurationOptions);
    this.searchClient = new SearchClient(this.configurationOptions);
  }

  private async getExistingCollectionNames(): Promise<string[]> {
    const collectionNames =
      TypesenseCollectionCatalog.instance.getCollectionNames();
    return (await this.client.collections().retrieve()).reduce((acc, value) => {
      const name = value.name;
      if (collectionNames.includes(name)) {
        acc.push(name);
      }
      return acc;
    }, [] as string[]);
  }

  public async searchPlaces(
    searchParameters: TypesensePlaceSearchQuery
  ): Promise<SearchResponse<TypesensePlaceDocument>> {
    return await this.searchCollection<
      TypesensePlaceDocument,
      TypesensePlaceQueryBy,
      TypesensePlaceFilterBy
    >(TypesenseCollectionName.PLACES, searchParameters);
  }

  private async searchCollection<
    D extends ITypesenseDocument,
    Q extends string,
    F extends Record<string, string | string[]>
  >(
    collectionName: TypesenseCollectionName,
    searchParameters: ITypesenseSearchQuery<Q, F>
  ): Promise<SearchResponse<D>> {
    const result = await this.searchClient
      .collections<D>(
        TypesenseCollectionCatalog.instance.getCollectionName(collectionName)
      )
      .documents()
      .search(searchParameters.toSearchParams(), {});
    return result as SearchResponse<D>;
  }

  public async deleteCollections() {
    const existingCollections = await this.getExistingCollectionNames();
    await Promise.all(
      existingCollections.map(async (collection) => {
        console.debug(`[TYPESENSE] Deleting ${collection} collection...`);
        await this.client.collections(collection).delete();
      })
    );
  }

  public async createCollection(
    collectionName: TypesenseCollectionName
  ): Promise<void> {
    const schema =
      TypesenseCollectionCatalog.instance.getSchema(collectionName);
    console.debug(`[TYPESENSE] Creating collection ${schema.name}...`);
    await this.client.collections().create(schema);
    console.debug(
      `[TYPESENSE] ${schema.name} collection successfully created!`
    );
  }

  public async createCollections(): Promise<void> {
    console.log("[TYPESENSE] Creating collections...");
    this.deleteCollections();
    await Promise.all(
      Object.values(TypesenseCollectionName).map((name) =>
        this.createCollection(name)
      )
    );
    console.log("[TYPESENSE] All collections successfully created!");
  }

  private async upsert<D extends ITypesenseDocument>(
    collectionName: TypesenseCollectionName,
    document: D
  ): Promise<D> {
    return await this.client
      .collections<D>(
        TypesenseCollectionCatalog.instance.getCollectionName(collectionName)
      )
      .documents()
      .upsert(document);
  }

  public async upsertPlace(
    document: TypesensePlaceDocument
  ): Promise<TypesensePlaceDocument> {
    return await this.upsert<TypesensePlaceDocument>(
      TypesenseCollectionName.PLACES,
      document
    );
  }

  public static get isTypesenseEnabled(): boolean {
    return !!CONFIG.TYPESENSE_API_KEY;
  }

  public static get instance(): TypesenseClient {
    if (TypesenseClient.#instance === null) {
      TypesenseClient.#instance = new TypesenseClient();
    }
    return TypesenseClient.#instance;
  }
}
