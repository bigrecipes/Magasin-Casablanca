import React from 'react';
import { useStore } from '../context/StoreContext';
import { MapPin, Phone, MessageCircle, ExternalLink, ShieldCheck, Lock } from 'lucide-react';

export const Footer: React.FC = () => {
  const { storeInfo, setActiveTab, getGeneralWhatsAppUrl } = useStore();

  const handleNav = (tab: string) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-neutral-950 text-neutral-300 border-t border-neutral-800">
      
      {/* Upper Footer: Value Props */}
      <div className="border-b border-neutral-800/80 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-center sm:text-left">
          
          <div className="flex items-start gap-4 justify-center sm:justify-start">
            <div className="w-10 h-10 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center shrink-0 text-white">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-serif text-lg text-white font-normal">Boutique physique à Casablanca</h4>
              <p className="text-xs text-neutral-400 mt-1">
                67 Rue Aziz BELLAL, Casablanca 20250. Accueil & essayage sur place.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 justify-center sm:justify-start">
            <div className="w-10 h-10 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center shrink-0 text-emerald-400">
              <MessageCircle className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-serif text-lg text-white font-normal">Commandes & Renseignements</h4>
              <p className="text-xs text-neutral-400 mt-1">
                Service client réactif sur WhatsApp au +212 701 179 767.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 justify-center sm:justify-start">
            <div className="w-10 h-10 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center shrink-0 text-amber-400">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-serif text-lg text-white font-normal">Note Google : 4,8 / 5</h4>
              <p className="text-xs text-neutral-400 mt-1">
                Transparence garantie basée sur les 4 avis Google vérifiés.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          
          {/* Brand & Presentation */}
          <div className="md:col-span-4 space-y-4">
            <h3 className="font-serif text-2xl tracking-wider text-white uppercase">
              CASABLANCA SHOPPING
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Casablanca Shopping est une boutique de vêtements située au cœur de Casablanca. La boutique propose une sélection de mode destinée aux clients à la recherche de styles modernes et élégants.
            </p>
            <div className="pt-2 text-xs text-neutral-500">
              <p>Magasin de vêtements / Clothing Store</p>
              <p>Casablanca · Maroc</p>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-white">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-400">
              <li>
                <button onClick={() => handleNav('home')} className="hover:text-white transition-colors">
                  Accueil
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('shop')} className="hover:text-white transition-colors">
                  Boutique & Catalogue
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('new')} className="hover:text-white transition-colors">
                  Nouveautés
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('collections')} className="hover:text-white transition-colors">
                  Collections
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('about')} className="hover:text-white transition-colors">
                  À propos
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('contact')} className="hover:text-white transition-colors">
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Store Coordinates */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-white">
              Informations Magasin
            </h4>
            <div className="space-y-3 text-xs text-neutral-400">
              <div className="space-y-1">
                <p className="text-white font-medium">Casablanca Shopping</p>
                <p>67 Rue Aziz BELLAL</p>
                <p>Casablanca 20250</p>
                <p>Maroc</p>
              </div>

              <div className="pt-2 space-y-1">
                <p className="text-white font-medium">Téléphone :</p>
                <a href={`tel:+${storeInfo.phone}`} className="hover:text-white transition-colors block">
                  {storeInfo.phoneDisplay}
                </a>
              </div>

              <div className="pt-2 space-y-1">
                <p className="text-white font-medium">Horaires :</p>
                <p>Lundi – Samedi : 10:00 – 20:00</p>
                <p className="text-neutral-500 italic">Dimanche : fermé / non confirmé</p>
              </div>
            </div>
          </div>

          {/* Direct Actions & Administration */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-white">
              Liens Utiles
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-400">
              <li>
                <a
                  href={getGeneralWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>WhatsApp Officiel</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=67+Rue+Aziz+BELLAL+Casablanca+20250+Maroc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-neutral-400" />
                  <span>Google Maps</span>
                </a>
              </li>
              {storeInfo.instagramUrl && (
                <li>
                  <a
                    href={storeInfo.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    Instagram
                  </a>
                </li>
              )}
              {storeInfo.facebookUrl && (
                <li>
                  <a
                    href={storeInfo.facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    Facebook
                  </a>
                </li>
              )}
              <li className="pt-4 border-t border-neutral-800">
                <button
                  onClick={() => handleNav('admin')}
                  className="text-neutral-500 hover:text-neutral-300 flex items-center gap-1.5 text-[11px]"
                >
                  <Lock className="w-3 h-3" />
                  <span>Gestion Boutique</span>
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright & compliance bar */}
        <div className="mt-16 pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between text-[11px] text-neutral-500 gap-4">
          <p>© {new Date().getFullYear()} Casablanca Shopping — Tous droits réservés.</p>
          <p className="text-center sm:text-right">
            67 Rue Aziz BELLAL, Casablanca 20250, Maroc · Tél : +212 701 179 767
          </p>
        </div>
      </div>
    </footer>
  );
};
