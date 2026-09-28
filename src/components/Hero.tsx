import React from 'react';
import { useStore } from '../context/StoreContext';
import { ArrowRight, MessageCircle, MapPin, Sparkles } from 'lucide-react';

export const Hero: React.FC = () => {
  const { setActiveTab, getGeneralWhatsAppUrl, storeInfo } = useStore();

  return (
    <section className="relative overflow-hidden bg-neutral-950 text-white min-h-[85vh] flex items-center">
      {/* Background with luxury editorial imagery and gradient overlays */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=2000&q=85"
          alt="Mode contemporaine et élégante Casablanca"
          className="w-full h-full object-cover object-center opacity-40 scale-105 transition-transform duration-1000 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/90 via-neutral-950/60 to-neutral-950/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-neutral-950/40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 w-full">
        <div className="max-w-3xl space-y-8">
          
          {/* Subtle location indicator */}
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-neutral-300 border-b border-neutral-700/60 pb-2">
            <MapPin className="w-3.5 h-3.5 text-neutral-400" />
            <span>Casablanca · 67 Rue Aziz BELLAL</span>
            <span className="text-neutral-500">·</span>
            <span className="text-neutral-400">Magasin de vêtements</span>
          </div>

          {/* Main Brand & Title */}
          <div className="space-y-4">
            <h2 className="text-xs sm:text-sm uppercase tracking-[0.35em] text-neutral-400 font-medium">
              CASABLANCA SHOPPING
            </h2>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight leading-[1.08] text-white">
              Votre style. <br />
              <span className="italic font-normal text-neutral-200">Votre élégance.</span> <br />
              Votre boutique à Casablanca.
            </h1>
          </div>

          {/* Subtitle */}
          <p className="text-base sm:text-lg md:text-xl text-neutral-300 font-light leading-relaxed max-w-2xl">
            Découvrez notre sélection de vêtements et trouvez votre prochain look.
          </p>

          {/* CTA Buttons */}
          <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <button
              onClick={() => {
                setActiveTab('shop');
                window.scrollTo({ top: 600, behavior: 'smooth' });
              }}
              className="inline-flex items-center justify-center gap-3 bg-white text-neutral-950 hover:bg-neutral-100 px-8 py-4 text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-200 shadow-lg hover:shadow-xl group"
            >
              <span>Découvrir la boutique</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            <a
              href={getGeneralWhatsAppUrl("Bonjour Casablanca Shopping, je découvre votre boutique et souhaite voir vos vêtements disponibles.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 bg-emerald-600/90 hover:bg-emerald-600 text-white px-7 py-4 text-xs uppercase tracking-[0.2em] font-semibold border border-emerald-500/40 backdrop-blur-sm transition-all duration-200"
            >
              <MessageCircle className="w-4 h-4 text-white" />
              <span>Commander sur WhatsApp</span>
            </a>
          </div>

          {/* Value Badges with clean typography */}
          <div className="pt-8 grid grid-cols-2 sm:grid-cols-3 gap-6 border-t border-neutral-800 text-xs text-neutral-300">
            <div>
              <p className="font-serif text-lg text-white">4,8 / 5</p>
              <p className="text-neutral-400 text-[11px] tracking-wide mt-0.5">4 avis Google vérifiés</p>
            </div>
            <div>
              <p className="font-serif text-lg text-white">Boutique physique</p>
              <p className="text-neutral-400 text-[11px] tracking-wide mt-0.5">67 Rue Aziz BELLAL</p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <p className="font-serif text-lg text-white">Retrait & Conseils</p>
              <p className="text-neutral-400 text-[11px] tracking-wide mt-0.5">Lun – Sam : 10h – 20h</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
