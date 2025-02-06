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
import { BehaviorSubject } from "rxjs";
import { TranslateModule } from "@ngx-translate/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";

import { User } from "../../../users/classes";
import { AuthService } from "../../../users/services/auth.service";
import { CookiesModalComponent } from "./cookies-modal.component";
import { USER_SOLIGUIDE_MOCK } from "../../../../../../mocks/USER_SOLIGUIDE.mock";

class MockAuthService {
  public currentUserSubject: BehaviorSubject<User | null>;

  constructor() {
    this.currentUserSubject = new BehaviorSubject<User | null>(
      USER_SOLIGUIDE_MOCK
    );
  }
  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }
}

describe("CookiesModalComponent", () => {
  let component: CookiesModalComponent;
  let fixture: ComponentFixture<CookiesModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CookiesModalComponent],
      imports: [TranslateModule.forRoot({})],

      providers: [{ provide: AuthService, useClass: MockAuthService }],
    }).compileComponents();

    fixture = TestBed.createComponent(CookiesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
