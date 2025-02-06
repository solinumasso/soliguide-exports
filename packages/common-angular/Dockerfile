# Soliguide: Useful information for those who need it
#
# SPDX-FileCopyrightText: © 2024 Solinum
#
# SPDX-License-Identifier: AGPL-3.0-only
#
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU Affero General Public License as published
# by the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU Affero General Public License for more details.
#
# You should have received a copy of the GNU Affero General Public License
# along with this program.  If not, see <https://www.gnu.org/licenses/>.
ARG COMMON_IMAGE=soliguide/common:local-build

# skipcq: DOK-DL3006
FROM ${COMMON_IMAGE} AS build

COPY ./packages/common-angular/angular.json \
  ./packages/common-angular/ng-package.json \
  ./packages/common-angular/tsconfig.json \
  ./packages/common-angular/tsconfig.lib.json \
  ./packages/common-angular/tsconfig.lib.prod.json \
  /app/packages/common-angular/
COPY ./packages/common-angular/src /app/packages/common-angular/src

RUN --mount=type=cache,target=/app/packages/common-angular/.angular/cache \
  yarn workspace @soliguide/common-angular build

# Image for format, lint and test
FROM build AS test

COPY \
  ./packages/common-angular/.editorconfig \
  ./packages/common-angular/.eslintrc.js \
  ./packages/common-angular/.prettierignore \
  ./packages/common-angular/jest.config.ts \
  ./packages/common-angular/setup-jest.ts \
  ./packages/common-angular/tsconfig.spec.json \
  /app/packages/common-angular/
