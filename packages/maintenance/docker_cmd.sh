#!/usr/bin/env sh
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

set -o errexit
set -o pipefail
set -o nounset

# Clever Cloud default variable
CC_REVERSE_PROXY_IPS="${CC_REVERSE_PROXY_IPS:-}"
# Take $TRUSTED_PROXIES or CC_REVERSE_PROXY_IPS if not set
TRUSTED_PROXIES="${TRUSTED_PROXIES:-$CC_REVERSE_PROXY_IPS}"

export TRUSTED_PROXIES=${TRUSTED_PROXIES//,/ }

# Show JSON configuration
caddy adapt --config /etc/caddy/Caddyfile

caddy run --config /etc/caddy/Caddyfile --adapter caddyfile
