import React from 'react';
import { useStore } from '../context/StoreContext';
import { Star, ShieldCheck, ExternalLink, MessageSquarePlus } from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  const { storeInfo } = useStore();

  return (
    <section className="py-20 bg-neutral-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-neutral-400 border-b border-neutral-800 pb-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Transparence & Avis Vérifiés</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light">
            La satisfaction de nos clients à Casablanca
          </h2>

          {/* Rating Display */}
          <div className="py-8 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12">
            <div className="text-center sm:text-left">
              <div className="font-serif text-6xl sm:text-7xl font-bold tracking-tight text-white">
                4,8 <span className="text-2xl font-light text-neutral-400">/ 5</span>
              </div>
              <p className="text-xs uppercase tracking-wider text-neutral-400 mt-1">
                Note Google actuellement disponible
              </p>
            </div>

            <div className="h-12 w-px bg-neutral-800 hidden sm:block"></div>

            <div className="space-y-2 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400" />
                ))}
              </div>
              <p className="text-sm font-medium text-neutral-200">
                Basé sur les 4 avis Google officiels
              </p>
              <p className="text-xs text-neutral-500">
                Magasin physique au 67 Rue Aziz BELLAL, Casablanca
              </p>
            </div>
          </div>

          {/* Transparent Notice & Link to Google Maps */}
          <div className="bg-neutral-950/60 border border-neutral-800 p-6 rounded-lg max-w-2xl mx-auto text-xs text-neutral-400 space-y-3">
            <p>
              Conformément à notre politique de rigueur et d'authenticité, nous ne publions aucun témoignage artificiel. Vous pouvez consulter les avis déposés par les clients sur la fiche Google officielle ou laisser votre propre retour d'expérience suite à votre passage en magasin.
            </p>
            
            <div className="pt-2 flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="https://www.google.com/maps/search/?api=1&query=67+Rue+Aziz+BELLAL+Casablanca+20250+Maroc"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-white bg-neutral-800 hover:bg-neutral-700 py-2.5 px-5 transition-colors border border-neutral-700"
              >
                <span>Consulter la fiche Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <a
                href="https://www.google.com/maps/search/?api=1&query=67+Rue+Aziz+BELLAL+Casablanca+20250+Maroc"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-emerald-400 hover:text-emerald-300 py-2.5 px-3 transition-colors"
              >
                <MessageSquarePlus className="w-3.5 h-3.5" />
                <span>Laisser un avis sur Google</span>
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
