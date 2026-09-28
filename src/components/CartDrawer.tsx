import React from 'react';
import { useStore } from '../context/StoreContext';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  MessageCircle, 
  Store,
  Truck
} from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const { 
    cart, 
    isCartOpen, 
    setIsCartOpen, 
    cartSubtotal, 
    updateCartQuantity, 
    removeFromCart, 
    clearCart,
    setIsCheckoutOpen,
    generateCartWhatsAppUrl
  } = useStore();

  if (!isCartOpen) return null;

  const handleOpenCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleWhatsAppCheckout = () => {
    const url = generateCartWhatsAppUrl();
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-neutral-950/60 backdrop-blur-xs flex justify-end animate-fadeIn">
      <div 
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between border-l border-neutral-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-neutral-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-neutral-900" />
            <h2 className="font-serif text-2xl font-normal text-neutral-950">
              Mon Panier
            </h2>
            <span className="text-xs text-neutral-500 font-sans ml-1">
              ({cart.length} {cart.length <= 1 ? 'article' : 'articles'})
            </span>
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 text-neutral-500 hover:text-neutral-950 transition-colors"
            aria-label="Fermer le panier"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-400">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <p className="font-serif text-xl text-neutral-900">Votre panier est vide</p>
                <p className="text-xs text-neutral-500 max-w-xs">
                  Explorez les créations et vêtements disponibles dans la boutique Casablanca Shopping.
                </p>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="mt-4 px-6 py-2.5 bg-neutral-950 text-white text-xs uppercase tracking-wider font-semibold hover:bg-neutral-800 transition-colors"
              >
                Découvrir la collection
              </button>
            </div>
          ) : (
            <div className="space-y-4 divide-y divide-neutral-100">
              {cart.map((item) => (
                <div key={item.id} className="pt-4 first:pt-0 flex gap-4">
                  {/* Thumbnail */}
                  <div className="w-20 h-24 bg-neutral-100 shrink-0 overflow-hidden border border-neutral-200">
                    <img
                      src={item.product.images[0] || 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=400&q=80'}
                      alt={item.product.name}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-serif text-base font-medium text-neutral-900 line-clamp-1">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-neutral-400 hover:text-red-600 transition-colors p-1"
                          title="Supprimer l'article"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="mt-1 flex flex-wrap gap-2 text-[11px] text-neutral-500">
                        <span>Taille : <strong className="text-neutral-800">{item.selectedSize}</strong></span>
                        <span>·</span>
                        <span>Couleur : <strong className="text-neutral-800">{item.selectedColor.name}</strong></span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-neutral-300">
                        <button
                          onClick={() => updateCartQuantity(item.id, -1)}
                          className="p-1 hover:bg-neutral-100 text-neutral-700 transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-semibold text-neutral-900 min-w-6 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.id, 1)}
                          className="p-1 hover:bg-neutral-100 text-neutral-700 transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Line Price */}
                      <div className="text-right">
                        <span className="text-sm font-bold text-neutral-950">
                          {item.product.price * item.quantity} <span className="text-xs font-normal text-neutral-600">MAD</span>
                        </span>
                        {item.quantity > 1 && (
                          <div className="text-[10px] text-neutral-400">
                            {item.product.price} MAD / unité
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer with Calculations and Action Buttons */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-neutral-200 bg-neutral-50 space-y-4">
            {/* Delivery Notice */}
            <div className="text-xs text-neutral-600 bg-white p-3 border border-neutral-200 rounded space-y-1">
              <div className="flex items-center gap-1.5 font-medium text-neutral-900">
                <Store className="w-4 h-4 text-neutral-700 shrink-0" />
                <span>Retrait physique disponible</span>
              </div>
              <p className="text-[11px] text-neutral-500">
                Gratuit en boutique (67 Rue Aziz BELLAL, Casablanca) ou expédition dans tout le Maroc lors de la confirmation.
              </p>
            </div>

            {/* Subtotal & Total */}
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between text-neutral-600">
                <span>Sous-total articles</span>
                <span>{cartSubtotal} MAD</span>
              </div>
              <div className="flex justify-between text-neutral-600 text-xs">
                <span>Retrait boutique (Casablanca)</span>
                <span className="text-emerald-700 font-medium">Gratuit</span>
              </div>
              <div className="flex justify-between text-base font-bold text-neutral-950 pt-2 border-t border-neutral-200">
                <span>Total estimé</span>
                <span>{cartSubtotal} MAD</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-2">
              <button
                onClick={handleOpenCheckout}
                className="w-full py-3.5 px-4 bg-neutral-950 hover:bg-neutral-800 text-white text-xs font-semibold uppercase tracking-[0.18em] flex items-center justify-center gap-2 transition-colors shadow"
              >
                <span>Passer la commande</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={handleWhatsAppCheckout}
                className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold uppercase tracking-[0.18em] flex items-center justify-center gap-2 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Commander via WhatsApp</span>
              </button>

              <button
                onClick={() => setIsCartOpen(false)}
                className="w-full py-2.5 text-center text-xs text-neutral-600 hover:text-neutral-950 uppercase tracking-wider transition-colors"
              >
                Continuer mes achats
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
