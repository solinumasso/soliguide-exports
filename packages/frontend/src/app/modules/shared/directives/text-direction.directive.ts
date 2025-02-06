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
import { Directive, ElementRef, OnDestroy } from "@angular/core";
import { CurrentLanguageService } from "../../general/services/current-language.service";
import { LanguageDirection } from "../../translations/enums";
import { Subscription } from "rxjs";

@Directive({
  selector: "[appTextDirection]",
})
export class TextDirectionDirective implements OnDestroy {
  private readonly subscription: Subscription = new Subscription();

  constructor(
    public el: ElementRef,
    private readonly currentLanguageService: CurrentLanguageService
  ) {
    this.subscription.add(
      this.currentLanguageService.subscribe(() => {
        this.el.nativeElement.dir =
          this.currentLanguageService.direction || LanguageDirection.LTR;
      })
    );
  }

  public ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
