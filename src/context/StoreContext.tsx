import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Order, StoreInfo, OrderStatus, ProductColor } from '../types';
import { INITIAL_SAMPLE_PRODUCTS, OFFICIAL_STORE_INFO } from '../data/initialData';

interface StoreContextType {
  products: Product[];
  storeInfo: StoreInfo;
  cart: CartItem[];
  orders: Order[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  sortBy: 'featured' | 'newest' | 'price-asc' | 'price-desc';
  setSortBy: (sort: 'featured' | 'newest' | 'price-asc' | 'price-desc') => void;
  selectedProductForModal: Product | null;
  setSelectedProductForModal: (prod: Product | null) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isAdminAuthenticated: boolean;
  setIsAdminAuthenticated: (val: boolean) => void;
  // Cart Actions
  addToCart: (product: Product, size: string, color: ProductColor, quantity?: number) => void;
  updateCartQuantity: (itemId: string, delta: number) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  cartSubtotal: number;
  cartItemCount: number;
  // Order Actions
  createOrder: (orderData: {
    customerName: string;
    phone: string;
    whatsapp: string;
    city: string;
    address: string;
    district: string;
    notes?: string;
  }, mode: 'whatsapp' | 'form') => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  deleteOrder: (orderId: string) => void;
  // Product Admin Actions
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  updateStoreInfo: (info: Partial<StoreInfo>) => void;
  // WhatsApp Helpers
  generateProductWhatsAppUrl: (product: Product, size?: string, color?: string, qty?: number) => string;
  generateCartWhatsAppUrl: (customerInfo?: { name: string; city: string; address: string }) => string;
  generateOrderWhatsAppUrl: (order: Order) => string;
  getGeneralWhatsAppUrl: (initialText?: string) => string;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const STORAGE_KEYS = {
  PRODUCTS: 'casablanca_shopping_products_v1',
  STORE_INFO: 'casablanca_shopping_info_v1',
  CART: 'casablanca_shopping_cart_v1',
  ORDERS: 'casablanca_shopping_orders_v1',
};

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Store Info
  const [storeInfo, setStoreInfo] = useState<StoreInfo>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.STORE_INFO);
      return saved ? JSON.parse(saved) : OFFICIAL_STORE_INFO;
    } catch {
      return OFFICIAL_STORE_INFO;
    }
  });

  // Products
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      return saved ? JSON.parse(saved) : INITIAL_SAMPLE_PRODUCTS;
    } catch {
      return INITIAL_SAMPLE_PRODUCTS;
    }
  });

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CART);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ORDERS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Filter & Nav states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState<'featured' | 'newest' | 'price-asc' | 'price-desc'>('featured');
  const [selectedProductForModal, setSelectedProductForModal] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  // Persistence effects
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.STORE_INFO, JSON.stringify(storeInfo));
  }, [storeInfo]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  }, [orders]);

  // Cart math
  const cartSubtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Cart handlers
  const addToCart = (product: Product, size: string, color: ProductColor, quantity = 1) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.productId === product.id &&
          item.selectedSize === size &&
          item.selectedColor.name === color.name
      );

      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity,
        };
        return next;
      }

      const newItem: CartItem = {
        id: `cart-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
        productId: product.id,
        product,
        selectedSize: size,
        selectedColor: color,
        quantity,
      };
      return [...prev, newItem];
    });
    setIsCartOpen(true);
  };

  const updateCartQuantity = (itemId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === itemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== itemId));
  };

  const clearCart = () => {
    setCart([]);
  };

  // Orders
  const createOrder = (
    orderData: {
      customerName: string;
      phone: string;
      whatsapp: string;
      city: string;
      address: string;
      district: string;
      notes?: string;
    },
    mode: 'whatsapp' | 'form'
  ): Order => {
    const orderNumber = `CS-${Date.now().toString().slice(-6)}`;
    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber,
      customerName: orderData.customerName,
      phone: orderData.phone,
      whatsapp: orderData.whatsapp || orderData.phone,
      city: orderData.city,
      address: orderData.address,
      district: orderData.district,
      notes: orderData.notes,
      items: [...cart],
      totalAmount: cartSubtotal,
      status: 'en_attente',
      createdAt: new Date().toISOString(),
      orderMode: mode,
    };

    setOrders((prev) => [newOrder, ...prev]);
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((order) => (order.id === orderId ? { ...order, status } : order))
    );
  };

  const deleteOrder = (orderId: string) => {
    setOrders((prev) => prev.filter((order) => order.id !== orderId));
  };

  // Admin Product handlers
  const addProduct = (productData: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...productData,
      id: `prod-${Date.now()}`,
    };
    setProducts((prev) => [newProduct, ...prev]);
  };

  const updateProduct = (id: string, updatedFields: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updatedFields } : item))
    );
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((item) => item.id !== id));
  };

  const updateStoreInfo = (info: Partial<StoreInfo>) => {
    setStoreInfo((prev) => ({ ...prev, ...info }));
  };

  // WhatsApp helpers
  const targetPhone = storeInfo.phone || '212701179767';

  const getGeneralWhatsAppUrl = (initialText?: string) => {
    const text = initialText || "Bonjour Casablanca Shopping, je souhaite avoir des renseignements sur vos vêtements disponibles en boutique.";
    return `https://wa.me/${targetPhone}?text=${encodeURIComponent(text)}`;
  };

  const generateProductWhatsAppUrl = (
    product: Product,
    size?: string,
    color?: string,
    qty: number = 1
  ) => {
    const sizePart = size ? `\nTaille : ${size}` : '';
    const colorPart = color ? `\nCouleur : ${color}` : '';
    const msg = `Bonjour Casablanca Shopping,\nJe souhaite commander ou avoir des détails sur ce produit :\n\n• Produit : ${product.name}\n• Réf / SKU : ${product.sku}${sizePart}${colorPart}\n• Quantité : ${qty}\n• Prix : ${product.price} MAD\n\nMerci de me confirmer la disponibilité au magasin de Casablanca !`;
    return `https://wa.me/${targetPhone}?text=${encodeURIComponent(msg)}`;
  };

  const generateCartWhatsAppUrl = (customerInfo?: { name: string; city: string; address: string }) => {
    if (cart.length === 0) {
      return getGeneralWhatsAppUrl();
    }

    const itemsSummary = cart
      .map(
        (item, idx) =>
          `${idx + 1}. ${item.product.name} (Réf: ${item.product.sku})\n   Taille: ${item.selectedSize} | Couleur: ${item.selectedColor.name} | Qté: ${item.quantity} | Prix: ${item.product.price * item.quantity} MAD`
      )
      .join('\n\n');

    let msg = `Bonjour Casablanca Shopping,\nJe souhaite passer une commande depuis votre site web :\n\n${itemsSummary}\n\n• Total : ${cartSubtotal} MAD`;

    if (customerInfo) {
      msg += `\n\nCoordonnées client :\n• Nom : ${customerInfo.name}\n• Ville : ${customerInfo.city}\n• Adresse : ${customerInfo.address}`;
    }

    msg += `\n\nMerci de m'indiquer la disponibilité et le mode de retrait ou livraison à Casablanca.`;

    return `https://wa.me/${targetPhone}?text=${encodeURIComponent(msg)}`;
  };

  const generateOrderWhatsAppUrl = (order: Order) => {
    const itemsSummary = order.items
      .map(
        (item, idx) =>
          `${idx + 1}. ${item.product.name}\n   Taille: ${item.selectedSize} | Couleur: ${item.selectedColor.name} | Qté: ${item.quantity} | ${item.product.price * item.quantity} MAD`
      )
      .join('\n');

    const msg = `Bonjour Casablanca Shopping,\nVoici ma commande confirmée #${order.orderNumber} :\n\n• Nom : ${order.customerName}\n• Tél / WhatsApp : ${order.whatsapp}\n• Ville : ${order.city}\n• Quartier : ${order.district}\n• Adresse : ${order.address}\n\nArticles commandés :\n${itemsSummary}\n\n• Total : ${order.totalAmount} MAD${order.notes ? `\n• Notes : ${order.notes}` : ''}\n\nMerci de confirmer la prise en charge de ma commande !`;

    return `https://wa.me/${targetPhone}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        storeInfo,
        cart,
        orders,
        searchTerm,
        setSearchTerm,
        selectedCategory,
        setSelectedCategory,
        sortBy,
        setSortBy,
        selectedProductForModal,
        setSelectedProductForModal,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        activeTab,
        setActiveTab,
        isAdminAuthenticated,
        setIsAdminAuthenticated,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        cartSubtotal,
        cartItemCount,
        createOrder,
        updateOrderStatus,
        deleteOrder,
        addProduct,
        updateProduct,
        deleteProduct,
        updateStoreInfo,
        generateProductWhatsAppUrl,
        generateCartWhatsAppUrl,
        generateOrderWhatsAppUrl,
        getGeneralWhatsAppUrl,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
