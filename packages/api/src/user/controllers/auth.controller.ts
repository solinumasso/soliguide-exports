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
import bcrypt from "bcryptjs";

import jwt from "jsonwebtoken";

import { getUserForLogin } from "../services/users.service";
import { sendUserForAuth } from "../utils/sendUserForAuth";

import { CONFIG } from "../../_models/config/constants/CONFIG.const";
import mongoose from "mongoose";
import { UserForAuth } from "@soliguide/common";

export const getToken = (userId: string | mongoose.Types.ObjectId): string => {
  return jwt.sign({ _id: userId }, CONFIG.JWT_SECRET, {
    expiresIn: "60 days",
  });
};

export const login = async (loginInfos: {
  mail: string;
  password: string;
}): Promise<{ token: string; user: UserForAuth }> => {
  const user = await getUserForLogin(loginInfos.mail);

  if (!user) {
    throw new Error("INVALID_PASSWORD");
  }

  const isPasswordCorrect = await bcrypt.compare(
    loginInfos.password,
    user.password
  );

  if (!isPasswordCorrect) {
    throw new Error("INVALID_PASSWORD");
  }
  return { token: getToken(user._id), user: sendUserForAuth(user) };
};
