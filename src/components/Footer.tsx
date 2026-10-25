import React from 'react';
import { Phone, MapPin, Clock, ExternalLink, ShieldCheck, Star } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { RESTAURANT_INFO } from '../data/menuData';

interface FooterProps {
  onOpenDesignerModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenDesignerModal,
}) => {
  return (
    <footer className="bg-neutral-950 border-t border-neutral-800 text-neutral-400 text-xs">
      {/* Upper Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Brand & Bio */}
          <div className="space-y-4 md:col-span-1">
            <BrandLogo size="md" showTagline={false} />
            <p className="text-neutral-400 text-xs leading-relaxed">
              مطعم <span className="text-white font-bold">Meat & Sweet</span> متخصص في تقديم أرقى قطعيات اللحوم المدخنة الطبيعية 100% بلدي، ومصنعات الشواء الطازجة، وتشكيلة البرجر الفاخرة.
            </p>
            <div className="pt-1">
              <span className="inline-block px-2.5 py-1 rounded bg-red-950/60 border border-red-500/30 text-red-300 text-[11px] font-bold">
                طعم طبيعي ... جودة مضمونة
              </span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              أقسام المنيو
            </h4>
            <ul className="space-y-2 text-neutral-400">
              <li>
                <a href="#menu-section" className="hover:text-amber-400 transition-colors">
                  قطعيات اللحم المدخن (بريسكت، ضلوع، موزة)
                </a>
              </li>
              <li>
                <a href="#menu-section" className="hover:text-amber-400 transition-colors">
                  مصنعات اللحوم جاهزة (شيش، كفتة، طرب)
                </a>
              </li>
              <li>
                <a href="#menu-section" className="hover:text-amber-400 transition-colors">
                  سندوتشات البرجر (Americano, Washington, Be Brave)
                </a>
              </li>
              <li>
                <a href="#menu-section" className="hover:text-amber-400 transition-colors">
                  المقبلات والناتشو والبطاطس المقلية
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact & Hours */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              التواصل والطلب
            </h4>
            <ul className="space-y-2.5 text-neutral-300">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>الخط الساخن والواتساب: </span>
                <a
                  href={`tel:${RESTAURANT_INFO.phone}`}
                  className="font-mono font-bold text-amber-400 hover:underline"
                  dir="ltr"
                >
                  {RESTAURANT_INFO.phoneDisplay}
                </a>
              </li>

              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{RESTAURANT_INFO.workingHours}</span>
              </li>

              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{RESTAURANT_INFO.addressDisplay}</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Google Maps Rating */}
          <div className="space-y-3 p-4 rounded-xl bg-neutral-900/60 border border-neutral-800">
            <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span>تقييم خرائط Google</span>
            </h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              تقييمك يسهم في تطوير خدماتنا. شارك تجربتك بضغطة زر واحدة على خرائط جوجل.
            </p>
            <a
              href={RESTAURANT_INFO.googleMapsReviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-lg text-xs font-bold transition-all w-full justify-center"
            >
              <span>تقييم المكان على Google Maps</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* DESIGNER INTELLECTUAL PROPERTY & DEMO DISCLAIMER */}
        <div className="mt-10 pt-8 border-t border-neutral-800/80">
          <div className="p-4 rounded-xl bg-neutral-900/80 border border-red-500/20 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-red-500/10 text-red-400 rounded-lg shrink-0 mt-0.5">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="text-xs space-y-1">
                <div className="text-white font-bold flex items-center gap-2">
                  <span>حقوق التصميم والملكية الفكرية للمصمم © 2026</span>
                  <span className="text-[10px] bg-red-600/30 text-red-300 px-2 py-0.5 rounded border border-red-500/30">
                    نسخة للعرض فقط Demo
                  </span>
                </div>
                <p className="text-neutral-400 leading-relaxed">
                  هذا الموقع نموذج تجريبي تفاعلي مخصص حصرياً للعرض التقديمي على إدارة مطعم <strong>Meat & Sweet</strong>. يُمنع منعاً باتاً استغلال التصميم أو الكود تجارياً أو نقله لأي طرف ثالث دون موافقة كتابية صريحة من المصمم وسداد المستحقات بالكامل.
                </p>
              </div>
            </div>

            <button
              onClick={onOpenDesignerModal}
              className="shrink-0 px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-amber-400 text-xs font-bold rounded-lg border border-neutral-700 transition-colors whitespace-nowrap"
            >
              عرض وثيقة الاعتماد وشروط المصمم ⚖️
            </button>
          </div>

          <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-neutral-500 text-center sm:text-right">
            <div>
              تم التطوير والتصميم بواسطة: <span className="text-neutral-300 font-semibold">استوديو الإبداع الرقمي (Digital Creative Studio)</span>
            </div>
            <div>
              جميع الحقوق محفوظة للمصمم • مطعم Meat & Sweet © 2026
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
