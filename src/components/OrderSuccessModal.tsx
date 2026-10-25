import React from 'react';
import { CheckCircle, ExternalLink, MessageCircle, X } from 'lucide-react';
import { CustomerOrder } from '../types';
import { RESTAURANT_INFO } from '../data/menuData';

interface OrderSuccessModalProps {
  order: CustomerOrder | null;
  isOpen: boolean;
  onClose: () => void;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({
  order,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !order) return null;

  // Format WhatsApp message with clear legal disclaimer and items
  const itemsText = order.items
    .map(
      (item, i) =>
        `${i + 1}. ${item.product.nameAr} (${item.quantity}x)${
          item.selectedWeight ? ` - ${item.selectedWeight.label}` : ''
        }${item.addCombo ? ' + Combo' : ''}${
          item.addExtraPatty ? ' + Extra Patty' : ''
        } = ${item.unitPrice * item.quantity} ج.م`
    )
    .join('%0A');

  const whatsappMessage = encodeURIComponent(
    `🍔 *فاتورة طلب - نسخة تجريبية للعرض فقط*%0A%0A` +
    `⚠️ *تنبيه قانوني هام للمطعم:*%0A` +
    `هذه الرسالة تمثل نموذجاً تجريبياً تفاعلياً (Demo Prototype) صُمم للعرض التقديمي واختبار تجربة الطلب فقط، ولا تُعد طلباً حقيقياً أو ترخيصاً بالاستخدام التجاري دون الحصول على إذن وموافقة كتابية من المصمم وسداد المستحقات بالكامل.%0A%0A` +
    `━━━━━━━━━━━━━━━━━%0A` +
    `📋 *الفاتورة:*%0A` +
    `• كود الطلب: ${order.orderNumber}%0A` +
    `• اسم العميل: ${order.customerName}%0A` +
    `• رقم الهاتف: ${order.customerPhone}%0A` +
    `• العنوان: ${order.customerAddress}%0A` +
    `• طريقة الاستلام: ${order.deliveryMethod === 'delivery' ? 'توصيل دليفري' : 'استلام من الفرع'}%0A` +
    (order.notes ? `• ملاحظات: ${order.notes}%0A` : '') +
    `━━━━━━━━━━━━━━━━━%0A` +
    `🍽️ *تفاصيل الأصناف:*%0A${itemsText}%0A%0A` +
    `💰 *الإجمالي الكلي:* ${order.total} ج.م%0A` +
    `━━━━━━━━━━━━━━━━━%0A` +
    `_جميع حقوق التصميم والبرمجة محفوظة للمصمم © 2026_`
  );

  const whatsappShareUrl = `https://wa.me/201000522829?text=${whatsappMessage}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-lg bg-neutral-900 border border-amber-500/40 rounded-2xl shadow-2xl text-neutral-100 max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          aria-label="إغلاق"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Success Banner */}
        <div className="p-6 text-center border-b border-neutral-800 bg-gradient-to-b from-emerald-950/40 via-neutral-900 to-neutral-900">
          <div className="inline-flex p-3 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 mb-3 animate-pulse">
            <CheckCircle className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-black text-white">
            تم إرسال الطلب بنجاح!
          </h2>
          <p className="text-xs text-neutral-400 mt-1">
            شكراً لطلبك من <span className="text-amber-400 font-bold">Meat & Sweet</span>.
          </p>
          <div className="mt-3 inline-block bg-neutral-950 px-4 py-1.5 rounded-full border border-amber-500/30">
            <span className="text-xs text-neutral-400">رقم الطلب: </span>
            <span className="text-sm font-black font-mono text-amber-400">#{order.orderNumber}</span>
          </div>
        </div>

        <div className="p-5 sm:p-6 space-y-5 text-sm">
          {/* Objective Google Maps Rating CTA */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-amber-950/50 via-neutral-900 to-amber-950/30 border border-amber-500/40 shadow-lg text-center space-y-3">
            <div>
              <h4 className="font-bold text-white text-base">
                شاركنا رأيك وتقييمك على خرائط Google
              </h4>
              <p className="text-xs text-neutral-300 mt-1">
                يسعدنا دائماً مشاركتك لتجربتك على صفحة المطعم الرسمية في خرائط Google
              </p>
            </div>

            <a
              href={RESTAURANT_INFO.googleMapsReviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-black rounded-xl text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 transform active:scale-95"
            >
              <span>اضغط هنا لتقييم Meat & Sweet على Google Maps</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          {/* Customer & Order Summary Details: "الفاتورة" */}
          <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2.5 text-xs">
            <h5 className="font-bold text-neutral-200 border-b border-neutral-800 pb-2 flex items-center justify-between">
              <span>الفاتورة</span>
              <span className="font-mono text-amber-400 font-bold">{order.total} ج.م</span>
            </h5>

            <div className="grid grid-cols-2 gap-2 text-neutral-400">
              <div>
                <span className="block text-[11px] text-neutral-500">الاسم:</span>
                <span className="font-bold text-white">{order.customerName}</span>
              </div>
              <div>
                <span className="block text-[11px] text-neutral-500">الهاتف:</span>
                <span className="font-bold text-white font-mono" dir="ltr">{order.customerPhone}</span>
              </div>
            </div>

            <div>
              <span className="block text-[11px] text-neutral-500">العنوان:</span>
              <span className="font-medium text-neutral-200">{order.customerAddress}</span>
            </div>

            {/* Items mini list */}
            <div className="pt-2 border-t border-neutral-800/80 space-y-1">
              <span className="block text-[11px] text-neutral-500 mb-1">الأصناف ({order.items.length}):</span>
              {order.items.map((it) => (
                <div key={it.cartItemId} className="flex justify-between text-neutral-300">
                  <span>{it.quantity}x {it.product.nameAr} {it.selectedWeight ? `(${it.selectedWeight.label})` : ''}</span>
                  <span className="font-mono">{it.unitPrice * it.quantity} ج.م</span>
                </div>
              ))}
            </div>
          </div>

          {/* Send via WhatsApp with legal protection */}
          <a
            href={whatsappShareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            <span>إرسال الفاتورة عبر واتساب المطعم ({RESTAURANT_INFO.phoneDisplay})</span>
          </a>

          {/* Designer disclaimer */}
          <div className="text-[11px] text-center text-neutral-500 border-t border-neutral-800 pt-3">
            نسخة تجريبية حصرية للعرض التقديمي • جميع حقوق التصميم والبرمجة محفوظة للمصمم © 2026
          </div>

          <button
            onClick={onClose}
            className="w-full py-2.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white rounded-xl text-xs font-semibold transition-colors"
          >
            إغلاق ومتابعة تصفح المنيو
          </button>
        </div>
      </div>
    </div>
  );
};
