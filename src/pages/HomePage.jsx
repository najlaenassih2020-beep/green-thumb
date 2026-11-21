import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { plants } from "../data/plantData";
import { Compass, BookOpen, ShoppingBag, Leaf, Sprout, Sparkles, PawPrint, ArrowRight } from "lucide-react";
import ReviewsSection from "../components/ReviewsSection";
import ScrollReveal from "../components/ScrollReveal";

const featuredPlants = plants.filter((p) => p.featured);

const services = [
  {
    icon: "compass",
    title: "Interactive Plant Finder Quiz",
    desc: "Answer 3 quick questions and we'll match you with your perfect plant — based on your light, pets, and lifestyle.",
    cta: "Take the Quiz",
    to: "/quiz",
    accent: "terracotta",
  },
  {
    icon: "book",
    title: "Expert Plant Care Guides",
    desc: "Simple, digestible checklists for watering, light, humidity, and more — everything you need for happy plants.",
    cta: "View Guides",
    to: "/guides",
    accent: "sage",
  },
  {
    icon: "cart",
    title: "Quick Add to Cart Shop",
    desc: "Browse our curated collection and build your cart in one click. Seamless, fast, and delightful shopping.",
    cta: "Shop Now",
    to: "/shop",
    accent: "forest",
  },
];

function ServiceIcon({ name }) {
  if (name === "compass") return <Compass className="w-10 h-10 text-terracotta mb-4" />;
  if (name === "book") return <BookOpen className="w-10 h-10 text-sage mb-4" />;
  return <ShoppingBag className="w-10 h-10 text-forest mb-4" />;
}

