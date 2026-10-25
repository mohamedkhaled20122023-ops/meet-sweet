import React from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, ArrowLeft } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQuantity: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onProceedToCheckout: () => void;
  subtotal: number;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  subtotal,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="absolute inset-y-0 left-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-screen max-w-md bg-neutral-900 border-r border-neutral-800 text-neutral-100 flex flex-col shadow-2xl">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-neutral-800 flex items-center justify-between bg-neutral-950">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-amber-500" />
              <h2 className="text-lg font-bold text-white">سلة الطلبات</h2>
              <span className="text-xs bg-amber-500/20 text-amber-400 font-bold px-2 py-0.5 rounded-full border border-amber-500/30">
                {items.length} أصناف
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
              aria-label="إغلاق السلة"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
                <div className="p-4 rounded-full bg-neutral-800 text-neutral-500">
                  <ShoppingBag className="w-10 h-10" />
                </div>
                <h3 className="text-base font-bold text-neutral-300">سلتك فارغة حالياً</h3>
                <p className="text-xs text-neutral-500 max-w-xs leading-relaxed">
                  تصفح قطعيات اللحم المدخن، مصنعات اللحوم، وبرجر Meat & Sweet اللذيذ وأضف ما يحلو لك!
                </p>
                <button
                  onClick={onClose}
                  className="mt-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-bold rounded-xl transition-all"
                >
                  الرجوع لتصفح المنيو
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.cartItemId}
                  className="p-3 rounded-xl bg-neutral-950/70 border border-neutral-800 flex gap-3 relative"
                >
                  {/* Item Image Preview */}
                  <div
                    className="w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-neutral-800 border border-neutral-700"
                    style={{
                      backgroundImage: `url(${item.product.imagePoster})`,
                      backgroundPosition: `${item.product.cropArea.x}% ${item.product.cropArea.y}%`,
                      backgroundSize: `${item.product.cropArea.scale}%`,
                    }}
                  />

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-1">
                      <h4 className="text-sm font-bold text-white truncate">
                        {item.product.nameAr}
                      </h4>
                      <button
                        onClick={() => onRemoveItem(item.cartItemId)}
                        className="text-neutral-500 hover:text-red-400 p-1 transition-colors"
                        title="حذف من السلة"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Weight / Options info */}
                    <div className="text-[11px] text-neutral-400 space-y-0.5 mt-0.5">
                      {item.selectedWeight && (
                        <div className="text-amber-400/90 font-medium">
                          الوزن: {item.selectedWeight.label}
                        </div>
                      )}
                      {item.addCombo && (
                        <div className="text-emerald-400">+ كومبو (بطاطس + كانز)</div>
                      )}
                      {item.addExtraPatty && (
                        <div className="text-emerald-400">+ قطعة برجر 100 جم</div>
                      )}
                      {item.selectedCarb && (
                        <div className="text-neutral-400">
                          مع: {item.selectedCarb} • {item.selectedCrunch}
                        </div>
                      )}
                    </div>

                    {/* Quantity Stepper & Price */}
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center gap-2 bg-neutral-900 border border-neutral-700 rounded-lg p-0.5">
                        <button
                          onClick={() => onUpdateQuantity(item.cartItemId, item.quantity - 1)}
                          className="w-6 h-6 flex items-center justify-center rounded text-neutral-300 hover:bg-neutral-800 hover:text-white"
                          aria-label="إنقاص الكمية"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-mono font-bold px-1 tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.cartItemId, item.quantity + 1)}
                          className="w-6 h-6 flex items-center justify-center rounded text-neutral-300 hover:bg-neutral-800 hover:text-white"
                          aria-label="زيادة الكمية"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="text-left font-mono">
                        <span className="text-sm font-bold text-amber-400 tabular-nums">
                          {item.unitPrice * item.quantity}
                        </span>
                        <span className="text-[10px] text-amber-500 mr-1 font-bold">ج.م</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Summary */}
          {items.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-neutral-800 bg-neutral-950 space-y-3">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-neutral-400">
                  <span>المجموع الفرعي للأطباق:</span>
                  <span className="font-mono text-neutral-200 tabular-nums font-bold">
                    {subtotal} ج.م
                  </span>
                </div>
                <div className="flex justify-between text-neutral-400">
                  <span>رسوم التوصيل المقدرة:</span>
                  <span className="font-mono text-neutral-200 tabular-nums font-bold">
                    25 ج.م
                  </span>
                </div>
                <div className="flex justify-between text-base font-black text-white pt-2 border-t border-neutral-800">
                  <span>الإجمالي الكلي:</span>
                  <span className="font-mono text-amber-400 tabular-nums">
                    {subtotal + 25} ج.م
                  </span>
                </div>
              </div>

              {/* Proceed to Buy Button as requested by user */}
              <button
                onClick={onProceedToCheckout}
                className="w-full py-3.5 px-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-black rounded-xl text-sm shadow-xl shadow-amber-950/30 transition-all flex items-center justify-center gap-2 transform active:scale-95"
              >
                <span>متابعة الشراء وإتمام الطلب</span>
                <ArrowLeft className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
