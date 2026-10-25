import React from 'react';
import { ShieldCheck, Lock, AlertTriangle, FileText, CheckCircle2, X } from 'lucide-react';

interface DesignerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DesignerModal: React.FC<DesignerModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-2xl bg-neutral-900 border border-amber-500/30 rounded-2xl p-6 md:p-8 shadow-2xl text-neutral-100 max-h-[90vh] overflow-y-auto"
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

        {/* Header */}
        <div className="flex items-center gap-3 border-b border-neutral-800 pb-5 mb-5">
          <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-500">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <div>
            <span className="text-xs font-semibold text-amber-500 uppercase tracking-wider block">
              وثيقة الاعتماد والملكية الفكرية
            </span>
            <h2 className="text-xl md:text-2xl font-bold text-white">
              حقوق التصميم والنموذج التجريبي الحصري
            </h2>
          </div>
        </div>

        {/* Warning Notice */}
        <div className="p-4 rounded-xl bg-red-950/40 border border-red-500/30 text-red-200 mb-6 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
          <div className="text-sm leading-relaxed">
            <strong className="block font-bold text-red-300 mb-1">
              تنبيه قانوني صريح بعدم الاستخدام التجاري:
            </strong>
            هذا التطبيق عبارة عن <strong>نسخة تجريبية تفاعلية للعرض فقط (Presentation Demo Prototype)</strong> تم إعدادها حصرياً لاختبار تجربة الطلب وعرضها على إدارة مطعم Meat & Sweet. يُحظر استخدام هذا التطبيق أو كوده أو تصميمه تجارياً للطلب الحي دون الحصول على ترخيص رسمي مسبق وموافقة خطية من المصمم وسداد كامل المستحقات المتفق عليها.
          </div>
        </div>

        {/* Terms list */}
        <div className="space-y-4 text-sm text-neutral-300">
          <div className="flex items-start gap-3 p-3 rounded-lg bg-neutral-800/50 border border-neutral-700/50">
            <Lock className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block mb-0.5">1. ملكية التصميم والبرمجة:</strong>
              جميع واجهات المستخدم (UI/UX)، الهوية البصرية الرقمية، وهيكلية تجربة الطلب بالسلة والشراء الفوري محمية قانونياً بحقوق الملكية الفكرية لصالح مصمم ومطور الواجهة © 2026.
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-lg bg-neutral-800/50 border border-neutral-700/50">
            <FileText className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block mb-0.5">2. غرض النموذج الحالي:</strong>
              الغرض الحصري من هذه المنصة هو محاكاة تجربة الزبائن داخل مطعم Meat & Sweet من حيث تصفح منيو قطعيات اللحم المدخن، ومصنعات اللحوم، وبرجر السيكريت، وتجربة تدفق الشراء السريع، وإرسال الطلب، والتقييم على خرائط Google.
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-lg bg-neutral-800/50 border border-neutral-700/50">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block mb-0.5">3. إجراءات التسليم والتشغيل النهائي:</strong>
              يتم ربط قاعدة البيانات الحقيقية وتفعيل الاستقبال المباشر للمطعم رسمياً فور اعتماد إدارة المطعم للبروتوتايب وتوقيع محضر التسليم.
            </div>
          </div>
        </div>

        {/* Signature Box */}
        <div className="mt-6 pt-5 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
          <div>
            <p className="text-neutral-200 font-semibold">إعداد وتصميم: استوديو الإبداع الرقمي</p>
            <p>العميل المعني: مطعم Meat & Sweet</p>
          </div>
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold rounded-xl transition-all shadow-lg shadow-amber-500/20"
          >
            فهمت وموافق على الشروط
          </button>
        </div>
      </div>
    </div>
  );
};
