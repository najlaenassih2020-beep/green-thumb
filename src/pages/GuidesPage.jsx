import { useState } from "react";
import { Link } from "react-router-dom";
import { guides } from "../data/guidesData";
import { Droplet, Sun, Wind, Sprout, FlaskConical, Scissors, HelpCircle, ArrowRight } from "lucide-react";
import ScrollReveal from "../components/ScrollReveal";

function GuideIcon({ name, className = "w-6 h-6" }) {
  if (name === "droplet") return <Droplet className={className} />;
  if (name === "sun") return <Sun className={className} />;
  if (name === "wind") return <Wind className={className} />;
  if (name === "sprout") return <Sprout className={className} />;
  if (name === "flask") return <FlaskConical className={className} />;
  if (name === "scissors") return <Scissors className={className} />;
  return <HelpCircle className={className} />;
}

function GuideCard({ guide }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={`bg-white rounded-2xl border border-sage/10 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
    >
      {/* Header */}
      <div className={`px-6 py-5 border-b ${guide.color}`}>
        <div className="flex items-center gap-3">
          <GuideIcon name={guide.icon} className="w-8 h-8 text-forest/70 shrink-0" />
          <h3 className="font-heading text-lg font-semibold text-charcoal">
            {guide.title}
          </h3>
        </div>
      </div>

      {/* Tips */}
      <div className="px-6 py-5">
        <ul className="space-y-3">
          {(expanded ? guide.tips : guide.tips.slice(0, 2)).map((tip, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-charcoal-light leading-relaxed">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-sage shrink-0" />
              {tip}
            </li>
          ))}
        </ul>

        {guide.tips.length > 2 && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="mt-4 text-xs font-medium text-forest hover:text-terracotta transition-colors flex items-center gap-1"
          >
            {expanded ? "Show less" : `+${guide.tips.length - 2} more tips`}
            <svg
              className={`w-3.5 h-3.5 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}

export default function GuidesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      {/* Header */}
      <ScrollReveal variant="up">
        <div className="text-center mb-12">
          <span className="inline-block text-terracotta font-semibold text-xs tracking-widest uppercase mb-2">
            Learn & Grow
          </span>
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-charcoal">
            Plant Care Guides
          </h1>
          <p className="text-charcoal-light mt-2 text-sm max-w-md mx-auto">
            Simple, digestible tips to keep your green friends happy and thriving.
            No PhD in botany required.
          </p>
        </div>
      </ScrollReveal>

      {/* Guides Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {guides.map((guide, index) => (
          <ScrollReveal
            key={guide.id}
            variant="up"
            delay={index * 120}
            duration={700}
          >
            <GuideCard guide={guide} />
          </ScrollReveal>
        ))}
      </div>

      {/* Bottom CTA */}
      <ScrollReveal variant="scale" className="mt-16 flex justify-center">
        <div className="bg-white rounded-2xl border border-sage/10 p-8 md:p-10 shadow-sm max-w-lg flex flex-col items-center">
          <Sprout className="w-12 h-12 text-forest mb-3" />
          <h2 className="font-heading text-xl font-bold text-charcoal mb-2">
            Not sure where to start?
          </h2>
          <p className="text-sm text-charcoal-light mb-5">
            Take our quiz and we'll find the perfect low-maintenance plant or flower for
            your space.
          </p>
          <Link
            to="/quiz"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-terracotta text-white text-sm font-semibold hover:bg-terracotta-dark transition-all duration-200 shadow-md hover:shadow-lg"
          >
            Take the Plant Quiz
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </ScrollReveal>
    </div>
  );
}
