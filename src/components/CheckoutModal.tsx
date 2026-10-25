import React, { useState } from 'react';
import { X, User, Phone, MapPin, FileText, CheckCircle2, ShoppingBag, Truck, Store } from 'lucide-react';
import { CartItem, CustomerOrder } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  directItem?: CartItem | null;
  subtotal: number;
  onSubmitOrder: (order: CustomerOrder) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  directItem,
  subtotal,
  onSubmitOrder,
}) => {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState<'delivery' | 'pickup'>('delivery');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState<{ name?: string; phone?: string; address?: string }>({});

  if (!isOpen) return null;

  // Determine which items are being checked out: direct single item OR full cart
  const orderItems = directItem ? [directItem] : items;
  const effectiveSubtotal = directItem ? directItem.unitPrice * directItem.quantity : subtotal;
  const deliveryFee = deliveryMethod === 'delivery' ? 25 : 0;
  const total = effectiveSubtotal + deliveryFee;

  const validate = () => {
    const errs: { name?: string; phone?: string; address?: string } = {};
    if (!customerName.trim()) {
      errs.name = 'يرجى إدخال الاسم بالكامل';
    }
    if (!customerPhone.trim()) {
      errs.phone = 'يرجى إدخال رقم الهاتف للتواصل';
    } else if (customerPhone.trim().length < 10) {
      errs.phone = 'يرجى إدخال رقم هاتف صحيح';
    }
    if (deliveryMethod === 'delivery' && !customerAddress.trim()) {
      errs.address = 'يرجى إدخال العنوان بالتفصيل';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const orderData: CustomerOrder = {
      orderId: `order-${Date.now()}`,
      orderNumber: `MS-${randomSuffix}`,
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      customerAddress: deliveryMethod === 'delivery' ? customerAddress.trim() : 'استلام من الفرع',
      deliveryMethod,
      notes: notes.trim(),
      items: orderItems,
      subtotal: effectiveSubtotal,
      deliveryFee,
      total,
      createdAt: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
    };

    onSubmitOrder(orderData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-xl bg-neutral-900 border border-neutral-700/80 rounded-2xl shadow-2xl text-neutral-100 max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-neutral-800 flex items-center justify-between bg-neutral-950 sticky top-0 z-10">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-amber-500/10 rounded-xl text-amber-400 border border-amber-500/20">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">إتمام وتأكيد الطلب</h2>
              <p className="text-xs text-neutral-400">
                {directItem ? 'شراء فوري مباشر للطلب' : 'إتمام طلب سلة المشتريات'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-5">
          {/* Order Summary Strip: "الفاتورة" as requested */}
          <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-between text-xs">
            <div>
              <span className="text-neutral-400 block font-semibold">الفاتورة ({orderItems.length} صنف):</span>
              <span className="font-bold text-neutral-200 truncate max-w-[240px] inline-block">
                {orderItems.map(i => i.product.nameAr).join('، ')}
              </span>
            </div>
            <div className="text-left">
              <span className="text-neutral-400 block">الإجمالي:</span>
              <span className="text-base font-black text-amber-400 font-mono">
                {total} ج.م
              </span>
            </div>
          </div>

          {/* Delivery Method Selection */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-neutral-300 block">
              طريقة الاستلام:
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setDeliveryMethod('delivery')}
                className={`p-3 rounded-xl border flex items-center gap-2.5 text-xs font-bold transition-all ${
                  deliveryMethod === 'delivery'
                    ? 'bg-amber-500/15 border-amber-500 text-amber-300 shadow-md'
                    : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-neutral-200'
                }`}
              >
                <Truck className="w-4 h-4 text-amber-400" />
                <div className="text-right">
                  <div>توصيل دليفري للمنزل</div>
                  <span className="text-[10px] text-neutral-400 font-mono">+25 ج.م</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setDeliveryMethod('pickup')}
                className={`p-3 rounded-xl border flex items-center gap-2.5 text-xs font-bold transition-all ${
                  deliveryMethod === 'pickup'
                    ? 'bg-amber-500/15 border-amber-500 text-amber-300 shadow-md'
                    : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-neutral-200'
                }`}
              >
                <Store className="w-4 h-4 text-amber-400" />
                <div className="text-right">
                  <div>استلام من الفرع</div>
                  <span className="text-[10px] text-emerald-400">مجاناً</span>
                </div>
              </button>
            </div>
          </div>

          {/* 1. Name Input without examples */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-neutral-300 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-amber-400" />
              <span>الاسم بالكامل *</span>
            </label>
            <input
              type="text"
              value={customerName}
              onChange={(e) => {
                setCustomerName(e.target.value);
                if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
              }}
              placeholder="اكتب الاسم بالكامل"
              className={`w-full bg-neutral-950 border rounded-xl px-4 py-2.5 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-amber-500 transition-colors ${
                errors.name ? 'border-red-500' : 'border-neutral-800'
              }`}
            />
            {errors.name && (
              <p className="text-xs text-red-400 font-medium">{errors.name}</p>
            )}
          </div>

          {/* 2. Phone Input without examples */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-neutral-300 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>رقم الهاتف / الواتساب *</span>
            </label>
            <input
              type="tel"
              value={customerPhone}
              onChange={(e) => {
                setCustomerPhone(e.target.value);
                if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
              }}
              placeholder="اكتب رقم الهاتف"
              dir="ltr"
              className={`w-full bg-neutral-950 border rounded-xl px-4 py-2.5 text-sm text-white placeholder-neutral-600 text-right focus:outline-none focus:border-amber-500 transition-colors ${
                errors.phone ? 'border-red-500' : 'border-neutral-800'
              }`}
            />
            {errors.phone && (
              <p className="text-xs text-red-400 font-medium">{errors.phone}</p>
            )}
          </div>

          {/* 3. Address Input without examples */}
          {deliveryMethod === 'delivery' && (
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-neutral-300 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>العنوان بالتفصيل *</span>
              </label>
              <textarea
                rows={2}
                value={customerAddress}
                onChange={(e) => {
                  setCustomerAddress(e.target.value);
                  if (errors.address) setErrors((prev) => ({ ...prev, address: undefined }));
                }}
                placeholder="اكتب العنوان بالتفصيل (المنطقة، الشارع، رقم العقار)"
                className={`w-full bg-neutral-950 border rounded-xl px-4 py-2.5 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-amber-500 transition-colors ${
                  errors.address ? 'border-red-500' : 'border-neutral-800'
                }`}
              />
              {errors.address && (
                <p className="text-xs text-red-400 font-medium">{errors.address}</p>
              )}
            </div>
          )}

          {/* 4. Notes Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-neutral-300 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-neutral-400" />
              <span>ملاحظات إضافية على الطلب</span>
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="اكتب أي ملاحظات إضافية على الطلب"
              className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3.5 px-4 bg-gradient-to-r from-red-600 via-amber-600 to-amber-500 hover:from-red-500 hover:to-amber-400 text-white font-black rounded-xl text-sm shadow-xl shadow-red-950/40 transition-all flex items-center justify-center gap-2 transform active:scale-95"
            >
              <CheckCircle2 className="w-4 h-4 text-white" />
              <span>إتمام الطلب الآن ({total} ج.م)</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
