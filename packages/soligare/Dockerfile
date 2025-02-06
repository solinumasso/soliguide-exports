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
  COMMON_IMAGE=soliguide/common:local-build

# skipcq: DOK-DL3006
FROM ${COMMON_IMAGE} AS build

COPY \
  ./packages/soligare/nest-cli.json \
  ./packages/soligare/tsconfig.build.json \
  ./packages/soligare/tsconfig.json \
  /app/packages/soligare/
COPY ./packages/soligare/src /app/packages/soligare/src

RUN yarn workspace @soliguide/soligare build

# Image for format, lint and test
FROM build AS test

COPY \
  ./packages/soligare/.eslintrc.js \
  ./packages/soligare/.prettierignore \
  ./packages/soligare/.prettierrc \
  /app/packages/soligare/
COPY ./packages/soligare/test /app/packages/soligare/test

# skipcq: DOK-DL3006
FROM ${BASE_IMAGE} AS deploy

RUN <<EOF
set -e
yarn workspaces focus @soliguide/soligare --production
yarn cache clean
EOF

COPY --from=build /app/packages/common/dist /app/packages/common/dist
COPY --from=build /app/packages/soligare/dist /app/packages/soligare/dist

WORKDIR /app/packages/soligare
USER node

CMD ["node", "dist/main"]
