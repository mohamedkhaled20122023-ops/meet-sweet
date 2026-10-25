import React, { useState } from 'react';
import { X, ShoppingBag, Zap, Sparkles } from 'lucide-react';
import { ProductItem, WeightOption } from '../types';

interface ProductDetailModalProps {
  product: ProductItem | null;
  isOpen: boolean;
  onClose: () => void;
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
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
  onBuyNow,
}) => {
  if (!isOpen || !product) return null;

  const [selectedWeight, setSelectedWeight] = useState<WeightOption | undefined>(
    product.weightOptions ? product.weightOptions[product.weightOptions.length - 1] : undefined
  );
  const [addCombo, setAddCombo] = useState(false);
  const [addExtraPatty, setAddExtraPatty] = useState(false);
  const [selectedCarb, setSelectedCarb] = useState('أرز بسمتي أصفر');
  const [selectedCrunch, setSelectedCrunch] = useState('ناتشو مقرمش');
  const [specialNotes, setSpecialNotes] = useState('');

  const basePrice = selectedWeight ? selectedWeight.price : product.basePrice;
  const comboPrice = addCombo ? 50 : 0;
  const pattyPrice = addExtraPatty ? 70 : 0;
  const totalPrice = basePrice + comboPrice + pattyPrice;

  const handleAddToCart = () => {
    onAddToCart(product, selectedWeight, {
      carb: product.hasFreeSides ? selectedCarb : undefined,
      crunch: product.hasFreeSides ? selectedCrunch : undefined,
      addCombo,
      addExtraPatty,
      notes: specialNotes,
    });
    onClose();
  };

  const handleBuyNow = () => {
    onBuyNow(product, selectedWeight, {
      carb: product.hasFreeSides ? selectedCarb : undefined,
      crunch: product.hasFreeSides ? selectedCrunch : undefined,
      addCombo,
      addExtraPatty,
      notes: specialNotes,
    });
    onClose();
  };

  const isEnglishItem = product.category === 'burgers' || product.category === 'appetizers' || product.category === 'combos';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-2xl bg-neutral-900 border border-neutral-700/80 rounded-2xl shadow-2xl text-neutral-100 max-h-[92vh] overflow-y-auto flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 z-20 p-2 rounded-xl bg-black/60 text-neutral-300 hover:text-white hover:bg-neutral-800 transition-colors"
          aria-label="إغلاق"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Big Visual Header with isolated framing */}
        <div className="relative h-64 sm:h-72 w-full bg-neutral-950 shrink-0 overflow-hidden p-3 flex items-center justify-center">
          <div className="relative w-full h-full rounded-xl overflow-hidden bg-neutral-900 border border-neutral-800 shadow-inner">
            <div
              className="w-full h-full"
              style={{
                backgroundImage: `url(${product.imagePoster})`,
                backgroundPosition: `${product.cropArea.x}% ${product.cropArea.y}%`,
                backgroundSize: `${product.cropArea.scale * 1.05}%`,
                backgroundRepeat: 'no-repeat',
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-black/30" />
            <div className="absolute inset-0 ring-1 ring-inset ring-black/40 pointer-events-none shadow-[inset_0_0_30px_rgba(0,0,0,0.85)]" />
          </div>

          {/* Badge */}
          {product.badge && (
            <div className="absolute top-5 right-5 bg-red-600 text-white font-bold px-3 py-1 rounded-xl text-xs shadow-lg">
              {product.badge}
            </div>
          )}

          {/* Title overlay */}
          <div className="absolute bottom-5 right-5 left-5 flex items-end justify-between">
            <div>
              <h2 className={`text-2xl sm:text-3xl font-black text-white ${isEnglishItem ? 'font-mono' : ''}`}>
                {isEnglishItem ? product.nameEn : product.nameAr}
              </h2>
              {!isEnglishItem && (
                <p className="text-sm text-neutral-300 font-mono" dir="ltr">
                  {product.nameEn}
                </p>
              )}
            </div>
            <div className="text-left bg-neutral-950/80 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-amber-500/30">
              <span className="text-[10px] text-neutral-400 block">السعر</span>
              <span className="text-xl font-black text-amber-400 font-mono tabular-nums">
                {totalPrice} ج.م
              </span>
            </div>
          </div>
        </div>

        {/* Body content */}
        <div className="p-5 sm:p-6 space-y-5 flex-1">
          <p className="text-sm text-neutral-300 leading-relaxed">
            {product.description}
          </p>

          {/* Weight selector */}
          {product.weightOptions && (
            <div className="space-y-2 border-t border-neutral-800 pt-4">
              <label className="text-xs font-bold text-neutral-200 block">
                تحديد وزن الوجبة (اللحم المستخدم بقري بلدي 100%):
              </label>
              <div className="grid grid-cols-3 gap-2">
                {product.weightOptions.map((w) => (
                  <button
                    key={w.key}
                    type="button"
                    onClick={() => setSelectedWeight(w)}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      selectedWeight?.key === w.key
                        ? 'bg-amber-500/20 border-amber-500 text-amber-300 shadow-md font-bold'
                        : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white'
                    }`}
                  >
                    <span className="block text-xs">{w.label}</span>
                    <span className="block text-sm font-black font-mono text-amber-400 mt-1">
                      {w.price} ج.م
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Sides Customization for Meats */}
          {product.hasFreeSides && (
            <div className="space-y-3 border-t border-neutral-800 pt-4 bg-neutral-950/50 p-4 rounded-xl border">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400">
                <Sparkles className="w-4 h-4" />
                <span>إضافات الوجبة المجانية (تضاف مجاناً مع الطبق):</span>
              </div>

              {/* Side 1: Carbs */}
              <div className="space-y-1">
                <span className="text-[11px] text-neutral-400">اختر نوع الخبز أو الأرز:</span>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  {['أرز بسمتي أصفر', 'خبز طازج', 'توست محمص'].map((carb) => (
                    <button
                      key={carb}
                      type="button"
                      onClick={() => setSelectedCarb(carb)}
                      className={`p-2 rounded-lg border text-center transition-colors ${
                        selectedCarb === carb
                          ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-bold'
                          : 'bg-neutral-900 border-neutral-800 text-neutral-400'
                      }`}
                    >
                      {carb}
                    </button>
                  ))}
                </div>
              </div>

              {/* Side 2: Crunch */}
              <div className="space-y-1">
                <span className="text-[11px] text-neutral-400">اختر المقرمشات:</span>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  {['ناتشو مقرمش', 'بطاطس مقلية', 'توست كرانشي'].map((crunch) => (
                    <button
                      key={crunch}
                      type="button"
                      onClick={() => setSelectedCrunch(crunch)}
                      className={`p-2 rounded-lg border text-center transition-colors ${
                        selectedCrunch === crunch
                          ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-bold'
                          : 'bg-neutral-900 border-neutral-800 text-neutral-400'
                      }`}
                    >
                      {crunch}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Burger Addons */}
          {product.supportsBurgerAddons && (
            <div className="space-y-2 border-t border-neutral-800 pt-4">
              <span className="text-xs font-bold text-neutral-200 block">إضافات:</span>
              <div className="space-y-2">
                <label className="flex items-center justify-between p-3 rounded-xl bg-neutral-950 border border-neutral-800 cursor-pointer hover:border-neutral-700">
                  <div className="flex items-center gap-2.5">
                    <input
                      type="checkbox"
                      checked={addCombo}
                      onChange={(e) => setAddCombo(e.target.checked)}
                      className="rounded border-neutral-700 text-amber-500 focus:ring-0"
                    />
                    <div>
                      <span className="text-xs font-bold text-white block">إضافة كومبو كامل</span>
                      <span className="text-[11px] text-neutral-400">بطاطس مقلية ذهبية + كانز مشروب غازي</span>
                    </div>
                  </div>
                  <span className="text-amber-400 font-mono font-bold text-xs">+50 ج.م</span>
                </label>

                <label className="flex items-center justify-between p-3 rounded-xl bg-neutral-950 border border-neutral-800 cursor-pointer hover:border-neutral-700">
                  <div className="flex items-center gap-2.5">
                    <input
                      type="checkbox"
                      checked={addExtraPatty}
                      onChange={(e) => setAddExtraPatty(e.target.checked)}
                      className="rounded border-neutral-700 text-amber-500 focus:ring-0"
                    />
                    <div>
                      <span className="text-xs font-bold text-white block">إضافة قطعة برجر 100 جم</span>
                      <span className="text-[11px] text-neutral-400">لحم بلدي صافي مشوي إضافي</span>
                    </div>
                  </div>
                  <span className="text-amber-400 font-mono font-bold text-xs">+70 ج.م</span>
                </label>
              </div>
            </div>
          )}

          {/* Special Notes */}
          <div className="space-y-1.5 border-t border-neutral-800 pt-4">
            <label className="text-xs font-medium text-neutral-300 block">
              أي ملاحظات للشيف:
            </label>
            <input
              type="text"
              value={specialNotes}
              onChange={(e) => setSpecialNotes(e.target.value)}
              placeholder="اكتب أي ملاحظات إضافية على الطلب"
              className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>

        {/* Footer Dual Actions */}
        <div className="p-4 sm:p-5 border-t border-neutral-800 bg-neutral-950 grid grid-cols-2 gap-3 shrink-0">
          <button
            type="button"
            onClick={handleBuyNow}
            className="py-3 px-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-black rounded-xl text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2"
          >
            <Zap className="w-4 h-4 fill-neutral-950" />
            <span>اشتري الآن ({totalPrice} ج.م)</span>
          </button>

          <button
            type="button"
            onClick={handleAddToCart}
            className="py-3 px-4 bg-neutral-800 hover:bg-neutral-700 text-white font-bold rounded-xl text-xs sm:text-sm border border-neutral-700 transition-all flex items-center justify-center gap-2"
          >
            <ShoppingBag className="w-4 h-4 text-amber-400" />
            <span>أضف إلى السلة</span>
          </button>
        </div>
      </div>
    </div>
  );
};
