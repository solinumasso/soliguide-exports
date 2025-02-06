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
import { SeoService } from "./../../../shared/services/seo.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-devenir-benevole",
  templateUrl: "./devenir-benevole.component.html",
  styleUrls: ["./devenir-benevole.component.css"],
})
export class DevenirBenevoleComponent implements OnInit {
  constructor(private seoService: SeoService) {}

  public ngOnInit(): void {
    const title = "Devenir bénévole de Solinum avec JeVeuxAider";
    const description =
      "JeVeuxAider.gouv.fr est la plateforme publique du bénévolat, proposée par la Réserve Civique";

    this.seoService.updateTitleAndTags(title, description, true);
  }
}
