import React from 'react';
import { useStore } from '../context/StoreContext';
import { MapPin, Phone, Clock, ExternalLink, Navigation, CheckCircle } from 'lucide-react';

export const StoreLocation: React.FC = () => {
  const { storeInfo, getGeneralWhatsAppUrl } = useStore();

  const googleMapsUrl = "https://www.google.com/maps/search/?api=1&query=67+Rue+Aziz+BELLAL+Casablanca+20250+Maroc";

  const scheduleList = [
    { day: 'Lundi', hours: '10:00 – 20:00', open: true },
    { day: 'Mardi', hours: '10:00 – 20:00', open: true },
    { day: 'Mercredi', hours: '10:00 – 20:00', open: true },
    { day: 'Jeudi', hours: '10:00 – 20:00', open: true },
    { day: 'Vendredi', hours: '10:00 – 20:00', open: true },
    { day: 'Samedi', hours: '10:00 – 20:00', open: true },
    { day: 'Dimanche', hours: 'Fermé / horaires non confirmés', open: false },
  ];

  return (
    <section className="py-20 bg-white border-b border-neutral-100" id="store-location">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-neutral-500 mb-2">
            <MapPin className="w-3.5 h-3.5 text-neutral-900" />
            <span>Point de vente physique</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-neutral-950 font-normal">
            Visitez notre magasin
          </h2>
          <p className="mt-3 text-sm text-neutral-600 leading-relaxed">
            Venez découvrir nos collections en boutique, essayer vos tenues préférées et bénéficier des conseils de notre équipe à Casablanca.
          </p>
        </div>

        {/* 2-Column Info & Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Address, Phone, Hours */}
          <div className="lg:col-span-5 bg-neutral-50 p-6 sm:p-8 border border-neutral-200 flex flex-col justify-between">
            <div className="space-y-6">
              
              {/* Address card */}
              <div className="space-y-2">
                <span className="text-xs uppercase tracking-wider font-semibold text-neutral-500 block">
                  Adresse de la boutique
                </span>
                <p className="font-serif text-2xl text-neutral-950 font-medium leading-snug">
                  {storeInfo.address}
                </p>
                <p className="text-sm text-neutral-600">
                  {storeInfo.postalCode} {storeInfo.city}, {storeInfo.country}
                </p>
              </div>

              {/* Telephone */}
              <div className="pt-4 border-t border-neutral-200 space-y-2">
                <span className="text-xs uppercase tracking-wider font-semibold text-neutral-500 block">
                  Téléphone direct
                </span>
                <a
                  href={`tel:+${storeInfo.phone}`}
                  className="font-serif text-xl text-neutral-950 hover:text-neutral-700 transition-colors flex items-center gap-2"
                >
                  <Phone className="w-4 h-4 text-neutral-600" />
                  <span>{storeInfo.phoneDisplay}</span>
                </a>
              </div>

              {/* Opening Hours */}
              <div className="pt-4 border-t border-neutral-200 space-y-3">
                <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-neutral-500">
                  <Clock className="w-3.5 h-3.5 text-neutral-600" />
                  <span>Horaires d'ouverture</span>
                </div>
                
                <div className="space-y-1.5 text-xs text-neutral-700">
                  {scheduleList.map((item, idx) => (
                    <div 
                      key={idx} 
                      className={`flex justify-between py-1 border-b border-neutral-200/50 ${
                        item.day === 'Dimanche' ? 'text-neutral-400 italic' : 'text-neutral-800'
                      }`}
                    >
                      <span className="font-medium">{item.day}</span>
                      <span>{item.hours}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Google Maps Button */}
            <div className="mt-8 pt-6 border-t border-neutral-200 space-y-3">
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 bg-neutral-950 hover:bg-neutral-800 text-white text-xs font-semibold uppercase tracking-[0.16em] flex items-center justify-center gap-2 transition-colors shadow"
              >
                <Navigation className="w-4 h-4" />
                <span>Itinéraire Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5 ml-1" />
              </a>

              <a
                href={getGeneralWhatsAppUrl("Bonjour Casablanca Shopping, je souhaite préparer mon passage en magasin au 67 Rue Aziz BELLAL.")}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 border border-neutral-300 text-neutral-800 hover:bg-white text-xs font-medium uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
              >
                <span>Nous contacter avant votre visite</span>
              </a>
            </div>

          </div>

          {/* Right Column: Interactive Map Frame */}
          <div className="lg:col-span-7 bg-neutral-100 border border-neutral-200 min-h-[420px] relative overflow-hidden flex flex-col">
            <iframe
              title="Carte localisation Casablanca Shopping - 67 Rue Aziz BELLAL"
              src="https://maps.google.com/maps?q=67%20Rue%20Aziz%20BELLAL,%20Casablanca%2020250,%20Morocco&t=&z=16&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full min-h-[380px] border-0"
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            
            <div className="bg-white p-4 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-600 gap-2">
              <span className="flex items-center gap-1.5 font-medium text-neutral-900">
                <MapPin className="w-4 h-4 text-red-600 shrink-0" />
                67 Rue Aziz BELLAL, Casablanca 20250, Maroc
              </span>
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-900 underline font-medium hover:text-neutral-600"
              >
                Ouvrir dans l'application Google Maps
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
