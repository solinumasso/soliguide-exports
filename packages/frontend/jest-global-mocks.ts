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
/* eslint-disable max-classes-per-file */
Object.defineProperty(window, "CSS", { value: null });

Object.defineProperty(document, "doctype", {
  value: "<!DOCTYPE html>",
});

Object.defineProperty(window, "getComputedStyle", {
  value: () => {
    return {
      display: "none",
      appearance: ["-webkit-appearance"],
    };
  },
});
/**
 * ISSUE: https://github.com/angular/material2/issues/7101
 * Workaround for JSDOM missing transform property
 */
Object.defineProperty(document.body.style, "transform", {
  value: () => {
    return {
      enumerable: true,
      configurable: true,
    };
  },
});

Object.defineProperty(window, "ClipboardEvent", {
  value: class ClipboardEvent {},
});

Object.defineProperty(window, "DragEvent", {
  // eslint-disable-next-line max-classes-per-file
  value: class DragEvent {},
});

// eslint-disable-next-line no-empty, no-empty-function, @typescript-eslint/no-empty-function
const spyScrollTo = jest.fn();
Object.defineProperty(window, "scrollTo", { value: spyScrollTo });

const spyScroll = jest.fn();
Object.defineProperty(window, "scroll", { value: spyScroll });

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

Object.defineProperty(window, "CURRENT_DATA", {
  value: {
    THEME: "soliguide_fr",
  },
});
