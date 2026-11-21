import { useRef, useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const reviews = [
  {
    id: 1,
    name: "Sarah Mitchell",
    initials: "SM",
    rating: 5,
    plant: "Monstera Deliciosa",
    review:
      "Absolutely stunning plant! It arrived in perfect condition and has already pushed out two new leaves. The packaging was incredibly careful — not a single leaf was damaged.",
    color: "bg-forest",
  },
  {
    id: 2,
    name: "James Rodriguez",
    initials: "JR",
    rating: 5,
    plant: "Snake Plant",
    review:
      "I'm terrible with plants but this Snake Plant is thriving three months later. Zero fuss, maximum style. My office looks 10x better now.",
    color: "bg-terracotta",
  },
  {
    id: 3,
    name: "Emily Chen",
    initials: "EC",
    rating: 4,
    plant: "Fiddle Leaf Fig",
    review:
      "Beautiful tree with gorgeous leaves. It took a week to adjust to my apartment's light but now it's growing like crazy. Love it!",
    color: "bg-sage",
  },
  {
    id: 4,
    name: "Marcus Thompson",
    initials: "MT",
    rating: 5,
    plant: "Pothos Golden",
    review:
      "The trailing vines are already draping over my shelf beautifully. This plant grows so fast and the golden variegation is even prettier in person.",
    color: "bg-forest",
  },
  {
    id: 5,
    name: "Olivia Park",
    initials: "OP",
    rating: 5,
    plant: "Phalaenopsis Orchid",
    review:
      "The orchid bloomed for nearly three months straight! When the flowers finally dropped, new buds appeared within weeks. Exceptional quality.",
    color: "bg-terracotta",
  },
  {
    id: 6,
    name: "Daniel Okafor",
    initials: "DO",
    rating: 4,
    plant: "Boston Fern",
    review:
      "Lush and full right out of the box. It loves my bathroom's humidity and the fronds have grown noticeably longer. Great for the price.",
    color: "bg-sage",
  },
  {
    id: 7,
    name: "Ava Richardson",
    initials: "AR",
    rating: 5,
    plant: "Calathea Orbifolia",
    review:
      "The silver-striped leaves are absolutely mesmerizing. I was worried about care difficulty but the guides on this site made it so easy!",
    color: "bg-forest",
  },
  {
    id: 8,
    name: "Liam Patel",
    initials: "LP",
    rating: 5,
    plant: "Jasmine",
    review:
      "The scent alone is worth it — my entire living room smells incredible every evening. Already bought a second one for my bedroom.",
    color: "bg-terracotta",
  },
];

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i <= rating
              ? "text-terracotta fill-terracotta"
              : "text-sage/20 fill-sage/20"
          }`}
        />
      ))}
    </div>
  );
}

export default function ReviewsSection() {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  const scroll = (direction) => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.querySelector("[data-review-card]")?.offsetWidth || 340;
    const gap = 20;
    const distance = cardWidth + gap;
    el.scrollTo({
      left: el.scrollLeft + (direction === "left" ? -distance : distance),
      behavior: "smooth",
    });
  };

  return (
    <section className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <ScrollReveal variant="up">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="inline-block text-terracotta font-semibold text-xs tracking-widest uppercase mb-2">
                Testimonials
              </span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-charcoal">
                What Our Customers{" "}
                <span className="text-forest">Say</span>
              </h2>
              <p className="text-charcoal-light text-sm mt-2 max-w-md">
                Real reviews from real plant parents who found their perfect green companions.
              </p>
            </div>

            {/* Navigation arrows */}
            <div className="hidden sm:flex items-center gap-2">
              <button
                onClick={() => scroll("left")}
                disabled={!canScrollLeft}
                className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                  canScrollLeft
                    ? "border-forest text-forest hover:bg-forest hover:text-cream cursor-pointer shadow-sm hover:shadow-md"
                    : "border-sage/20 text-sage/30 cursor-not-allowed"
                }`}
                aria-label="Scroll reviews left"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scroll("right")}
                disabled={!canScrollRight}
                className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                  canScrollRight
                    ? "border-forest text-forest hover:bg-forest hover:text-cream cursor-pointer shadow-sm hover:shadow-md"
                    : "border-sage/20 text-sage/30 cursor-not-allowed"
                }`}
                aria-label="Scroll reviews right"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </ScrollReveal>

        {/* Reviews row */}
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
        >
          {reviews.map((r, index) => (
            <ScrollReveal
              key={r.id}
              variant="scale"
              delay={index * 80}
              duration={600}
              className="flex-shrink-0"
            >
              <div
                data-review-card
                className="group min-w-[300px] max-w-[340px] bg-white rounded-2xl border border-sage/10 p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden h-full"
              >
                {/* Decorative quote mark */}
                <Quote className="absolute top-4 right-4 w-8 h-8 text-sage/8 group-hover:text-sage/15 transition-colors duration-300" />

                {/* Profile + rating */}
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`w-11 h-11 rounded-full ${r.color} flex items-center justify-center text-cream text-sm font-heading font-bold shadow-sm`}
                  >
                    {r.initials}
                  </div>
                  <div>
                    <p className="font-heading font-semibold text-charcoal text-sm">
                      {r.name}
                    </p>
                    <StarRating rating={r.rating} />
                  </div>
                </div>

                {/* Testimonial */}
                <p className="text-sm text-charcoal-light leading-relaxed mb-5 line-clamp-4">
                  "{r.review}"
                </p>

                {/* Verified badge */}
                <div className="pt-4 border-t border-sage/8">
                  <p className="text-[11px] font-medium text-sage tracking-wide">
                    <span className="text-forest">✓</span> Verified Buyer —{" "}
                    <span className="text-charcoal font-semibold">{r.plant}</span>
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Mobile swipe hint */}
        <p className="sm:hidden text-center text-xs text-charcoal-light/50 mt-2">
          ← Swipe for more reviews →
        </p>
      </div>
    </section>
  );
}
