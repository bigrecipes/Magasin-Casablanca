import React from 'react';
import { useStore } from '../context/StoreContext';
import { MapPin, Phone, Clock, Sparkles, ShieldCheck, HeartHandshake } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const { storeInfo, setActiveTab, getGeneralWhatsAppUrl } = useStore();

  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-neutral-500 border-b border-neutral-200 pb-2">
            <span>Notre Identité</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-neutral-950 font-normal">
            À propos de Casablanca Shopping
          </h1>
          <p className="text-neutral-500 text-sm tracking-wide uppercase">
            Magasin de vêtements · Casablanca, Maroc
          </p>
        </div>

        {/* Core Presentation Content */}
        <div className="max-w-4xl mx-auto space-y-12">
          
          {/* Main Statement Box */}
          <div className="bg-neutral-50 p-8 sm:p-12 border border-neutral-200/80 text-center space-y-6">
            <blockquote className="font-serif text-2xl sm:text-3xl text-neutral-900 leading-relaxed font-light italic">
              « Casablanca Shopping est une boutique de vêtements située au cœur de Casablanca. La boutique propose une sélection de mode destinée aux clients à la recherche de styles modernes et élégants. »
            </blockquote>

            <div className="pt-6 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-center gap-6 text-xs text-neutral-700">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-neutral-900" />
                <span><strong>Notre magasin physique :</strong> 67 Rue Aziz BELLAL, Casablanca 20250, Maroc</span>
              </div>
              <span className="hidden sm:inline text-neutral-300">|</span>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-neutral-900" />
                <span><strong>Téléphone :</strong> {storeInfo.phoneDisplay}</span>
              </div>
            </div>
          </div>

          {/* Pillars of Service */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
            <div className="p-6 bg-white border border-neutral-200 space-y-3">
              <Sparkles className="w-6 h-6 text-neutral-800" />
              <h3 className="font-serif text-xl text-neutral-950 font-normal">
                Sélection Stylistique
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Des coupes structurées, des matières agréables et des silhouettes pensées pour valoriser votre allure au quotidien comme pour les occasions particulières.
              </p>
            </div>

            <div className="p-6 bg-white border border-neutral-200 space-y-3">
              <HeartHandshake className="w-6 h-6 text-neutral-800" />
              <h3 className="font-serif text-xl text-neutral-950 font-normal">
                Accueil & Conseil
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Notre boutique physique vous accueille avec attention afin de vous guider sur les tailles, les associations de styles et les finitions.
              </p>
            </div>

            <div className="p-6 bg-white border border-neutral-200 space-y-3">
              <ShieldCheck className="w-6 h-6 text-neutral-800" />
              <h3 className="font-serif text-xl text-neutral-950 font-normal">
                Transparence Totale
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Une note Google de 4,8/5 basée sur 4 avis authentiques. Nous privilégions une relation de confiance durable avec chaque client.
              </p>
            </div>
          </div>

          {/* CTA Box */}
          <div className="p-8 bg-neutral-900 text-white flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center sm:text-left">
              <h4 className="font-serif text-2xl font-light">Envie de découvrir nos articles ?</h4>
              <p className="text-xs text-neutral-400">Consultez notre sélection en ligne ou venez nous rendre visite au magasin.</p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setActiveTab('shop')}
                className="py-3 px-6 bg-white text-neutral-950 text-xs uppercase tracking-wider font-semibold hover:bg-neutral-100 transition-colors"
              >
                Voir le catalogue
              </button>
              <a
                href={getGeneralWhatsAppUrl("Bonjour Casablanca Shopping, j'ai lu votre page À propos et je souhaite vous contacter.")}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-6 bg-emerald-600 hover:bg-emerald-700 text-white text-xs uppercase tracking-wider font-semibold transition-colors"
              >
                Discuter sur WhatsApp
              </a>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
