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

ARG \
  BASE_IMAGE=soliguide/base:local-base \
  COMMON_IMAGE=soliguide/common:local-build \
  DESIGN_SYSTEM_IMAGE=soliguide/design-system:local-build

# skipcq: DOK-DL3006
FROM ${COMMON_IMAGE} AS common

# skipcq: DOK-DL3006
FROM ${DESIGN_SYSTEM_IMAGE} AS build

COPY --from=common /app/packages/common/dist /app/packages/common/dist

COPY \
  ./packages/web-app/tsconfig.json \
  ./packages/web-app/svelte.config.js \
  ./packages/web-app/vite.config.ts \
  ./packages/web-app/.gitignore \
  /app/packages/web-app/
COPY ./packages/web-app/static /app/packages/web-app/static
COPY ./packages/web-app/src /app/packages/web-app/src

RUN yarn workspace @soliguide/web-app build

# Image for format, lint and test
FROM build AS test

COPY \
  ./packages/web-app/.prettierignore \
  ./packages/web-app/.prettierrc \
  ./packages/web-app/eslint.config.js \
  ./packages/web-app/playwright.config.ts \
  ./packages/web-app/vitest.config.ts \
  /app/packages/web-app/
COPY ./packages/web-app/web-tests /app/packages/web-app/web-tests

# Install prerequisites of integration tests
RUN yarn workspace @soliguide/web-app playwright install --with-deps

# skipcq: DOK-DL3006
FROM ${BASE_IMAGE} AS deploy

COPY --from=build /app/packages/common/dist /app/packages/common/dist
COPY --from=build /app/packages/design-system/dist /app/packages/design-system/dist
COPY --from=build /app/packages/web-app/.svelte-kit /app/packages/web-app/.svelte-kit
COPY --from=build /app/packages/web-app/build /app/packages/web-app/build

RUN <<EOF
set -e
yarn workspaces focus @soliguide/web-app --production
yarn cache clean
EOF

WORKDIR /app/packages/web-app/
USER node

CMD ["node", "build"]
