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
import { CountryCodes } from "@soliguide/common";

export const STEP_INFOS_OK = {
  description:
    "<p>Sed vitae tincidunt arcu. Mauris mauris ex, blandit sit amet dolor ac, maximus fermentum est. Aliquam quis ligula mauris. Sed pretium porta faucibus. Etiam eros orci, malesuada eget pretium sodales, imperdiet in turpis. Nullam auctor aliquet eros, eu feugiat mauris fringilla sed. Maecenas viverra convallis leo ac dictum. Integer ut felis justo. Praesent erat augue, posuere</p><p>&nbsp;non ligula eget, euismod rhoncus nunc. Pellentesque justo justo, sodales eu odio sit amet, blandit tempus lacus. Aliquam eget dapibus lectus. Sed id leo sed massa egestas ultricies et vitae lacus. Mauris euismod nibh id felis molestie, a vestibulum elit gravida. Ut elit magna, fringilla ac velit faucibus, tristique vestibulum ligula. Phasellus dignissim tempor semper. Ut ac ante erat.</p>",
  entity: {
    facebook: "",
    fax: "",
    mail: "exemple@mail.com",
    phones: [
      {
        label: "Numéro de tel 1",
        phoneNumber: "0101010101",
        countryCode: CountryCodes.FR,
        isSpecialPhoneNumber: false,
      },
      {
        label: "Numéro de tel 2",
        phoneNumber: "0606060606",
        countryCode: CountryCodes.FR,
        isSpecialPhoneNumber: false,
      },
    ],
    website: "https://siteinternet.fr",
  },
  country: CountryCodes.FR,
  lieu_id: null,
  name: "[TEST] Seconde structure de test",
};

export const STEP_INFOS_FAIL = {
  description: "<p>TESTTESTTESTTESTTESTTEST</p>",
  entity: {
    facebook: "",
    fax: "",
    mail: "",
    phones: [{ label: null, phoneNumber: null, isSpecialPhoneNumber: false }],
    website: "",
  },
  lieu_id: null,
  name: undefined,
};

export const PATCH_STEP_INFOS_OK = {
  description: "<p>New description</p> ",
  entity: {
    facebook: "",
    fax: "",
    mail: "",
    phones: [
      {
        label: "Marcel",
        phoneNumber: "0606060606",
        countryCode: CountryCodes.FR,
        isSpecialPhoneNumber: false,
      },
    ],
    website: "",
  },
  lieu_id: null,
  name: "Une structure modifiée",
  country: CountryCodes.FR,
};

export const PATCH_STEP_INFOS_UPDATE_OK = {
  description: "<p>New description episode 2</p> ",
  entity: {
    facebook: "",
    fax: "",
    mail: "",
    phones: [
      {
        label: "Jean-Bertrand",
        phoneNumber: "0606060606",
        countryCode: CountryCodes.FR,
        isSpecialPhoneNumber: false,
      },
    ],
    website: "",
  },
  country: CountryCodes.FR,
  lieu_id: null,
  name: "Deux structure modifiée",
};
