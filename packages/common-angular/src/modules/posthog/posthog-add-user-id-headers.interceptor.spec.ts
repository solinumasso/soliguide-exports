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
import { TestBed } from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { HTTP_INTERCEPTORS, HttpClient } from "@angular/common/http";
import { PosthogConfig } from "./posthog-config";
import { PosthogService } from "./posthog.service";
import { of } from "rxjs";
import { PosthogAddUserIdHeadersInterceptor } from "./posthog-add-user-id-headers.interceptor";

describe("PosthogAddUserIdHeadersInterceptor", () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: PosthogService,
          useValue: {
            enabled: true,
            getUserDistinctId: () => of("some-distinct-id"),
            getUserSessionId: () => of("some-session-id"),
          },
        },
        {
          provide: PosthogConfig,
          useValue: { soliguideApiUrl: "http://api.soliguide.fr" },
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: PosthogAddUserIdHeadersInterceptor,
          multi: true,
        },
      ],
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should add "X-Ph-User-Distinct-Id" and "X-Ph-User-Session-Id" headers when Posthog is enabled and URL matches', () => {
    httpClient.get("http://api.soliguide.fr/place/1").subscribe();
    const req = httpTestingController.expectOne(
      "http://api.soliguide.fr/place/1"
    );

    expect(req.request.headers.has("X-Ph-User-Distinct-Id")).toEqual(true);
    expect(req.request.headers.get("X-Ph-User-Distinct-Id")).toBe(
      "some-distinct-id"
    );

    expect(req.request.headers.has("X-Ph-User-Session-Id")).toEqual(true);
    expect(req.request.headers.get("X-Ph-User-Session-Id")).toBe(
      "some-session-id"
    );

    req.flush({});
  });

  it("should not add headers when Posthog is disabled", () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: PosthogService,
          useValue: {
            enabled: false,
            getUserDistinctId: () => of("some-distinct-id"),
            getUserSessionId: () => of("some-session-id"),
          },
        },
        {
          provide: PosthogConfig,
          useValue: { soliguideApiUrl: "http://api.soliguide.fr" },
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: PosthogAddUserIdHeadersInterceptor,
          multi: true,
        },
      ],
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);

    httpClient.get("http://api.soliguide.fr/place/1").subscribe();
    const req = httpTestingController.expectOne(
      "http://api.soliguide.fr/place/1"
    );

    expect(req.request.headers.has("X-Ph-User-Distinct-Id")).toEqual(false);
    expect(req.request.headers.has("X-Ph-User-Session-Id")).toEqual(false);

    req.flush({});
  });

  it("should not add headers when URL does not match", () => {
    httpClient.get("http://api.otherurl.com/place/1").subscribe();
    const req = httpTestingController.expectOne(
      "http://api.otherurl.com/place/1"
    );

    expect(req.request.headers.has("X-Ph-User-Distinct-Id")).toEqual(false);
    expect(req.request.headers.has("X-Ph-User-Session-Id")).toEqual(false);

    req.flush({});
  });
});
