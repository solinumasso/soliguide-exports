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
module.exports = {
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', '@darraghor/nestjs-typed'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@darraghor/nestjs-typed/recommended',
    'prettier',
  ],
  rules: {
    '@darraghor/nestjs-typed/api-method-should-specify-api-response': 'off',
    '@darraghor/nestjs-typed/controllers-should-supply-api-tags': 'off',
    '@darraghor/nestjs-typed/validated-non-primitive-property-needs-type-decorator':
      'off',
    '@darraghor/nestjs-typed/injectable-should-be-provided': [
      'error',
      {
        src: ['src/**/*.ts', 'test/**/*.ts'],
        filterFromPaths: ['node_modules', '.mock.', '.test.', '.spec.'],
      },
    ],
  },
};
