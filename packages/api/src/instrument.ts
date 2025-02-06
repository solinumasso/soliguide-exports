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
import { CONFIG } from "./_models";
import {
  captureMessage,
  expressIntegration,
  httpIntegration,
  init,
  mongoIntegration,
  mongooseIntegration,
  nativeNodeFetchIntegration,
} from "@sentry/node";
import { nodeProfilingIntegration } from "@sentry/profiling-node";

if (CONFIG.SENTRY_DSN?.length) {
  init({
    dsn: CONFIG.SENTRY_DSN,
    environment: CONFIG.ENV,
    integrations: [
      httpIntegration(),
      mongoIntegration(),
      nativeNodeFetchIntegration(),
      expressIntegration(),
      mongooseIntegration(),
      nodeProfilingIntegration(),
    ],
    tracesSampleRate: 1.0,
    // Set sampling rate for profiling - this is relative to tracesSampleRate
    profilesSampleRate: 1.0,
    attachStacktrace: true,
  });

  captureMessage(
    `[INFO] ${CONFIG.CRON_ENABLED ? "[CRON]" : "[API]"} [${
      CONFIG.ENV
    }] API Restart - ${new Date()}`
  );
}
