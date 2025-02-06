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
export class CommonPlaceDocument {
  public _id: any;
  public createdAt: Date;
  public updatedAt?: Date;
  public encoding: string;
  public filename: string;
  public mimetype: string;
  public name: string;
  public path: string;
  public size: number;
  public lieu_id?: number;
  public serviceId: number | null;

  constructor(doc?: Partial<CommonPlaceDocument>) {
    this._id = doc?._id ?? "";
    this.name = doc?.name ?? "";
    this.filename = doc?.filename ?? "";
    this.path = doc?.path ?? "";
    this.mimetype = doc?.mimetype ?? "";
    this.encoding = doc?.encoding ?? "";
    this.size = doc?.size ?? 0;
    this.createdAt = (doc?.createdAt && new Date(doc.createdAt)) ?? new Date();
    this.updatedAt = (doc?.updatedAt && new Date(doc.updatedAt)) ?? new Date();
    this.lieu_id = doc?.lieu_id;
    this.serviceId = doc?.serviceId ?? null;
  }
}
