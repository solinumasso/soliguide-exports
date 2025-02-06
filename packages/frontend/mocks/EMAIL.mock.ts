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
import { Email } from "../src/app/modules/emails/types";
import { ORGANIZATION_MOCK } from "./ORGANIZATION.mock";

export const MAIL_MOCK: Email = {
  _id: "60c275aa31442f7b707f2a9b",
  campaign: "MAJ_TEST",
  info: {
    organization: ORGANIZATION_MOCK,
    organization_id: ORGANIZATION_MOCK.organization_id,
    user_id: 90,
    user: "okpokpok",
    placeId: [14270],
    territory: "93",
  },
  mailgunEmailId: "XXXXXX.X.XXXXXX@solinum.org",
  emailType: "CAMPAGNE_INVITATIONS",
  emailData: {
    to: "test@structure-social.fr",
    from: "test@solinum.org",
    subject: "Chips",
    html: "Chips",
  },
  recipientEmail: "emarcel@structure-social.fr",
  senderEmail: "contact@solinum.org",
  status: {
    BOUNCED_PERM: {
      date: null,
      value: false,
    },
    BOUNCED_TEMP: {
      date: null,
      value: false,
    },
    CLICKED: {
      date: null,
      value: false,
    },
    DELIVERED: {
      date: new Date("2021-06-15 12:37:05.210Z"),
      value: true,
    },
    HUMAN_RESPONSE: {
      date: new Date("2021-06-16 08:27:32.079Z"),
      value: true,
    },
    OPENED: {
      date: null,
      value: false,
    },
    PENDING: {
      date: new Date("2021-06-15 12:20:35.735Z"),
      value: true,
    },
    REJECTED: {
      date: null,
      value: false,
    },
    SENT: {
      date: new Date("2021-06-15 12:37:05.734Z"),
      value: true,
    },
    SPAM: {
      date: null,
      value: false,
    },
    TO_SEND: {
      date: new Date("2021-06-10 20:27:19.047Z"),
      value: true,
    },
  },
  lastUpdate: new Date("2021-06-16 08:27:32.079Z"),
  lastStatus: "HUMAN_RESPONSE",
  updatedAt: new Date("2021-06-16 08:27:32.106Z"),
};
