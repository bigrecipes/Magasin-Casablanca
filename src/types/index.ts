export type ProductCategory = 'Femme' | 'Homme' | 'Nouveautés' | 'Collections' | 'Promotions' | 'Accessoires';

export type StockStatus = 'in_stock' | 'limited_stock' | 'out_of_stock';

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  category: ProductCategory | string;
  price: number;
  originalPrice?: number;
  description: string;
  images: string[];
  sizes: string[];
  colors: ProductColor[];
  stockStatus: StockStatus;
  stockQuantity: number;
  isNew?: boolean;
  isPromo?: boolean;
  isSample: boolean; // Flagged true if it's an example product waiting for store owner's real photo/info
  fabric?: string;
  details?: string[];
}

export interface CartItem {
  id: string; // unique item instance id
  productId: string;
  product: Product;
  selectedSize: string;
  selectedColor: ProductColor;
  quantity: number;
}

export type OrderStatus = 'en_attente' | 'confirmee' | 'en_livraison' | 'livree' | 'annulee';

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  phone: string;
  whatsapp: string;
  city: string;
  address: string;
  district: string; // Quartier (ex: Maârif, Gauthier, Bourgogne, etc.)
  notes?: string;
  items: CartItem[];
  totalAmount: number;
  status: OrderStatus;
  createdAt: string;
  orderMode: 'whatsapp' | 'form';
}

export interface StoreInfo {
  name: string;
  activity: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  phone: string;
  phoneDisplay: string;
  googleRating: number;
  googleReviewCount: number;
  hours: {
    lundi: string;
    mardi: string;
    mercredi: string;
    jeudi: string;
    vendredi: string;
    samedi: string;
    dimanche: string;
  };
  instagramUrl?: string;
  facebookUrl?: string;
  announcement: string;
}