function PlantCard({ plant }) {
  const { addItem } = useCart();

  return (
    <div className="group bg-white rounded-2xl border border-sage/10 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 min-w-[220px] flex-shrink-0 snap-start">
      {/* Image area */}
      <div className="h-44 bg-gradient-to-br from-sage/5 to-sage/15 relative overflow-hidden">
        <img
          src={plant.image}
          alt={plant.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {plant.petSafe && (
          <span className="absolute top-3 left-3 text-[10px] font-semibold bg-sage/90 text-white px-2.5 py-1 rounded-full flex items-center gap-1 backdrop-blur-sm">
            <PawPrint className="w-3 h-3 text-white" /> Pet Safe
          </span>
        )}
      </div>

      {/* Info */}
      <div className="p-4 space-y-2">
        <h3 className="font-heading font-semibold text-charcoal text-sm truncate">
          {plant.name}
        </h3>
        <p className="text-xs text-charcoal-light line-clamp-2 leading-relaxed">
          {plant.description}
        </p>
        <div className="flex items-center justify-between pt-1">
          <span className="font-heading font-bold text-forest text-lg">
            ${plant.price}
          </span>
          <button
            onClick={() => addItem(plant)}
            className="px-4 py-1.5 rounded-full bg-terracotta text-white text-xs font-semibold hover:bg-terracotta-dark transition-all duration-200 hover:shadow-md active:scale-95"
          >
            + Add
          </button>
        </div>
      </div>
    </div>
  );
}

const heroBgs = [
  "https://images.unsplash.com/photo-1592150621744-aca64f48394a?q=80&w=1800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1463936575829-25148e1db1b8?q=80&w=1800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=1800&auto=format&fit=crop"
];

export default function HomePage() {
  const [currentBg, setCurrentBg] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % heroBgs.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-20 md:space-y-28">
      {/* ── Hero Section ── */}
      <section className="relative overflow-hidden bg-forest text-cream">
        {/* Background Image Slideshow with Lighter Overlay */}
        <div className="absolute inset-0 z-0">
          {heroBgs.map((bgUrl, index) => (
            <img
              key={bgUrl}
              src={bgUrl}
              alt={`Plant shop background slideshow ${index + 1}`}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
                index === currentBg ? "opacity-55" : "opacity-0"
              } select-none pointer-events-none`}
            />
          ))}
          {/* Lighter Green/Dark Overlay: darker on the left for contrast, lighter on the right to show the shop pictures */}
          <div className="absolute inset-0 bg-gradient-to-r from-forest/85 via-forest/50 to-transparent" />
          <div className="absolute inset-0 bg-black/10" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-36">
          <div className="max-w-2xl animate-fade-in-up">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-cream/15 text-cream/90 text-xs font-medium tracking-wide mb-6 backdrop-blur-sm border border-cream/10">
              <Sparkles className="w-3.5 h-3.5 text-terracotta-light" /> Boutique Plant Store
            </span>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-cream leading-tight">
              Find Your Perfect{" "}
              <span className="text-terracotta-light">Green</span> Companion
            </h1>
            <p className="mt-5 text-cream/70 text-base md:text-lg leading-relaxed max-w-lg">
              Hand-picked indoor plants and flowers for every space, skill level, and
              lifestyle. Take our quiz and discover your ideal match in under a
              minute.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/quiz"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-terracotta text-white font-heading font-semibold text-sm hover:bg-terracotta-dark transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                Take the Quiz
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-cream/10 text-cream font-heading font-semibold text-sm hover:bg-cream/20 transition-all duration-200 backdrop-blur-sm border border-cream/20"
              >
                Browse Plants
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" className="w-full">
            <path d="M0 60V20C240 45 480 5 720 20C960 35 1200 10 1440 30V60H0Z" fill="#F9F6F0" />
          </svg>
        </div>
      </section>

      {/* ── Featured Services ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal variant="up">
          <div className="text-center mb-12">
            <span className="inline-block text-terracotta font-semibold text-xs tracking-widest uppercase mb-2">
              Our Services
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-charcoal">
              Everything You Need to{" "}
              <span className="text-forest">Grow Happy</span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((s, index) => (
            <ScrollReveal
              key={s.to}
              variant="up"
              delay={index * 120}
              className="h-full"
            >
              <div className="group relative bg-white rounded-2xl p-7 border border-sage/10 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden h-full">
                {/* Decorative corner */}
                <div className={`absolute top-0 right-0 w-20 h-20 bg-${s.accent}/5 rounded-bl-[40px] transition-all duration-300 group-hover:w-24 group-hover:h-24`} />

                <ServiceIcon name={s.icon} />
                <h3 className="font-heading text-lg font-semibold text-charcoal mb-2">
                  {s.title}
                </h3>
                <p className="text-sm text-charcoal-light leading-relaxed mb-5">
                  {s.desc}
                </p>
                <Link
                  to={s.to}
                  className={`inline-flex items-center gap-1.5 px-5 py-2 rounded-full text-xs font-semibold transition-all duration-200 hover:shadow-md active:scale-95 ${
                    s.accent === "terracotta"
                      ? "bg-terracotta text-white hover:bg-terracotta-dark"
                      : s.accent === "sage"
                      ? "bg-sage text-white hover:bg-sage-dark"
                      : "bg-forest text-cream hover:bg-forest-light"
                  }`}
                >
                  {s.cta}
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ── Featured Plants ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <ScrollReveal variant="fade">
          <div className="flex items-end justify-between mb-8">
            <div>
              <span className="inline-block text-terracotta font-semibold text-xs tracking-widest uppercase mb-2">
                Bestsellers
              </span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-charcoal">
                Featured Plants & Flowers
              </h2>
            </div>
            <Link
              to="/shop"
              className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-forest hover:text-terracotta transition-colors"
            >
              View All
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </ScrollReveal>

        <div className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
          {featuredPlants.map((plant, index) => (
            <ScrollReveal
              key={plant.id}
              variant="scale"
              delay={index * 100}
              duration={600}
              className="flex-shrink-0"
            >
              <PlantCard plant={plant} />
            </ScrollReveal>
          ))}
        </div>

        <div className="mt-6 text-center sm:hidden">
          <Link
            to="/shop"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-forest hover:text-terracotta transition-colors"
          >
            View All Plants →
          </Link>
        </div>
      </section>

      {/* ── Customer Reviews ── */}
      <ReviewsSection />
    </div>
  );
}
