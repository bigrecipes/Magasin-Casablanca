import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  Phone, 
  MessageCircle, 
  MapPin, 
  Clock, 
  Mail, 
  Send, 
  CheckCircle2, 
  ExternalLink,
  Navigation
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { storeInfo, getGeneralWhatsAppUrl } = useStore();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('Renseignement vêtement');
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !message.trim()) return;

    // Send inquiry directly through WhatsApp or acknowledge
    const text = `Bonjour Casablanca Shopping,\n\nNouveau message depuis le formulaire de contact du site web :\n• Nom : ${name}\n• Téléphone : ${phone}\n• Sujet : ${subject}\n• Message : ${message}`;
    const whatsappUrl = `https://wa.me/${storeInfo.phone}?text=${encodeURIComponent(text)}`;
    
    setIsSent(true);
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="py-20 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-neutral-500 border-b border-neutral-200 pb-2">
            <span>Contact & Coordonnées</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl text-neutral-950 font-normal">
            Contactez Casablanca Shopping
          </h1>
          <p className="text-sm text-neutral-600">
            Notre équipe est à votre disposition par téléphone, WhatsApp ou directement au magasin.
          </p>
        </div>

        {/* 2-Column Contact Info & Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Quick Contact Cards */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a
                href={`tel:+${storeInfo.phone}`}
                className="p-5 bg-neutral-950 hover:bg-neutral-800 text-white flex flex-col justify-between h-36 transition-colors shadow"
              >
                <Phone className="w-6 h-6 text-white" />
                <div>
                  <span className="text-xs uppercase tracking-wider text-neutral-400 block">Appel direct</span>
                  <span className="font-semibold text-sm block mt-0.5">{storeInfo.phoneDisplay}</span>
                  <span className="text-[11px] text-neutral-400 block mt-1 underline">Nous appeler maintenant</span>
                </div>
              </a>

              <a
                href={getGeneralWhatsAppUrl("Bonjour Casablanca Shopping, je souhaite échanger avec vous directement.")}
                target="_blank"
                rel="noopener noreferrer"
                className="p-5 bg-emerald-600 hover:bg-emerald-700 text-white flex flex-col justify-between h-36 transition-colors shadow"
              >
                <MessageCircle className="w-6 h-6 text-white" />
                <div>
                  <span className="text-xs uppercase tracking-wider text-emerald-200 block">Messagerie WhatsApp</span>
                  <span className="font-semibold text-sm block mt-0.5">Discussion instantanée</span>
                  <span className="text-[11px] text-emerald-100 block mt-1 underline">Ouvrir WhatsApp</span>
                </div>
              </a>
            </div>

            {/* Address & Hours card */}
            <div className="bg-white p-6 sm:p-8 border border-neutral-200 space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-neutral-500">
                  <MapPin className="w-4 h-4 text-neutral-900" />
                  <span>Adresse physique</span>
                </div>
                <p className="font-serif text-xl text-neutral-950 font-medium">
                  {storeInfo.address}
                </p>
                <p className="text-xs text-neutral-600">
                  {storeInfo.postalCode} {storeInfo.city}, {storeInfo.country}
                </p>
                <div className="pt-2">
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=67+Rue+Aziz+BELLAL+Casablanca+20250+Maroc"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-neutral-900 font-semibold hover:underline"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>Itinéraire Google Maps</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              <div className="pt-6 border-t border-neutral-100 space-y-2">
                <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-neutral-500">
                  <Clock className="w-4 h-4 text-neutral-900" />
                  <span>Horaires magasin</span>
                </div>
                <div className="text-xs text-neutral-700 space-y-1">
                  <div className="flex justify-between py-0.5">
                    <span>Lundi – Samedi :</span>
                    <span className="font-semibold">10:00 – 20:00</span>
                  </div>
                  <div className="flex justify-between py-0.5 text-neutral-400 italic">
                    <span>Dimanche :</span>
                    <span>Fermé / horaires non confirmés</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-10 border border-neutral-200 shadow-sm">
            <h2 className="font-serif text-2xl text-neutral-950 font-normal mb-2">
              Envoyez-nous un message
            </h2>
            <p className="text-xs text-neutral-500 mb-6">
              Remplissez ce formulaire pour une question sur un vêtement, une taille ou une commande.
            </p>

            {isSent ? (
              <div className="bg-emerald-50 border border-emerald-200 p-6 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h3 className="font-serif text-xl text-neutral-900">Message transmis avec succès !</h3>
                <p className="text-xs text-neutral-600 max-w-sm mx-auto">
                  Votre message a été transmis à l'équipe Casablanca Shopping. Nous vous répondrons dans les plus brefs délais.
                </p>
                <button
                  onClick={() => {
                    setIsSent(false);
                    setMessage('');
                  }}
                  className="mt-2 text-xs font-semibold text-emerald-800 underline uppercase tracking-wider"
                >
                  Envoyer un autre message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-neutral-700 mb-1 font-medium">
                      Votre Nom complet <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ex: Sarah Alami"
                      className="w-full text-xs p-3 border border-neutral-300 focus:outline-none focus:border-neutral-950"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-neutral-700 mb-1 font-medium">
                      Téléphone / WhatsApp <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="06 XX XX XX XX / +212 ..."
                      className="w-full text-xs p-3 border border-neutral-300 focus:outline-none focus:border-neutral-950"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-neutral-700 mb-1 font-medium">
                    Sujet de votre demande
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full text-xs p-3 border border-neutral-300 focus:outline-none focus:border-neutral-950 bg-white"
                  >
                    <option value="Renseignement vêtement">Renseignement sur un vêtement</option>
                    <option value="Disponibilité en magasin">Disponibilité d'un article au 67 Rue Aziz BELLAL</option>
                    <option value="Suivi de commande">Suivi d'une commande</option>
                    <option value="Autre demande">Autre question</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-neutral-700 mb-1 font-medium">
                    Votre Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Précisez votre demande, taille souhaitée, référence..."
                    className="w-full text-xs p-3 border border-neutral-300 focus:outline-none focus:border-neutral-950 resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 bg-neutral-950 hover:bg-neutral-800 text-white text-xs font-semibold uppercase tracking-[0.18em] flex items-center justify-center gap-2 transition-colors shadow"
                  >
                    <Send className="w-4 h-4" />
                    <span>Envoyer mon message à la boutique</span>
                  </button>
                  <p className="text-[11px] text-neutral-400 text-center mt-2">
                    Votre message sera transmis instantanément à notre équipe pour un traitement rapide.
                  </p>
                </div>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
