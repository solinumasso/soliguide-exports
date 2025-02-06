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
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, forkJoin } from "rxjs";
import { map, mergeMap } from "rxjs/operators";
import { PosthogConfig } from "./posthog-config";
import { PosthogService } from "./posthog.service";

@Injectable()
export class PosthogAddUserIdHeadersInterceptor implements HttpInterceptor {
  constructor(
    private readonly posthogConfig: PosthogConfig,
    private readonly posthogService: PosthogService
  ) {}

  public intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (
      !this.posthogService.enabled ||
      !req.url.startsWith(this.posthogConfig.soliguideApiUrl)
    ) {
      return next.handle(req);
    }

    return forkJoin({
      userSessionId: this.posthogService.getUserSessionId(),
      userDistinctId: this.posthogService.getUserDistinctId(),
    }).pipe(
      map(({ userSessionId, userDistinctId }) => {
        let headers = req.headers;
        if (userSessionId) {
          headers = headers.append("X-Ph-User-Session-Id", userSessionId);
        }
        if (userDistinctId) {
          headers = headers.append("X-Ph-User-Distinct-Id", userDistinctId);
        }
        return req.clone({ headers });
      }),
      mergeMap((request) => next.handle(request))
    );
  }
}
