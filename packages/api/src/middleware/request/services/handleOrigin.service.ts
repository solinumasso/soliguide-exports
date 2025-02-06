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
import { UserStatus } from "@soliguide/common";
import {
  ExpressRequest,
  SOLIGUIDE_HOSTNAME_REGEXP,
  Origin,
  CONFIG,
} from "../../../_models";

export const isMobileHeader = (req: ExpressRequest): boolean => {
  const userAgent = req.headers?.["user-agent"];
  return (
    !!userAgent?.startsWith("Soliguide Webview App") ||
    !!userAgent?.startsWith("Soliguide WebApp")
  );
};

export const isValidOrigin = (req: ExpressRequest): boolean => {
  // Apps mobiles
  if (isMobileHeader(req)) {
    return true;
  }

  if (req.user?.status === UserStatus.API_USER) {
    return true;
  }

  const requestOrigin = req.requestInformation.origin;

  if (!requestOrigin) {
    return false;
  }

  return !SOLIGUIDE_HOSTNAME_REGEXP.test(requestOrigin);
};

export const handleOrigin = (req: ExpressRequest): string | null => {
  const requestOrigin = req.get("origin") ?? null;
  return requestOrigin;
};

export const handleOriginForLogs = (
  req: ExpressRequest,
  origin: string | null
): Origin => {
  // Apps mobiles
  if (isMobileHeader(req)) {
    return Origin.MOBILE_APP;
  }

  if (req.user?.status === UserStatus.API_USER) {
    return Origin.API;
  }

  if (origin) {
    try {
      const originUrl = new URL(origin);
      const originHostname = originUrl.hostname;

      if (originHostname === "solinum.org") {
        return Origin.SOLINUM_ORG;
      }

      if (originHostname === new URL(CONFIG.WIDGET_URL).hostname) {
        return Origin.WIDGET_SOLIGUIDE;
      }

      if (
        originHostname === new URL(CONFIG.WEBAPP_FR_URL).hostname ||
        originHostname === new URL(CONFIG.WEBAPP_ES_URL).hostname ||
        originHostname === new URL(CONFIG.WEBAPP_CA_URL).hostname
      ) {
        return Origin.WEBAPP_SOLIGUIDE;
      }

      if (SOLIGUIDE_HOSTNAME_REGEXP.test(originHostname)) {
        return Origin.SOLIGUIDE;
      }

      if (CONFIG.ENV === "dev") {
        return Origin.LOCALHOST_DEV;
      }
      return Origin.ORIGIN_UNDEFINED;
    } catch (error) {
      req.log.warn(`Failed to parse orign URL ${origin}: ${error}`);
    }
  }
  return CONFIG.ENV === "test" ? Origin.LOCALHOST_DEV : Origin.ORIGIN_UNDEFINED;
};
