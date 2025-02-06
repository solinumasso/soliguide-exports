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
import { Directive, HostListener, ElementRef, Input } from "@angular/core";

@Directive({
  selector: "[appCleanStr]",
})
export class CleanStrDirective {
  public inputElement: HTMLInputElement;

  private readonly rules: { [key in "share" | "alphanumeric"]: RegExp } = {
    share:
      /[^a-zÀÁÂÃÄÅàáâãäåÒÓÔÕÕÖØòóôõöøÈÉÊËèéêëðÇçÐÌÍÎÏìíîïÙÚÛÜùúûüÑñŠšŸÿýŽž\d \\'\\-\\/\\:\\+!]/gi,

    alphanumeric:
      /[^a-zÀÁÂÃÄÅàáâãäåÒÓÔÕÕÖØòóôõöøÈÉÊËèéêëðÇçÐÌÍÎÏìíîïÙÚÛÜùúûüÑñŠšŸÿýŽž\d \\'\\-]/gi,
  };

  @Input() appCleanStr: "share" | "alphanumeric";

  constructor(public el: ElementRef) {
    this.inputElement = el.nativeElement;
  }

  @HostListener("keypress", ["$event"])
  public onKeyPress(event: KeyboardEvent) {
    const currentValue: string = event.key;

    const sanitizedValue: string = this.sanitizeInput(currentValue);
    if (currentValue !== sanitizedValue) {
      event.preventDefault();
    }
  }

  @HostListener("paste", ["$event"])
  public onPaste(event: ClipboardEvent) {
    event.preventDefault();
    const sanitizedValue: string = event.clipboardData
      ? this.sanitizeInput(event.clipboardData.getData("text/plain"))
      : "";

    this.inputElement.value = sanitizedValue;
  }

  private sanitizeInput(str: string): string {
    return str.replace(this.rules[this.appCleanStr], "");
  }
}
