import { useQuery } from '@tanstack/react-query';
import type { GoogleReview, ReviewsState } from '@/types/reviews';

/**
 * Fetches Google Reviews via Backend Proxy
 *
 * Phase 2: Loads from backend proxy at localhost:3001/api/google-reviews
 *   - Backend calls Google Places API (no CORS issues)
 *   - Frontend gets reviews from backend (no CORS issues)
 *   - Fallback: Static JSON if API fails
 */
async function fetchGoogleReviews(): Promise<ReviewsState> {
  try {
    // Call backend proxy on port 3001 (IMPORTANT: full URL, not relative path)
    const response = await fetch('http://localhost:3001/api/google-reviews');

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error);
    }

    console.log(`✅ Successfully loaded ${data.reviews.length} reviews from backend proxy`);

    return {
      reviews: data.reviews,
      totalRating: data.totalRating,
      totalCount: data.totalCount,
      isLoading: false,
      error: null,
    };
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : 'Unknown error';
    console.warn(`⚠️ Failed to fetch from Google API: ${errorMsg}. Falling back to static data.`);
  }

  // Fallback: Load from static JSON
  try {
    const response = await fetch('/data/google-reviews.json');
    if (!response.ok) throw new Error('Failed to fetch static reviews');

    const reviews: GoogleReview[] = await response.json();

    const totalRating = reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;

    console.log(`ℹ️ Using fallback: ${reviews.length} static reviews`);

    return {
      reviews,
      totalRating: Math.round(totalRating * 10) / 10,
      totalCount: 131, // Total reviews on Google My Business (includes all reviews)
      isLoading: false,
      error: null,
    };
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : 'Unknown error';
    console.error(`❌ Error loading reviews: ${errorMsg}`);

    return {
      reviews: [],
      totalRating: 0,
      totalCount: 0,
      isLoading: false,
      error: errorMsg,
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
    staleTime: 0, // Always fetch fresh to ensure profile_photo_url is available
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
