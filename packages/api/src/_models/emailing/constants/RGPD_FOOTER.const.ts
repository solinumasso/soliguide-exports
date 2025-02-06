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
import { CONFIG } from "../../config";

const rgpdEmail = CONFIG.RGPD_EMAIL;

export const RGPD_FOOTER = `<p style="color: #6B6B6B"><i>Vous recevez ce message car vous êtes utilisateur de notre service. Vous pouvez demander l'accès, la rectification, la limitation, la portabilité ainsi que le droit à l'effacement de vos données personnelles à l'adresse <a target="_blank" rel="noopener noreferrer" href="mailto:${rgpdEmail}"><strong>${rgpdEmail}</strong></a>. Pour plus d'informations sur la manière dont vos données sont collectées, consultez notre Politique de confidentialité sur la plateforme Soliguide.</i></p>
<p style="color: #6B6B6B"><i>You are receiving this message because you are a user of our service. You can request access, rectification, limitation, portability as well as the right to erasure of your personal data at <a target="_blank" rel="noopener noreferrer" href="mailto:${rgpdEmail}"><strong>${rgpdEmail}</strong></a>. For more information on how your data is collected, please read our Privacy Policy on the Soliguide platform.</i></p>`;
