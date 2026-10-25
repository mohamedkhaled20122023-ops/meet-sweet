import React from 'react';
import { MapPin, ExternalLink } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';

export const GoogleMapsReviewBanner: React.FC = () => {
  return (
    <section className="py-10 bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950 border-t border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="relative rounded-2xl bg-gradient-to-r from-amber-950/40 via-neutral-900 to-red-950/30 border border-amber-500/30 p-6 sm:p-8 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden">
          {/* Background subtle effect */}
          <div className="absolute -top-12 -left-12 w-48 h-48 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

          {/* Text */}
          <div className="space-y-2 text-center md:text-right">
            <h3 className="text-xl sm:text-2xl font-black text-white">
              شاركنا رأيك وتقييمك على خرائط Google
            </h3>

            <p className="text-xs sm:text-sm text-neutral-300 max-w-xl leading-relaxed">
              يسعدنا دائماً سماع تجاربكم وملاحظاتكم عن وجبات Meat & Sweet. اضغط على الرابط أدناه لمشاركتنا تقييمك المباشر على صفحة المطعم في خرائط Google.
            </p>
          </div>

          {/* Action Button */}
          <div className="shrink-0 w-full sm:w-auto">
            <a
              href={RESTAURANT_INFO.googleMapsReviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-black rounded-xl text-xs sm:text-sm shadow-xl shadow-amber-950/40 transition-all flex items-center justify-center gap-2 transform active:scale-95 whitespace-nowrap"
            >
              <MapPin className="w-4 h-4 text-neutral-950 fill-neutral-950" />
              <span>اضغط هنا لتقييم Meat & Sweet على Google Maps</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
