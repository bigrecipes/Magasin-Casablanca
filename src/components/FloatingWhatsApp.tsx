import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { MessageCircle, X, Send, Store, HelpCircle, Sparkles } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const { storeInfo, getGeneralWhatsAppUrl } = useStore();
  const [isOpen, setIsOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState('');
  const [showPromptBubble, setShowPromptBubble] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Trigger notification bubble after 5 seconds if not yet opened
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen && !hasInteracted) {
        setShowPromptBubble(true);
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [isOpen, hasInteracted]);

  const handleOpenChat = () => {
    setIsOpen(true);
    setShowPromptBubble(false);
    setHasInteracted(true);
  };

  const handleDismissBubble = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowPromptBubble(false);
    setHasInteracted(true);
  };

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
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Automatic Welcome Notification Bubble (appears after 5 seconds) */}
      {showPromptBubble && !isOpen && (
        <div 
          onClick={handleOpenChat}
          className="mb-3 max-w-[280px] sm:max-w-xs bg-white text-neutral-900 border border-neutral-200/90 rounded-2xl shadow-xl p-3.5 cursor-pointer relative group transition-all duration-300 hover:shadow-2xl hover:border-emerald-500/50 animate-bubble-in"
        >
          {/* Close tiny button */}
          <button
            onClick={handleDismissBubble}
            className="absolute top-2 right-2 text-neutral-400 hover:text-neutral-700 p-1 rounded-full hover:bg-neutral-100 transition-colors"
            title="Fermer"
            aria-label="Fermer la notification"
          >
            <X className="w-3.5 h-3.5" />
          </button>

          <div className="flex items-start gap-2.5 pr-4">
            <div className="relative shrink-0">
              <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-serif font-bold text-xs">
                CS
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full"></span>
            </div>

            <div className="space-y-0.5">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-neutral-950">Besoin d'aide ?</span>
                <span className="text-[10px] text-emerald-600 font-medium">· En ligne</span>
              </div>
              <p className="text-[11px] text-neutral-600 leading-snug">
                Une question sur une taille, un vêtement ou notre magasin à Casablanca ? Discutez avec nous !
              </p>
            </div>
          </div>

          <div className="mt-2.5 pt-2 border-t border-neutral-100 flex items-center justify-between text-[10px] text-neutral-500 font-medium">
            <span className="text-emerald-700 font-semibold group-hover:underline">
              Cliquer pour ouvrir
            </span>
            <span>67 Rue Aziz BELLAL</span>
          </div>

          {/* Speech bubble pointer arrow */}
          <div className="absolute -bottom-2 right-7 w-4 h-4 bg-white border-r border-b border-neutral-200 transform rotate-45"></div>
        </div>
      )}

      {/* Floating Popup Window with smooth slide-up and fade-in animation */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 bg-white border border-neutral-200 shadow-2xl rounded-2xl overflow-hidden animate-slide-up text-neutral-900">
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
        onClick={() => {
          if (!isOpen) {
            handleOpenChat();
          } else {
            setIsOpen(false);
          }
        }}
        className="relative flex items-center gap-2.5 bg-emerald-600 hover:bg-emerald-700 text-white py-3.5 px-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 group focus:outline-none focus:ring-4 focus:ring-emerald-500/30"
        aria-label="Contacter sur WhatsApp"
      >
        <MessageCircle className="w-6 h-6 text-white" />
        <span className="text-xs font-semibold tracking-wider uppercase pr-1 hidden sm:inline-block">
          WhatsApp Direct
        </span>

        {/* Unread badge dot if bubble is visible */}
        {showPromptBubble && !isOpen && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center border-2 border-white animate-pulse">
            1
          </span>
        )}
      </button>
    </div>
  );
};

