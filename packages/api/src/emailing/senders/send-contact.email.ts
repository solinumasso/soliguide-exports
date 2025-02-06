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
import {
  ExpressRequest,
  ExpressResponse,
  EmailCallToActionData,
} from "../../_models";
import { mgSendTemplateEmail } from "../services/mailgun.service";
import { getSenderData } from "../utils/getSenderData";
import { PosthogClient } from "../../analytics/services";
import { TRACKED_EVENTS } from "../../analytics/constants";

export const emailContact = async (
  req: ExpressRequest,
  res: ExpressResponse
) => {
  const contactEmail = getSenderData(req.body.department, "senderEmail");

  const info: EmailCallToActionData = {
    params: {
      email: req.bodyValidated.email,
      message: req.bodyValidated.message,
      name: req.bodyValidated.name,
    },
    recipientEmail: contactEmail,
    replyEmail: "postmaster@solinum.org",
    senderEmail: "L'équipe Soliguide <postmaster@solinum.org>",
    subject: `Message sur le site : ${req.bodyValidated.subject}`,
    templateName: "2022-contact-form",
  };

  try {
    req.log.info(`EMAIL CONTACT SENT TO: ${contactEmail}`);
    const result = await mgSendTemplateEmail(info, req.log);

    PosthogClient.instance.capture({
      event: TRACKED_EVENTS.API_SEND_CONTACT_EMAIL,
      req,
      properties: {
        emailData: info,
        success: typeof result === "object",
      },
    });

    return res.status(200).json({ message: "EMAIL_CONTACT_SENT" });
  } catch (e) {
    req.log.error(e, "SEND_EMAIL_CONTACT_FAILED");
    return res.status(500).json({ message: "SEND_EMAIL_CONTACT_FAILED" });
  }
};
