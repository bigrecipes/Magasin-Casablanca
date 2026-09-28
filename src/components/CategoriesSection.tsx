import React from 'react';
import { useStore } from '../context/StoreContext';
import { ArrowUpRight, Sparkles, SlidersHorizontal } from 'lucide-react';

interface CategoryItem {
  id: string;
  name: string;
  description: string;
  image: string;
}

const CATEGORIES: CategoryItem[] = [
  {
    id: 'Femme',
    name: 'Femme',
    description: 'Robes fluides, ensembles et pièces féminines contemporaines',
    image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'Homme',
    name: 'Homme',
    description: 'Costumes, chemises, polos et vestiaires masculins raffinés',
    image: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'Nouveautés',
    name: 'Nouveautés',
    description: 'Derniers arrivages et tendances mode récentes',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'Collections',
    name: 'Collections',
    description: 'Pièces sélectionnées pour composer des looks complets',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'Promotions',
    name: 'Promotions',
    description: 'Opportunités et offres spéciales disponibles',
    image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'Accessoires',
    name: 'Accessoires',
    description: 'Détails de style et finitions élégantes',
    image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=80',
  },
];

export const CategoriesSection: React.FC = () => {
  const { setSelectedCategory, setActiveTab } = useStore();

  const handleSelectCategory = (catId: string) => {
    setSelectedCategory(catId);
    setActiveTab('shop');
    const shopEl = document.getElementById('shop-section');
    if (shopEl) {
      shopEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 bg-white border-b border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-neutral-200 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-neutral-500 mb-2">
              <span>Navigation du catalogue</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-neutral-950 font-normal">
              Explorer par catégorie
            </h2>
          </div>
          
          <div className="text-xs text-neutral-500 max-w-md">
            Structure de catalogue modulable — à personnaliser par le propriétaire de Casablanca Shopping selon les arrivages réels du magasin.
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {CATEGORIES.map((category) => (
            <div
              key={category.id}
              onClick={() => handleSelectCategory(category.id)}
              className="group cursor-pointer relative overflow-hidden bg-neutral-100 transition-all duration-300 hover:shadow-md border border-neutral-200/60"
            >
              {/* Image container */}
              <div className="aspect-[4/5] w-full overflow-hidden bg-neutral-200">
                <img
                  src={category.image}
                  alt={category.name}
                  loading="lazy"
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 filter saturate-[0.85] group-hover:saturate-100"
                />
              </div>

              {/* Minimal overlay info */}
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/85 via-neutral-950/20 to-transparent flex flex-col justify-end p-6 text-white">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-serif text-2xl font-normal tracking-wide text-white group-hover:translate-x-1 transition-transform">
                    {category.name}
                  </h3>
                  <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white group-hover:bg-white group-hover:text-neutral-950 transition-colors">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
                <p className="text-xs text-neutral-300 line-clamp-2 font-light">
                  {category.description}
                </p>
                <div className="mt-3 pt-3 border-t border-white/15 flex items-center justify-between text-[11px] text-neutral-400">
                  <span className="uppercase tracking-wider">Voir les articles</span>
                  <span className="text-[10px] text-neutral-400">Catalogue Casablanca</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
