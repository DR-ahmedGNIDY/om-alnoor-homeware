"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Heart,
  ShoppingBag,
  User,
  Menu,
  X,
  ChevronDown,
  Phone,
  LogOut,
} from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { useCartStore } from "@/hooks/useStore";
import { useScrollPosition } from "@/hooks/useScroll";
import { cn, createWhatsAppLink } from "@/lib/utils";

const navLinks = [
  { name: "الرئيسية", href: "/" },
  { name: "المكياج", href: "/shop?category=makeup" },
  { name: "العناية بالبشرة", href: "/shop?category=skincare" },
  { name: "العناية بالشعر", href: "/shop?category=haircare" },
  { name: "العطور", href: "/shop?category=perfumes" },
  { name: "العناية بالجسم", href: "/shop?category=bodycare" },
  { name: "الأدوات والإكسسوارات", href: "/shop?category=tools" },
  { name: "البراندات", href: "/brands" },
  { name: "العروض", href: "/offers" },
];

export function Header() {
  const { isScrolled } = useScrollPosition();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { data: session } = useSession();
  const cartItems = useCartStore((state) => state.items);
  const totalItems = useCartStore((state) => state.getTotalItems)();

  const whatsappLink = createWhatsAppLink(
    "+201022262971",
    "مرحبًا، أريد الاستفسار عن منتجات Pharma One Cosmetics"
  );

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileMenuOpen]);

  return (
    <>
     <header
  className="fixed top-0 right-0 left-0 z-50 bg-black/95 backdrop-blur-xl border-b border-gold/10 shadow-2xl"
>
        {/* Top Bar */}
        <div className="border-b border-gold/10">
          <div className="container-luxury py-2 flex items-center justify-between text-xs">
            <div className="flex items-center gap-6 text-gold-light/70">
              <span>توصيل سريع لجميع المحافظات</span>
              <span className="hidden sm:inline">منتجات أصلية 100%</span>
              <span className="hidden md:inline">دفع آمن</span>
            </div>
            <div className="flex items-center gap-4">
              {session ? (
                <div className="flex items-center gap-3">
                  <span className="text-gold-light">{session.user?.name}</span>
                  <button
                    onClick={() => signOut()}
                    className="text-red-400 hover:text-red-300 transition-colors flex items-center gap-1"
                  >
                    <LogOut size={14} />
                    <span className="hidden sm:inline">خروج</span>
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="text-gold-light hover:text-gold transition-colors"
                >
                  تسجيل الدخول
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Main Header */}
        <div className="container-luxury py-2">
          <div className="flex md:flex-row items-center justify-between gap-2 md:gap-8 w-full overflow-hidden">
           {/* Logo Center */}
{/* Logo Center */}
<Link
  href="/"
  className="flex-1 flex items-center justify-center order-1 md:order-2"
>

  <div className="relative w-[260px] h-[55px] md:w-[340px] md:h-[70px] overflow-visible flex items-center justify-center">
    <Image
  src="/images/logo1.png"
  alt="Pharma One Cosmetics"
  width={700}
  height={220}
  priority
  className="object-contain w-auto h-[140px] md:h-[180px] max-w-none"
/>
  </div>

</Link>

  
              

            {/* Search Bar - Desktop */}
<div className="hidden lg:flex w-[420px] order-1">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="ابحث عن منتج، براند، أو كلمة مفتاحية..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-black-light border border-gold/20 rounded-full py-3 px-5 pr-12 text-sm text-cream placeholder:text-gold-muted/50 focus:outline-none focus:border-gold/50 focus:shadow-gold-sm transition-all"
                />
                <Search
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gold-muted"
                  size={18}
                />
              </div>
            </div>

            {/* Actions */}
<div className="flex items-center gap-2 md:gap-4 order-2 md:order-3">
              {/* WhatsApp Button */}
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:flex items-center gap-2 bg-gradient-to-r from-gold to-gold-dark text-black px-5 py-2.5 rounded-full font-bold text-sm hover:shadow-gold transition-all duration-300 hover:scale-105"
              >
                <Phone size={16} />
                <span>اطلب عبر واتساب</span>
              </a>

              {/* Search Mobile */}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="lg:hidden p-2 text-gold-light hover:text-gold transition-colors"
              >
                <Search size={22} />
              </button>

              {/* Wishlist */}
              <Link
                href="/wishlist"
                className="hidden sm:flex p-2 text-gold-light hover:text-gold transition-colors relative"
              >
                <Heart size={22} />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-gold text-black text-[10px] font-bold rounded-full flex items-center justify-center">
                  0
                </span>
              </Link>

              {/* Cart */}
              <Link
                href="/cart"
                className="flex p-2 text-gold-light hover:text-gold transition-colors relative"
              >
                <ShoppingBag size={22} />
                {totalItems > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-gold text-black text-[10px] font-bold rounded-full flex items-center justify-center"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </Link>

              {/* Account */}
              <Link
                href={session ? "/account" : "/login"}
                className="hidden sm:flex p-2 text-gold-light hover:text-gold transition-colors"
              >
                <User size={22} />
              </Link>

              {/* Mobile Menu */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 text-gold-light hover:text-gold transition-colors"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Navigation - Desktop */}
        <nav className="hidden lg:block border-t border-gold/10 bg-black/80 backdrop-blur-md">
          <div className="container-luxury">
            <ul className="flex items-center justify-center gap-3 py-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="
px-6 py-3
text-[15px]
font-semibold
tracking-wide
text-gold-light/80
hover:text-yellow-400
transition-all duration-300
relative
group
rounded-xl
hover:bg-white/[0.03]
hover:shadow-[0_0_20px_rgba(212,175,55,0.08)]
"
                  >
                    {link.name}
                    <span
  className="
  absolute
  bottom-1
  right-1/2
  translate-x-1/2
  w-0
  h-[2px]
  bg-gradient-to-r
  from-yellow-400
  to-yellow-600
  rounded-full
  transition-all
  duration-500
  group-hover:w-[70%]
  shadow-[0_0_12px_rgba(255,215,0,0.7)]
"
/>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* Search Overlay Mobile */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="lg:hidden absolute top-full right-0 left-0 bg-black-light border-b border-gold/20 p-4"
            >
              <div className="relative">
                <input
                  type="text"
                  placeholder="ابحث عن منتج..."
                  autoFocus
                  className="w-full bg-[#111] border border-gold/20 rounded-full py-4 px-6 pr-14 text-base text-cream placeholder:text-gold-muted/50 focus:outline-none focus:border-gold/50 focus:shadow-2xl transition-all"
                />
                <Search
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gold-muted"
                  size={18}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[300px] bg-black-light z-50 lg:hidden overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10">
                      <Image
                        src="/images/logo.png"
                        alt="Pharma One"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div>
                      <h2 className="text-sm font-bold gold-text">PHARMA ONE</h2>
                      <p className="text-[8px] text-gold-muted tracking-wider">
                        COSMETICS
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 text-gold-light hover:text-gold"
                  >
                    <X size={24} />
                  </button>
                </div>

                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-gradient-to-r from-gold to-gold-dark text-black px-4 py-3 rounded-full font-bold text-sm mb-6"
                >
                  <Phone size={18} />
                  <span>اطلب عبر واتساب</span>
                </a>

                <nav className="space-y-1">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center py-3 px-4 text-gold-light/80 hover:text-gold hover:bg-gold/5 rounded-lg transition-all"
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                <div className="mt-8 pt-6 border-t border-gold/10">
                  <div className="space-y-3 text-sm text-gold-muted">
                    <p>📞 +20 102 226 2971</p>
                    <p>📧 support@pharmaone.com</p>
                    <p>📍 سوهاج - شارع الجمهورية</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
