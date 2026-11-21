import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { plants, lightLabels, careLevelLabels } from "../data/plantData";
import { Sun, Moon, CloudSun, PawPrint, Home, Sprout, Smile, ThumbsUp, Award, Sparkles, ArrowLeft, Check } from "lucide-react";

function QuizIcon({ name, className = "w-12 h-12 text-forest" }) {
  if (name === "sun") return <Sun className={className} />;
  if (name === "moon") return <Moon className={className} />;
  if (name === "cloud-sun") return <CloudSun className={className} />;
  if (name === "paw") return <PawPrint className={className} />;
  if (name === "dog") return <PawPrint className={className} />;
  if (name === "home") return <Home className={className} />;
  if (name === "sprout") return <Sprout className={className} />;
  if (name === "smile") return <Smile className={className} />;
  if (name === "thumbs-up") return <ThumbsUp className={className} />;
  if (name === "award") return <Award className={className} />;
  if (name === "sparkles") return <Sparkles className={className} />;
  return <Sprout className={className} />;
}

const steps = [
  {
    id: "light",
    question: "How much natural light does your space get?",
    subtitle: "Think about where you'll place your new plant.",
    icon: "sun",
    options: [
      {
        value: "low",
        label: "Low Light",
        desc: "North-facing or no windows nearby",
        emoji: "moon",
      },
      {
        value: "medium",
        label: "Medium Light",
        desc: "East/west-facing, bright but indirect",
        emoji: "cloud-sun",
      },
      {
        value: "bright",
        label: "Bright Light",
        desc: "South-facing with lots of sun",
        emoji: "sun",
      },
    ],
  },
  {
    id: "pets",
    question: "Do you have pets at home?",
    subtitle: "We'll make sure to recommend only safe options.",
    icon: "paw",
    options: [
      {
        value: "yes",
        label: "Yes, I have pets",
        desc: "Show only pet-safe plants",
        emoji: "dog",
      },
      {
        value: "no",
        label: "No pets",
        desc: "Show all plants",
        emoji: "home",
      },
    ],
  },
  {
    id: "care",
    question: "How much plant care effort works for you?",
    subtitle: "Be honest — there's no wrong answer!",
    icon: "sprout",
    options: [
      {
        value: "easy",
        label: "Low Maintenance",
        desc: "Water it, forget it, still thrives",
        emoji: "smile",
      },
      {
        value: "moderate",
        label: "Some Attention",
        desc: "Weekly check-ins and occasional misting",
        emoji: "thumbs-up",
      },
      {
        value: "expert",
        label: "I Love Fussing",
        desc: "Bring on the finicky divas",
        emoji: "award",
      },
    ],
  },
];

