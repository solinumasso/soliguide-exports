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
// Doc: https://data.geopf.fr/geocodage/getCapabilities
export type PoiCategory =
  // administrative
  | "commune"
  | "epci"
  | "département"
  | "région"
  | "arrondissement municipal"
  //Transports
  | "transport"
  | "télécabine, téléphérique"
  | "transport par câble"
  | "aérodrome"
  | "héliport"
  | "altiport"
  | "parking"
  | "équipement de transport"
  | "aire de repos ou de service"
  | "gare voyageurs et fret"
  | "port"
  | "aire de triage"
  | "gare voyageurs uniquement"
  | "aérogare"
  | "arrêt voyageurs"
  | "gare téléphérique"
  | "station de métro"
  | "gare routière"
  | "station de tramway"
  | "gare fret uniquement"
  | "service dédié aux véhicules"
  | "câble transporteur"
  | "gare maritime"
  | "service dédié aux vélos"
  // residential areas
  | "zone d'habitation"
  | "château"
  | "lieu-dit habité"
  | "quartier"
  | "ruines"
  | "grange"
  | "moulin"
  | "habitat temporaire";
