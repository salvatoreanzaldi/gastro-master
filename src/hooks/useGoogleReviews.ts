import { useQuery } from '@tanstack/react-query';
import type { GoogleReview, ReviewsState } from '@/types/reviews';

/**
 * Fetches Google Reviews from static JSON
 *
 * Phase 1: Loads from `src/data/google-reviews.json` (static)
 * Phase 2: Replace queryFn to use Google Places API
 *   - Requires: Google Cloud API Key in .env (VITE_GOOGLE_PLACES_API_KEY)
 *   - Endpoint: POST /v3/lroLongRunningRecognize (Maps API)
 *   - Docs: https://developers.google.com/maps/documentation/places/web-service/details
 */
async function fetchGoogleReviews(): Promise<ReviewsState> {
  try {
    // Phase 1: Static JSON
    const response = await fetch('/data/google-reviews.json');
    if (!response.ok) throw new Error('Failed to fetch reviews');

    const reviews: GoogleReview[] = await response.json();

    // Calculate aggregate statistics
    const totalCount = reviews.length;
    const totalRating = reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;

    return {
      reviews,
      totalRating: Math.round(totalRating * 10) / 10,
      totalCount,
      isLoading: false,
      error: null,
    };
  } catch (error) {
    return {
      reviews: [],
      totalRating: 0,
      totalCount: 0,
      isLoading: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Custom hook for Google Reviews
 *
 * @returns Review data with loading and error states
 *
 * @example
 * ```tsx
 * const { reviews, totalRating, totalCount, isLoading, error } = useGoogleReviews();
 *
 * if (isLoading) return <LoadingSkeleton />;
 * if (error) return <ErrorMessage message={error} />;
 * return <ReviewGrid reviews={reviews} />;
 * ```
 */
export function useGoogleReviews() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['google-reviews'],
    queryFn: fetchGoogleReviews,
    staleTime: 1000 * 60 * 60, // Cache for 1 hour
    gcTime: 1000 * 60 * 60 * 24, // Keep in cache for 24 hours
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  return {
    reviews: data?.reviews ?? [],
    totalRating: data?.totalRating ?? 0,
    totalCount: data?.totalCount ?? 0,
    isLoading,
    error: error ? (error as Error).message : data?.error ?? null,
  };
}
