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
import { PostHog } from "posthog-node";

import { CONFIG } from "../../_models/config";
import type { ExpressRequest } from "../../_models";
import { UNKNOWN_DISTINCT_ID, UNKNOWN_SESSION_ID } from "../constants";

export interface PosthogEventMessage {
  event: string;
  req?: ExpressRequest;
  properties?: Record<string | number, any>; // skipcq: JS-0323
}

export class PosthogClient {
  static #instance: PosthogClient | null = null;
  private readonly posthog: PostHog | null;

  constructor() {
    this.posthog = CONFIG.SOLIGUIDE_POSTHOG_API_KEY
      ? new PostHog(CONFIG.SOLIGUIDE_POSTHOG_API_KEY, {
          host: CONFIG.SOLIGUIDE_POSTHOG_URL,
        })
      : null;
  }

  public static get instance(): PosthogClient {
    if (PosthogClient.#instance === null) {
      PosthogClient.#instance = new PosthogClient();
    }
    return PosthogClient.#instance;
  }

  public static getDistinctIdAndSessionIdFromRequest(req?: ExpressRequest): {
    distinctId: string;
    sessionId: string;
  } {
    const posthogUserDistinctIdHeaderValue = req?.get("X-Ph-User-Distinct-Id");
    const posthogSessionIdHeaderValue = req?.get("X-Ph-User-Session-Id");

    const distinctId =
      posthogUserDistinctIdHeaderValue != null
        ? posthogUserDistinctIdHeaderValue
        : String(req?.userForLogs?.user_id ?? UNKNOWN_DISTINCT_ID);

    const sessionId =
      posthogSessionIdHeaderValue != null
        ? posthogSessionIdHeaderValue
        : UNKNOWN_SESSION_ID;

    return { distinctId, sessionId };
  }

  public capture({ event, req, properties }: PosthogEventMessage): void {
    if (this.posthog !== null) {
      const { distinctId, sessionId } =
        PosthogClient.getDistinctIdAndSessionIdFromRequest(req);
      this.posthog.capture({
        distinctId,
        event,
        properties: {
          ...properties,
          sessionId,
        },
      });
    }
  }
}
