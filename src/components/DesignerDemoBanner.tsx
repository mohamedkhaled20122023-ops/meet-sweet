import React from 'react';
import { ShieldAlert, ExternalLink, Star } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';

interface DesignerDemoBannerProps {
  onOpenDesignerModal: () => void;
}

export const DesignerDemoBanner: React.FC<DesignerDemoBannerProps> = ({
  onOpenDesignerModal,
}) => {
  return (
    <div className="bg-gradient-to-r from-red-950/90 via-neutral-900 to-amber-950/90 border-b border-red-500/30 text-neutral-200 text-xs px-4 py-2 relative z-40 shadow-md">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Left Notice: Designer copyright & demo warning */}
        <div className="flex items-center gap-2">
          <span className="flex items-center justify-center p-1 rounded bg-red-600/30 text-red-400 font-bold">
            <ShieldAlert className="w-3.5 h-3.5" />
          </span>
          <p className="leading-tight font-medium">
            <span className="text-amber-400 font-bold">نسخة تجريبية للعرض فقط (Demo Prototype):</span>{' '}
            جميع حقوق التصميم والبرمجة محفوظة للمصمم © 2026 — غير مصرح بالاستخدام التجاري دون إذن رسمي.
          </p>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 mr-auto sm:mr-0 shrink-0">
          <button
            onClick={onOpenDesignerModal}
            className="text-[11px] font-bold text-amber-300 hover:text-amber-200 underline decoration-amber-500/50 hover:decoration-amber-400 transition-colors"
          >
            شروط وحقوق المصمم
          </button>

          <span className="text-neutral-600">|</span>

          {/* Google Maps link */}
          <a
            href={RESTAURANT_INFO.googleMapsReviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-lg text-[11px] font-bold transition-all"
            title="تقييم مطعم Meat & Sweet على Google Maps"
          >
            <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
            <span>تقييم المكان على Google Maps</span>
            <ExternalLink className="w-2.5 h-2.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
