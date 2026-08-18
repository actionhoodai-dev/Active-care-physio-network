'use client';

import { useState } from 'react';
import { Star, MessageSquare, CheckCircle2, ChevronDown, ChevronUp, Quote, ExternalLink } from 'lucide-react';
import { googleReviewsData } from '@/lib/reviews-data';

const categories = [
  'All Reviews',
  'Back & Neck Pain',
  'Sports & Knee Rehab',
  'Neuro & Rehabilitation',
  'Post-Surgery Rehab',
  'Home Visits',
] as const;

export default function ReviewsSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All Reviews');
  const [showAll, setShowAll] = useState<boolean>(false);

  const filteredReviews = selectedCategory === 'All Reviews'
    ? googleReviewsData
    : googleReviewsData.filter((r) => r.category === selectedCategory);

  const displayedReviews = showAll ? filteredReviews : filteredReviews.slice(0, 6);

  return (
    <section className="py-20 bg-[#0A192F] border-b border-[rgba(100,200,255,0.08)] relative overflow-hidden" id="patient-reviews">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-[#0284C7]/10 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#F59E0B]/10 rounded-full filter blur-3xl pointer-events-none" />

      <div className="container-custom relative z-10 space-y-12">
        {/* Section Header with Overall Rating Summary */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6" data-animate="fade">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#112240] border border-[#F59E0B]/30 text-xs font-bold text-[#FCD34D] uppercase tracking-wider font-[var(--font-body)]">
              <Star className="w-4 h-4 fill-[#F59E0B] text-[#F59E0B]" />
              <span>Real Patient Experiences</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-[var(--font-heading)] text-white leading-tight">
              Verified Google <span className="text-[#38BDF8]">Patient Reviews</span>
            </h2>
            <p className="text-slate-300 text-base sm:text-lg font-[var(--font-body)] leading-relaxed">
              Read authentic feedback from patients who recovered from back pain, sports injuries, post-surgical recovery, and neurological conditions at Active Care.
            </p>
          </div>

          {/* Overall Rating & Write Review CTA */}
          <div className="bg-[#112240] border border-[rgba(100,200,255,0.12)] rounded-3xl p-6 sm:p-7 shadow-xl flex flex-col sm:flex-row items-center gap-6 shrink-0">
            <div className="text-center sm:text-left space-y-1">
              <div className="flex items-center justify-center sm:justify-start gap-1">
                <span className="text-4xl font-extrabold text-white font-[var(--font-heading)]">5.0</span>
                <div className="flex text-[#F59E0B]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[#F59E0B]" />
                  ))}
                </div>
              </div>
              <p className="text-xs text-slate-300 font-bold font-[var(--font-body)]">
                100% 5-Star Ratings on Google Maps
              </p>
            </div>

            <a
              href="https://g.page/r/CfexJGCWGVtmEBM/review"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-accent text-sm font-bold !py-3 !px-5 whitespace-nowrap shadow-lg flex items-center gap-2 group"
              id="reviews-section-cta"
            >
              <Star className="w-4 h-4 fill-[#0A192F] text-[#0A192F] group-hover:scale-110 transition-transform" />
              <span>Write a Review on Google</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2 pt-2" data-animate="fade">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setSelectedCategory(category);
                setShowAll(false);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 font-[var(--font-body)] ${
                selectedCategory === category
                  ? 'bg-[#0284C7] text-white shadow-md shadow-[#0284C7]/20 border border-[#38BDF8]'
                  : 'bg-[#112240] text-slate-300 hover:text-white hover:bg-[#1A365D] border border-[rgba(100,200,255,0.08)]'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-animate="scale">
          {displayedReviews.map((review) => (
            <div
              key={review.id}
              className="bg-[#112240] rounded-2xl p-6 border border-[rgba(100,200,255,0.08)] hover:border-[#0284C7]/40 shadow-lg flex flex-col justify-between transition-all duration-200 card-hover group"
            >
              <div className="space-y-4">
                {/* Header: User Info & Google Badge */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0284C7] to-[#0D9488] flex items-center justify-center text-white font-extrabold text-xs shadow-md shrink-0">
                      {review.avatarText}
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm font-[var(--font-heading)] group-hover:text-[#38BDF8] transition-colors leading-snug">
                        {review.name}
                      </h4>
                      <p className="text-[0.7rem] text-slate-400 font-[var(--font-body)]">
                        {review.timeAgo} • Google Verified Review
                      </p>
                    </div>
                  </div>

                  {/* 5 Stars */}
                  <div className="flex text-[#F59E0B] shrink-0">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#F59E0B]" />
                    ))}
                  </div>
                </div>

                {/* Condition / Doctor Badges */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  {review.condition && (
                    <span className="px-2.5 py-0.5 rounded-md bg-[#0A192F] border border-[rgba(100,200,255,0.1)] text-[0.7rem] font-semibold text-[#38BDF8]">
                      🩺 {review.condition}
                    </span>
                  )}
                  {review.doctorMentioned && (
                    <span className="px-2.5 py-0.5 rounded-md bg-[#0A192F] border border-[#F59E0B]/30 text-[0.7rem] font-semibold text-[#FCD34D]">
                      ⭐ {review.doctorMentioned}
                    </span>
                  )}
                </div>

                {/* Review Text */}
                <p className="text-slate-200 text-sm leading-relaxed font-[var(--font-body)] italic relative">
                  &ldquo;{review.reviewText}&rdquo;
                </p>
              </div>

              {/* Owner Response if available */}
              {review.ownerReply && (
                <div className="mt-5 pt-4 border-t border-[rgba(100,200,255,0.06)] bg-[#0A192F]/50 -mx-2 -mb-2 p-3 rounded-xl space-y-1">
                  <div className="flex items-center gap-1.5 text-[0.7rem] font-bold text-[#2DD4BF]">
                    <CheckCircle2 className="w-3 h-3 text-[#2DD4BF]" />
                    <span>Response from Active Care:</span>
                  </div>
                  <p className="text-xs text-slate-400 italic font-[var(--font-body)] line-clamp-2">
                    &ldquo;{review.ownerReply}&rdquo;
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Toggle Show More / Less */}
        {filteredReviews.length > 6 && (
          <div className="text-center pt-4" data-animate="fade">
            <button
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#112240] hover:bg-[#1A365D] border border-[rgba(100,200,255,0.15)] text-white font-bold text-sm transition-all shadow-md"
            >
              {showAll ? (
                <>
                  <span>Show Fewer Reviews</span>
                  <ChevronUp className="w-4 h-4 text-[#38BDF8]" />
                </>
              ) : (
                <>
                  <span>Show All {filteredReviews.length} Reviews</span>
                  <ChevronDown className="w-4 h-4 text-[#38BDF8]" />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
