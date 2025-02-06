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

import type { SpinnerSize } from '$lib/types/Spinner';
import type { ButtonSize, ButtonType } from '$lib/types/Button';

// Avoid sticking to prop values
const sizeMapping: Record<ButtonSize, string> = {
  xsmall: 'btn-xsmall',
  small: 'btn-small',
  medium: 'btn-medium',
  large: 'btn-large'
};

const typeMapping: Record<ButtonType, string> = {
  primaryFill: 'btn-primary',
  primaryGradientFill: 'btn-primary-gradient',
  primaryOutline: 'btn-primary-outline', // Only for icon buttons
  neutralFill: 'btn-neutral',
  neutralOutlined: 'btn-neutral-outline',
  shy: 'btn-shy',
  reversed: 'btn-reversed'
};

const spinnerSizeMapping: Record<ButtonSize, SpinnerSize> = {
  xsmall: 'small',
  small: 'small',
  medium: 'medium',
  large: 'medium'
};

export { typeMapping, spinnerSizeMapping, sizeMapping };
