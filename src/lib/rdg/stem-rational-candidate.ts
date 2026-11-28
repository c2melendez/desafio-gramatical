// Shared candidate only: do not register public navigation before RDG_READY.
import type { ReviewRoute } from "@/components/review/SharedReview";
import asset from "../../../qa/stem/rational-learning-candidate.json";
export const STEM_RATIONAL_REVIEW: ReviewRoute = asset.route;
