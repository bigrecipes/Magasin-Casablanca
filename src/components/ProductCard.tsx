import React from 'react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';
import { Eye, MessageCircle, ShoppingBag, AlertCircle } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { setSelectedProductForModal, generateProductWhatsAppUrl, addToCart } = useStore();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    const defaultSize = product.sizes[0] || 'Standard';
    const defaultColor = product.colors[0] || { name: 'Unique', hex: '#000000' };
    addToCart(product, defaultSize, defaultColor, 1);
  };

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const url = generateProductWhatsAppUrl(
      product,
      product.sizes[0] || undefined,
      product.colors[0]?.name || undefined,
      1
    );
    window.open(url, '_blank');
  };

  const stockBadgeInfo = {
    in_stock: { text: 'En stock', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' },
    limited_stock: { text: 'Stock limité', color: 'text-amber-800 bg-amber-50 border-amber-200' },
    out_of_stock: { text: 'Rupture de stock', color: 'text-neutral-500 bg-neutral-100 border-neutral-200' },
  }[product.stockStatus];

  return (
    <article 
      onClick={() => setSelectedProductForModal(product)}
      className="group cursor-pointer bg-white flex flex-col justify-between border border-neutral-200/70 hover:border-neutral-400 transition-all duration-300 hover:shadow-lg"
    >
      {/* Top Media Container */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-100">
        <img
          src={product.images[0] || 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80'}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Status badges & Sample notice */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.isSample && (
            <span className="text-[10px] tracking-wider uppercase font-semibold bg-neutral-900 text-white px-2.5 py-1 shadow-sm">
              Exemple — à remplacer
            </span>
          )}
          {product.isNew && (
            <span className="text-[10px] tracking-wider uppercase font-medium bg-white text-neutral-900 px-2 py-0.5 border border-neutral-200">
              Nouveau
            </span>
          )}
          {product.isPromo && product.originalPrice && (
            <span className="text-[10px] tracking-wider uppercase font-medium bg-red-600 text-white px-2 py-0.5">
              Promotion
            </span>
          )}
        </div>

        {/* Stock status indicator top right */}
        <div className="absolute top-3 right-3 z-10">
          <span className={`text-[10px] font-medium px-2 py-0.5 border ${stockBadgeInfo.color}`}>
            {stockBadgeInfo.text}
          </span>
        </div>

        {/* Hover Quick actions overlay */}
        <div className="absolute inset-0 bg-neutral-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3 gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedProductForModal(product);
            }}
            className="flex-1 bg-white text-neutral-950 hover:bg-neutral-100 py-2.5 px-3 text-xs font-medium uppercase tracking-wider flex items-center justify-center gap-1.5 shadow transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Voir détails</span>
          </button>

          <button
            onClick={handleWhatsAppClick}
            className="bg-emerald-600 hover:bg-emerald-700 text-white p-2.5 shadow transition-colors"
            title="Commander sur WhatsApp"
          >
            <MessageCircle className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & SKU */}
          <div className="flex items-center justify-between text-[11px] text-neutral-500 mb-1.5 uppercase tracking-wider">
            <span>{product.category}</span>
            <span>Réf: {product.sku}</span>
          </div>

          {/* Product Name */}
          <h3 className="font-serif text-lg font-medium text-neutral-900 group-hover:text-neutral-700 transition-colors line-clamp-1">
            {product.name}
          </h3>

          {/* Price & Old Price */}
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-base font-semibold text-neutral-950 tracking-tight">
              {product.price} <span className="text-xs font-normal text-neutral-600">MAD</span>
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-xs text-neutral-400 line-through">
                {product.originalPrice} MAD
              </span>
            )}
          </div>
        </div>

        {/* Available Sizes & Colors preview */}
        <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-600">
          {/* Sizes */}
          <div className="flex items-center gap-1">
            <span className="text-[10px] uppercase text-neutral-400">Tailles :</span>
            <span className="text-[11px] font-medium text-neutral-700">
              {product.sizes.slice(0, 4).join(', ')}{product.sizes.length > 4 ? '...' : ''}
            </span>
          </div>

          {/* Color swatches */}
          <div className="flex items-center gap-1">
            {product.colors.slice(0, 3).map((col, idx) => (
              <span
                key={idx}
                title={col.name}
                className="w-2.5 h-2.5 rounded-full border border-neutral-300"
                style={{ backgroundColor: col.hex }}
              />
            ))}
            {product.colors.length > 3 && (
              <span className="text-[9px] text-neutral-400">+{product.colors.length - 3}</span>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};
