import React from 'react';
import { Flame, Star, ChevronDown, ExternalLink } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';

interface HeroSectionProps {
  onScrollToMenu: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onScrollToMenu,
}) => {
  return (
    <section className="relative overflow-hidden bg-neutral-950 border-b border-neutral-800 py-10 md:py-16">
      {/* Ambient background glow & ember gradient */}
      <div className="absolute inset-0 pointer-events-none opacity-25">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-red-600/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-600/20 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Main Copy */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-right">
            {/* Pill kicker */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-950/60 border border-red-500/30 text-red-300 text-xs font-semibold">
              <Flame className="w-4 h-4 text-amber-500 animate-pulse" />
              <span>لحم بقري بلدي 100% طبيعي • تدخين بطيء بالحطب</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight font-['Tajawal',sans-serif]">
              أفخم قطعيات اللحوم المدخنة <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-l from-amber-400 via-red-500 to-amber-200">
                وسندوتشات البرجر الفاخرة
              </span>
            </h1>

            <p className="text-sm sm:text-base text-neutral-300 max-w-2xl leading-relaxed">
              مرحباً بكم في <strong className="text-amber-400 font-bold">Meat & Sweet</strong>. نقدم لكم البريسكت المطهو حتى 14 ساعة، الموزات، الكفتة، والطرب البلدي الفاخر، إلى جانب تشكيلة برجر سيكريت عملاقة وأطباق الناتشوز المقرمشة. اختر طبقك واطلب الآن مباشرة!
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              <button
                onClick={onScrollToMenu}
                className="px-6 py-3.5 bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-bold rounded-xl shadow-xl shadow-red-950/40 transition-all flex items-center gap-2 transform active:scale-95"
              >
                <span>تصفح المنيو واطلب الآن</span>
                <ChevronDown className="w-4 h-4" />
              </button>

              {/* Direct Google Maps Rating Button */}
              <a
                href={RESTAURANT_INFO.googleMapsReviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3.5 bg-neutral-900/90 hover:bg-neutral-800 text-amber-400 border border-amber-500/40 rounded-xl font-bold transition-all flex items-center gap-2 shadow-lg hover:shadow-amber-500/10"
              >
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>تقييم المكان على خرائط Google</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-70" />
              </a>
            </div>

            {/* Quick trust badges */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-right">
              <div className="p-2.5 rounded-lg bg-neutral-900/60 border border-neutral-800">
                <span className="text-[11px] text-neutral-400 block">الجودة</span>
                <span className="text-xs font-bold text-neutral-200">لحم بقري بلدي 100%</span>
              </div>
              <div className="p-2.5 rounded-lg bg-neutral-900/60 border border-neutral-800">
                <span className="text-[11px] text-neutral-400 block">التدخين</span>
                <span className="text-xs font-bold text-neutral-200">حطب طبيعي ساعات طويلة</span>
              </div>
              <div className="p-2.5 rounded-lg bg-neutral-900/60 border border-neutral-800">
                <span className="text-[11px] text-neutral-400 block">الطلب</span>
                <span className="text-xs font-bold text-neutral-200">شراء فوري أو بالسلة</span>
              </div>
              <div className="p-2.5 rounded-lg bg-neutral-900/60 border border-neutral-800">
                <span className="text-[11px] text-neutral-400 block">الهاتف والواتساب</span>
                <span className="text-xs font-bold text-amber-400 font-mono" dir="ltr">
                  {RESTAURANT_INFO.phoneDisplay}
                </span>
              </div>
            </div>
          </div>

          {/* Featured Smoked Platter Preview Showcase */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl p-1 bg-gradient-to-b from-amber-500/30 via-red-500/20 to-neutral-800 shadow-2xl">
              <div className="relative rounded-xl overflow-hidden bg-neutral-900 aspect-[4/3]">
                <div
                  className="w-full h-full"
                  style={{
                    backgroundImage: `url(/assets/aistudio/856965920_1762930874811801_6867711782507600889_n_761dbe02.jpg)`,
                    backgroundPosition: '17.5% 25.5%',
                    backgroundSize: '390%',
                    backgroundRepeat: 'no-repeat',
                  }}
                />
                
                {/* Overlay card */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
                        طبق مميز
                      </span>
                      <h3 className="text-xl font-black text-white">
                        بريسكت مدخن 14 ساعة
                      </h3>
                      <p className="text-xs text-neutral-300 mt-1">
                        يقدم مع أرز بسمتي، صوص دقوس وعسل وناتشوز
                      </p>
                    </div>
                    <div className="text-left bg-neutral-950/80 px-3 py-1.5 rounded-xl border border-amber-500/30">
                      <span className="text-[10px] text-neutral-400 block">يبدأ من</span>
                      <span className="text-lg font-black text-amber-400 font-mono">
                        350 ج.م
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Designer Demo Badge */}
              <div className="absolute -bottom-3 -right-3 bg-neutral-900 border border-amber-500/40 text-amber-300 px-3 py-1 rounded-lg text-[11px] font-bold shadow-lg flex items-center gap-1.5">
                <span>نموذج عرض تجريبي حصري © 2026</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
