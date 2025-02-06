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
import apicache from "apicache";

import express from "express";

import * as StatsController from "../controllers/stats.controller";

import { CONFIG, ExpressRequest, ExpressResponse } from "../../_models";

const cache = apicache.middleware;

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Stats
 *   description: Statistics routes
 */

/**
 * @swagger
 *
 * /stats/services:
 *   get:
 *     description: Amount of services in Soliguide
 *     tags: [Stats]
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: count
 *     security:
 *      - bearerAuth: []
 */

router.get(
  "/services",
  CONFIG.ENV === "test" || CONFIG.ENV === "CI" ? [] : cache("24 hours"),
  async (_req: ExpressRequest, res: ExpressResponse) => {
    try {
      const stats = await StatsController.countAllServices();
      return res.status(200).json(stats);
    } catch (err) {
      return res.status(500).json({ message: "SERVICES_COUNT_ERROR" });
    }
  }
);

/**
 * @swagger
 *
 * /stats/all/:
 *   get:
 *     description: Amount of services in Soliguide
 *     tags: [Stats]
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: count
 */
router.get(
  "/all",
  CONFIG.ENV === "test" || CONFIG.ENV === "CI" ? [] : cache("24 hours"),
  async (_req: ExpressRequest, res: ExpressResponse) => {
    try {
      const stats = await StatsController.countAllPlaces();
      return res.status(200).json(stats);
    } catch (err) {
      return res.status(500).json({ message: "PLACES_COUNT_ERROR" });
    }
  }
);

export default router;
