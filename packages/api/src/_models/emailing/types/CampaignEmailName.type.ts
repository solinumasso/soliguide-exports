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
export enum CampaignEmailNameToSync {
  CAMPAGNE_COMPTES_PRO = "CAMPAGNE_COMPTES_PRO",
  CAMPAGNE_INVITATIONS = "CAMPAGNE_INVITATIONS",
  RELANCE_CAMPAGNE_COMPTES_PRO = "RELANCE_CAMPAGNE_COMPTES_PRO",
  RELANCE_CAMPAGNE_INVITATIONS = "RELANCE_CAMPAGNE_INVITATIONS",
  RELANCE_DESESPOIR_COMPTES_PRO = "RELANCE_DESESPOIR_COMPTES_PRO",
  RELANCE_DESESPOIR_INVITATIONS = "RELANCE_DESESPOIR_INVITATIONS",
  RELANCE_TERMINER_MAJ = "RELANCE_TERMINER_MAJ",
}

export enum CampaignEmailRemindMe {
  REMIND_ME = "REMIND_ME",
}

export type CampaignEmailName = CampaignEmailNameToSync | CampaignEmailRemindMe;
