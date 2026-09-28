import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Product, Order, OrderStatus } from '../types';
import { 
  Lock, 
  Unlock, 
  Plus, 
  Edit3, 
  Trash2, 
  Save, 
  X, 
  ShoppingBag, 
  Package, 
  Clock, 
  Phone, 
  MapPin, 
  Star, 
  Search, 
  Check, 
  AlertTriangle,
  RotateCcw,
  Sparkles,
  ExternalLink,
  MessageCircle,
  FileCheck
} from 'lucide-react';
import { INITIAL_SAMPLE_PRODUCTS } from '../data/initialData';

export const AdminDashboard: React.FC = () => {
  const { 
    products, 
    orders, 
    storeInfo, 
    isAdminAuthenticated, 
    setIsAdminAuthenticated, 
    addProduct, 
    updateProduct, 
    deleteProduct, 
    updateStoreInfo,
    updateOrderStatus,
    deleteOrder,
    setActiveTab,
    generateOrderWhatsAppUrl
  } = useStore();

  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState('');
  const [activeAdminTab, setActiveAdminTab] = useState<'products' | 'orders' | 'store' | 'seo'>('products');

  // Product Edit Modal State
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);

  // Form State for Product Add / Edit
  const [prodName, setProdName] = useState('');
  const [prodSku, setProdSku] = useState('');
  const [prodCategory, setProdCategory] = useState('Femme');
  const [prodPrice, setProdPrice] = useState<number>(500);
  const [prodOriginalPrice, setProdOriginalPrice] = useState<number | undefined>(undefined);
  const [prodDesc, setProdDesc] = useState('');
  const [prodImages, setProdImages] = useState<string>('');
  const [prodSizes, setProdSizes] = useState<string>('S, M, L, XL');
  const [prodColors, setProdColors] = useState<string>('Noir:#111111, Blanc:#FFFFFF');
  const [prodStockStatus, setProdStockStatus] = useState<'in_stock' | 'limited_stock' | 'out_of_stock'>('in_stock');
  const [prodStockQty, setProdStockQty] = useState<number>(10);
  const [prodIsNew, setProdIsNew] = useState(false);
  const [prodIsPromo, setProdIsPromo] = useState(false);
  const [prodIsSample, setProdIsSample] = useState(false);

  // Store settings form state
  const [storePhone, setStorePhone] = useState(storeInfo.phone);
  const [storeAddress, setStoreAddress] = useState(storeInfo.address);
  const [storeCity, setStoreCity] = useState(storeInfo.city);
  const [storeInstagram, setStoreInstagram] = useState(storeInfo.instagramUrl || '');
  const [storeFacebook, setStoreFacebook] = useState(storeInfo.facebookUrl || '');
  const [storeHours, setStoreHours] = useState({ ...storeInfo.hours });
  const [storeSavedNotice, setStoreSavedNotice] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Default master passcode for owner access
    if (passcode === 'casa2025' || passcode === 'admin' || passcode === '1234') {
      setIsAdminAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Code d\'accès incorrect. (Code par défaut : casa2025)');
    }
  };

  const startEditProduct = (prod: Product) => {
    setEditingProduct(prod);
    setIsAddingNew(false);
    setProdName(prod.name);
    setProdSku(prod.sku);
    setProdCategory(prod.category);
    setProdPrice(prod.price);
    setProdOriginalPrice(prod.originalPrice);
    setProdDesc(prod.description);
    setProdImages(prod.images.join('\n'));
    setProdSizes(prod.sizes.join(', '));
    setProdColors(prod.colors.map(c => `${c.name}:${c.hex}`).join(', '));
    setProdStockStatus(prod.stockStatus);
    setProdStockQty(prod.stockQuantity);
    setProdIsNew(!!prod.isNew);
    setProdIsPromo(!!prod.isPromo);
    setProdIsSample(prod.isSample);
  };

  const startAddNewProduct = () => {
    setEditingProduct(null);
    setIsAddingNew(true);
    setProdName('');
    setProdSku(`CS-${Date.now().toString().slice(-4)}`);
    setProdCategory('Femme');
    setProdPrice(450);
    setProdOriginalPrice(undefined);
    setProdDesc('');
    setProdImages('https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80');
    setProdSizes('S, M, L');
    setProdColors('Noir:#111111, Blanc:#FFFFFF');
    setProdStockStatus('in_stock');
    setProdStockQty(5);
    setProdIsNew(true);
    setProdIsPromo(false);
    setProdIsSample(false);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prodName.trim()) return;

    // Parse images
    const imagesList = prodImages
      .split('\n')
      .map(s => s.trim())
      .filter(Boolean);

    // Parse sizes
    const sizesList = prodSizes
      .split(',')
      .map(s => s.trim().toUpperCase())
      .filter(Boolean);

    // Parse colors
    const colorsList = prodColors
      .split(',')
      .map(s => {
        const [name, hex] = s.split(':').map(part => part.trim());
        return { name: name || 'Couleur', hex: hex || '#000000' };
      })
      .filter(c => c.name);

    const productPayload = {
      name: prodName,
      sku: prodSku || `CS-${Math.floor(Math.random() * 9000 + 1000)}`,
      category: prodCategory,
      price: Number(prodPrice),
      originalPrice: prodOriginalPrice ? Number(prodOriginalPrice) : undefined,
      description: prodDesc || 'Vêtement élégant sélectionné pour Casablanca Shopping.',
      images: imagesList.length > 0 ? imagesList : ['https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80'],
      sizes: sizesList.length > 0 ? sizesList : ['Standard'],
      colors: colorsList.length > 0 ? colorsList : [{ name: 'Standard', hex: '#000000' }],
      stockStatus: prodStockStatus,
      stockQuantity: Number(prodStockQty),
      isNew: prodIsNew,
      isPromo: prodIsPromo,
      isSample: prodIsSample,
    };

    if (editingProduct) {
      updateProduct(editingProduct.id, productPayload);
    } else {
      addProduct(productPayload);
    }

    setEditingProduct(null);
    setIsAddingNew(false);
  };

  const handleSaveStoreSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateStoreInfo({
      phone: storePhone,
      address: storeAddress,
      city: storeCity,
      instagramUrl: storeInstagram || undefined,
      facebookUrl: storeFacebook || undefined,
      hours: storeHours,
    });
    setStoreSavedNotice(true);
    setTimeout(() => setStoreSavedNotice(false), 3000);
  };

  // Login Gate
  if (!isAdminAuthenticated) {
    return (
      <div className="py-24 bg-neutral-100 flex items-center justify-center px-4">
        <div className="bg-white p-8 sm:p-10 border border-neutral-300 shadow-xl max-w-md w-full space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-neutral-900 text-white flex items-center justify-center mx-auto">
              <Lock className="w-6 h-6" />
            </div>
            <h2 className="font-serif text-2xl text-neutral-950 font-normal">
              Espace Gestion Casablanca Shopping
            </h2>
            <p className="text-xs text-neutral-500">
              Réservé au gérant et à l'équipe de la boutique physique pour mettre à jour les produits, commandes et stocks.
            </p>
          </div>

          {authError && (
            <div className="p-3 bg-red-50 text-red-700 text-xs border border-red-200">
              {authError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-neutral-700 mb-1">
                Code secret d'accès
              </label>
              <input
                type="password"
                required
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Code propriétaire (ex: casa2025)"
                className="w-full text-sm p-3 border border-neutral-300 focus:outline-none focus:border-neutral-950"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-neutral-950 hover:bg-neutral-800 text-white text-xs uppercase tracking-wider font-semibold transition-colors shadow"
            >
              Déverrouiller l'administration
            </button>
          </form>

          <div className="pt-4 border-t border-neutral-200 text-center text-[11px] text-neutral-500">
            Code de démonstration sécurisé pré-configuré : <strong className="text-neutral-800">casa2025</strong>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 bg-neutral-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header */}
        <div className="bg-white p-6 border border-neutral-200 shadow-xs mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-neutral-500">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>Back-office Propriétaire</span>
            </div>
            <h1 className="font-serif text-3xl text-neutral-950 font-normal mt-1">
              Tableau de bord Casablanca Shopping
            </h1>
            <p className="text-xs text-neutral-500">
              67 Rue Aziz BELLAL, Casablanca · Téléphone officiel : +212 701 179 767
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('shop')}
              className="px-4 py-2 text-xs uppercase tracking-wider font-medium text-neutral-700 bg-neutral-100 hover:bg-neutral-200 transition-colors"
            >
              Voir la boutique en ligne
            </button>

            <button
              onClick={() => setIsAdminAuthenticated(false)}
              className="px-4 py-2 text-xs uppercase tracking-wider font-medium text-red-600 bg-red-50 hover:bg-red-100 transition-colors"
            >
              Déconnexion
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 mb-6 border-b border-neutral-300 pb-2 overflow-x-auto">
          <button
            onClick={() => setActiveAdminTab('products')}
            className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold transition-colors ${
              activeAdminTab === 'products'
                ? 'bg-neutral-950 text-white shadow-xs'
                : 'bg-white text-neutral-700 hover:bg-neutral-50'
            }`}
          >
            Gestion des Produits ({products.length})
          </button>

          <button
            onClick={() => setActiveAdminTab('orders')}
            className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold transition-colors flex items-center gap-1.5 ${
              activeAdminTab === 'orders'
                ? 'bg-neutral-950 text-white shadow-xs'
                : 'bg-white text-neutral-700 hover:bg-neutral-50'
            }`}
          >
            <span>Commandes reçues ({orders.length})</span>
            {orders.some(o => o.status === 'en_attente') && (
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
            )}
          </button>

          <button
            onClick={() => setActiveAdminTab('store')}
            className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold transition-colors ${
              activeAdminTab === 'store'
                ? 'bg-neutral-950 text-white shadow-xs'
                : 'bg-white text-neutral-700 hover:bg-neutral-50'
            }`}
          >
            Paramètres & Horaires Magasin
          </button>
        </div>

        {/* TAB 1: Products Management */}
        {activeAdminTab === 'products' && (
          <div className="space-y-6">
            
            {/* Action Bar */}
            <div className="bg-white p-4 border border-neutral-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-serif text-xl text-neutral-950 font-normal">
                  Catalogue & Stock
                </h3>
                <p className="text-xs text-neutral-500">
                  Ajoutez vos vraies photos de vêtements, mettez à jour les prix en Dirhams (MAD) et les tailles disponibles.
                </p>
              </div>

              <button
                onClick={startAddNewProduct}
                className="py-2.5 px-4 bg-neutral-950 hover:bg-neutral-800 text-white text-xs uppercase tracking-wider font-semibold flex items-center gap-2 transition-colors shadow"
              >
                <Plus className="w-4 h-4" />
                <span>Ajouter un vêtement</span>
              </button>
            </div>

            {/* Products Table */}
            <div className="bg-white border border-neutral-200 overflow-x-auto shadow-xs">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-neutral-50 border-b border-neutral-200 text-neutral-500 uppercase tracking-wider text-[11px]">
                    <th className="p-3">Photo</th>
                    <th className="p-3">Désignation</th>
                    <th className="p-3">Catégorie & SKU</th>
                    <th className="p-3">Prix (MAD)</th>
                    <th className="p-3">Stock & Statut</th>
                    <th className="p-3">Type</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200">
                  {products.map((p) => (
                    <tr key={p.id} className="hover:bg-neutral-50/60 transition-colors">
                      <td className="p-3">
                        <img
                          src={p.images[0]}
                          alt={p.name}
                          className="w-12 h-14 object-cover border border-neutral-200"
                        />
                      </td>
                      <td className="p-3">
                        <div className="font-semibold text-neutral-900 text-sm">{p.name}</div>
                        <div className="text-[11px] text-neutral-500">
                          Tailles : {p.sizes.join(', ')}
                        </div>
                      </td>
                      <td className="p-3 text-neutral-700">
                        <div>{p.category}</div>
                        <div className="text-[10px] text-neutral-400 font-mono">Réf: {p.sku}</div>
                      </td>
                      <td className="p-3 font-bold text-neutral-950">
                        {p.price} MAD
                        {p.originalPrice && (
                          <div className="text-[10px] text-neutral-400 line-through">
                            {p.originalPrice} MAD
                          </div>
                        )}
                      </td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 text-[10px] font-medium border ${
                          p.stockStatus === 'in_stock' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                          p.stockStatus === 'limited_stock' ? 'bg-amber-50 text-amber-800 border-amber-200' :
                          'bg-neutral-100 text-neutral-500 border-neutral-300'
                        }`}>
                          {p.stockStatus === 'in_stock' ? `En stock (${p.stockQuantity})` :
                           p.stockStatus === 'limited_stock' ? `Stock limité (${p.stockQuantity})` :
                           'Rupture'}
                        </span>
                      </td>
                      <td className="p-3">
                        {p.isSample ? (
                          <span className="bg-neutral-900 text-white px-2 py-0.5 text-[9px] uppercase font-semibold">
                            Exemple démo
                          </span>
                        ) : (
                          <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 text-[9px] uppercase font-semibold">
                            Officiel Boutique
                          </span>
                        )}
                      </td>
                      <td className="p-3 text-right">
                        <div className="inline-flex items-center gap-2">
                          <button
                            onClick={() => startEditProduct(p)}
                            className="p-1.5 text-neutral-700 hover:text-neutral-950 bg-neutral-100 hover:bg-neutral-200 transition-colors"
                            title="Modifier"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Confirmez-vous la suppression de ${p.name} ?`)) {
                                deleteProduct(p.id);
                              }
                            }}
                            className="p-1.5 text-red-600 hover:text-red-800 bg-red-50 hover:bg-red-100 transition-colors"
                            title="Supprimer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Modal for Add or Edit Product */}
            {(isAddingNew || editingProduct) && (
              <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
                <div 
                  className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl relative border border-neutral-200 p-6 sm:p-8"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-between pb-4 border-b border-neutral-200">
                    <h3 className="font-serif text-2xl text-neutral-950 font-normal">
                      {isAddingNew ? 'Ajouter un vêtement authentique' : `Modifier : ${editingProduct?.name}`}
                    </h3>
                    <button
                      onClick={() => {
                        setIsAddingNew(false);
                        setEditingProduct(null);
                      }}
                      className="p-1 text-neutral-500 hover:text-neutral-950"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <form onSubmit={handleSaveProduct} className="space-y-4 pt-4 text-xs">
                    
                    <div>
                      <label className="block font-semibold text-neutral-700 mb-1">
                        Nom officiel du vêtement <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={prodName}
                        onChange={(e) => setProdName(e.target.value)}
                        placeholder="Ex: Chemise Lin Col Italien Blanche"
                        className="w-full p-2.5 border border-neutral-300 focus:outline-none focus:border-neutral-950"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block font-semibold text-neutral-700 mb-1">Catégorie</label>
                        <select
                          value={prodCategory}
                          onChange={(e) => setProdCategory(e.target.value)}
                          className="w-full p-2.5 border border-neutral-300 focus:outline-none focus:border-neutral-950 bg-white"
                        >
                          <option value="Femme">Femme</option>
                          <option value="Homme">Homme</option>
                          <option value="Nouveautés">Nouveautés</option>
                          <option value="Collections">Collections</option>
                          <option value="Promotions">Promotions</option>
                          <option value="Accessoires">Accessoires</option>
                        </select>
                      </div>

                      <div>
                        <label className="block font-semibold text-neutral-700 mb-1">Prix (MAD) *</label>
                        <input
                          type="number"
                          required
                          value={prodPrice}
                          onChange={(e) => setProdPrice(Number(e.target.value))}
                          className="w-full p-2.5 border border-neutral-300 focus:outline-none focus:border-neutral-950"
                        />
                      </div>

                      <div>
                        <label className="block font-semibold text-neutral-700 mb-1">Ancien Prix (si promo)</label>
                        <input
                          type="number"
                          value={prodOriginalPrice || ''}
                          onChange={(e) => setProdOriginalPrice(e.target.value ? Number(e.target.value) : undefined)}
                          placeholder="Optionnel"
                          className="w-full p-2.5 border border-neutral-300 focus:outline-none focus:border-neutral-950"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block font-semibold text-neutral-700 mb-1">Référence / SKU</label>
                        <input
                          type="text"
                          value={prodSku}
                          onChange={(e) => setProdSku(e.target.value)}
                          className="w-full p-2.5 border border-neutral-300 focus:outline-none focus:border-neutral-950 font-mono"
                        />
                      </div>

                      <div>
                        <label className="block font-semibold text-neutral-700 mb-1">Statut du Stock</label>
                        <select
                          value={prodStockStatus}
                          onChange={(e) => setProdStockStatus(e.target.value as any)}
                          className="w-full p-2.5 border border-neutral-300 focus:outline-none focus:border-neutral-950 bg-white"
                        >
                          <option value="in_stock">En stock</option>
                          <option value="limited_stock">Stock limité</option>
                          <option value="out_of_stock">Rupture de stock</option>
                        </select>
                      </div>

                      <div>
                        <label className="block font-semibold text-neutral-700 mb-1">Quantité en stock</label>
                        <input
                          type="number"
                          value={prodStockQty}
                          onChange={(e) => setProdStockQty(Number(e.target.value))}
                          className="w-full p-2.5 border border-neutral-300 focus:outline-none focus:border-neutral-950"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-semibold text-neutral-700 mb-1">
                        URLs des photos (1 par ligne)
                      </label>
                      <textarea
                        rows={3}
                        value={prodImages}
                        onChange={(e) => setProdImages(e.target.value)}
                        placeholder="https://... photo 1&#10;https://... photo 2"
                        className="w-full p-2.5 border border-neutral-300 focus:outline-none focus:border-neutral-950 font-mono text-[11px]"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-semibold text-neutral-700 mb-1">
                          Tailles disponibles (séparées par virgules)
                        </label>
                        <input
                          type="text"
                          value={prodSizes}
                          onChange={(e) => setProdSizes(e.target.value)}
                          placeholder="S, M, L, XL"
                          className="w-full p-2.5 border border-neutral-300 focus:outline-none focus:border-neutral-950"
                        />
                      </div>

                      <div>
                        <label className="block font-semibold text-neutral-700 mb-1">
                          Couleurs (Format: Nom:#hex, séparées par virgules)
                        </label>
                        <input
                          type="text"
                          value={prodColors}
                          onChange={(e) => setProdColors(e.target.value)}
                          placeholder="Bleu:#0000FF, Blanc:#FFFFFF"
                          className="w-full p-2.5 border border-neutral-300 focus:outline-none focus:border-neutral-950"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-semibold text-neutral-700 mb-1">Description</label>
                      <textarea
                        rows={3}
                        value={prodDesc}
                        onChange={(e) => setProdDesc(e.target.value)}
                        placeholder="Détails de coupe, matière, conseils..."
                        className="w-full p-2.5 border border-neutral-300 focus:outline-none focus:border-neutral-950"
                      />
                    </div>

                    <div className="flex flex-wrap gap-4 pt-2 border-t border-neutral-200">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={prodIsNew}
                          onChange={(e) => setProdIsNew(e.target.checked)}
                          className="accent-neutral-950"
                        />
                        <span>Badge Nouveauté</span>
                      </label>

                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={prodIsPromo}
                          onChange={(e) => setProdIsPromo(e.target.checked)}
                          className="accent-neutral-950"
                        />
                        <span>Badge Promotion</span>
                      </label>

                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={prodIsSample}
                          onChange={(e) => setProdIsSample(e.target.checked)}
                          className="accent-neutral-950"
                        />
                        <span>Marquer comme exemple de démo</span>
                      </label>
                    </div>

                    <div className="pt-4 flex justify-end gap-3 border-t border-neutral-200">
                      <button
                        type="button"
                        onClick={() => {
                          setIsAddingNew(false);
                          setEditingProduct(null);
                        }}
                        className="px-4 py-2 border border-neutral-300 text-neutral-700 hover:bg-neutral-100"
                      >
                        Annuler
                      </button>

                      <button
                        type="submit"
                        className="px-6 py-2 bg-neutral-950 hover:bg-neutral-800 text-white font-semibold flex items-center gap-2"
                      >
                        <Save className="w-4 h-4" />
                        <span>Enregistrer le vêtement</span>
                      </button>
                    </div>

                  </form>
                </div>
              </div>
            )}

          </div>
        )}

        {/* TAB 2: Orders Management */}
        {activeAdminTab === 'orders' && (
          <div className="space-y-6">
            <div className="bg-white p-4 border border-neutral-200 flex justify-between items-center">
              <div>
                <h3 className="font-serif text-xl text-neutral-950 font-normal">
                  Commandes reçues ({orders.length})
                </h3>
                <p className="text-xs text-neutral-500">
                  Commandes passées en ligne par les clients de Casablanca et du Maroc.
                </p>
              </div>
            </div>

            {orders.length === 0 ? (
              <div className="bg-white p-12 text-center border border-neutral-200 text-xs text-neutral-500 space-y-2">
                <ShoppingBag className="w-8 h-8 text-neutral-400 mx-auto" />
                <p className="font-semibold text-neutral-800 text-sm">Aucune commande pour le moment</p>
                <p>Les commandes validées via le site web apparaîtront instantanément ici.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order.id} className="bg-white p-5 border border-neutral-200 shadow-xs space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-neutral-200 gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-sm text-neutral-950">
                            #{order.orderNumber}
                          </span>
                          <span className="text-[11px] text-neutral-500">
                            {new Date(order.createdAt).toLocaleString('fr-FR')}
                          </span>
                          <span className="text-[10px] uppercase font-semibold bg-neutral-100 text-neutral-700 px-2 py-0.5">
                            {order.orderMode === 'whatsapp' ? 'Commande WhatsApp' : 'Formulaire web'}
                          </span>
                        </div>
                        <div className="text-xs font-semibold text-neutral-900 mt-1">
                          Client : {order.customerName} · Tél : {order.phone} {order.whatsapp !== order.phone && `(WA: ${order.whatsapp})`}
                        </div>
                      </div>

                      {/* Status Selector */}
                      <div className="flex items-center gap-2">
                        <label className="text-[11px] text-neutral-500 uppercase">Statut :</label>
                        <select
                          value={order.status}
                          onChange={(e) => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                          className={`text-xs py-1 px-2.5 font-semibold border ${
                            order.status === 'en_attente' ? 'bg-amber-50 text-amber-800 border-amber-300' :
                            order.status === 'confirmee' ? 'bg-blue-50 text-blue-800 border-blue-300' :
                            order.status === 'en_livraison' ? 'bg-purple-50 text-purple-800 border-purple-300' :
                            order.status === 'livree' ? 'bg-emerald-50 text-emerald-800 border-emerald-300' :
                            'bg-red-50 text-red-800 border-red-300'
                          }`}
                        >
                          <option value="en_attente">En attente</option>
                          <option value="confirmee">Confirmée</option>
                          <option value="en_livraison">En livraison</option>
                          <option value="livree">Livrée</option>
                          <option value="annulee">Annulée</option>
                        </select>

                        <button
                          onClick={() => {
                            if (confirm(`Supprimer la commande #${order.orderNumber} ?`)) {
                              deleteOrder(order.id);
                            }
                          }}
                          className="p-1 text-neutral-400 hover:text-red-600 ml-2"
                          title="Supprimer la commande"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Address & Notes */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-neutral-600 bg-neutral-50 p-3 rounded">
                      <div>
                        <span className="font-semibold text-neutral-800 block">Lieu de réception :</span>
                        <p>{order.address}, Quartier: {order.district}, Ville: {order.city}</p>
                      </div>
                      <div>
                        <span className="font-semibold text-neutral-800 block">Notes & Remarques :</span>
                        <p>{order.notes || 'Aucune consigne spécifique.'}</p>
                      </div>
                    </div>

                    {/* Articles in Order */}
                    <div className="space-y-1 text-xs">
                      <span className="font-semibold text-neutral-900 block">Articles commandés :</span>
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between py-1 border-b border-neutral-100 last:border-0">
                          <span>
                            • {item.product.name} (Taille: {item.selectedSize}, Couleur: {item.selectedColor.name}) × {item.quantity}
                          </span>
                          <span className="font-semibold text-neutral-900">
                            {item.product.price * item.quantity} MAD
                          </span>
                        </div>
                      ))}
                      <div className="flex justify-between pt-2 text-sm font-bold text-neutral-950">
                        <span>Total de la commande</span>
                        <span>{order.totalAmount} MAD</span>
                      </div>
                    </div>

                    {/* Quick WhatsApp Action with Customer */}
                    <div className="pt-2 flex justify-end">
                      <a
                        href={generateOrderWhatsAppUrl(order)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 border border-emerald-200 transition-colors"
                      >
                        <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Contacter le client sur WhatsApp ({order.whatsapp})</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: Store Settings & Hours */}
        {activeAdminTab === 'store' && (
          <div className="bg-white p-6 sm:p-8 border border-neutral-200 space-y-6">
            <div>
              <h3 className="font-serif text-2xl text-neutral-950 font-normal">
                Coordonnées & Horaires de la Boutique
              </h3>
              <p className="text-xs text-neutral-500 mt-1">
                Informations officielles de Casablanca Shopping affichées sur tout le site.
              </p>
            </div>

            {storeSavedNotice && (
              <div className="p-3 bg-emerald-50 text-emerald-800 text-xs border border-emerald-200 flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Paramètres de la boutique enregistrés avec succès !</span>
              </div>
            )}

            <form onSubmit={handleSaveStoreSettings} className="space-y-6 text-xs">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-neutral-700 mb-1">
                    Adresse physique
                  </label>
                  <input
                    type="text"
                    value={storeAddress}
                    onChange={(e) => setStoreAddress(e.target.value)}
                    className="w-full p-2.5 border border-neutral-300 focus:outline-none focus:border-neutral-950"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-neutral-700 mb-1">
                    Téléphone officiel / WhatsApp (+212...)
                  </label>
                  <input
                    type="text"
                    value={storePhone}
                    onChange={(e) => setStorePhone(e.target.value)}
                    className="w-full p-2.5 border border-neutral-300 focus:outline-none focus:border-neutral-950"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-neutral-700 mb-1">
                    Compte Instagram officiel (optionnel, renseigner uniquement si vérifié)
                  </label>
                  <input
                    type="url"
                    value={storeInstagram}
                    onChange={(e) => setStoreInstagram(e.target.value)}
                    placeholder="https://instagram.com/..."
                    className="w-full p-2.5 border border-neutral-300 focus:outline-none focus:border-neutral-950"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-neutral-700 mb-1">
                    Page Facebook officielle (optionnel, renseigner uniquement si vérifié)
                  </label>
                  <input
                    type="url"
                    value={storeFacebook}
                    onChange={(e) => setStoreFacebook(e.target.value)}
                    placeholder="https://facebook.com/..."
                    className="w-full p-2.5 border border-neutral-300 focus:outline-none focus:border-neutral-950"
                  />
                </div>
              </div>

              {/* Hours editor */}
              <div className="pt-4 border-t border-neutral-200">
                <span className="block font-semibold text-neutral-900 uppercase tracking-wider mb-3">
                  Horaires d'ouverture
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'] as const).map((day) => (
                    <div key={day} className="flex items-center gap-3">
                      <span className="w-24 font-medium capitalize text-neutral-700">{day} :</span>
                      <input
                        type="text"
                        value={storeHours[day]}
                        onChange={(e) => setStoreHours({ ...storeHours, [day]: e.target.value })}
                        className="flex-1 p-2 border border-neutral-300 focus:outline-none focus:border-neutral-950"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-200 flex justify-end">
                <button
                  type="submit"
                  className="py-3 px-6 bg-neutral-950 hover:bg-neutral-800 text-white font-semibold uppercase tracking-wider transition-colors shadow"
                >
                  Sauvegarder les modifications
                </button>
              </div>

            </form>
          </div>
        )}

      </div>
    </div>
  );
};
