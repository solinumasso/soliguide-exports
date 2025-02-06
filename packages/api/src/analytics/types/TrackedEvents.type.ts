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

type Action = "EDIT" | "SEARCH" | "SEND" | "RESEND" | "UPDATE" | "VIEW"; // Later on to add "DELETE" | "SHARE" ...
type Feature =
  | "CAMPAIGN_EMAIL"
  | "CAMPAIGN_EMAIL_STATUS"
  | "WELCOME_EMAIL"
  | "CONTACT_EMAIL"
  | "INVITATION_EMAIL"
  | "PASSWORD_RESET_EMAIL"
  | "PLACE"
  | "PLACES"
  | "RESET_PASSWORD_LINK_EMAIL";
type TrackedEvent = `API_${Action}_${Feature}`;

export type TrackedEvents = { [T in TrackedEvent]?: Lowercase<T> };
