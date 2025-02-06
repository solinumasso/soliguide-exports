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
import { Component, Input, TemplateRef } from "@angular/core";

import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

import { Photo } from "../../../../models";
import { DEFAULT_MODAL_OPTIONS } from "../../../../shared";
import { PosthogComponent } from "../../../analytics/components/posthog.component";
import { PosthogService } from "../../../analytics/services/posthog.service";

@Component({
  selector: "app-display-photos",
  templateUrl: "./display-photos.component.html",
  styleUrls: ["./display-photos.component.scss"],
})
export class DisplayPhotosComponent extends PosthogComponent {
  @Input() public photos!: Photo[];
  @Input() public name!: string;
  @Input() public history!: boolean;

  public photoIndex: number;

  constructor(
    private readonly modalService: NgbModal,
    posthogService: PosthogService
  ) {
    super(posthogService, "display-photos");
    this.photoIndex = 0;
  }

  public openPhoto = (
    content: TemplateRef<HTMLElement>,
    index: number
  ): void => {
    this.captureEvent({
      name: "click-photo",
      properties: { photoIndex: index, photo: this.photos[index] },
    });
    this.photoIndex = index;
    this.modalService.open(content, { size: "lg", ...DEFAULT_MODAL_OPTIONS });
  };

  public closePhoto = () => {
    this.captureEvent({
      name: "click-close-photo-modal",
      properties: {
        lastPhotoIndex: this.photoIndex,
        lastPhoto: this.photos[this.photoIndex],
      },
    });
    this.modalService.dismissAll();
  };

  public captureCarouselEvent = (event) => {
    const previousIndex = parseInt(event.prev.replace("photo-", ""), 10);
    this.photoIndex = parseInt(event.current.replace("photo-", ""), 10);
    this.captureEvent({
      name: `click-carrousel-${
        event.source === "arrowLeft" ? "arrow-left" : "arrow-right"
      }`,
      properties: {
        previousIndex,
        currentIndex: this.photoIndex,
        previousPhoto: this.photos[previousIndex],
        currentPhoto: this.photos[this.photoIndex],
      },
    });
  };
}
