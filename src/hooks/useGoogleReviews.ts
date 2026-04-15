import { useQuery } from '@tanstack/react-query';
import type { ReviewsData, ReviewsState } from '@/types/reviews';

/**
 * Fetches Google Reviews from synced JSON (multi-tab support)
 *
 * The reviews are synced from Google Sheets via scripts/sync-reviews.js
 * Each sheet tab becomes a separate filter on the website.
 *
 * Features:
 * - Loads from /data/google-reviews.json (pre-synced from Google Sheets)
 * - Supports multiple tabs with different sort orders
 * - Validates tab existence and falls back to first available tab
 * - Caches per tab using React Query
 */
async function fetchGoogleReviews(tab?: string): Promise<ReviewsState> {
  try {
    const response = await fetch('/data/google-reviews.json');

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data: ReviewsData = await response.json();

    // Validate that requested tab exists, fallback to first tab
    const activeTab = tab && data.availableTabs.includes(tab)
      ? tab
      : data.availableTabs[0];

    const reviews = data.tabs[activeTab] ?? [];

    if (!tab || tab !== activeTab) {
      console.log(
        `ℹ️ Reviews loaded: "${activeTab}" tab (${reviews.length} reviews)`
      );
    }

    return {
      reviews,
      availableTabs: data.availableTabs,
      totalRating: data.meta.totalRating,
      totalCount: data.meta.totalCount,
      isLoading: false,
      error: null,
    };
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : 'Unknown error';
    console.error(`❌ Error loading reviews: ${errorMsg}`);

    return {
      reviews: [],
      availableTabs: [],
      totalRating: 0,
      totalCount: 0,
      isLoading: false,
      error: errorMsg,
    };
  }
}

/**
 * Custom hook for Google Reviews with multi-tab support
 *
 * @param tab - Sheet tab name (e.g., "Neuste", "Alle", "5-Sterne")
 * @returns Review data with available tabs and loading states
 *
 * @example
 * ```tsx
 * const { reviews, availableTabs, totalRating, activeTab } = useGoogleReviews("Neuste");
 *
 * if (isLoading) return <LoadingSkeleton />;
 * if (error) return <ErrorMessage message={error} />;
 * return (
 *   <div>
 *     {availableTabs.map(t => (
 *       <button key={t}>{t}</button>
 *     ))}
 *     <ReviewGrid reviews={reviews} />
 *   </div>
 * );
 * ```
 */
export function useGoogleReviews(tab?: string) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['google-reviews', tab ?? '__default__'],
    queryFn: () => fetchGoogleReviews(tab),
    staleTime: 1000 * 60 * 5, // 5 minutes - JSON only changes during daily sync
    gcTime: 1000 * 60 * 60 * 24, // Keep in cache for 24 hours
  });

  return {
    reviews: data?.reviews ?? [],
    availableTabs: data?.availableTabs ?? [],
    totalRating: data?.totalRating ?? 0,
    totalCount: data?.totalCount ?? 0,
    isLoading,
    error: error ? (error as Error).message : data?.error ?? null,
  };
}
