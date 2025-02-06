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
import { CheckAndPrecisions, Checked } from "../interfaces";
import { CommonPlaceDocument } from "./CommonPlaceDocument.class";

export class Modalities {
  public inconditionnel: boolean;

  public appointment: CheckAndPrecisions;
  public inscription: CheckAndPrecisions;
  public orientation: CheckAndPrecisions;
  public price: {
    checked?: boolean;
    precisions: string | null;
  };

  public animal: Checked;
  public pmr: Checked;

  public docs: CommonPlaceDocument[];

  public other: string | null;

  constructor(modalities?: Partial<Modalities>) {
    this.inconditionnel = modalities?.inconditionnel ?? true;

    this.appointment = modalities?.appointment ?? {
      checked: false,
      precisions: null,
    };
    this.inscription = modalities?.inscription ?? {
      checked: false,
      precisions: null,
    };
    this.orientation = modalities?.orientation ?? {
      checked: false,
      precisions: null,
    };
    this.price = {
      ...modalities?.price,
      precisions: modalities?.price?.precisions ?? null,
    };

    this.animal = modalities?.animal ?? {};
    this.pmr = modalities?.pmr ?? {};

    this.docs = modalities?.docs?.length
      ? modalities.docs.map(
          (doc: CommonPlaceDocument) => new CommonPlaceDocument(doc)
        )
      : [];

    this.other = modalities?.other ?? null;
  }
}
