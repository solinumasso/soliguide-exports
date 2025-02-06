<!--
Soliguide: Useful information for those who need it

SPDX-FileCopyrightText: © 2024 Solinum

SPDX-License-Identifier: AGPL-3.0-only

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as published
by the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.
-->

# Analytics

## Abstract

The main anlytics tool used in Soliguide is [PostHog](https://posthog.com/)

- [Docs](https://posthog.com/docs/libraries/node)
- [Tutorial](https://posthog.com/tutorials/node-express-analytics)
- [GitHub Milestone](https://github.com/solinumasso/soliguide/milestone/13)

## Structure

### Constants

You will find a map with the tracked events.
All trackers must be referenced in [this document](https://www.notion.so/solinum/03ed772ab8d94b719542df959ddd4a5b?v=2ef89d35ee844f7c865091c416b473f7)
We want to keep a history of different trackers, harmonize their names and avoid loss of data

### Types

For the moment a tracked event is basically an action + a feature.

### Services

Dead-simple PostHog class init.

### Deprecated logs

The logs recorded in the database are still used in the Solinum's dashboards.
Pending a migration to switch dashboards on Posthog data, we keep the logs in the data base.
