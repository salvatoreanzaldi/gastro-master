import { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ArrowRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useGoogleReviews } from '@/hooks/useGoogleReviews';
import type { GoogleReview, ReviewFilter } from '@/types/reviews';
import googleLogo from '@/assets/icons/Icon - Google.svg';
import googleLogoRound from '@/assets/icons/Icon - Google Rund.svg';
import verifyIcon from '@/assets/icons/Icon - Verify.svg';

/**
 * GoogleReviewsGrid
 *
 * Displays Google My Business reviews with professional layout
 * Positioned after Hero Section on /de/uber-uns
 *
 * Features:
 * - Aggregated 5-star rating and review count
 * - Google Logo + Header with CTA
 * - Filter tabs: All | 5-star | Newest
 * - Responsive grid: 4 columns desktop / 2 tablet / 1 mobile
 * - Shows 4 reviews per row on desktop
 * - Review cards: avatar, name, stars, text excerpt, date
 * - "Weitere Bewertungen lesen" CTA button
 * - Dark mode support
 * - Error & loading states
 */
export default function GoogleReviewsGrid() {
  const { reviews, totalRating, totalCount, isLoading, error } = useGoogleReviews();
  const [activeFilter, setActiveFilter] = useState<ReviewFilter>('all');

  // Drag-scroll refs
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  // Filter reviews based on active tab
  const filteredReviews = useMemo(() => {
    let filtered = reviews;

    if (activeFilter === '5') {
      filtered = reviews.filter((r) => r.rating === 5);
    } else if (activeFilter === 'newest') {
      filtered = [...reviews].sort((a, b) => b.time - a.time);
    }

    return filtered;
  }, [reviews, activeFilter]);

  // Event handlers for drag-scroll
  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    isDragging.current = true;
    startX.current = e.pageX - (scrollRef.current?.offsetLeft ?? 0);
    scrollLeft.current = scrollRef.current?.scrollLeft ?? 0;
    if (scrollRef.current) scrollRef.current.style.cursor = 'grabbing';
  };

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging.current || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - (scrollRef.current.offsetLeft ?? 0);
    const walk = (x - startX.current) * 1.5;
    scrollRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const stopDragging = () => {
    isDragging.current = false;
    if (scrollRef.current) scrollRef.current.style.cursor = 'grab';
  };

  if (error) {
    return <ErrorState />;
  }

  return (
    <section className="bg-white dark:bg-[#111827] border-b border-[#0A264A]/[0.06] dark:border-white/[0.06] px-5 md:px-8 lg:px-16 py-16 md:py-24">
      <div className="max-w-7xl mx-auto">
        {/* Header Line 1: Logo + Title */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-4 max-w-[1200px] mx-auto"
        >
          <img
            src={googleLogo}
            alt="Google Logo"
            className="h-8 md:h-10 object-contain"
          />
          <h2 className="text-2xl md:text-3xl font-bold text-[#0A264A] dark:text-white">
            Bewertungen
          </h2>
        </motion.div>

        {/* Header Line 2: Rating Score */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="flex items-center gap-2 mb-8 max-w-[1200px] mx-auto"
        >
          <span className="text-2xl font-bold text-[#0A264A] dark:text-white">
            {totalRating.toFixed(1)}
          </span>
          <div className="flex gap-0.5">
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

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="flex flex-wrap gap-3 mb-10 max-w-[1200px] mx-auto"
        >
          {(['newest', 'all', '5'] as const).map((filter) => {
            const labels: Record<ReviewFilter, string> = {
              newest: 'Neueste',
              all: 'Alle',
              '5': '5-Sterne',
            };

            return (
              <Button
                key={filter}
                onClick={() => setActiveFilter(filter)}
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
          <div className="flex gap-4 overflow-x-auto pb-4">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="bg-muted rounded-2xl p-6 animate-pulse h-80 w-72 flex-shrink-0"
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

        {/* Review Horizontal Scroll Container */}
        <AnimatePresence>
          {!isLoading && filteredReviews.length > 0 && (
            <motion.div
              ref={scrollRef}
              onMouseDown={onMouseDown}
              onMouseMove={onMouseMove}
              onMouseUp={stopDragging}
              onMouseLeave={stopDragging}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex gap-4 overflow-x-auto overflow-y-hidden pb-4 mb-8 cursor-grab select-none scroll-smooth
                snap-x snap-mandatory max-w-[1200px] mx-auto
                [&::-webkit-scrollbar]:h-2
                [&::-webkit-scrollbar-track]:rounded-full
                [&::-webkit-scrollbar-track]:bg-[#0A264A]/10
                dark:[&::-webkit-scrollbar-track]:bg-white/10
                [&::-webkit-scrollbar-thumb]:rounded-full
                [&::-webkit-scrollbar-thumb]:bg-[#0A264A]/30
                dark:[&::-webkit-scrollbar-thumb]:bg-white/30
                hover:[&::-webkit-scrollbar-thumb]:bg-[#0A264A]/50
                dark:hover:[&::-webkit-scrollbar-thumb]:bg-white/50"
            >
              {filteredReviews.map((review, index) => (
                <ReviewCard key={review.id} review={review} index={index} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTA Button - Centered Below Scroll Container */}
        {!isLoading && filteredReviews.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <a
              href="https://g.page/r/CdCNZ5Fg01PBEBM/review"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#0A264A] dark:bg-blue-600 text-white font-bold px-8 py-3 rounded-xl text-base inline-flex items-center gap-2 hover:scale-[1.02] transition-transform shadow-lg shadow-[#0A264A]/20 dark:shadow-blue-600/20"
            >
              Bewerte uns auf Google
              <ArrowRight className="w-4 h-4" />
            </a>
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
      className="bg-[#f6f7f9] dark:bg-[#1F2937] rounded-2xl p-6 border border-[#0A264A]/10 dark:border-white/10 hover:shadow-lg transition-shadow duration-300 w-72 flex-shrink-0 snap-start"
    >
      {/* Author Info */}
      <div className="flex items-center gap-3 mb-4">
        {/* Avatar */}
        <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
          {review.profile_photo_url ? (
            <img
              src={review.profile_photo_url}
              alt={review.author_name}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            initials
          )}
          {/* Google Logo Badge */}
          <img
            src={googleLogoRound}
            alt="Google"
            className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full p-0.5 shadow-sm"
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            {review.author_url ? (
              <a
                href={review.author_url}
                target="_blank"
                rel="noopener noreferrer"
                title="Verifizierter Kunde"
                className="font-semibold text-[#0A264A] dark:text-white truncate hover:underline"
              >
                {review.author_name}
              </a>
            ) : (
              <p className="font-semibold text-[#0A264A] dark:text-white truncate">
                {review.author_name}
              </p>
            )}
            <img src={verifyIcon} alt="Verified" className="w-4 h-4 flex-shrink-0" />
          </div>
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
          href="https://g.page/r/CdCNZ5Fg01PBEBM/review"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#0A264A] dark:bg-blue-600 text-white font-bold px-6 py-3 rounded-xl text-sm inline-flex items-center gap-2 hover:scale-[1.02] transition-transform shadow-lg shadow-[#0A264A]/20 dark:shadow-blue-600/20"
        >
          Bewerte uns auf Google
          <ArrowRight className="w-4 h-4" />
        </motion.a>
      </div>
    </section>
  );
}
