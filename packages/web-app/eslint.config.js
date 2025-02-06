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
import js from '@eslint/js';
import svelte from 'eslint-plugin-svelte';
import prettier from 'eslint-config-prettier';
import globals from 'globals';
import fp from 'eslint-plugin-fp';

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  js.configs.all,
  ...svelte.configs['flat/recommended'],
  prettier,
  ...svelte.configs['flat/prettier'],
  {
    plugins: { fp },
    rules: {
      'no-inline-comments': 'off', // we need to add inline @type delarations
      'sort-imports': 'off', //
      'sort-keys': 'off', // sort keys in objects
      'no-console': 'off', //
      'one-var': 'off', // Force to merge variables declarations in one statement
      'no-ternary': 'off', // forbid ternary operators
      'no-magic-numbers': 'off', // Don't check for now, but
      'capitalized-comments': 'off', // First letter uppercase in comments
      'max-statements': 'off', // Maximum number of statements in function, default = 10
      'max-lines-per-function': 'off', // no // default limit = 50
      'max-lines': 'off', // default limit = 300
      'arrow-body-style': 'off', // Force shorthand syntax in arrow functions : (a) => ({ data: a })
      'init-declarations': 'off', // Need this because of svelte prop syntax (export let toto;)
      'no-implicit-coercion': ['error', { boolean: false }], // We keep using `!!a` for booleans
      // fp
      // https://github.com/jfmengels/eslint-plugin-fp/tree/master/docs/rules
      'fp/no-arguments': 'error', // do not use arguments object
      'fp/no-class': 'error', // do not use classes
      'fp/no-delete': 'error', // do not delete object properties
      'fp/no-events': 'error', // do not use EventEmitter of 'events' module
      'fp/no-get-set': 'error', //do not use  get/set in objects (mutations)
      'fp/no-let': 'error', // Don't use let
      'fp/no-loops': 'error', // No for/while loops, use functional map/filter/reduce/etc
      'fp/no-mutating-assign': 'error', // no Object.assign() with variable as first arg
      'fp/no-mutating-methods': 'error', // do not use these mutating methods : copyWithin, pop, push, reverse, shift, sort, splice, unshift
      'fp/no-mutation': 'error', // Make exceptions for test files (we reset in beaforeEach functions)
      // 'fp/no-nil': 'error',
      'fp/no-proxy': 'error', // Do not use Proxys
      'fp/no-rest-parameters': 'error',
      'fp/no-this': 'error', //
      // 'fp/no-throw': 'error', // Sometimes we need to
      // 'fp/no-unused-expression': 'error',
      'fp/no-valueof-field': 'error', // Do not use valueOf
      'no-var': 'error' // only use const, let
    }
  },
  {
    // + Allow mutations in test files
    files: ['**/*.svelte', '**/*.spec.js'],
    rules: {
      'fp/no-mutation': 'off', // Need mutations for reactive variables
      'fp/no-let': 'off' // Need let variables for props
    }
  },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      }
    }
  },
  {
    ignores: ['build/', '.svelte-kit/', 'dist/', 'coverage/']
  }
];
