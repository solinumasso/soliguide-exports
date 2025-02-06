/*
 * Soliguide: Useful information for those who need it
 *
 * SPDX-FileCopyrightText: © 2025 Solinum
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
import { CacheModule } from "@nestjs/cache-manager";
import { Module } from "@nestjs/common";
import { CacheManagerService } from "./services/cache-manager.service";
import { CacheManagerInterceptor } from "./cache-manager.interceptor";
import { THREE_MONTHS_IN_MS } from "../config";

@Module({
  providers: [CacheManagerService, CacheManagerInterceptor],
  exports: [CacheManagerService, CacheManagerInterceptor, CacheModule],
  imports: [
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: async () => {
        return {
          ttl: THREE_MONTHS_IN_MS,
        };
      },
    }),
  ],
})
export class CacheManagerModule {}
