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
import { TestBed, fakeAsync } from "@angular/core/testing";

import { DOCUMENT } from "@angular/common";

import { ChatService } from "./chat.service";

import { USER_PRO_MOCK } from "../../../../../mocks/USER_PRO.mock";
import { User } from "../../users/classes";
import { THEME_CONFIGURATION } from "../../../models";

describe("ChatService", () => {
  let service: ChatService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ChatService,
        { provide: DOCUMENT, useValue: global.document },
      ],
    });

    service = TestBed.inject(ChatService);
  });

  afterEach(() => {
    // Make sure to restore default settings
    THEME_CONFIGURATION.chatWebsiteId = undefined;
  });

  it("should be created", () => {
    service = TestBed.inject(ChatService);
    expect(service).toBeTruthy();
  });

  it("should not append script to head if Chat is not enabled", fakeAsync(() => {
    expect(service.isScriptLoaded()).toBeFalsy();
    service.loadScript();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const script: any = global.document.querySelector(
      `script[src='https://static.zdassets.com/ekr/snippet.js?key=${THEME_CONFIGURATION.chatWebsiteId}']`
    );
    expect(script).toBeFalsy();
  }));

  it("should append script to head if script is not already loaded", fakeAsync(() => {
    THEME_CONFIGURATION.chatWebsiteId = "xxx";
    expect(service.isScriptLoaded()).toBeFalsy();
    service.loadScript();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const script: any = global.document.querySelector(
      `script[src='https://static.zdassets.com/ekr/snippet.js?key=${THEME_CONFIGURATION.chatWebsiteId}']`
    );
    expect(script).toBeTruthy();
  }));

  it("should open chat for pro", () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).$zE = (element: string, action: string) => {
      console.log(`${action} on ${element}: done`);
    };

    const spyChatOpen = jest.spyOn(service, "openChat");
    service.openChat(new User(USER_PRO_MOCK));
    expect(spyChatOpen).toHaveBeenCalled();
  });
});
