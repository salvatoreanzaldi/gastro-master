export interface GoogleReview {
  id: string;
  author_name: string;
  author_url: string | null;
  profile_photo_url: string | null;
  rating: 1 | 2 | 3 | 4 | 5;
  relative_time_description: string;
  text: string;
  time: number;
}

/**
 * Structure of the synced google-reviews.json file
 */
export interface ReviewsData {
  availableTabs: string[];
  tabs: Record<string, GoogleReview[]>;
  meta: {
    syncedAt: string;
    totalRating: number;
    totalCount: number;
  };
}

/**
 * State returned by useGoogleReviews hook
 */
export interface ReviewsState {
  reviews: GoogleReview[];
  availableTabs: string[];
  totalRating: number;
  totalCount: number;
  isLoading: boolean;
  error: string | null;
}

/**
 * Filter type - now a string representing the sheet tab name
 * Examples: "Neuste", "Alle", "5-Sterne"
 */
export type ReviewFilter = string;
