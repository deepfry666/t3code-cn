import type { PullRequestInvolvement, PullRequestListState } from "@t3tools/contracts";
import {
  CalendarArrowDownIcon,
  CalendarArrowUpIcon,
  ClockIcon,
  EyeIcon,
  LayersIcon,
  ListChecksIcon,
  Maximize2Icon,
  Minimize2Icon,
  PenLineIcon,
  UserLockIcon,
} from "lucide-react";

import type { PullRequestFilterOption } from "./PullRequestListFilters";
import type { PullRequestListSort } from "./pullRequestListPreferences";
import { PullRequestGlyph } from "./pullRequestIcons";

export const INVOLVEMENT_TABS = [
  { value: "all", label: "All", Icon: LayersIcon, translateLabel: true },
  { value: "reviewing", label: "Reviewing", Icon: EyeIcon, translateLabel: true },
  { value: "authored", label: "Authored", Icon: PenLineIcon, translateLabel: true },
] as const satisfies ReadonlyArray<PullRequestFilterOption<PullRequestInvolvement>>;

export const STATE_TABS = [
  { value: "all", label: "All", Icon: LayersIcon, translateLabel: true },
  { value: "open", label: "Open", Icon: PullRequestGlyph.pullRequest, translateLabel: true },
  { value: "closed", label: "Closed", Icon: PullRequestGlyph.closed, translateLabel: true },
  { value: "merged", label: "Merged", Icon: PullRequestGlyph.merged, translateLabel: true },
] as const satisfies ReadonlyArray<PullRequestFilterOption<PullRequestListState>>;

export const SORT_OPTIONS = [
  { value: "ready", label: "Merge readiness", Icon: ListChecksIcon, translateLabel: true },
  { value: "blocked", label: "Blocked on me", Icon: UserLockIcon, translateLabel: true },
  { value: "updated", label: "Recently updated", Icon: ClockIcon, translateLabel: true },
  { value: "newest", label: "Newest shown", Icon: CalendarArrowDownIcon, translateLabel: true },
  { value: "oldest", label: "Oldest shown", Icon: CalendarArrowUpIcon, translateLabel: true },
  { value: "largest", label: "Largest shown", Icon: Maximize2Icon, translateLabel: true },
  { value: "smallest", label: "Smallest shown", Icon: Minimize2Icon, translateLabel: true },
] as const satisfies ReadonlyArray<PullRequestFilterOption<PullRequestListSort>>;
