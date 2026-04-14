import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ArrowRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useGoogleReviews } from '@/hooks/useGoogleReviews';
import type { GoogleReview, ReviewFilter } from '@/types/reviews';

/**
 * GoogleReviewsGrid
 *
 * Displays Google My Business reviews with filtering, pagination, and animations
 * Positioned after Hero Section on /de/uber-uns
 *
 * Features:
 * - Aggregated 5-star rating and review count
 * - Filter tabs: All | 5-star | 4-star | Newest
 * - Responsive grid: 3 columns desktop / 2 tablet / 1 mobile
 * - Load More pagination (shows 6 reviews initially)
 * - Review cards: avatar, name, stars, text excerpt, date
 * - CTA button to Google Maps
 * - Dark mode support
 * - Error & loading states
 */
export default function GoogleReviewsGrid() {
  const { reviews, totalRating, totalCount, isLoading, error } = useGoogleReviews();
  const [activeFilter, setActiveFilter] = useState<ReviewFilter>('all');
  const [visibleCount, setVisibleCount] = useState(6);

  // Filter reviews based on active tab
  const filteredReviews = useMemo(() => {
    let filtered = reviews;

    if (activeFilter === '5') {
      filtered = reviews.filter((r) => r.rating === 5);
    } else if (activeFilter === '4') {
      filtered = reviews.filter((r) => r.rating >= 4);
    } else if (activeFilter === 'newest') {
      filtered = [...reviews].sort((a, b) => b.time - a.time);
    }

    return filtered;
  }, [reviews, activeFilter]);

  const visibleReviews = filteredReviews.slice(0, visibleCount);
  const hasMore = visibleCount < filteredReviews.length;

  if (error) {
    return <ErrorState />;
  }

  return (
    <section className="bg-white dark:bg-[#111827] border-b border-[#0A264A]/[0.06] dark:border-white/[0.06] px-5 md:px-8 lg:px-16 py-16 md:py-24">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-[#0A264A] dark:text-white mb-2"
            >
              Ehrliches Feedback ist uns wichtig
            </motion.h2>

            {/* Rating Score */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="flex items-center gap-2"
            >
              <span className="text-2xl font-bold text-[#0A264A] dark:text-white">
                {totalRating.toFixed(1)} ⭐
              </span>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-amber-400 fill-amber-400"
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                ({totalCount} {totalCount === 1 ? 'Bewertung' : 'Bewertungen'})
              </span>
            </motion.div>
          </div>

          {/* CTA Button */}
          <motion.a
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            href="https://www.google.com/maps/place/Gastro+Master"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-amber text-[#0A264A] font-bold px-6 py-3 rounded-xl text-sm inline-flex items-center gap-2 hover:scale-[1.02] transition-transform shadow-lg shadow-amber-500/20 w-fit"
          >
            Bewerten Sie uns auf Google
            <ArrowRight className="w-4 h-4" />
          </motion.a>
        </div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-3 mb-8"
        >
          {(['all', '5', '4', 'newest'] as const).map((filter) => {
            const labels: Record<ReviewFilter, string> = {
              all: 'Alle',
              '5': '5-Sterne',
              '4': '4-Sterne+',
              newest: 'Neueste',
            };

            return (
              <Button
                key={filter}
                onClick={() => {
                  setActiveFilter(filter);
                  setVisibleCount(6); // Reset pagination on filter change
                }}
                variant={activeFilter === filter ? 'default' : 'outline'}
                className={
                  activeFilter === filter
                    ? 'bg-[#0A264A] dark:bg-white text-white dark:text-[#0A264A]'
                    : ''
                }
              >
                {labels[filter]}
              </Button>
            );
          })}
        </motion.div>

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-muted rounded-2xl p-6 animate-pulse h-80"
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && filteredReviews.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              Keine Bewertungen für diesen Filter vorhanden.
            </p>
          </div>
        )}

        {/* Review Grid */}
        <AnimatePresence>
          {!isLoading && visibleReviews.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8"
            >
              {visibleReviews.map((review, index) => (
                <ReviewCard key={review.id} review={review} index={index} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Load More Button */}
        {!isLoading && hasMore && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <Button
              onClick={() => setVisibleCount((prev) => prev + 6)}
              variant="outline"
              size="lg"
            >
              Weitere Bewertungen laden
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
}

/**
 * ReviewCard
 *
 * Individual review card with avatar, name, rating, text excerpt, and date
 */
interface ReviewCardProps {
  review: GoogleReview;
  index: number;
}

function ReviewCard({ review, index }: ReviewCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Truncate text to 150 characters if longer
  const isTruncated = review.text.length > 150;
  const displayText = isTruncated && !isExpanded
    ? review.text.slice(0, 150) + '…'
    : review.text;

  // Get initials for avatar fallback
  const initials = review.author_name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="bg-white dark:bg-[#1F2937] rounded-2xl p-6 border border-[#0A264A]/10 dark:border-white/10 hover:shadow-lg transition-shadow duration-300"
    >
      {/* Author Info */}
      <div className="flex items-center gap-3 mb-4">
        {/* Avatar */}
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
          {review.profile_photo_url ? (
            <img
              src={review.profile_photo_url}
              alt={review.author_name}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            initials
          )}
        </div>

        <div className="flex-1 min-w-0">
          <p className="font-semibold text-[#0A264A] dark:text-white truncate">
            {review.author_name}
          </p>
          <p className="text-xs text-muted-foreground">
            {review.relative_time_description}
          </p>
        </div>
      </div>

      {/* Rating */}
      <div className="flex items-center gap-1 mb-3">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < review.rating
                ? 'text-amber-400 fill-amber-400'
                : 'text-gray-300 dark:text-gray-600'
            }`}
          />
        ))}
      </div>

      {/* Review Text */}
      <p className="text-sm text-[#0A264A]/80 dark:text-white/80 leading-relaxed mb-3">
        {displayText}
      </p>

      {/* Expand/Collapse Button */}
      {isTruncated && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-xs font-semibold text-cyan-600 dark:text-cyan-400 hover:underline"
        >
          {isExpanded ? 'Weniger anzeigen' : 'Mehr anzeigen'}
        </button>
      )}
    </motion.div>
  );
}

/**
 * ErrorState
 *
 * Fallback UI when reviews fail to load
 */
function ErrorState() {
  return (
    <section className="bg-white dark:bg-[#111827] border-b border-[#0A264A]/[0.06] dark:border-white/[0.06] px-5 md:px-8 lg:px-16 py-16 md:py-24">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-2xl font-bold text-[#0A264A] dark:text-white mb-2">
          Ehrliches Feedback ist uns wichtig
        </h2>
        <p className="text-muted-foreground mb-6">
          Bewertungen werden derzeit geladen. Bitte versuchen Sie es später erneut.
        </p>
        <motion.a
          whileHover={{ scale: 1.02 }}
          href="https://www.google.com/maps/place/Gastro+Master"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gradient-amber text-[#0A264A] font-bold px-6 py-3 rounded-xl text-sm inline-flex items-center gap-2 hover:scale-[1.02] transition-transform shadow-lg shadow-amber-500/20"
        >
          Bewerten Sie uns auf Google
          <ArrowRight className="w-4 h-4" />
        </motion.a>
      </div>
    </section>
  );
}
