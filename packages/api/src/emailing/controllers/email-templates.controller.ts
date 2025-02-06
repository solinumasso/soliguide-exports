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
import { CAMPAIGN_DEFAULT_NAME, AnyDepartmentCode } from "@soliguide/common";

import {
  findEmailTemplates,
  updatOneEmailTemplate,
} from "../services/email-templates.service";

import { CampaignEmailTemplatesContentForSearch } from "../../_models";

/**
 * @param   {string}     emailTemplateObjectId
 * @param   {Object}     emailTemplateDatas       Fields to update
 */
export const patchEmailTemplateAccount = async (
  emailTemplateObjectId: string,
  emailTemplateDatas: CampaignEmailTemplatesContentForSearch
) => {
  const toUpdate = {
    confirm: true,
    confirmDate: new Date(),
    "emails.CAMPAGNE_COMPTES_PRO.content":
      emailTemplateDatas.CAMPAGNE_COMPTES_PRO,
    "emails.CAMPAGNE_INVITATIONS.content":
      emailTemplateDatas.CAMPAGNE_INVITATIONS,
    "emails.RELANCE_CAMPAGNE_COMPTES_PRO.content":
      emailTemplateDatas.RELANCE_CAMPAGNE_COMPTES_PRO,
    "emails.RELANCE_CAMPAGNE_INVITATIONS.content":
      emailTemplateDatas.RELANCE_CAMPAGNE_INVITATIONS,
    "emails.RELANCE_DESESPOIR_COMPTES_PRO.content":
      emailTemplateDatas.RELANCE_DESESPOIR_COMPTES_PRO,
    "emails.RELANCE_DESESPOIR_INVITATIONS.content":
      emailTemplateDatas.RELANCE_DESESPOIR_INVITATIONS,
    "emails.RELANCE_TERMINER_MAJ.content":
      emailTemplateDatas.RELANCE_TERMINER_MAJ,
    senderEmail: emailTemplateDatas.senderEmail,
    senderName: emailTemplateDatas.senderName,
  };

  return await updatOneEmailTemplate({ _id: emailTemplateObjectId }, toUpdate);
};

/**
@summary Get the territory email templates
 * @param   {string}     territory
 */
export const getMyTemplates = async (territory: AnyDepartmentCode) => {
  return await findEmailTemplates({
    campaign: CAMPAIGN_DEFAULT_NAME,
    territory,
    partner: null,
  });
};

export const getAllTemplates = async () => {
  return await findEmailTemplates({
    campaign: CAMPAIGN_DEFAULT_NAME,
    partner: null,
  });
};
