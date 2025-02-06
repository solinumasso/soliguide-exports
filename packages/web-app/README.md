<!--
Soliguide: Useful information for those who need it

SPDX-FileCopyrightText: © 2024 Solinum

SPDX-License-Identifier: AGPL-3.0-only

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as published
by the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.
-->

# Web-app

This project was generated with [`create-svelte`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte).

This app is the new frontend _(wip)_ for Soliguide.

## Installation and development server

Once you've cloned the repository and installed dependencies with `yarn`, start a development server:

```bash
# Then navigate to `http://localhost:5173`.
yarn dev

# or start the server and open the app in a new browser tab
yarn dev -- --open
```

The app live reloads as sources change.

You can use `yarn watch` as an alias.

## Build and preview

To create a production version of the app:

```bash
yarn build
```

You can preview the production build locally with `yarn preview`.

To create a production version and run it locally with `yarn start`.

## Test

You can run integration tests (using Playwright) with `yarn test:integration`.

You can run unit tests (using vitest) with `yarn test:unit`.

Both tests are run when using `yarn test`.

_Note: Unit tests run in watch mode when launched locally. This feature is disabled when running in the CI.
You can run unit tests without watch mode by issuing this command : `yarn vitest run`._

## Type checking

This app is written in JavaScript but uses Typescript as a type-checker. Types are declared in JSDoc.

To check type-safety throughout the app, run `yarn check` or `yarn check:watch` to have it in watch-mode.
