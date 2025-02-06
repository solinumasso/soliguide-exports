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
ARG BASE_IMAGE=soliguide/base:local

# skipcq: DOK-DL3006
FROM ${BASE_IMAGE} AS build

COPY ./packages/common/tsconfig.build.esm.json \
  ./packages/common/tsconfig.build.json \
  ./packages/common/tsconfig.json \
  /app/packages/common/
COPY ./packages/common/src /app/packages/common/src

RUN yarn workspace @soliguide/common build

# Image for format, lint and test
FROM build AS test

COPY \
  ./packages/common/.eslintignore \
  ./packages/common/.eslintrc.json \
  ./packages/common/.prettierignore \
  ./packages/common/jest-setup.ts \
  ./packages/common/jest.config.ts \
  ./packages/common/tsconfig.spec.json \
  /app/packages/common/