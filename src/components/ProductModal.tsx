import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductColor } from '../types';
import { 
  X, 
  ShoppingBag, 
  MessageCircle, 
  Check, 
  ShieldCheck, 
  MapPin, 
  Truck, 
  Info,
  Maximize2
} from 'lucide-react';

export const ProductModal: React.FC = () => {
  const { 
    selectedProductForModal, 
    setSelectedProductForModal, 
    addToCart, 
    generateProductWhatsAppUrl,
    storeInfo
  } = useStore();

  if (!selectedProductForModal) return null;
  const product = selectedProductForModal;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'Standard');
  const [selectedColor, setSelectedColor] = useState<ProductColor>(
    product.colors[0] || { name: 'Standard', hex: '#000000' }
  );
  const [quantity, setQuantity] = useState(1);
  const [isZoomed, setIsZoomed] = useState(false);
  const [addedNotice, setAddedNotice] = useState(false);

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2500);
  };

  const handleWhatsAppOrder = () => {
    const url = generateProductWhatsAppUrl(
      product,
      selectedSize,
      selectedColor.name,
      quantity
    );
    window.open(url, '_blank');
  };

  const stockBadgeInfo = {
    in_stock: { text: 'En stock au magasin', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' },
    limited_stock: { text: 'Stock limité au magasin', color: 'text-amber-800 bg-amber-50 border-amber-200' },
    out_of_stock: { text: 'Rupture de stock momentanée', color: 'text-neutral-500 bg-neutral-100 border-neutral-200' },
  }[product.stockStatus];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div 
        className="bg-white w-full max-w-4xl max-h-[92vh] overflow-y-auto shadow-2xl relative border border-neutral-200 flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={() => setSelectedProductForModal(null)}
          className="absolute top-4 right-4 z-20 p-2 bg-white/90 hover:bg-white text-neutral-800 hover:text-neutral-950 rounded-full shadow-md transition-colors"
          aria-label="Fermer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left: Images Gallery & Zoom */}
        <div className="md:w-1/2 bg-neutral-50 p-4 sm:p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-neutral-200">
          <div>
            {/* Main active image */}
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-200 group">
              <img
                src={product.images[activeImageIndex] || product.images[0]}
                alt={product.name}
                className={`w-full h-full object-cover object-center transition-transform duration-500 cursor-zoom-in ${
                  isZoomed ? 'scale-150 cursor-zoom-out' : 'group-hover:scale-105'
                }`}
                onClick={() => setIsZoomed(!isZoomed)}
              />
              <button
                onClick={() => setIsZoomed(!isZoomed)}
                className="absolute bottom-3 right-3 bg-white/80 hover:bg-white text-neutral-800 p-2 rounded shadow-sm text-xs flex items-center gap-1 backdrop-blur-xs transition-colors"
                title="Agrandir / Zoom"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span className="text-[10px] uppercase font-medium">{isZoomed ? 'Réduire' : 'Zoom'}</span>
              </button>

              {product.isSample && (
                <div className="absolute top-3 left-3 bg-neutral-950 text-white text-[10px] tracking-wider uppercase px-2.5 py-1 font-medium shadow">
                  Produit exemple — à remplacer
                </div>
              )}
            </div>

            {/* Thumbnail selector */}
            {product.images.length > 1 && (
              <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setActiveImageIndex(idx);
                      setIsZoomed(false);
                    }}
                    className={`relative w-16 h-20 shrink-0 border overflow-hidden transition-all ${
                      activeImageIndex === idx
                        ? 'border-neutral-950 ring-1 ring-neutral-950'
                        : 'border-neutral-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Boutique Physical Verification Notice */}
          <div className="mt-6 pt-4 border-t border-neutral-200 text-xs text-neutral-600 space-y-2">
            <div className="flex items-center gap-2 text-neutral-800 font-medium">
              <MapPin className="w-4 h-4 text-neutral-700 shrink-0" />
              <span>Visible en magasin : 67 Rue Aziz BELLAL, Casablanca</span>
            </div>
            <div className="flex items-center gap-2 text-neutral-600">
              <ShieldCheck className="w-4 h-4 text-neutral-700 shrink-0" />
              <span>Essayage sur place et conseils personnalisés</span>
            </div>
          </div>
        </div>

        {/* Right: Product Details & Actions */}
        <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between">
          <div className="space-y-6">
            
            {/* Category & Status */}
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-[0.2em] text-neutral-500 font-medium">
                {product.category} · Réf {product.sku}
              </span>
              <span className={`text-xs px-2.5 py-0.5 border ${stockBadgeInfo.color}`}>
                {stockBadgeInfo.text}
              </span>
            </div>

            {/* Product Title & Pricing */}
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl font-normal text-neutral-950 leading-tight">
                {product.name}
              </h2>

              <div className="mt-3 flex items-baseline gap-3">
                <span className="text-2xl font-bold text-neutral-950">
                  {product.price} <span className="text-sm font-normal text-neutral-600">MAD</span>
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="text-sm text-neutral-400 line-through">
                    {product.originalPrice} MAD
                  </span>
                )}
                {product.isPromo && (
                  <span className="text-xs text-red-600 font-semibold bg-red-50 px-2 py-0.5 border border-red-200">
                    Offre spéciale
                  </span>
                )}
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-neutral-600 leading-relaxed">
              {product.description}
            </p>

            {/* If sample product, note for owner */}
            {product.isSample && (
              <div className="bg-amber-50/80 border border-amber-200 p-3 text-xs text-amber-900 rounded space-y-1">
                <div className="font-semibold flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                  <span>Information de démonstration</span>
                </div>
                <p className="text-[11px] text-amber-800">
                  Cette fiche est fournie comme exemple de structure. Le propriétaire peut la modifier, changer les photos ou saisir les articles réels via l'Espace Administration.
                </p>
              </div>
            )}

            {/* Size Selector */}
            {product.sizes.length > 0 && (
              <div>
                <div className="flex items-center justify-between text-xs text-neutral-700 mb-2 font-medium">
                  <span>Sélectionnez votre taille :</span>
                  <span className="text-neutral-500">Taille choisie : {selectedSize}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`min-w-10 h-10 px-3 text-xs font-semibold uppercase tracking-wider border transition-colors ${
                        selectedSize === size
                          ? 'border-neutral-950 bg-neutral-950 text-white'
                          : 'border-neutral-300 text-neutral-800 hover:border-neutral-950'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Color Selector */}
            {product.colors.length > 0 && (
              <div>
                <div className="flex items-center justify-between text-xs text-neutral-700 mb-2 font-medium">
                  <span>Sélectionnez votre couleur :</span>
                  <span className="text-neutral-500">{selectedColor.name}</span>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color)}
                      title={color.name}
                      className={`w-8 h-8 rounded-full border-2 transition-all relative flex items-center justify-center ${
                        selectedColor.name === color.name
                          ? 'border-neutral-950 scale-110 shadow-sm'
                          : 'border-neutral-200 hover:scale-105'
                      }`}
                      style={{ backgroundColor: color.hex }}
                    >
                      {selectedColor.name === color.name && (
                        <Check className={`w-4 h-4 ${color.hex.toLowerCase() === '#ffffff' ? 'text-black' : 'text-white'}`} />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Stepper */}
            <div>
              <span className="block text-xs text-neutral-700 mb-2 font-medium">Quantité :</span>
              <div className="inline-flex items-center border border-neutral-300">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1.5 text-neutral-600 hover:text-neutral-950 hover:bg-neutral-100 transition-colors"
                >
                  -
                </button>
                <span className="px-4 py-1.5 text-xs font-semibold text-neutral-900 min-w-10 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1.5 text-neutral-600 hover:text-neutral-950 hover:bg-neutral-100 transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Fabric & Details if available */}
            {product.details && product.details.length > 0 && (
              <div className="pt-2">
                <span className="text-xs font-semibold text-neutral-900 uppercase tracking-wider block mb-1">
                  Caractéristiques :
                </span>
                <ul className="text-xs text-neutral-600 space-y-1">
                  {product.details.map((d, i) => (
                    <li key={i} className="flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-neutral-400"></span>
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

          </div>

          {/* Action Buttons */}
          <div className="mt-8 pt-6 border-t border-neutral-200 space-y-3">
            {addedNotice && (
              <div className="bg-emerald-50 text-emerald-800 text-xs py-2 px-3 border border-emerald-200 flex items-center justify-between animate-fadeIn">
                <span>Article ajouté à votre panier avec succès !</span>
                <Check className="w-4 h-4 text-emerald-600" />
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={handleAddToCart}
                disabled={product.stockStatus === 'out_of_stock'}
                className="w-full py-3.5 px-4 bg-neutral-950 hover:bg-neutral-800 text-white text-xs font-semibold uppercase tracking-[0.15em] flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Ajouter au panier</span>
              </button>

              <button
                onClick={handleWhatsAppOrder}
                className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold uppercase tracking-[0.15em] flex items-center justify-center gap-2 transition-colors shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Commander via WhatsApp</span>
              </button>
            </div>

            {/* Need help text */}
            <div className="text-center pt-2">
              <p className="text-xs text-neutral-500">
                Besoin d'aide ou d'un conseil ?{' '}
                <a
                  href={generateProductWhatsAppUrl(product, selectedSize, selectedColor.name, quantity)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-700 font-medium hover:underline inline-flex items-center gap-1"
                >
                  Contactez-nous sur WhatsApp (+212 701 179 767)
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
