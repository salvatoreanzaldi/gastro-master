/**
 * Type definitions for Google Reviews
 * Compatible with static JSON and Places API (Phase 2)
 */

export interface GoogleReview {
  id: string;
  author_name: string;
  author_url: string;
  profile_photo_url: string | null;
  rating: 1 | 2 | 3 | 4 | 5;
  relative_time_description: string; // e.g. "vor 2 Monaten"
  text: string;
  time: number; // Unix timestamp
}

export interface ReviewsState {
  reviews: GoogleReview[];
  totalRating: number;
  totalCount: number;
  isLoading: boolean;
  error: string | null;
}

export type ReviewFilter = 'all' | '5' | '4' | 'newest';
