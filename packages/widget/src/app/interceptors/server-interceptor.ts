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
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Injectable, Injector } from "@angular/core";

import { Observable, throwError, timer } from "rxjs";
import { catchError, retry } from "rxjs/operators";

import { ToastrService } from "ngx-toastr";

const MAX_RETRIES = 2;
const RETRY_DELAY = 1000;
const ERROR_STATUS_CODES_TO_RETRY = [0, 408, 409, 444, 502, 503, 504, 520];

@Injectable({
  providedIn: "root",
})
export class ServerErrorInterceptor implements HttpInterceptor {
  constructor(private readonly injector: Injector) {}

  public intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const toastr = this.injector.get(ToastrService);

    return next.handle(request).pipe(
      retry({
        count: MAX_RETRIES,
        delay: (error) => {
          return this.isRetryable(error)
            ? timer(RETRY_DELAY)
            : throwError(() => error);
        },
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.error instanceof ErrorEvent) {
          if (!navigator.onLine) {
            toastr.error(
              "Vous êtes actuellement hors-ligne. Veuillez vérifier votre connexion internet"
            );
            return throwError(() => "NAVIGATOR_OFFLINE");
          }
          return throwError(() => error.error);
        } else if (error instanceof HttpErrorResponse) {
          if (error.status === 0) {
            console.warn("Erreur de connexion:", error.message);
            toastr.error(
              "Problème de connexion au serveur. Veuillez réessayer plus tard."
            );
          } else if (error.status === 404) {
            toastr.error("La page que vous recherchez n'existe pas");
          } else {
            toastr.error(
              "Une erreur serveur est survenue. Nos équipes ont été notifiées."
            );
          }
        }
        this.logError(request, error);
        return throwError(() => error);
      })
    );
  }

  private isRetryable(error: HttpErrorResponse): boolean {
    return !error.status || ERROR_STATUS_CODES_TO_RETRY.includes(error.status);
  }

  private logError(request: HttpRequest<any>, error: HttpErrorResponse): void {
    console.error(error.message, {
      status: error.status,
      statusText: error.statusText,
      url: error.url,
      message: error.message,
      error: error.error,
      request,
    });
  }
}
