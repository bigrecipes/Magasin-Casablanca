import React, { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from './ProductCard';
import { 
  Filter, 
  Search, 
  SlidersHorizontal, 
  X, 
  RotateCcw,
  Sparkles,
  Info
} from 'lucide-react';

export const ShopCatalog: React.FC = () => {
  const { 
    products, 
    searchTerm, 
    setSearchTerm, 
    selectedCategory, 
    setSelectedCategory,
    sortBy,
    setSortBy
  } = useStore();

  const [selectedSizeFilter, setSelectedSizeFilter] = useState<string>('all');
  const [selectedColorFilter, setSelectedColorFilter] = useState<string>('all');
  const [maxPriceFilter, setMaxPriceFilter] = useState<number>(2000);
  const [onlyInStock, setOnlyInStock] = useState<boolean>(false);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState<boolean>(false);

  const categories = ['all', 'Femme', 'Homme', 'Nouveautés', 'Collections', 'Promotions', 'Accessoires'];
  const allSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  // Extract unique colors across products
  const availableColors = useMemo(() => {
    const map = new Map<string, string>();
    products.forEach((p) => {
      p.colors.forEach((c) => {
        if (!map.has(c.name)) map.set(c.name, c.hex);
      });
    });
    return Array.from(map.entries()).map(([name, hex]) => ({ name, hex }));
  }, [products]);

  // Filter & sort logic
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Search term
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesCategory = product.category.toLowerCase().includes(query);
        const matchesSku = product.sku.toLowerCase().includes(query);
        const matchesDesc = product.description.toLowerCase().includes(query);
        if (!matchesName && !matchesCategory && !matchesSku && !matchesDesc) {
          return false;
        }
      }

      // Category
      if (selectedCategory !== 'all') {
        if (selectedCategory === 'Nouveautés' && !product.isNew && product.category !== 'Nouveautés') {
          return false;
        } else if (selectedCategory === 'Promotions' && !product.isPromo && product.category !== 'Promotions') {
          return false;
        } else if (
          selectedCategory !== 'Nouveautés' && 
          selectedCategory !== 'Promotions' && 
          product.category.toLowerCase() !== selectedCategory.toLowerCase()
        ) {
          return false;
        }
      }

      // Price filter
      if (product.price > maxPriceFilter) {
        return false;
      }

      // Size filter
      if (selectedSizeFilter !== 'all') {
        if (!product.sizes.includes(selectedSizeFilter)) {
          return false;
        }
      }

      // Color filter
      if (selectedColorFilter !== 'all') {
        if (!product.colors.some((c) => c.name.toLowerCase() === selectedColorFilter.toLowerCase())) {
          return false;
        }
      }

      // Stock status
      if (onlyInStock && product.stockStatus === 'out_of_stock') {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      return 0; // default featured
    });
  }, [products, searchTerm, selectedCategory, maxPriceFilter, selectedSizeFilter, selectedColorFilter, onlyInStock, sortBy]);

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedSizeFilter('all');
    setSelectedColorFilter('all');
    setMaxPriceFilter(2000);
    setOnlyInStock(false);
    setSortBy('featured');
  };

  const hasActiveFilters = 
    searchTerm !== '' || 
    selectedCategory !== 'all' || 
    selectedSizeFilter !== 'all' || 
    selectedColorFilter !== 'all' || 
    maxPriceFilter < 2000 || 
    onlyInStock;

  return (
    <section className="py-16 bg-[#FAFAFA]" id="shop-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-8 space-y-2">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-neutral-500">
            <span>Catalogue Prêt-à-porter</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-neutral-950 font-normal">
              La Boutique Casablanca
            </h1>
            <p className="text-xs text-neutral-500 font-sans">
              {filteredProducts.length} {filteredProducts.length <= 1 ? 'vêtement trouvé' : 'vêtements trouvés'}
            </p>
          </div>
        </div>

        {/* Notice on Sample Data / Replacement */}
        <div className="mb-8 p-4 bg-white border border-neutral-200 text-xs text-neutral-600 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
          <div className="flex items-start gap-2.5">
            <Info className="w-4 h-4 text-neutral-700 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-neutral-900 block">
                Information importante pour Casablanca Shopping :
              </span>
              <p className="text-[11px] text-neutral-500">
                Les fiches comportant la mention « Exemple — à remplacer » sont des démonstrations. Vous pouvez les remplacer par vos photos réelles, prix et stocks authentiques à tout moment via l'Espace Administration.
              </p>
            </div>
          </div>
        </div>

        {/* Filter Bar & Controls */}
        <div className="bg-white p-4 sm:p-5 border border-neutral-200 mb-8 shadow-xs">
          <div className="flex flex-wrap items-center justify-between gap-4">
            
            {/* Category Segmented Buttons */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 w-full lg:w-auto">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 text-xs uppercase tracking-wider font-medium whitespace-nowrap transition-colors border ${
                    selectedCategory === cat
                      ? 'bg-neutral-950 text-white border-neutral-950'
                      : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-400'
                  }`}
                >
                  {cat === 'all' ? 'Tout le catalogue' : cat}
                </button>
              ))}
            </div>

            {/* Right Tools: Sort & Mobile Filter Toggle */}
            <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
              
              {/* Sort Dropdown */}
              <div className="flex items-center gap-2 text-xs">
                <span className="text-neutral-500 hidden sm:inline">Trier par :</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-neutral-50 border border-neutral-200 text-neutral-900 py-1.5 px-3 text-xs focus:outline-none focus:border-neutral-950"
                >
                  <option value="featured">Sélection vedette</option>
                  <option value="newest">Nouveautés en premier</option>
                  <option value="price-asc">Prix croissant (MAD)</option>
                  <option value="price-desc">Prix décroissant (MAD)</option>
                </select>
              </div>

              {/* Filter drawer toggle button */}
              <button
                onClick={() => setIsFilterDrawerOpen(!isFilterDrawerOpen)}
                className={`flex items-center gap-2 py-1.5 px-3 text-xs border transition-colors ${
                  isFilterDrawerOpen || hasActiveFilters
                    ? 'border-neutral-950 bg-neutral-100 text-neutral-950 font-medium'
                    : 'border-neutral-200 text-neutral-700 hover:border-neutral-400'
                }`}
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Filtres avancés</span>
                {hasActiveFilters && (
                  <span className="w-2 h-2 rounded-full bg-neutral-950"></span>
                )}
              </button>

              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="text-xs text-neutral-500 hover:text-neutral-900 flex items-center gap-1 underline"
                  title="Réinitialiser tous les filtres"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span className="hidden md:inline">Effacer</span>
                </button>
              )}
            </div>

          </div>

          {/* Expandable Advanced Filters Drawer */}
          {isFilterDrawerOpen && (
            <div className="mt-5 pt-5 border-t border-neutral-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-fadeIn">
              
              {/* Search text */}
              <div>
                <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-2">
                  Mot-clé / Recherche
                </label>
                <div className="relative">
                  <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Chemise, costume, robe..."
                    className="w-full text-xs pl-9 pr-3 py-2 border border-neutral-300 focus:outline-none focus:border-neutral-950"
                  />
                </div>
              </div>

              {/* Max Price slider */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-semibold text-neutral-700 uppercase tracking-wider">
                    Prix Maximum
                  </label>
                  <span className="text-xs font-bold text-neutral-950">{maxPriceFilter} MAD</span>
                </div>
                <input
                  type="range"
                  min="200"
                  max="2000"
                  step="50"
                  value={maxPriceFilter}
                  onChange={(e) => setMaxPriceFilter(Number(e.target.value))}
                  className="w-full accent-neutral-950 cursor-pointer"
                />
              </div>

              {/* Size filter */}
              <div>
                <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-2">
                  Taille
                </label>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    onClick={() => setSelectedSizeFilter('all')}
                    className={`px-2.5 py-1 text-xs border ${
                      selectedSizeFilter === 'all'
                        ? 'bg-neutral-950 text-white border-neutral-950'
                        : 'border-neutral-200 text-neutral-700 hover:border-neutral-400'
                    }`}
                  >
                    Toutes
                  </button>
                  {allSizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSizeFilter(s)}
                      className={`px-2.5 py-1 text-xs border ${
                        selectedSizeFilter === s
                          ? 'bg-neutral-950 text-white border-neutral-950'
                          : 'border-neutral-200 text-neutral-700 hover:border-neutral-400'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Colors filter */}
              <div>
                <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-2">
                  Couleur
                </label>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedColorFilter('all')}
                    className={`text-xs px-2 py-1 border ${
                      selectedColorFilter === 'all'
                        ? 'border-neutral-950 font-bold'
                        : 'border-neutral-200 text-neutral-600'
                    }`}
                  >
                    Toutes
                  </button>
                  {availableColors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColorFilter(c.name)}
                      title={c.name}
                      className={`w-6 h-6 rounded-full border-2 transition-transform ${
                        selectedColorFilter === c.name
                          ? 'border-neutral-950 scale-110 shadow-sm ring-1 ring-neutral-950'
                          : 'border-neutral-300 hover:scale-105'
                      }`}
                      style={{ backgroundColor: c.hex }}
                    />
                  ))}
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white p-12 text-center border border-neutral-200 space-y-4">
            <div className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-400 mx-auto">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl text-neutral-900 font-normal">
              Aucun vêtement ne correspond à vos filtres
            </h3>
            <p className="text-xs text-neutral-500 max-w-md mx-auto">
              Modifiez votre recherche ou réinitialisez les critères pour visualiser l'ensemble de la collection.
            </p>
            <button
              onClick={resetFilters}
              className="mt-2 px-6 py-2.5 bg-neutral-950 text-white text-xs uppercase tracking-wider font-semibold hover:bg-neutral-800 transition-colors"
            >
              Réinitialiser les filtres
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
