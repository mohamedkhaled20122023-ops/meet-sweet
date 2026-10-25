import React from 'react';
import { ShoppingBag, Star, Search, X } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { RESTAURANT_INFO } from '../data/menuData';

interface HeaderProps {
  cartCount: number;
  cartTotal: number;
  onOpenCart: () => void;
  onOpenDesignerModal: () => void;
  onSelectCategory: (category: any) => void;
  activeCategory: string;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  cartTotal,
  onOpenCart,
  onOpenDesignerModal,
  onSelectCategory,
  activeCategory,
  searchQuery,
  onSearchChange,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-neutral-950/90 backdrop-blur-md border-b border-neutral-800 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between gap-3 sm:gap-4">
        {/* Brand Zone */}
        <div className="flex items-center gap-3 shrink-0">
          <BrandLogo size="md" showTagline={true} />
        </div>

        {/* Center Quick Nav for Desktop */}
        <nav className="hidden xl:flex items-center gap-1 bg-neutral-900/80 p-1 rounded-xl border border-neutral-800 text-xs font-semibold">
          <button
            onClick={() => onSelectCategory('all')}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
              activeCategory === 'all'
                ? 'bg-amber-500 text-neutral-950 font-bold shadow'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            الكل
          </button>
          <button
            onClick={() => onSelectCategory('smoked-cuts')}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
              activeCategory === 'smoked-cuts'
                ? 'bg-amber-500 text-neutral-950 font-bold shadow'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            قطعيات اللحم المدخن
          </button>
          <button
            onClick={() => onSelectCategory('ready-meats')}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
              activeCategory === 'ready-meats'
                ? 'bg-amber-500 text-neutral-950 font-bold shadow'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            مصنعات جاهزة
          </button>
          <button
            onClick={() => onSelectCategory('burgers')}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
              activeCategory === 'burgers'
                ? 'bg-amber-500 text-neutral-950 font-bold shadow'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            برجر وسندوتشات
          </button>
          <button
            onClick={() => onSelectCategory('appetizers')}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
              activeCategory === 'appetizers'
                ? 'bg-amber-500 text-neutral-950 font-bold shadow'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            المقبلات والناتشو
          </button>
        </nav>

        {/* Search for specific item in Header */}
        <div className="relative hidden md:flex items-center shrink-0">
          <Search className="w-3.5 h-3.5 text-neutral-400 absolute right-3 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="بحث عن صنف معّين..."
            className="w-40 lg:w-52 bg-neutral-900 border border-neutral-700/80 rounded-xl pr-9 pl-7 py-1.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute left-2 text-neutral-400 hover:text-white"
              aria-label="مسح البحث"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>

        {/* Actions Zone */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* Google Maps Review direct button */}
          <a
            href={RESTAURANT_INFO.googleMapsReviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 bg-neutral-900 hover:bg-neutral-800 text-amber-400 border border-amber-500/20 hover:border-amber-500/40 rounded-xl text-xs font-bold transition-all whitespace-nowrap"
            title="تقييم Meat & Sweet على خرائط جوجل"
          >
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>تقييم خرائط Google</span>
          </a>

          {/* Cart Trigger */}
          <button
            onClick={onOpenCart}
            className="relative flex items-center gap-2 px-3.5 py-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white rounded-xl font-bold text-xs sm:text-sm shadow-md shadow-red-900/30 transition-all transform active:scale-95 shrink-0"
            aria-label="عرض سلة الطلبات"
          >
            <div className="relative">
              <ShoppingBag className="w-4 h-4 sm:w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-amber-400 text-neutral-950 text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center animate-bounce">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="hidden sm:inline">السلة</span>
            {cartTotal > 0 && (
              <span className="bg-black/30 px-1.5 py-0.5 rounded text-[11px] font-mono tabular-nums text-amber-300">
                {cartTotal} ج.م
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile search bar underneath if viewport is small */}
      <div className="px-4 pb-2.5 sm:hidden">
        <div className="relative flex items-center">
          <Search className="w-3.5 h-3.5 text-neutral-400 absolute right-3 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="بحث عن صنف معّين..."
            className="w-full bg-neutral-900 border border-neutral-700/80 rounded-xl pr-9 pl-7 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute left-2.5 text-neutral-400 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
