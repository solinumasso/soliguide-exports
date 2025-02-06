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
export interface DocExportRow {
  rowId?: number | string; // Incremental number displayed in the document
  sectionName?: string; // Only for Word & PDF export, it's the name of the section
  lieu_id: number | string;
  name: string;
  address: string;
  city: string;
  postalCode: string;
  email?: string;
  phoneNumbers?: string;
  hours?: string;
  modalities?: string;
  publics?: string;
  linkToSoliguide?: string;
  tempClosure?: string;
  tempHours?: string;
  tempMessage?: string;
  services?: string; // Only one if we need to export services line by line
  category?: number | string; // Useful only for sorting by service
  updatedAt: string;
  latitude: string;
  longitude: string;
}
