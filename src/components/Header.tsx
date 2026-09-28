import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  ShoppingBag, 
  Search, 
  Menu, 
  X, 
  Phone, 
  MapPin, 
  Clock, 
  SlidersHorizontal,
  MessageCircle,
  ExternalLink
} from 'lucide-react';

export const Header: React.FC = () => {
  const { 
    cartItemCount, 
    setIsCartOpen, 
    searchTerm, 
    setSearchTerm, 
    activeTab, 
    setActiveTab, 
    storeInfo,
    getGeneralWhatsAppUrl
  } = useStore();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleNavClick = (tab: string) => {
    setActiveTab(tab);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navItems = [
    { id: 'home', label: 'Accueil' },
    { id: 'shop', label: 'Boutique' },
    { id: 'new', label: 'Nouveautés' },
    { id: 'collections', label: 'Collections' },
    { id: 'about', label: 'À propos' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-100 transition-all">
      {/* Top Announcement Bar */}
      <div className="bg-neutral-900 text-neutral-300 text-xs py-2 px-4 border-b border-neutral-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-4 text-center sm:text-left text-[11px] sm:text-xs">
            <span className="flex items-center gap-1.5 text-neutral-200 font-medium">
              <MapPin className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
              67 Rue Aziz BELLAL, Casablanca 20250, Maroc
            </span>
            <span className="hidden md:inline text-neutral-600">|</span>
            <span className="hidden md:flex items-center gap-1.5 text-neutral-400">
              <Clock className="w-3.5 h-3.5 shrink-0" />
              Lun – Sam : 10:00 – 20:00
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px] sm:text-xs">
            <a 
              href={`tel:+${storeInfo.phone}`}
              className="flex items-center gap-1.5 text-neutral-300 hover:text-white transition-colors"
            >
              <Phone className="w-3 h-3 text-neutral-400" />
              <span>{storeInfo.phoneDisplay}</span>
            </a>
            <span className="text-neutral-700">·</span>
            <a
              href="https://www.google.com/maps/search/?api=1&query=67+Rue+Aziz+BELLAL+Casablanca+20250+Maroc"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors flex items-center gap-1"
            >
              <span>Itinéraire Google Maps</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Mobile hamburger button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-neutral-700 hover:text-neutral-900 focus:outline-none"
              aria-label="Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Logo / Brand Name */}
          <div className="flex-1 lg:flex-none text-center lg:text-left">
            <button
              onClick={() => handleNavClick('home')}
              className="inline-block text-left group"
            >
              <span className="block font-serif text-2xl sm:text-3xl font-semibold tracking-wider text-neutral-950 uppercase group-hover:opacity-90 transition-opacity">
                CASABLANCA SHOPPING
              </span>
              <span className="block text-[10px] tracking-[0.25em] text-neutral-500 uppercase -mt-0.5">
                Mode & Prêt-à-porter · Casablanca
              </span>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-sm tracking-wider uppercase transition-colors relative py-1 ${
                  activeTab === item.id
                    ? 'text-neutral-950 font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1.5px] after:bg-neutral-950'
                    : 'text-neutral-600 hover:text-neutral-950'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center space-x-3 sm:space-x-5">
            {/* Search Toggle */}
            <div className="relative">
              {isSearchOpen ? (
                <div className="flex items-center bg-neutral-100 rounded-full pl-3 pr-2 py-1.5 w-48 sm:w-64 border border-neutral-200">
                  <Search className="w-4 h-4 text-neutral-400 shrink-0" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Rechercher un vêtement..."
                    autoFocus
                    className="w-full bg-transparent px-2 text-xs text-neutral-900 focus:outline-none"
                  />
                  <button
                    onClick={() => {
                      setIsSearchOpen(false);
                      setSearchTerm('');
                    }}
                    className="text-neutral-400 hover:text-neutral-700 p-0.5"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setIsSearchOpen(true);
                    if (activeTab !== 'shop') setActiveTab('shop');
                  }}
                  className="p-2 text-neutral-700 hover:text-neutral-950 transition-colors rounded-full hover:bg-neutral-100"
                  aria-label="Recherche"
                  title="Rechercher un vêtement"
                >
                  <Search className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Direct WhatsApp Action */}
            <a
              href={getGeneralWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-medium text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-3.5 py-2 rounded-full border border-emerald-200/80 transition-colors"
              title="Discuter sur WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600/30" />
              <span>WhatsApp</span>
            </a>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-neutral-800 hover:text-neutral-950 transition-colors rounded-full hover:bg-neutral-100"
              aria-label="Panier d'achats"
              title="Consulter le panier"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-neutral-950 text-white text-[10px] font-semibold w-5 h-5 rounded-full flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>

            {/* Admin Back-office Button */}
            <button
              onClick={() => handleNavClick('admin')}
              className={`p-2 transition-colors rounded-full ${
                activeTab === 'admin'
                  ? 'bg-neutral-900 text-white'
                  : 'text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100'
              }`}
              title="Administration de la boutique"
              aria-label="Administration"
            >
              <SlidersHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-neutral-200 px-6 py-6 animate-fadeIn">
          {/* Mobile Search */}
          <div className="mb-6">
            <div className="flex items-center bg-neutral-100 rounded-lg px-3 py-2.5 border border-neutral-200">
              <Search className="w-4 h-4 text-neutral-400 mr-2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  if (activeTab !== 'shop') setActiveTab('shop');
                }}
                placeholder="Rechercher des vêtements..."
                className="w-full bg-transparent text-sm text-neutral-900 focus:outline-none"
              />
              {searchTerm && (
                <button onClick={() => setSearchTerm('')} className="text-neutral-400">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          <nav className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-left text-base uppercase tracking-wider py-2 transition-colors flex items-center justify-between border-b border-neutral-100 ${
                  activeTab === item.id ? 'font-bold text-neutral-950' : 'text-neutral-600'
                }`}
              >
                <span>{item.label}</span>
                {activeTab === item.id && <span className="w-1.5 h-1.5 rounded-full bg-neutral-950"></span>}
              </button>
            ))}

            <button
              onClick={() => handleNavClick('admin')}
              className="text-left text-sm uppercase tracking-wider py-2 text-neutral-500 hover:text-neutral-900 flex items-center justify-between"
            >
              <span>Espace Gestion Boutique</span>
              <SlidersHorizontal className="w-4 h-4" />
            </button>
          </nav>

          <div className="mt-8 pt-6 border-t border-neutral-100 flex flex-col gap-3">
            <a
              href={getGeneralWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-medium transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Commander sur WhatsApp</span>
            </a>

            <div className="text-xs text-neutral-500 text-center space-y-1 pt-2">
              <p className="font-medium text-neutral-800">Casablanca Shopping</p>
              <p>67 Rue Aziz BELLAL, Casablanca 20250</p>
              <p>+212 701 179 767</p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
