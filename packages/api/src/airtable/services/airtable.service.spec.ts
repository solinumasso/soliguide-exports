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
import { AIRTABLE_MODULE } from "../../../mocks/AIRTABLE_MODULE.mock";
import { AIRTABLE_MOCKS } from "../../../mocks/airtable";
import * as ERRORS_MOCK from "../../../mocks/airtable/ERROR.mock";

import { AirtableEntityType } from "../../_models/airtable/airtableEntity.type";

const mockBase = jest.fn(() => AIRTABLE_MODULE);

jest.mock("airtable", () => {
  return jest.fn(() => {
    return { base: mockBase };
  });
});

import * as AirtableService from "./airtable.service";

describe("Airtable service pour les utilisateurs", () => {
  describe("Création d'utilisateur", () => {
    it("doit retourner un succès si l'input est bon", async () => {
      await expect(
        AirtableService.createRecords(AirtableEntityType.USER, [
          AIRTABLE_MOCKS.USER.MOCK.CREATION.REQUEST_SUCCESS,
        ])
      ).resolves.toStrictEqual([
        AIRTABLE_MOCKS.USER.MOCK.CREATION.RESPONSE_SUCCESS[0].id,
      ]);
    });

    it("doit retourner un echec si un type n'est pas le bon", async () => {
      await expect(
        AirtableService.createRecords(AirtableEntityType.USER, [
          AIRTABLE_MOCKS.USER.MOCK.CREATION.REQUEST_FAILURE_WRONG_TYPE1,
        ])
      ).rejects.toThrowError(ERRORS_MOCK.RESPONSE_FAILURE_WRONG_TYPE);
    });

    it("doit retourner un echec si type dans un tableau n'est pas le bon", async () => {
      await expect(
        AirtableService.createRecords(AirtableEntityType.USER, [
          AIRTABLE_MOCKS.USER.MOCK.CREATION.REQUEST_FAILURE_WRONG_TYPE2,
        ])
      ).rejects.toThrowError(ERRORS_MOCK.RESPONSE_FAILURE_WRONG_TYPE);
    });

    it("doit retourner un echec si le nom de l'element n'est pas présent sur AT", async () => {
      await expect(
        AirtableService.createRecords(AirtableEntityType.USER, [
          AIRTABLE_MOCKS.USER.MOCK.CREATION
            .REQUEST_FAILURE_NON_EXISTING_ELEMENT,
        ])
      ).rejects.toThrowError(ERRORS_MOCK.RESPONSE_FAILURE_ELEMENT_NOT_EXISTS);
    });
  });

  describe("Mise à jour d'utilisateur", () => {
    it("doit retourner un succès si l'input est bon", async () => {
      const updateRecordSpy = jest.spyOn(AirtableService, "updateRecords");

      await AirtableService.updateRecords(AirtableEntityType.USER, [
        AIRTABLE_MOCKS.USER.MOCK.UPDATE.REQUEST_SUCCESS,
      ]);

      expect(updateRecordSpy).toHaveBeenCalled();
    });

    it("doit retourner un succès même avec des champs en moins", async () => {
      const updateRecordSpy = jest.spyOn(AirtableService, "updateRecords");

      await AirtableService.updateRecords(AirtableEntityType.USER, [
        AIRTABLE_MOCKS.USER.MOCK.UPDATE.REQUEST_SUCCESS_SHORT,
      ]);

      expect(updateRecordSpy).toHaveBeenCalled();
    });

    it("doit retourner un echec si un type n'est pas le bon", async () => {
      await expect(
        AirtableService.updateRecords(AirtableEntityType.USER, [
          AIRTABLE_MOCKS.USER.MOCK.UPDATE.REQUEST_FAILURE_WRONG_TYPE1,
        ])
      ).rejects.toThrowError(ERRORS_MOCK.RESPONSE_FAILURE_WRONG_TYPE);
    });

    it("doit retourner un echec si type dans un tableau n'est pas le bon", async () => {
      await expect(
        AirtableService.updateRecords(AirtableEntityType.USER, [
          AIRTABLE_MOCKS.USER.MOCK.UPDATE.REQUEST_FAILURE_WRONG_TYPE2,
        ])
      ).rejects.toThrowError(ERRORS_MOCK.RESPONSE_FAILURE_WRONG_TYPE);
    });

    it("doit retourner un echec si le nom de l'element n'est pas présent sur AT", async () => {
      await expect(
        AirtableService.updateRecords(AirtableEntityType.USER, [
          AIRTABLE_MOCKS.USER.MOCK.UPDATE.REQUEST_FAILURE_NON_EXISTING_ELEMENT,
        ])
      ).rejects.toThrowError(ERRORS_MOCK.RESPONSE_FAILURE_ELEMENT_NOT_EXISTS);
    });
  });
});
