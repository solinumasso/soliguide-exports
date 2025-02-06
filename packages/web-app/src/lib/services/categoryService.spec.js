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
import { beforeEach, describe, expect, it } from 'vitest';
import { Themes } from '@soliguide/common';
import { getCategoryService } from './categoryService.js';
import { fakeFetch } from '$lib/client';

const apiSuggestions = {
  categories: [
    {
      categoryId: 'hygiene_products',
      expressionId: null,
      label: 'HYGIENE_PRODUCTS',
      seo: 'produits-hygiene'
    },
    {
      categoryId: 'digital_tools_training',
      expressionId: null,
      label: 'DIGITAL_TOOLS_TRAINING',
      seo: 'formation-numerique'
    }
  ],
  terms: [
    {
      categoryId: null,
      expressionId: 'pmi',
      label: 'PMI - Protection maternelle et Infantile',
      seo: 'pmi-protection-maternelle-infantile'
    }
  ]
};
const apiSuggestionsWithSpecialists = {
  categories: [
    {
      categoryId: 'cardiology',
      expressionId: null,
      label: 'CARDIOLOGY',
      seo: 'cardiologie'
    },
    {
      categoryId: 'digital_tools_training',
      expressionId: null,
      label: 'DIGITAL_TOOLS_TRAINING',
      seo: 'formation-numerique'
    }
  ],
  terms: [
    {
      categoryId: null,
      expressionId: 'pmi',
      label: 'PMI - Protection maternelle et Infantile',
      seo: 'pmi-protection-maternelle-infantile'
    }
  ]
};

const builtSuggestions = ['hygiene_products', 'digital_tools_training'];
const builtSuggestionsWithoutSpecialists = ['digital_tools_training'];

describe('Category Service', () => {
  const { fetch, feedWith, setError } = fakeFetch();
  let service = getCategoryService(Themes.SOLIGUIDE_FR);

  beforeEach(() => {
    service = getCategoryService(
      Themes.SOLIGUIDE_FR,
      /** @type {import('$lib/client/transport.js').Fetcher} */ (fetch)
    );
    feedWith([]);
    setError(null);
  });

  describe('getCategorySuggestions', () => {
    it('I get category suggestions with a search term', async () => {
      feedWith(apiSuggestions);
      const result = await service.getCategorySuggestions('abc');
      expect(result).toEqual(builtSuggestions);
    });

    it('I get no category suggestion with an empty search term', async () => {
      feedWith(apiSuggestions);
      const result = await service.getCategorySuggestions('');
      expect(result).toEqual([]);
    });

    it('Returns nothing when search has a server error', () => {
      setError({ status: 500, statusText: 'Internal server error' });
      expect(() => service.getCategorySuggestions('bob')).rejects.toThrowError(
        'Internal server error'
      );
    });

    it('If the api result contains a specialist category, it is removed', async () => {
      feedWith(apiSuggestionsWithSpecialists);
      const result = await service.getCategorySuggestions('abc');
      expect(result).toEqual(builtSuggestionsWithoutSpecialists);
    });
  });
});
