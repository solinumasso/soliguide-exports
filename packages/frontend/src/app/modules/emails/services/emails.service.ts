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
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { SearchEmail } from "../interfaces";
import { Email, EmailTemplates, SearchEmailResults } from "../types";

import { environment } from "../../../../environments/environment";

const EP_EMAIL_TEMPLATES = `${environment.apiUrl}email-templates/`;
const EP_EMAILS = `${environment.apiUrl}emailing/`;

@Injectable({
  providedIn: "root",
})
export class EmailsService {
  constructor(public http: HttpClient) {}

  public launchEmailSearch(
    search: SearchEmail
  ): Observable<SearchEmailResults> {
    return this.http
      .post<SearchEmailResults>(`${EP_EMAILS}search`, search)
      .pipe(
        map((response: SearchEmailResults) => {
          //
          if (!response.nbResults) {
            return { nbResults: 0, emails: [] };
          }
          //
          if (response.nbResults > 0) {
            response.emails = response.emails as Email[];
          }
          return response;
        })
      );
  }

  public getAllTemplates(): Observable<EmailTemplates[]> {
    return this.http.get(`${EP_EMAIL_TEMPLATES}`).pipe(
      map((response) => {
        return response as EmailTemplates[];
      })
    );
  }

  public getMyTemplates(territory: string): Observable<EmailTemplates> {
    return this.http.get(`${EP_EMAIL_TEMPLATES}${territory}`).pipe(
      map((response) => {
        return response as EmailTemplates;
      })
    );
  }

  public patchMyTemplates(
    emailTemplate: EmailTemplates,
    _id: string
  ): Observable<EmailTemplates> {
    return this.http.patch(`${EP_EMAIL_TEMPLATES}${_id}`, emailTemplate).pipe(
      map((response) => {
        return response as EmailTemplates;
      })
    );
  }

  public getEmail(_id: string): Observable<Email> {
    return this.http.get<Email>(`${EP_EMAILS}${_id}`).pipe(
      map((response) => {
        return response;
      })
    );
  }
}
