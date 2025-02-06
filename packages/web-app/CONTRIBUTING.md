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

# Contributing to Web-app

Make sure you are familiar with the information contained in the parent `CONTRIBUTING.md` file located at the root folder of the Soliguide project.

This file presents how the web-app is structured and provides guidelines to the contributors.

## Folder structure

See https://kit.svelte.dev/docs/project-structure for general info.

```
// Root folders and files
src
├── lib       // utilities and components
├── routes
├── styles    // global scss styles
└── app.html
```

`static` folder is outside src, it contains static assets used in index.html

```
// Lib folder
lib
├── components      // reused components
├── images
├── js              // js utilities for frontend
├── server          // js files for server-side only
└── components
```

## Architecture

The app architecture is meant to be easy to reason with. The main rules are:

- have the needed code as close as where it is used
- when a component or a file is reused, it is hoisted at the level immediately visible by its consumers
- When a component or a file is not reused, it is nested

This organization ensures that a subtree can be moved with no excessive refactoring needed.

Separate business logic and UI as much as possible to ease testability

Utilities: `util` namespace is not allowed. Prefer small topic-oriented namespaces, i.e `mail`, `date`, `text`, `media`
