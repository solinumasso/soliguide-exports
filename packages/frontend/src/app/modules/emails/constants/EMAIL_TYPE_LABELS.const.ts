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
import { CampaignEmailType } from "../types/CampaignEmailType.type";

export const EMAIL_TYPE_LABELS: { [key in CampaignEmailType]?: string } = {
  CAMPAGNE_COMPTES_PRO:
    "Utilisateurs qui ont un compte pro administrateur ou éditeur",
  CAMPAGNE_INVITATIONS:
    "Utilisateurs qui ont reçu une invitation pour leur compte pro, mais qui ne se sont jamais inscrits depuis",
  RELANCE_CAMPAGNE_COMPTES_PRO:
    "Utilisateurs qui ont un compte, n'ont pas indiqué de date de rappel et n'ont pas communiqué de mise à jour manuellement ou n'ont pas réalisé leur mise à jour sur le formulaire",
  RELANCE_CAMPAGNE_INVITATIONS:
    "Utilisateurs qui ont reçu une invitation, mais ne se sont toujours pas inscrits et n'ont toujours pas communiqué de mise à jour manuellement",
  RELANCE_TERMINER_MAJ:
    "Utilisateurs qui ont un compte et qui ont commencé leur mise à jour sans la finir",
};
