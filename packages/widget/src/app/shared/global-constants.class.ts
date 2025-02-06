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
export class GlobalConstants {
  // Stockage de valeurs si LocalStorage absent
  public values: { [key: string]: string } = {};
  public storageName: "localStorage" | "sessionStorage" | "globalVariable";
  public storage: Storage | null;

  constructor() {
    if (typeof localStorage !== "undefined") {
      this.storageName = "localStorage";
      this.storage = localStorage;
      if (!localStorage.getItem("DATA_CLEAN")) {
        localStorage.clear();
        localStorage.setItem("DATA_CLEAN", "true");
      }
    } else if (
      sessionStorage != null // null or undefined
    ) {
      this.storageName = "sessionStorage";
      this.storage = sessionStorage;

      if (!sessionStorage.getItem("DATA_CLEAN")) {
        sessionStorage.clear();
        sessionStorage.setItem("DATA_CLEAN", "true");
      }
    } else {
      this.storageName = "globalVariable";
      this.storage = null;
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public getItem(key: string): any | null {
    if (this.storageName !== "globalVariable" && this.storage !== null) {
      const value = this.storage.getItem(key);

      return value == null ? null : JSON.parse(value); // null or undefined
    }
    return typeof this.values[key] !== "undefined"
      ? JSON.parse(this.values[key])
      : null;
  }

  public clearStorage(): void {
    if (this.storageName !== "globalVariable" && this.storage !== null) {
      this.storage.clear();
    } else {
      this.values = {};
    }
  }

  public setItem(key: string, value: unknown): void {
    if (this.storageName !== "globalVariable" && this.storage !== null) {
      this.storage.setItem(key, JSON.stringify(value));
    } else {
      this.values[key] = JSON.stringify(value);
    }
  }

  public removeItem(key: string): void {
    if (this.storageName !== "globalVariable" && this.storage !== null) {
      this.storage.removeItem(key);
    } else {
      delete this.values[key];
    }
  }
}

export const globalConstants = new GlobalConstants();
