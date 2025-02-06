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
import { Directive, ElementRef, HostListener } from "@angular/core";

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: "[dateFr]",
})
export class DateFrDirective {
  public inputElement: HTMLElement;
  private navigationKeys = [
    "Backspace",
    "Delete",
    "Tab",
    "Escape",
    "Enter",
    "Home",
    "Space",
    "End",
    "ArrowLeft",
    "ArrowRight",
    "Clear",
    "Copy",
    "Paste",
  ];
  constructor(public el: ElementRef) {
    this.inputElement = el.nativeElement;
  }

  @HostListener("keydown", ["$event"])
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public onKeyDown(e: any): void {
    if (typeof e.target === "undefined") {
      return;
    }
    const dateValue = e.value;

    if (
      this.navigationKeys.indexOf(e.key) > -1 ||
      (e.key === "a" && e.ctrlKey === true) ||
      (e.key === "c" && e.ctrlKey === true) ||
      (e.key === "v" && e.ctrlKey === true) ||
      (e.key === "x" && e.ctrlKey === true) ||
      (e.key === "a" && e.metaKey === true) ||
      (e.key === "c" && e.metaKey === true) ||
      (e.key === "v" && e.metaKey === true) ||
      (e.key === "x" && e.metaKey === true)
    ) {
      return;
    }
    if ((isNaN(Number(e.key)) && e.key !== "/") || e.keyCode === 32) {
      e.preventDefault();
    }

    if (e.key === "/") {
      if (
        dateValue.substr(dateValue.length - 1) === "/" ||
        (dateValue.length !== 2 && dateValue.length !== 5)
      ) {
        e.preventDefault();
      }
    }
  }

  @HostListener("keyup", ["$event"])
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public onKeyUp(e: any) {
    const dateValue = e.target.value;
    if (e.key !== "Backspace") {
      if (dateValue.length === 2 || dateValue.length === 5) {
        e.target.value = dateValue + "/";
      }
    }
  }

  @HostListener("paste", ["$event"])
  public onPaste(event: ClipboardEvent) {
    event.preventDefault();
    const pastedInput: string = event.clipboardData
      .getData("text/plain")
      .replace(/[^0-9/-]+/g, "");
    this.inputElement.textContent += pastedInput;
  }

  @HostListener("drop", ["$event"])
  public onDrop(event: DragEvent) {
    event.preventDefault();
    const textData = event.dataTransfer
      .getData("text")
      .replace(/[^0-9/-]+/g, "");
    this.inputElement.focus();
    this.inputElement.textContent += textData;
  }
}