export default function QuizPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [direction, setDirection] = useState("forward");
  const { addItem } = useCart();

  const step = steps[currentStep];
  const progress = ((currentStep + (showResults ? 1 : 0)) / steps.length) * 100;

  const selectOption = (value) => {
    setAnswers((prev) => ({ ...prev, [step.id]: value }));

    if (currentStep < steps.length - 1) {
      setDirection("forward");
      setTimeout(() => setCurrentStep((s) => s + 1), 200);
    } else {
      setDirection("forward");
      setTimeout(() => setShowResults(true), 200);
    }
  };

  const goBack = () => {
    if (showResults) {
      setShowResults(false);
    } else if (currentStep > 0) {
      setDirection("back");
      setCurrentStep((s) => s - 1);
    }
  };

  const restart = () => {
    setAnswers({});
    setCurrentStep(0);
    setShowResults(false);
    setDirection("forward");
  };

  const results = useMemo(() => {
    if (!showResults) return [];

    return plants
      .filter((p) => {
        if (answers.light && p.light !== answers.light) return false;
        if (answers.pets === "yes" && !p.petSafe) return false;
        if (answers.care && p.careLevel !== answers.care) return false;
        return true;
      })
      .slice(0, 3);
  }, [showResults, answers]);

  // If exact filters yield < 3, relax care level
  const relaxedResults = useMemo(() => {
    if (results.length >= 3) return results;
    if (!showResults) return [];

    const relaxed = plants
      .filter((p) => {
        if (answers.light && p.light !== answers.light) return false;
        if (answers.pets === "yes" && !p.petSafe) return false;
        return true;
      })
      .slice(0, 3);

    return relaxed.length > 0 ? relaxed : plants.slice(0, 3);
  }, [results, showResults, answers]);

  const displayResults = results.length >= 1 ? results : relaxedResults;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      {/* Header */}
      <div className="text-center mb-10 animate-fade-in-up">
        <span className="inline-block text-terracotta font-semibold text-xs tracking-widest uppercase mb-2">
          Plant Finder
        </span>
        <h1 className="font-heading text-3xl md:text-4xl font-bold text-charcoal">
          Find Your Perfect Match
        </h1>
        <p className="text-charcoal-light mt-2 text-sm">
          Answer 3 quick questions — we'll do the matchmaking.
        </p>
      </div>

      {/* Progress Bar */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-charcoal-light">
            {showResults ? "Complete!" : `Question ${currentStep + 1} of ${steps.length}`}
          </span>
          <span className="text-xs font-medium text-sage">
            {Math.round(progress)}%
          </span>
        </div>
        <div className="h-2 bg-sage/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-sage to-forest rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Quiz Body */}
      {!showResults ? (
        <div
          key={currentStep}
          className={`animate-fade-in-up`}
        >
          {/* Back button */}
          {currentStep > 0 && (
            <button
              onClick={goBack}
              className="flex items-center gap-1.5 text-sm text-charcoal-light hover:text-forest transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
          )}

          {/* Question */}
          <div className="text-center mb-8 flex flex-col items-center">
            <QuizIcon name={step.icon} className="w-16 h-16 text-forest mb-4" />
            <h2 className="font-heading text-2xl font-bold text-charcoal">
              {step.question}
            </h2>
            <p className="text-charcoal-light text-sm mt-1">{step.subtitle}</p>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {step.options.map((opt) => (
              <button
                key={opt.value}
                onClick={() => selectOption(opt.value)}
                className={`w-full flex items-center gap-4 p-5 rounded-2xl border-2 text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg ${
                  answers[step.id] === opt.value
                    ? "border-forest bg-forest/5 shadow-md"
                    : "border-sage/10 bg-white hover:border-sage/30"
                }`}
              >
                <QuizIcon name={opt.emoji} className="w-8 h-8 text-sage shrink-0" />
                <div>
                  <p className="font-heading font-semibold text-charcoal">
                    {opt.label}
                  </p>
                  <p className="text-xs text-charcoal-light mt-0.5">
                    {opt.desc}
                  </p>
                </div>
                {answers[step.id] === opt.value && (
                  <Check className="w-6 h-6 text-forest ml-auto shrink-0" />
                )}
              </button>
            ))}
          </div>
        </div>
      ) : (
        /* ── Results ── */
        <div className="animate-fade-in-up">
          <button
            onClick={goBack}
            className="flex items-center gap-1.5 text-sm text-charcoal-light hover:text-forest transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          <div className="text-center mb-8 flex flex-col items-center">
            <Sparkles className="w-16 h-16 text-terracotta mb-4 animate-bounce" />
            <h2 className="font-heading text-2xl font-bold text-charcoal">
              Your Perfect Matches!
            </h2>
            <p className="text-charcoal-light text-sm mt-1">
              Based on your answers, here are our top picks for you.
            </p>
          </div>

          {displayResults.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl border border-sage/10 flex flex-col items-center">
              <Sprout className="w-12 h-12 text-sage/30 mb-4" />
              <p className="font-heading font-semibold text-charcoal mb-2">
                No exact matches found
              </p>
              <p className="text-sm text-charcoal-light mb-4">
                Try adjusting your preferences or browse all plants.
              </p>
              <Link
                to="/shop"
                className="inline-flex px-5 py-2 rounded-full bg-forest text-cream text-sm font-semibold hover:bg-forest-light transition-colors"
              >
                Browse All Plants
              </Link>
            </div>
          ) : (
            <div className="space-y-4 stagger-children">
              {displayResults.map((plant, i) => (
                <div
                  key={plant.id}
                  className="flex items-center gap-5 bg-white rounded-2xl p-5 border border-sage/10 shadow-sm hover:shadow-lg transition-all duration-300"
                >
                  {/* Rank */}
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-forest to-sage flex items-center justify-center text-white font-heading font-bold text-sm shrink-0">
                    #{i + 1}
                  </div>

                  {/* Image */}
                  <div className="w-16 h-16 rounded-xl bg-sage/5 overflow-hidden flex items-center justify-center shrink-0 border border-sage/10">
                    <img src={plant.image} alt={plant.name} className="w-full h-full object-cover" />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-heading font-semibold text-charcoal">
                      {plant.name}
                    </h3>
                    <p className="text-xs text-charcoal-light mt-0.5 line-clamp-1">
                      {plant.description}
                    </p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className="text-[10px] bg-sage/10 text-sage-dark px-2 py-0.5 rounded-full font-medium">
                        {lightLabels[plant.light]}
                      </span>
                      <span className="text-[10px] bg-sage/10 text-sage-dark px-2 py-0.5 rounded-full font-medium">
                        {careLevelLabels[plant.careLevel]}
                      </span>
                      {plant.petSafe && (
                        <span className="text-[10px] bg-sage/10 text-sage-dark px-2 py-0.5 rounded-full font-medium flex items-center gap-0.5">
                          <PawPrint className="w-2.5 h-2.5 text-sage-dark" /> Safe
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Price + Add */}
                  <div className="text-right shrink-0">
                    <p className="font-heading font-bold text-forest text-lg">
                      ${plant.price}
                    </p>
                    <button
                      onClick={() => addItem(plant)}
                      className="mt-1 px-4 py-1.5 rounded-full bg-terracotta text-white text-xs font-semibold hover:bg-terracotta-dark transition-colors active:scale-95"
                    >
                      + Add
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* CTA */}
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <button
              onClick={restart}
              className="px-6 py-2.5 rounded-full border-2 border-forest text-forest text-sm font-semibold hover:bg-forest hover:text-cream transition-all duration-200"
            >
              Retake Quiz
            </button>
            <Link
              to="/shop"
              className="px-6 py-2.5 rounded-full bg-forest text-cream text-sm font-semibold hover:bg-forest-light transition-all duration-200 shadow-md"
            >
              Browse All Plants
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
