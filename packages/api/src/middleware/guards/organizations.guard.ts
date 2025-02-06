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
import type { NextFunction } from "express";
import mongoose from "mongoose";

import { UserRole, UserRightStatus } from "@soliguide/common";

import type { ExpressRequest, ExpressResponse } from "../../_models";
import { hasAdminAccessToOrga } from "../../_utils";
import { countUserRights } from "../../user/services";
import { getOrganizationByParams } from "../../organization/services";

/**
 * @summary Checks an organization access and edit rights
 * @param {*} req   req.organization + req.user taken from the previous middleware
 * @param res
 * @param next
 */
export const canEditOrga = async (
  req: ExpressRequest,
  res: ExpressResponse,
  next: NextFunction
) => {
  if (!req.user?.isLogged() || !req.organization) {
    return res.status(403).send({ message: "FORBIDDEN_USER" });
  }

  // Soliguide or territory administrator
  if (hasAdminAccessToOrga(req.user, req.organization)) {
    next();
  } else {
    const userRightsCount = await countUserRights({
      organization: req.organization._id,
      role: UserRole.OWNER,
      status: UserRightStatus.VERIFIED,
      user: req.user._id,
    });

    if (userRightsCount === 0) {
      return res.status(403).send({ message: "FORBIDDEN_USER" });
    }
    next();
  }
};

export const canGetOrga = async (
  req: ExpressRequest,
  res: ExpressResponse,
  next: NextFunction
) => {
  if (!req.user.isLogged() || !req.organization) {
    return res.status(403).send({ message: "FORBIDDEN_USER" });
  }

  if (hasAdminAccessToOrga(req.user, req.organization)) {
    next();
  } else {
    const userRights = await countUserRights({
      organization: req.organization._id,
      status: UserRightStatus.VERIFIED,
      user: req.user._id,
    });

    if (userRights === 0) {
      return res.status(403).send({ message: "FORBIDDEN_USER" });
    }
    next();
  }
};

// Checks the presence of a place and add it to req
export const getOrgaFromUrl = async (
  req: ExpressRequest,
  res: ExpressResponse,
  next: NextFunction
) => {
  if (
    req.params.orgaObjectId == null || // null or undefined
    req.params.orgaObjectId === "null"
  ) {
    return res.status(400).send({ message: "BAD_ORGA_ID" });
  }

  try {
    const params = mongoose.Types.ObjectId.isValid(req.params.orgaObjectId)
      ? {
          _id: req.params.orgaObjectId,
        }
      : !isNaN(parseInt(req.params.orgaObjectId, 10))
      ? { organization_id: parseInt(req.params.orgaObjectId, 10) }
      : null;

    if (!params) {
      return res.status(400).send({ message: "BAD_ORGA_ID" });
    }

    const organization = await getOrganizationByParams(params);

    if (
      organization != null // !null and !undefined
    ) {
      req.organization = organization;
      next();
    } else {
      return res.status(400).send({ message: "ORGA_DOES_NOT_EXIST" });
    }
  } catch (e) {
    req.log.error(e);
    return res.status(400).send({ message: "ORGA_DOES_NOT_EXIST" });
  }
};

// Checks the presence of a place and add it to req
export const getOrgaFromBody = async (
  req: ExpressRequest,
  res: ExpressResponse,
  next: NextFunction
) => {
  const organizationId = req.body.organization;

  if (!organizationId) {
    return res.status(400).send({ message: "BAD_ORGA_ID" });
  }

  try {
    const params = mongoose.Types.ObjectId.isValid(organizationId)
      ? {
          _id: organizationId,
        }
      : !isNaN(parseInt(organizationId, 10))
      ? { organization_id: parseInt(organizationId, 10) }
      : null;

    if (!params) {
      return res.status(400).send({ message: "BAD_ORGA_ID" });
    }

    const organization = await getOrganizationByParams(params);

    if (
      organization != null // !null and !undefined
    ) {
      req.organization = organization;
      return next();
    }
    return res.status(400).send({ message: "ORGA_DOES_NOT_EXIST" });
  } catch (e) {
    req.log.error(e);
    return res.status(400).send({ message: "ORGA_DOES_NOT_EXIST" });
  }
};
