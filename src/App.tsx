import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Search, 
  ShoppingBag, 
  Flame, 
  ShieldCheck, 
  Check, 
  X, 
  ChefHat 
} from 'lucide-react';
import { ProductItem, CartItem, CustomerOrder, WeightOption, ProductCategory } from './types';
import { PRODUCTS } from './data/menuData';
import { Header } from './components/Header';
import { DesignerDemoBanner } from './components/DesignerDemoBanner';
import { HeroSection } from './components/HeroSection';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { DesignerModal } from './components/DesignerModal';
import { GoogleMapsReviewBanner } from './components/GoogleMapsReviewBanner';
import { Footer } from './components/Footer';

export default function App() {
  // Navigation & Filtering State
  const [activeCategory, setActiveCategory] = useState<ProductCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modals & Drawers State
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isOrderSuccessOpen, setIsOrderSuccessOpen] = useState(false);
  const [isDesignerModalOpen, setIsDesignerModalOpen] = useState(false);
  const [selectedProductForDetail, setSelectedProductForDetail] = useState<ProductItem | null>(null);

  // Cart & Orders State
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('meat_sweet_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Direct Buy Item (when clicking "اشتري الآن" directly without touching cart)
  const [directBuyItem, setDirectBuyItem] = useState<CartItem | null>(null);

  const [lastOrder, setLastOrder] = useState<CustomerOrder | null>(() => {
    try {
      const saved = localStorage.getItem('meat_sweet_last_order');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Toast feedback state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const menuSectionRef = useRef<HTMLDivElement>(null);

  // Save cart to local storage
  useEffect(() => {
    try {
      localStorage.setItem('meat_sweet_cart', JSON.stringify(cartItems));
    } catch {
      // ignore
    }
  }, [cartItems]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 2500);
  };

  // Cart Calculations
  const cartSubtotal = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
  }, [cartItems]);

  const cartTotalCount = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.quantity, 0);
  }, [cartItems]);

  // Scroll to menu
  const scrollToMenu = () => {
    menuSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // 1. Add item to cart ONLY (Does not open checkout)
  const handleAddToCart = (
    product: ProductItem,
    selectedWeight?: WeightOption,
    options?: {
      carb?: string;
      sauce?: string;
      crunch?: string;
      addCombo?: boolean;
      addExtraPatty?: boolean;
      notes?: string;
    }
  ) => {
    const basePrice = selectedWeight ? selectedWeight.price : product.basePrice;
    const comboPrice = options?.addCombo ? 50 : 0;
    const pattyPrice = options?.addExtraPatty ? 70 : 0;
    const unitPrice = basePrice + comboPrice + pattyPrice;

    const cartItemId = `${product.id}-${selectedWeight?.key || 'base'}-${options?.addCombo ? 'combo' : ''}-${options?.addExtraPatty ? 'patty' : ''}`;

    setCartItems((prev) => {
      const existing = prev.find((i) => i.cartItemId === cartItemId);
      if (existing) {
        return prev.map((i) =>
          i.cartItemId === cartItemId ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      const newItem: CartItem = {
        cartItemId,
        productId: product.id,
        product,
        selectedWeight,
        selectedCarb: options?.carb,
        selectedSauce: options?.sauce,
        selectedCrunch: options?.crunch,
        addCombo: options?.addCombo,
        addExtraPatty: options?.addExtraPatty,
        unitPrice,
        quantity: 1,
        notes: options?.notes,
      };
      return [...prev, newItem];
    });

    showToast(`تمت إضافة "${product.nameAr}" إلى السلة 🛒`);
  };

  // 2. Buy Now: DIRECT PURCHASE for this item only (Does NOT add to cart!)
  const handleBuyNow = (
    product: ProductItem,
    selectedWeight?: WeightOption,
    options?: {
      carb?: string;
      sauce?: string;
      crunch?: string;
      addCombo?: boolean;
      addExtraPatty?: boolean;
      notes?: string;
    }
  ) => {
    const basePrice = selectedWeight ? selectedWeight.price : product.basePrice;
    const comboPrice = options?.addCombo ? 50 : 0;
    const pattyPrice = options?.addExtraPatty ? 70 : 0;
    const unitPrice = basePrice + comboPrice + pattyPrice;

    const directItem: CartItem = {
      cartItemId: `direct-${Date.now()}`,
      productId: product.id,
      product,
      selectedWeight,
      selectedCarb: options?.carb,
      selectedSauce: options?.sauce,
      selectedCrunch: options?.crunch,
      addCombo: options?.addCombo,
      addExtraPatty: options?.addExtraPatty,
      unitPrice,
      quantity: 1,
      notes: options?.notes,
    };

    setDirectBuyItem(directItem);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  // Update item quantity in cart
  const handleUpdateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(cartItemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((i) => (i.cartItemId === cartItemId ? { ...i, quantity: newQty } : i))
    );
  };

  // Remove item from cart
  const handleRemoveItem = (cartItemId: string) => {
    setCartItems((prev) => prev.filter((i) => i.cartItemId !== cartItemId));
  };

  // Submit order
  const handleOrderSubmitted = (order: CustomerOrder) => {
    setLastOrder(order);
    try {
      localStorage.setItem('meat_sweet_last_order', JSON.stringify(order));
    } catch {
      // ignore
    }

    if (directBuyItem) {
      setDirectBuyItem(null);
    } else {
      setCartItems([]);
    }

    setIsCheckoutOpen(false);
    setIsOrderSuccessOpen(true);
  };

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category filter
      if (activeCategory !== 'all' && product.category !== activeCategory) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchNameAr = product.nameAr.toLowerCase().includes(query);
        const matchNameEn = product.nameEn.toLowerCase().includes(query);
        const matchDesc = product.description.toLowerCase().includes(query);
        return matchNameAr || matchNameEn || matchDesc;
      }
      return true;
    });
  }, [activeCategory, searchQuery]);

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {
      all: PRODUCTS.length,
      'smoked-cuts': 0,
      'ready-meats': 0,
      burgers: 0,
      appetizers: 0,
      combos: 0,
    };
    PRODUCTS.forEach((p) => {
      if (counts[p.category] !== undefined) {
        counts[p.category]++;
      }
    });
    return counts;
  }, []);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col selection:bg-amber-500 selection:text-black">
      {/* 1. Designer Legal & Demo Mode Banner */}
      <DesignerDemoBanner onOpenDesignerModal={() => setIsDesignerModalOpen(true)} />

      {/* 2. Top Header with Logo, Navigation, Search & Cart */}
      <Header
        cartCount={cartTotalCount}
        cartTotal={cartSubtotal}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenDesignerModal={() => setIsDesignerModalOpen(true)}
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          scrollToMenu();
        }}
        activeCategory={activeCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* 3. Hero Section */}
      <HeroSection onScrollToMenu={scrollToMenu} />

      {/* 4. Menu & Ordering Section */}
      <main ref={menuSectionRef} id="menu-section" className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 py-10 w-full space-y-8">
        {/* Section Heading & Search */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-neutral-800 pb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 mb-1">
              <ChefHat className="w-4 h-4" />
              <span>قائمة وجبات وأطباق Meat & Sweet</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white font-['Tajawal',sans-serif]">
              اختر وجبتك المفضلة واطلب مباشرة
            </h2>
            <p className="text-xs text-neutral-400 mt-1">
              يمكنك الضغط على <strong className="text-amber-400">"اشتري الآن"</strong> للطلب الفوري المباشر للطبق، أو <strong className="text-white">"أضف للسلة"</strong> لجمع عدة أصناف.
            </p>
          </div>

          {/* Search Input in Section */}
          <div className="relative w-full md:w-72 shrink-0">
            <Search className="w-4 h-4 text-neutral-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث بالاسم (بريسكت، واشنطن...)"
              className="w-full bg-neutral-900 border border-neutral-700/80 rounded-xl pr-10 pl-8 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute left-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white"
                aria-label="مسح البحث"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none text-xs font-bold">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2.5 rounded-xl border transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeCategory === 'all'
                ? 'bg-amber-500 text-neutral-950 border-amber-400 shadow-md font-black'
                : 'bg-neutral-900/80 text-neutral-300 border-neutral-800 hover:bg-neutral-800 hover:text-white'
            }`}
          >
            <span>جميع الأصناف</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-black/20 font-mono">
              {categoryCounts.all}
            </span>
          </button>

          <button
            onClick={() => setActiveCategory('smoked-cuts')}
            className={`px-4 py-2.5 rounded-xl border transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeCategory === 'smoked-cuts'
                ? 'bg-amber-500 text-neutral-950 border-amber-400 shadow-md font-black'
                : 'bg-neutral-900/80 text-neutral-300 border-neutral-800 hover:bg-neutral-800 hover:text-white'
            }`}
          >
            <Flame className="w-3.5 h-3.5 text-red-400" />
            <span>قطعيات اللحم المدخن</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-black/20 font-mono">
              {categoryCounts['smoked-cuts']}
            </span>
          </button>

          <button
            onClick={() => setActiveCategory('ready-meats')}
            className={`px-4 py-2.5 rounded-xl border transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeCategory === 'ready-meats'
                ? 'bg-amber-500 text-neutral-950 border-amber-400 shadow-md font-black'
                : 'bg-neutral-900/80 text-neutral-300 border-neutral-800 hover:bg-neutral-800 hover:text-white'
            }`}
          >
            <span>مصنعات اللحوم جاهزة</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-black/20 font-mono">
              {categoryCounts['ready-meats']}
            </span>
          </button>

          <button
            onClick={() => setActiveCategory('burgers')}
            className={`px-4 py-2.5 rounded-xl border transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeCategory === 'burgers'
                ? 'bg-amber-500 text-neutral-950 border-amber-400 shadow-md font-black'
                : 'bg-neutral-900/80 text-neutral-300 border-neutral-800 hover:bg-neutral-800 hover:text-white'
            }`}
          >
            <span>Burgers & Sandwiches</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-black/20 font-mono">
              {categoryCounts.burgers}
            </span>
          </button>

          <button
            onClick={() => setActiveCategory('appetizers')}
            className={`px-4 py-2.5 rounded-xl border transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeCategory === 'appetizers'
                ? 'bg-amber-500 text-neutral-950 border-amber-400 shadow-md font-black'
                : 'bg-neutral-900/80 text-neutral-300 border-neutral-800 hover:bg-neutral-800 hover:text-white'
            }`}
          >
            <span>Fries & Nachos</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-black/20 font-mono">
              {categoryCounts.appetizers}
            </span>
          </button>

          <button
            onClick={() => setActiveCategory('combos')}
            className={`px-4 py-2.5 rounded-xl border transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeCategory === 'combos'
                ? 'bg-amber-500 text-neutral-950 border-amber-400 shadow-md font-black'
                : 'bg-neutral-900/80 text-neutral-300 border-neutral-800 hover:bg-neutral-800 hover:text-white'
            }`}
          >
            <span>الكومبو والإضافات</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-black/20 font-mono">
              {categoryCounts.combos}
            </span>
          </button>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-16 text-center space-y-3 bg-neutral-900/40 rounded-2xl border border-neutral-800 p-8">
            <Search className="w-10 h-10 text-neutral-600 mx-auto" />
            <h3 className="text-base font-bold text-white">لم يتم العثور على أطباق مطابقة</h3>
            <p className="text-xs text-neutral-400">
              جرب تغيير كلمة البحث أو اختيار قسم آخر من أقسام المنيو أعلاه.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
              }}
              className="px-4 py-2 bg-amber-500 text-neutral-950 text-xs font-bold rounded-xl"
            >
              عرض جميع الأصناف
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
                onBuyNow={handleBuyNow}
                onOpenPreview={(prod) => setSelectedProductForDetail(prod)}
              />
            ))}
          </div>
        )}
      </main>

      {/* 5. Google Maps Rating Strip */}
      <GoogleMapsReviewBanner />

      {/* 6. Footer with Designer Rights & Brand Details */}
      <Footer onOpenDesignerModal={() => setIsDesignerModalOpen(true)} />

      {/* ========================================================= */}
      {/* Modals & Drawers */}
      {/* ========================================================= */}

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={() => {
          setDirectBuyItem(null);
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        subtotal={cartSubtotal}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => {
          setIsCheckoutOpen(false);
          setDirectBuyItem(null);
        }}
        items={cartItems}
        directItem={directBuyItem}
        subtotal={cartSubtotal}
        onSubmitOrder={handleOrderSubmitted}
      />

      {/* Order Success Modal */}
      <OrderSuccessModal
        order={lastOrder}
        isOpen={isOrderSuccessOpen}
        onClose={() => setIsOrderSuccessOpen(false)}
      />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProductForDetail}
        isOpen={!!selectedProductForDetail}
        onClose={() => setSelectedProductForDetail(null)}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
      />

      {/* Designer Copyright & Presentation Agreement Modal */}
      <DesignerModal
        isOpen={isDesignerModalOpen}
        onClose={() => setIsDesignerModalOpen(false)}
      />

      {/* Floating Bottom Designer Watermark Badge */}
      <div className="fixed bottom-4 left-4 z-30">
        <button
          onClick={() => setIsDesignerModalOpen(true)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-900/90 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-amber-500/40 shadow-xl backdrop-blur-md text-[11px] font-semibold transition-all hover:scale-105"
          title="عرض وثيقة حقوق الملكية وشروط العرض التجريبي"
        >
          <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
          <span>حقوق المصمم © 2026 • نسخة للعرض فقط</span>
        </button>
      </div>

      {/* Floating Cart Trigger on Mobile */}
      {cartTotalCount > 0 && !isCartOpen && (
        <div className="fixed bottom-4 right-4 z-30 sm:hidden">
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2 px-4 py-3 bg-red-600 text-white rounded-full font-bold shadow-2xl text-xs"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>السلة ({cartTotalCount})</span>
            <span className="bg-black/30 px-1.5 py-0.5 rounded font-mono">
              {cartSubtotal} ج.م
            </span>
          </button>
        </div>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-neutral-900 border border-amber-500/50 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-2xl animate-bounce flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
