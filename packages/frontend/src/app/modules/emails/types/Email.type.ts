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
import { CampaignEmailType, EmailStatus } from ".";
import { Organisation } from "../../admin-organisation/interfaces";

export type Email = {
  _id: string;
  campaign: string;
  info: {
    organization: Organisation;
    organization_id: number;
    placeId: [number];
    territory: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    user: any;
    user_id: number;
  };
  mailgunEmailId: string;
  emailType: CampaignEmailType;
  emailData: {
    from: string;
    html: string;
    subject: string;
    to: string;
  };
  recipientEmail: string;
  senderEmail: string;

  status: {
    BOUNCED_PERM: {
      date: Date;
      value: boolean;
    };
    BOUNCED_TEMP: {
      date: Date;
      value: boolean;
    };
    CLICKED: {
      date: Date;
      value: boolean;
    };
    DELIVERED: {
      date: Date;
      value: boolean;
    };
    HUMAN_RESPONSE: {
      date: Date;
      value: boolean;
    };
    OPENED: {
      date: Date;
      value: boolean;
    };
    PENDING: {
      date: Date;
      value: boolean;
    };
    REJECTED: {
      date: Date;
      value: boolean;
    };
    SENT: {
      date: Date;
      value: boolean;
    };
    SPAM: {
      date: Date;
      value: boolean;
    };
    TO_SEND: {
      date: Date;
      value: boolean;
    };
  };

  lastUpdate: Date;
  lastStatus: EmailStatus;
  updatedAt: Date;
};
