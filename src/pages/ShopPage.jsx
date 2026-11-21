import { useState, useMemo } from "react";
import { useCart } from "../context/CartContext";
import { plants, lightLabels } from "../data/plantData";
import { Sun, Search, Check, X, PawPrint, Filter } from "lucide-react";
import ScrollReveal from "../components/ScrollReveal";

const categoryLabels = {
  all: "All Collection",
  tropical: "Tropicals",
  succulent: "Succulents",
  trailing: "Trailing",
  fern: "Ferns",
  flowering: "Flowering & Flowers"
};

function PlantCard({ plant }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem(plant);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <div className="group bg-white rounded-2xl border border-sage/10 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      {/* Image */}
      <div className="h-48 bg-gradient-to-br from-sage/5 to-sage/15 relative overflow-hidden">
        <img
          src={plant.image}
          alt={plant.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {plant.petSafe && (
            <span className="text-[10px] font-semibold bg-sage/90 text-white px-2.5 py-1 rounded-full flex items-center gap-1 backdrop-blur-sm">
              <PawPrint className="w-3 h-3 text-white" /> Pet Safe
            </span>
          )}
          <span className="text-[10px] font-medium bg-white/90 text-charcoal px-2.5 py-1 rounded-full backdrop-blur-sm border border-sage/5">
            {lightLabels[plant.light]}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-5 space-y-3">
        <div>
          <h3 className="font-heading font-semibold text-charcoal truncate">
            {plant.name}
          </h3>
          <p className="text-xs text-charcoal-light mt-1 line-clamp-2 leading-relaxed">
            {plant.description}
          </p>
        </div>

        <div className="flex items-center justify-between pt-1">
          <span className="font-heading font-bold text-forest text-xl">
            ${plant.price}
          </span>
          <button
            onClick={handleAdd}
            disabled={added}
            className={`px-5 py-2 rounded-full text-xs font-semibold transition-all duration-200 active:scale-95 flex items-center gap-1 ${
              added
                ? "bg-sage text-white cursor-default"
                : "bg-terracotta text-white hover:bg-terracotta-dark hover:shadow-md"
            }`}
          >
            {added ? <Check className="w-3.5 h-3.5" /> : null}
            {added ? "Added!" : "+ Quick Add"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [lightFilter, setLightFilter] = useState([]);
  const [petSafeOnly, setPetSafeOnly] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const toggleLight = (val) =>
    setLightFilter((prev) =>
      prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val]
    );

  const filtered = useMemo(() => {
    return plants.filter((p) => {
      if (activeCategory !== "all" && p.category !== activeCategory)
        return false;
      if (lightFilter.length > 0 && !lightFilter.includes(p.light))
        return false;
      if (petSafeOnly && !p.petSafe) return false;
      return true;
    });
  }, [activeCategory, lightFilter, petSafeOnly]);

  const activeCount =
    lightFilter.length + (petSafeOnly ? 1 : 0) + (activeCategory !== "all" ? 1 : 0);

  const clearFilters = () => {
    setLightFilter([]);
    setPetSafeOnly(false);
    setActiveCategory("all");
  };

  const FilterPanel = () => (
    <div className="space-y-6">
      {/* Light Requirement */}
      <div>
        <h3 className="font-heading font-semibold text-sm text-charcoal mb-3 flex items-center gap-2">
          <Sun className="w-4 h-4 text-sage" /> Light Requirement
        </h3>
        <div className="space-y-2">
          {Object.entries(lightLabels).map(([key, label]) => (
            <label
              key={key}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div
                className={`w-5 h-5 rounded-md border-2 transition-all duration-200 flex items-center justify-center ${
                  lightFilter.includes(key)
                    ? "bg-forest border-forest"
                    : "border-sage/30 group-hover:border-sage"
                }`}
                onClick={() => toggleLight(key)}
              >
                {lightFilter.includes(key) && (
                  <Check className="w-3 h-3 text-white stroke-[3px]" />
                )}
              </div>
              <span className="text-sm text-charcoal-light group-hover:text-charcoal transition-colors">
                {label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Pet Safety */}
      <div>
        <h3 className="font-heading font-semibold text-sm text-charcoal mb-3 flex items-center gap-2">
          <PawPrint className="w-4 h-4 text-sage" /> Pet Safety
        </h3>
        <label className="flex items-center gap-3 cursor-pointer group">
          <div
            className={`relative w-10 h-6 rounded-full transition-colors duration-200 ${
              petSafeOnly ? "bg-forest" : "bg-sage/20"
            }`}
            onClick={() => setPetSafeOnly(!petSafeOnly)}
          >
            <div
              className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${
                petSafeOnly ? "translate-x-5" : "translate-x-1"
              }`}
            />
          </div>
          <span className="text-sm text-charcoal-light group-hover:text-charcoal transition-colors">
            Pet-safe only
          </span>
        </label>
      </div>

      {/* Clear */}
      {activeCount > 0 && (
        <button
          onClick={clearFilters}
          className="text-xs text-terracotta hover:text-terracotta-dark font-medium transition-colors"
        >
          Clear all filters ({activeCount})
        </button>
      )}
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      {/* Header */}
      <ScrollReveal variant="up">
        <div className="mb-10">
          <span className="inline-block text-terracotta font-semibold text-xs tracking-widest uppercase mb-2">
            Our Collection
          </span>
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-charcoal">
            Shop All Plants & Flowers
          </h1>
          <p className="text-charcoal-light mt-2 text-sm">
            {filtered.length} {filtered.length === 1 ? "plant" : "plants"} available
          </p>
        </div>
      </ScrollReveal>

      {/* Category Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-4 mb-8 scrollbar-hide border-b border-sage/10">
        {Object.entries(categoryLabels).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setActiveCategory(key)}
            className={`px-5 py-2.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-300 ${
              activeCategory === key
                ? "bg-forest text-cream shadow-md"
                : "bg-white text-charcoal hover:bg-sage/10 border border-sage/10"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar — Desktop */}
        <aside className="hidden lg:block w-60 shrink-0">
          <div className="sticky top-24 bg-white rounded-2xl p-6 border border-sage/10 shadow-sm">
            <h2 className="font-heading font-semibold text-charcoal mb-5 flex items-center gap-2">
              <Filter className="w-4 h-4 text-sage" />
              Filters
            </h2>
            <FilterPanel />
          </div>
        </aside>

        {/* Mobile filter toggle */}
        <div className="lg:hidden">
          <button
            id="filter-toggle"
            onClick={() => setFiltersOpen(!filtersOpen)}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white border border-sage/10 shadow-sm text-sm font-medium text-charcoal hover:bg-sage/5 transition-colors"
          >
            <Filter className="w-4 h-4 text-sage" />
            Filters
            {activeCount > 0 && (
              <span className="bg-terracotta text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
                {activeCount}
              </span>
            )}
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ${
              filtersOpen ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0"
            }`}
          >
            <div className="bg-white rounded-2xl p-6 border border-sage/10 shadow-sm">
              <FilterPanel />
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex-1">
          {filtered.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-sage/10">
              <Search className="w-12 h-12 text-sage/30 mx-auto mb-4 animate-pulse" />
              <p className="font-heading text-lg font-medium text-charcoal mb-1">
                No plants match your filters
              </p>
              <p className="text-sm text-charcoal-light mb-4">
                Try adjusting your criteria or clear all filters.
              </p>
              <button
                onClick={clearFilters}
                className="px-5 py-2 rounded-full bg-forest text-cream text-sm font-semibold hover:bg-forest-light transition-colors"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {filtered.map((plant, index) => (
                <ScrollReveal
                  key={plant.id}
                  variant="scale"
                  delay={(index % 3) * 100}
                  duration={600}
                >
                  <PlantCard plant={plant} />
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
