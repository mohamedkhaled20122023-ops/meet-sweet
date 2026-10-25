export type ProductCategory = 
  | 'all'
  | 'smoked-cuts'     // منيو قطعيات اللحم
  | 'ready-meats'     // منيو مصنعات اللحوم جاهزة
  | 'burgers'         // برجر وسندوتشات فاخرة
  | 'appetizers'      // مقبلات وبطاطس وناتشو
  | 'combos';         // إضافات وكومبو

export interface WeightOption {
  key: '1kg' | 'half-kg' | 'quarter-kg';
  label: string;
  price: number;
}

export interface ProductItem {
  id: string;
  nameAr: string;
  nameEn: string;
  category: ProductCategory;
  basePrice: number;
  description: string;
  badge?: string;
  imagePoster: string;
  // Percentage coordinates to highlight/crop on the source menu poster
  cropArea: {
    x: number; // percentage offset X
    y: number; // percentage offset Y
    scale: number;
  };
  weightOptions?: WeightOption[];
  hasFreeSides?: boolean; // أرز بسمتي أو خبز، صوص عسل، صوص دقوس، ناتشو أو بطاطس أو توست
  supportsBurgerAddons?: boolean; // Add combo +50, add patty 100gm +70
}

export interface CartItem {
  cartItemId: string;
  productId: string;
  product: ProductItem;
  selectedWeight?: WeightOption;
  selectedCarb?: string;     // أرز بسمتي / خبز بلدي / توست
  selectedSauce?: string;    // صوص عسل / صوص دقوس / كلاهما
  selectedCrunch?: string;   // ناتشو / بطاطس مقلية / توست
  addCombo?: boolean;        // +50 LE
  addExtraPatty?: boolean;   // +70 LE
  unitPrice: number;
  quantity: number;
  notes?: string;
}

export interface CustomerOrder {
  orderId: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  deliveryMethod: 'delivery' | 'pickup';
  notes?: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  createdAt: string;
}
