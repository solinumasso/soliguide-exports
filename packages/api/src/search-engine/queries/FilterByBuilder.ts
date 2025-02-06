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
export class FilterByBuilder {
  private filters = new Map<string, string | string[]>();

  public reset(): void {
    this.filters = new Map<string, string | string[]>();
  }

  public getFilter(field: string): string | string[] | undefined {
    return this.filters.get(field);
  }

  public addFilter(field: string, value: string | string[]): this {
    this.filters.set(field, value);
    return this;
  }

  public addFiltersRecord(record: Record<string, string | string[]>): this {
    Object.entries(record).forEach(([field, value]) =>
      this.addFilter(field, value)
    );
    return this;
  }

  public build(): string {
    const stringFilters: string[] = [];
    this.filters.forEach((value, field) => {
      if (Array.isArray(value)) {
        const valueInnerArray = value.map((v) => `\`${v}\``).join(", ");
        stringFilters.push(`${field} := [${valueInnerArray}]`);
      } else {
        stringFilters.push(`${field} := ${value}`);
      }
    });
    this.reset();
    return stringFilters.join(" && ");
  }
}
