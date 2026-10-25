import React, { useState } from 'react';
import { ShoppingBag, Zap, Check } from 'lucide-react';
import { ProductItem, WeightOption } from '../types';

interface ProductCardProps {
  product: ProductItem;
  onAddToCart: (
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
  ) => void;
  onBuyNow: (
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
  ) => void;
  onOpenPreview: (product: ProductItem) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onBuyNow,
  onOpenPreview,
}) => {
  // If product has weights, default to the quarter-kg (last one)
  const [selectedWeight, setSelectedWeight] = useState<WeightOption | undefined>(
    product.weightOptions ? product.weightOptions[product.weightOptions.length - 1] : undefined
  );

  // Burger addons
  const [addCombo, setAddCombo] = useState<boolean>(false);
  const [addExtraPatty, setAddExtraPatty] = useState<boolean>(false);

  // Sides selection
  const [selectedCarb] = useState<string>('أرز بسمتي');
  const [selectedSauce] = useState<string>('صوص عسل ودقوس');
  const [selectedCrunch] = useState<string>('ناتشو مقرمش');

  // Animation state
  const [justAdded, setJustAdded] = useState<boolean>(false);

  // Calculate current price
  const basePrice = selectedWeight ? selectedWeight.price : product.basePrice;
  const comboPrice = addCombo ? 50 : 0;
  const pattyPrice = addExtraPatty ? 70 : 0;
  const currentTotalPrice = basePrice + comboPrice + pattyPrice;

  // Add to cart only
  const handleAdd = () => {
    onAddToCart(product, selectedWeight, {
      carb: product.hasFreeSides ? selectedCarb : undefined,
      sauce: product.hasFreeSides ? selectedSauce : undefined,
      crunch: product.hasFreeSides ? selectedCrunch : undefined,
      addCombo,
      addExtraPatty,
    });
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  // Buy Now: Direct checkout for this item without adding to cart
  const handleBuy = () => {
    onBuyNow(product, selectedWeight, {
      carb: product.hasFreeSides ? selectedCarb : undefined,
      sauce: product.hasFreeSides ? selectedSauce : undefined,
      crunch: product.hasFreeSides ? selectedCrunch : undefined,
      addCombo,
      addExtraPatty,
    });
  };

  const isEnglishItem = product.category === 'burgers' || product.category === 'appetizers' || product.category === 'combos';

  return (
    <div className="group relative flex flex-col bg-neutral-900/90 rounded-2xl border border-neutral-800 hover:border-amber-500/40 transition-all duration-300 hover:shadow-xl hover:shadow-red-950/20 overflow-hidden">
      {/* Isolated Dish Photo Container */}
      <div 
        onClick={() => onOpenPreview(product)}
        className="relative h-48 sm:h-52 w-full overflow-hidden bg-neutral-950 cursor-pointer p-2 flex items-center justify-center"
        title="انقر لتكبير وتفحص الطبق"
      >
        {/* Frame to ensure strict dish isolation */}
        <div className="relative w-full h-full rounded-xl overflow-hidden bg-neutral-900 border border-neutral-800/80 shadow-inner">
          <div
            className="w-full h-full transition-transform duration-500 group-hover:scale-110"
            style={{
              backgroundImage: `url(${product.imagePoster})`,
              backgroundPosition: `${product.cropArea.x}% ${product.cropArea.y}%`,
              backgroundSize: `${product.cropArea.scale}%`,
              backgroundRepeat: 'no-repeat',
            }}
          />
          {/* Edge vignette to blend boundaries softly and ensure no adjacent items bleed */}
          <div className="absolute inset-0 ring-1 ring-inset ring-black/40 pointer-events-none shadow-[inset_0_0_20px_rgba(0,0,0,0.85)]" />
        </div>

        {/* Badge */}
        {product.badge && (
          <div className="absolute top-4 right-4 bg-red-600/95 backdrop-blur-sm text-white px-2.5 py-0.5 rounded-lg text-[10px] font-bold shadow-md">
            {product.badge}
          </div>
        )}
      </div>

      {/* Content Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3.5">
        <div>
          {/* Titles */}
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className={`text-base sm:text-lg font-bold text-white group-hover:text-amber-400 transition-colors ${isEnglishItem ? 'font-mono' : ''}`}>
                {isEnglishItem ? product.nameEn : product.nameAr}
              </h3>
              {!isEnglishItem && (
                <p className="text-xs text-neutral-400 font-mono" dir="ltr">
                  {product.nameEn}
                </p>
              )}
            </div>
          </div>

          <p className="text-xs text-neutral-400 mt-2 leading-relaxed line-clamp-2">
            {product.description}
          </p>
        </div>

        {/* Weight Selector for Meats */}
        {product.weightOptions && (
          <div className="space-y-1.5 pt-1 border-t border-neutral-800">
            <span className="text-[11px] font-semibold text-neutral-400 block">
              تحديد الوزن المطلوب:
            </span>
            <div className="grid grid-cols-3 gap-1.5">
              {product.weightOptions.map((opt) => {
                const isSelected = selectedWeight?.key === opt.key;
                return (
                  <button
                    key={opt.key}
                    type="button"
                    onClick={() => setSelectedWeight(opt)}
                    className={`py-1.5 px-1 rounded-lg text-[11px] font-bold transition-all text-center flex flex-col items-center justify-center border ${
                      isSelected
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/60 shadow-sm'
                        : 'bg-neutral-800/60 text-neutral-400 border-neutral-700/50 hover:bg-neutral-800 hover:text-white'
                    }`}
                  >
                    <span className="whitespace-nowrap">{opt.label.split(' ')[0]} {opt.label.split(' ')[1]}</span>
                    <span className="text-[10px] text-amber-400 font-mono mt-0.5">
                      {opt.price} ج.م
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Included Sides Info for Meats */}
        {product.hasFreeSides && (
          <div className="text-[11px] text-neutral-300 bg-neutral-950/70 p-2 rounded-lg border border-neutral-800 flex items-center justify-between">
            <span className="text-amber-400 font-medium">يشمل مجاناً:</span>
            <span className="text-[10px] text-neutral-300">أرز/خبز + صوصات + ناتشو</span>
          </div>
        )}

        {/* Burger Addons */}
        {product.supportsBurgerAddons && (
          <div className="space-y-1.5 pt-1 border-t border-neutral-800 text-[11px]">
            <span className="font-semibold text-neutral-400 block">إضافات:</span>
            <div className="flex flex-col gap-1.5">
              <label className="flex items-center justify-between p-1.5 rounded-lg bg-neutral-950/60 border border-neutral-800/80 cursor-pointer hover:bg-neutral-800/60">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={addCombo}
                    onChange={(e) => setAddCombo(e.target.checked)}
                    className="rounded border-neutral-700 text-amber-500 focus:ring-0"
                  />
                  <span className="text-neutral-200">إضافة كومبو (بطاطس + كانز)</span>
                </div>
                <span className="text-amber-400 font-bold font-mono">+50 ج.م</span>
              </label>

              <label className="flex items-center justify-between p-1.5 rounded-lg bg-neutral-950/60 border border-neutral-800/80 cursor-pointer hover:bg-neutral-800/60">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={addExtraPatty}
                    onChange={(e) => setAddExtraPatty(e.target.checked)}
                    className="rounded border-neutral-700 text-amber-500 focus:ring-0"
                  />
                  <span className="text-neutral-200">إضافة قطعة برجر 100 جم</span>
                </div>
                <span className="text-amber-400 font-bold font-mono">+70 ج.م</span>
              </label>
            </div>
          </div>
        )}

        {/* Price & Action Buttons */}
        <div className="pt-2 border-t border-neutral-800/80 space-y-3">
          {/* Price Header */}
          <div className="flex items-baseline justify-between">
            <span className="text-xs text-neutral-400">السعر:</span>
            <div className="flex items-baseline gap-1">
              <span className="text-xl sm:text-2xl font-black text-amber-400 font-mono tabular-nums">
                {currentTotalPrice}
              </span>
              <span className="text-xs text-amber-500 font-bold">ج.م</span>
            </div>
          </div>

          {/* TWO Buttons: Direct Buy Now vs Add to Cart */}
          <div className="grid grid-cols-2 gap-2">
            {/* 1. اشتري الآن (Direct Instant Purchase) */}
            <button
              type="button"
              onClick={handleBuy}
              className="w-full py-2.5 px-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-black rounded-xl text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-1.5 transform active:scale-95 whitespace-nowrap"
            >
              <Zap className="w-3.5 h-3.5 fill-neutral-950" />
              <span>اشتري الآن</span>
            </button>

            {/* 2. أضف إلى السلة (Add to Cart) */}
            <button
              type="button"
              onClick={handleAdd}
              className={`w-full py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold border transition-all flex items-center justify-center gap-1.5 transform active:scale-95 whitespace-nowrap ${
                justAdded
                  ? 'bg-emerald-600 border-emerald-500 text-white'
                  : 'bg-neutral-800/80 hover:bg-neutral-700 border-neutral-700 text-neutral-200 hover:text-white'
              }`}
            >
              {justAdded ? (
                <>
                  <Check className="w-3.5 h-3.5 text-white" />
                  <span>تمت الإضافة!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5 text-amber-400" />
                  <span>أضف للسلة</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
