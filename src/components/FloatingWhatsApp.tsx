import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { MessageCircle, X, Send, Store, HelpCircle } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const { storeInfo, getGeneralWhatsAppUrl } = useStore();
  const [isOpen, setIsOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState('');

  const handleSendCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customMsg.trim()) return;
    const url = getGeneralWhatsAppUrl(customMsg);
    window.open(url, '_blank');
    setCustomMsg('');
    setIsOpen(false);
  };

  const quickPrompts = [
    {
      title: 'Disponibilité en magasin',
      text: 'Bonjour Casablanca Shopping, je souhaite savoir si vos articles sont visibles au 67 Rue Aziz BELLAL aujourd\'hui ?',
    },
    {
      title: 'Renseignements horaires',
      text: 'Bonjour Casablanca Shopping, quels sont vos horaires d\'ouverture cette semaine ?',
    },
    {
      title: 'Passer une commande directe',
      text: 'Bonjour Casablanca Shopping, je souhaite commander un vêtement vu sur votre boutique en ligne.',
    },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Floating Popup Window */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 bg-white border border-neutral-200 shadow-2xl rounded-lg overflow-hidden animate-fadeIn text-neutral-900">
          {/* Header */}
          <div className="bg-emerald-600 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-serif text-lg font-bold">
                CS
              </div>
              <div>
                <p className="font-semibold text-sm">Casablanca Shopping</p>
                <p className="text-[11px] text-emerald-100 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse"></span>
                  En ligne · {storeInfo.phoneDisplay}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick choices */}
          <div className="p-4 space-y-3 bg-neutral-50/50">
            <p className="text-xs text-neutral-600 font-medium">
              Comment pouvons-nous vous aider aujourd'hui ?
            </p>
            <div className="space-y-1.5">
              {quickPrompts.map((item, idx) => (
                <a
                  key={idx}
                  href={getGeneralWhatsAppUrl(item.text)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-xs p-2.5 bg-white border border-neutral-200 rounded hover:border-emerald-600 hover:text-emerald-700 transition-colors"
                >
                  <span className="font-semibold block">{item.title}</span>
                  <span className="text-[11px] text-neutral-500 line-clamp-1">{item.text}</span>
                </a>
              ))}
            </div>

            {/* Custom message box */}
            <form onSubmit={handleSendCustom} className="pt-2">
              <div className="flex items-center border border-neutral-300 rounded bg-white overflow-hidden focus-within:border-emerald-600">
                <input
                  type="text"
                  value={customMsg}
                  onChange={(e) => setCustomMsg(e.target.value)}
                  placeholder="Écrivez votre message..."
                  className="w-full text-xs p-2.5 focus:outline-none"
                />
                <button
                  type="submit"
                  className="p-2.5 bg-emerald-600 hover:bg-emerald-700 text-white transition-colors"
                  title="Envoyer"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>

          <div className="bg-neutral-100 p-2 text-center text-[10px] text-neutral-500 border-t border-neutral-200">
            67 Rue Aziz BELLAL, Casablanca · Réponse rapide par notre équipe
          </div>
        </div>
      )}

      {/* Main Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 bg-emerald-600 hover:bg-emerald-700 text-white py-3.5 px-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 group focus:outline-none focus:ring-4 focus:ring-emerald-500/30"
        aria-label="Contacter sur WhatsApp"
      >
        <MessageCircle className="w-6 h-6 text-white" />
        <span className="text-xs font-semibold tracking-wider uppercase pr-1 hidden sm:inline-block">
          WhatsApp Direct
        </span>
      </button>
    </div>
  );
};
