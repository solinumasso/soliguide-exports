#!/usr/bin/env bash
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
set -x

# Fails if domain name is not provided
DOMAIN_NAME="${DOMAIN_NAME}"
CELLAR_ADDON_HOST="${CELLAR_ADDON_HOST}"
CELLAR_ADDON_KEY_ID="${CELLAR_ADDON_KEY_ID}"
CELLAR_ADDON_KEY_SECRET="${CELLAR_ADDON_KEY_SECRET}"
DIR_TO_DEPLOY=$1

cat >/tmp/policy.json <<EOF
{
  "Id": "Policy1587216857769",
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "Stmt1587216727444",
      "Action": [
        "s3:GetObject"
      ],
      "Effect": "Allow",
      "Resource": "arn:aws:s3:::${DOMAIN_NAME}/*",
      "Principal": "*"
    }
  ]
}
EOF
trap "rm -f /tmp/policy.json" EXIT

BASE_CMD="s3cmd --host=$CELLAR_ADDON_HOST --host-bucket=${CELLAR_ADDON_HOST} --access_key=$CELLAR_ADDON_KEY_ID --secret_key=$CELLAR_ADDON_KEY_SECRET"

$BASE_CMD mb s3://"$DOMAIN_NAME"
$BASE_CMD setpolicy /tmp/policy.json s3://"$DOMAIN_NAME"
$BASE_CMD sync -r --delete-removed --delete-after "$DIR_TO_DEPLOY" s3://"$DOMAIN_NAME"/
