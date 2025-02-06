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
import { Partners } from "../../../partners/enums/partners.enum";
import { PartnerCampaignEmailTemplatesContent } from "../types";
import { RGPD_FOOTER } from "./RGPD_FOOTER.const";

export const PARTNER_CAMPAIGN_EMAIL_TEMPLATE: PartnerCampaignEmailTemplatesContent =
  {
    [Partners.RESTOS]: {
      CAMPAGNE_COMPTES_PRO: {
        content: `<p>
          Comme vous le savez, les Restos du cœur déploient Soliguide sur l’ensemble des associations départementales et lieux d’accueil.
        </p>
        <p>
          Soliguide démarre sa campagne de mise à jour saisonnière et pourra contacter directement les associations départementales afin de les accompagner dans la démarche.
        </p>
        <p><strong>Voici comment vous pouvez contribuer :</strong><br>
        👉 Si vos informations sont à jour, que vous n’avez pas de changement (fermetures temporaires ou changement d’horaires) ou pas encore l’information, <a target="_blank" rel="noopener noreferrer" href="https://soliguide.fr/fr/campaign?utm_source=soliguide&utm_medium=$email&utm_campaign=%CAMPAIGN_NAME%&utm_term=%EMAIL_TYPE%&utm_content=no_changes&utm_user_ic=%USER_ID%"><strong><u>cliquez ici</u></strong></a><br>
        👉 Si vous avez un changement à faire sur l’une ou plusieurs de vos fiches, <a target="_blank" rel="noopener noreferrer" href="https://soliguide.fr/fr/campaign?utm_source=soliguide&utm_medium=$email&utm_campaign=%CAMPAIGN_NAME%&utm_term=%EMAIL_TYPE%&utm_content=changes&utm_user_ic=%USER_ID%"><strong><u>cliquez ici</u></strong></a>
        </p>
        <p><strong>Aide et Support</strong><br>
        💻 Pour vous aider à remplir le formulaire, on vous invite à notre prochain webinaire ! Pour s’inscrire, c’est par <strong><a target="_blank" rel="noopener noreferrer" href="https://zoom.us/webinar/register/7216898420109/WN_gn7lx7IsTneAkRo5DW2qtQ#/">ici</a></strong>.<br>
        💁 On vous partage toutes nos ressources et tutos <strong><a target="_blank" rel="noopener noreferrer" href="https://soliguide.fr/fr/aide">ici</a></strong>.</p>
        <p>Un grand merci pour votre coopération ; la qualité de l’information est essentielle !<br>
        %NOM_SOLIGUIDE%.<br>
        <i>Une question ? un problème ? écrivez-nous à <strong>%EMAIL_SOLIGUIDE%</strong></i></p>
        ${RGPD_FOOTER}`,
        subject: "😱 Etes-vous prêts pour la mise à jour Soliguide ?",
      },
      RELANCE_CAMPAGNE_COMPTES_PRO: {
        content: `<p>
        Comme vous le savez, les Restos du cœur déploient depuis plusieurs mois Soliguide sur l’ensemble des associations départementales et lieux d’accueil.
      </p>
      <p>
        <strong>N’oubliez pas de mettre à jour vos informations notamment les fermetures temporaires :</strong><br>
        👉 Si vos informations sont déjà à jour, que vous n’avez aucun changement ou pas encore l’information, <a target="_blank" rel="noopener noreferrer" href="https://soliguide.fr/fr/campaign?utm_source=soliguide&utm_medium=$email&utm_campaign=%CAMPAIGN_NAME%&utm_term=%EMAIL_TYPE%&utm_content=no_changes&utm_user_ic=%USER_ID%"><strong><u>cliquez ici</u></strong></a><br>
        👉 Si vous avez un changement à indiquer, <a target="_blank" rel="noopener noreferrer" href="https://soliguide.fr/fr/campaign?utm_source=soliguide&utm_medium=$email&utm_campaign=%CAMPAIGN_NAME%&utm_term=%EMAIL_TYPE%&utm_content=changes&utm_user_ic=%USER_ID%"><strong><u>cliquez ici</u></strong></a>
        </p>
        <p><strong>Aide et Support</strong><br>
        💻 Participez aussi à notre prochain webinaire spécial mise à jour. Pour s’inscrire, c’est par <strong><a target="_blank" rel="noopener noreferrer" href="https://zoom.us/webinar/register/7216898420109/WN_gn7lx7IsTneAkRo5DW2qtQ#/">ici</a></strong>.<br>
        💁 Pour vous aider à la prise en main de votre compte, on vous partage nos ressources et tutos <strong><a target="_blank" rel="noopener noreferrer" href="https://soliguide.fr/fr/aide">ici</a></strong>.</p>
      <p>Je reste bien entendu disponible si besoin,<br>
      À bientôt<br>
      %NOM_SOLIGUIDE%.<br>
      <i>Une question ? un problème ? écrivez-nous à %EMAIL_SOLIGUIDE%</i></p>
      ${RGPD_FOOTER}`,
        subject: "💪 Mettez à jour vos informations sur Soliguide",
      },
    },
  };

export const PARTNER_CC: Partial<Record<Partners, string>> = {
  [Partners.RESTOS]: "lactudupia@restosducoeur.org",
};
