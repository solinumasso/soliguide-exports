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
import { CampaignEmailType } from "../types";

export const EMAIL_TYPE_FOR_MANAGE: { [key in CampaignEmailType]: string } = {
  CAMPAGNE_COMPTES_PRO:
    "1er mail : Mettez à jour votre structure (comptes pro)",
  CAMPAGNE_INVITATIONS:
    "1er mail : Inscrivez-vous pour mettre à jour (invitations)",
  RELANCE_CAMPAGNE_COMPTES_PRO: "2e mail: Relance des comptes pro",
  RELANCE_CAMPAGNE_INVITATIONS: "2e mail: Relance des invitations non pourvues",
  RELANCE_DESESPOIR_COMPTES_PRO:
    "3e mail: Relance du désespoir des comptes pro",
  RELANCE_TERMINER_MAJ:
    "4e mail: Relance des comptes pro ayant commencé leur MÀJ, mais ne l'ayant pas terminée",
};
