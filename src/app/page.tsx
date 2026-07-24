"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const TELEGRAM_URL = "https://t.me/serezha9k";

const products = [
  {
    id: 1,
    name: "ASICS Gel-Kahana",
    brand: "ASICS",
    price: 2800,
    oldPrice: 3500,
    image: "/images/products/asics-gel-kahana.png",
    badge: "Оригінал із США",
    advantage: "Технологія GEL для амортизації",
  },
  {
    id: 2,
    name: "New Balance 990v3",
    brand: "New Balance",
    price: 2800,
    oldPrice: 3500,
    image: "/images/products/nb-990v3-black.png",
    badge: "Оригінал із США",
    advantage: "Преміальна шкіра та замша",
  },
  {
    id: 3,
    name: "New Balance 574 Olive",
    brand: "New Balance",
    price: 2800,
    oldPrice: 3500,
    image: "/images/products/nb-574-olive.png",
    badge: "Оригінал із США",
    advantage: "Класичний силует, універсальний колір",
  },
  {
    id: 4,
    name: "New Balance 574 Light",
    brand: "New Balance",
    price: 2800,
    oldPrice: 3500,
    image: "/images/products/nb-574-light.png",
    badge: "Оригінал із США",
    advantage: "Легкий та зручний на кожен день",
  },
  {
    id: 5,
    name: "ASICS Gel-NYC",
    brand: "ASICS",
    price: 2800,
    oldPrice: 3500,
    image: "/images/products/asics-black.png",
    badge: "Оригінал із США",
    advantage: "Мінімалістичний чорний дизайн",
  },
];

const reviews = [
  {
    id: 1,
    name: "Олексій",
    model: "New Balance 990v3",
    text: "Отримав своє замовлення дуже швидко. Кросівки повністю відповідають фотографіям на сайті, якість матеріалів приємно здивувала. Розмір підійшов ідеально, сидять дуже комфортно. Однозначно рекомендую!",
  },
  {
    id: 2,
    name: "Максим",
    model: "ASICS Gel-Kahana",
    text: "Довго вагався перед покупкою, але в результаті залишився дуже задоволений. Кросівки легкі, зручні та виглядають стильно. Уже кілька днів ношу практично безперервно — жодного дискомфорту.",
  },
  {
    id: 3,
    name: "Дмитро",
    model: "New Balance 574",
    text: "Замовлення відправили в той же день, що дуже порадувало. Упаковка акуратна, товар без жодних дефектів. Якість перевершила мої очікування, обов'язково ще замовлю.",
  },
  {
    id: 4,
    name: "Артем",
    model: "New Balance 990v3",
    text: "Дякую продавцю за допомогу з вибором розміру. Все підійшло ідеально. Кросівки виглядають дорого, дуже зручні при ходьбі, а якість справді на високому рівні.",
  },
  {
    id: 5,
    name: "Іван",
    model: "ASICS Gel-NYC",
    text: "Приємно здивований співвідношенням ціни та якості. За такі гроші отримав дійсно класні кросівки. Вже отримав багато компліментів від друзів, тому покупкою максимально задоволений.",
  },
  {
    id: 6,
    name: "Роман",
    model: "New Balance 574",
    text: "Кросівки прийшли навіть швидше, ніж очікував. Легкі, м'які та дуже комфортні. Після цілого дня на ногах взагалі немає відчуття втоми. Рекомендую всім.",
  },
  {
    id: 7,
    name: "Сергій",
    model: "ASICS Gel-Kahana",
    text: "Все відповідає опису та фотографіям. Матеріали якісні, шви рівні, запаху клею немає. Видно, що товар зроблений акуратно. Дякую за чесний сервіс.",
  },
  {
    id: 8,
    name: "Андрій",
    model: "New Balance 990v3",
    text: "Ношу вже більше двох тижнів кожного дня. Кросівки не втратили форму, нічого не відклеїлося, дуже зручні та практичні. Покупкою повністю задоволений.",
  },
  {
    id: 9,
    name: "Віктор",
    model: "New Balance 574",
    text: "Замовлення оформили швидко, менеджер відповів на всі запитання та допоміг визначитися з розміром. Кросівки сіли ідеально, якість дійсно хороша. Буду рекомендувати знайомим.",
  },
  {
    id: 10,
    name: "Павло",
    model: "ASICS Gel-NYC",
    text: "Замовляв уперше в цьому магазині й залишився дуже задоволений. Доставка швидка, товар якісний, усе відповідає опису. Якщо ще знадобляться кросівки — точно звернуся сюди ще раз.",
  },
];

const stats = [
  { value: "100+", label: "Замовлень", icon: "📦" },
  { value: "4.9", label: "Рейтинг", icon: "⭐" },
  { value: "100%", label: "Оригінал", icon: "✅" },
  { value: "1-3", label: "Дні доставки", icon: "🚀" },
];

const navItems = [
  { id: "catalog", label: "Каталог" },
  { id: "about", label: "Про продавця" },
  { id: "reviews", label: "Відгуки" },
  { id: "delivery", label: "Доставка" },
  { id: "faq", label: "Питання" },
  { id: "contact", label: "Контакт" },
];

// Reusable animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: (i: number = 0) => ({
    opacity: 1,
    transition: { duration: 0.6, delay: i * 0.15 },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (i: number = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
};

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      const sections = navItems.map((item) => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 200;
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-[#0a0a0f]/95 backdrop-blur-xl border-b border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-xl md:text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent shrink-0 hover:opacity-80 transition-opacity"
          >
            SEREZA SHOP
          </motion.button>

          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="hidden lg:flex items-center gap-6 absolute left-1/2 -translate-x-1/2"
          >
            {navItems.map((item, i) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-sm font-medium transition-all duration-300 whitespace-nowrap hover:scale-105 ${
                  activeSection === item.id
                    ? "text-purple-400"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {item.label}
              </button>
            ))}
          </motion.nav>

          <motion.a
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            href={TELEGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:inline-flex glow-btn px-5 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-sm font-medium text-white"
          >
            Написати менеджеру
          </motion.a>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden"
            >
              <nav className="py-4 space-y-3">
                {navItems.map((item, i) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => scrollToSection(item.id)}
                    className={`block w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeSection === item.id
                        ? "bg-purple-500/20 text-purple-400"
                        : "text-gray-400 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    {item.label}
                  </motion.button>
                ))}
                <a
                  href={TELEGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-sm font-medium text-white glow-btn"
                >
                  Написати менеджеру
                </a>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}

function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % products.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const handleThumbnailClick = (index: number) => {
    setActiveIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 8000);
  };

  const handlePrev = () => handleThumbnailClick((activeIndex - 1 + products.length) % products.length);
  const handleNext = () => handleThumbnailClick((activeIndex + 1) % products.length);

  const activeProduct = products[activeIndex];

  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex items-center overflow-hidden py-6 lg:py-10">
      {/* Animated grid background */}
      <div className="absolute inset-0 bg-grid opacity-40 overflow-hidden" />

      {/* Background gradients - animated */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-[#0a0a0f]/80 to-[#0a0a0f]" />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.12, 0.22, 0.12], x: [0, 25, 0], y: [0, -15, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-purple-500/20 rounded-full blur-[180px]"
        />
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.08, 0.18, 0.08], x: [0, -30, 0], y: [0, 20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-pink-500/15 rounded-full blur-[150px]"
        />
        <motion.div
          animate={{ scale: [0.85, 1.1, 0.85], opacity: [0.04, 0.1, 0.04] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-gradient-to-br from-purple-600/15 via-pink-600/10 to-indigo-600/15 rounded-full blur-[200px]"
        />
      </div>

      {/* Animated diagonal lines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.03]">
        <motion.div
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 left-0 w-full h-full"
          style={{
            backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 80px, rgba(168,85,247,0.5) 80px, rgba(168,85,247,0.5) 81px)",
          }}
        />
        <motion.div
          animate={{ x: ["100%", "-100%"] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 left-0 w-full h-full"
          style={{
            backgroundImage: "repeating-linear-gradient(-45deg, transparent, transparent 80px, rgba(236,72,153,0.4) 80px, rgba(236,72,153,0.4) 81px)",
          }}
        />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="particle particle-1" style={{ top: "20%", left: "15%" }} />
        <div className="particle particle-2" style={{ top: "40%", right: "20%" }} />
        <div className="particle particle-3" style={{ top: "60%", left: "10%" }} />
        <div className="particle particle-4" style={{ top: "30%", right: "35%" }} />
        <div className="particle particle-5" style={{ top: "70%", left: "30%" }} />
        <div className="particle particle-6" style={{ top: "15%", right: "15%" }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-start">
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as const }}
            className="text-left lg:text-left order-2 lg:order-1 lg:pt-24"
          >
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-[2.5rem] sm:text-5xl md:text-6xl lg:text-7xl font-black mb-4 leading-[1.0] tracking-tight"
            >
              <span className="text-white">Оригінальні</span>
              <br />
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                New Balance
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                та ASICS
              </span>
              <br />
              <span className="text-gray-400 text-[0.55em]">із США</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-sm sm:text-base md:text-lg text-gray-400 mb-5 max-w-lg lg:mx-0 leading-relaxed"
            >
              Преміальна якість • Жодних підробок • Доставка по Україні без передоплати
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mb-5"
            >
              <span className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Від 2800 ₴
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <a
                href={TELEGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="glow-btn inline-flex items-center justify-center gap-2 px-6 py-3.5 sm:px-8 sm:py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-base sm:text-lg font-semibold text-white shadow-lg shadow-purple-500/30"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
                </svg>
                Зв&apos;язатися із менеджером
              </a>
            </motion.div>
          </motion.div>

          {/* Right: Shoe + Thumbnails */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] as const }}
            className="order-1 lg:order-2 -mt-10 lg:-mt-32"
          >
            {/* Shoe container */}
            <div className="relative w-full max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto mb-0">
              {/* Nav arrows */}
              <motion.button
                whileHover={{ scale: 1.15, x: -3 }}
                whileTap={{ scale: 0.9 }}
                onClick={handlePrev}
                className="absolute left-2 lg:-left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-purple-500/30 rounded-full backdrop-blur-sm transition-colors"
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.15, x: 3 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleNext}
                className="absolute right-2 lg:-right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-purple-500/30 rounded-full backdrop-blur-sm transition-colors"
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.button>

              {/* Glow background */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-3/4 h-3/4 bg-purple-500/20 rounded-full blur-[80px]" />
                <div className="absolute w-2/3 h-2/3 bg-pink-500/10 rounded-full blur-[60px]" />
              </div>

              {/* Shoe image — crossfade via opacity */}
              <div className="relative w-full">
                {products.map((product, index) => (
                  <div
                    key={product.id}
                    className="absolute inset-0 transition-opacity duration-500 ease-in-out"
                    style={{ opacity: index === activeIndex ? 1 : 0 }}
                  >
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={800}
                      height={800}
                      className="w-full h-auto"
                      priority={index === activeIndex}
                    />
                  </div>
                ))}
                {/* Spacer to maintain container height */}
                <Image
                  src={products[0].image}
                  alt={products[0].name}
                  width={800}
                  height={800}
                  className="w-full h-auto invisible"
                />
              </div>

              {/* Product badge removed - now shown below thumbnails */}
            </div>

            {/* Thumbnails - Mini Catalog */}
            <div className="-mt-16 sm:-mt-28 md:-mt-63">
              <div className="flex justify-center items-center gap-2 sm:gap-3">
                {products.map((product, index) => {
                  const isActive = index === activeIndex;
                  return (
                    <motion.button
                      key={product.id}
                      whileHover={{ scale: isActive ? 1.1 : 1.08 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleThumbnailClick(index)}
                      animate={{
                        scale: isActive ? 1.1 : 1,
                        opacity: isActive ? 1 : 0.5,
                        borderColor: isActive ? "rgba(168, 85, 247, 1)" : "rgba(255, 255, 255, 0.15)",
                        boxShadow: isActive
                          ? "0 0 18px rgba(168,85,247,0.45)"
                          : "0 0 0px rgba(168,85,247,0)",
                      }}
                      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                      className={`relative w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-2xl overflow-hidden border-2 shrink-0 ${
                        isActive
                          ? "bg-gradient-to-br from-purple-500/15 to-pink-500/10"
                          : "bg-white/[0.03]"
                      }`}
                    >
                      <Image src={product.image} alt={product.name} fill className="object-contain p-2" />
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Product Name - Centered under thumbnails */}
            <div className="relative h-8 mt-2">
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <span className="text-base sm:text-lg text-gray-400">{activeProduct.brand}</span>
                  <span className="text-base sm:text-lg text-white ml-2 font-semibold">{activeProduct.name}</span>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Auto-play indicator */}
            <div className="flex justify-center mt-3 gap-2">
              {products.map((_, index) => {
                const isActive = index === activeIndex;
                return (
                  <motion.div
                    key={index}
                    animate={{
                      width: isActive ? 32 : 8,
                      opacity: isActive ? 1 : 0.3,
                    }}
                    transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="h-1.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
                  />
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ProductCard({ product, index }: { product: (typeof products)[0]; index: number }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      custom={index}
      whileHover={{ y: -12, scale: 1.03 }}
      className="premium-card group relative bg-gradient-to-b from-[#1a1a28] to-[#12121c] rounded-2xl border border-purple-500/20 overflow-hidden hover:border-purple-500/50 transition-all duration-500 shadow-[0_4px_30px_rgba(0,0,0,0.3)] hover:shadow-[0_20px_60px_rgba(168,85,247,0.2)]"
    >
      {/* Badge */}
      <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-purple-500/25 border border-purple-500/40 rounded-full text-xs text-purple-300 group-hover:bg-purple-500/35 transition-colors duration-300">
        {product.badge}
      </div>

      {/* Image */}
      <div className="relative h-64 sm:h-72 overflow-hidden bg-gradient-to-b from-[#1e1e2e] to-[#141420]">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain p-6 transition-all duration-700 group-hover:scale-[1.18] group-hover:rotate-3 drop-shadow-[0_0_25px_rgba(168,85,247,0.25)] group-hover:drop-shadow-[0_0_50px_rgba(168,85,247,0.6)]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-purple-500/15 via-purple-500/5 to-transparent transition-opacity duration-500" />
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Content */}
      <div className="p-5">
        <p className="text-xs text-purple-400/70 uppercase tracking-wider mb-1 group-hover:text-purple-400 transition-colors duration-300">
          {product.brand}
        </p>
        <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-purple-100 transition-colors duration-300">
          {product.name}
        </h3>
        <p className="text-sm text-gray-400 mb-4">{product.advantage}</p>

        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl font-bold text-white group-hover:text-purple-300 transition-colors duration-300">
            {product.price} ₴
          </span>
          <span className="text-sm text-gray-500 line-through">{product.oldPrice} ₴</span>
        </div>

        <a
          href={TELEGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="glow-btn block w-full text-center py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl font-medium text-white hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] transition-all duration-300"
        >
          Написати менеджеру
        </a>
      </div>
    </motion.div>
  );
}

function Catalog() {
  return (
    <section id="catalog" className="relative py-20 md:py-32">
      {/* Subtle background accent */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-purple-500/5 rounded-full blur-[200px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Наш каталог
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            5 моделей кросівок преміум-якості з доставкою по Україні
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="relative py-20 md:py-32 bg-[#0f0f17]">
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-pink-500/5 rounded-full blur-[200px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as const }}
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="text-3xl sm:text-4xl font-bold mb-6"
            >
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Чому обирають нас?
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25, duration: 0.6 }}
              className="text-gray-400 text-lg mb-6"
            >
              Ми працюємо безпосередньо з офіційними магазинами в США. Кожен товар — 100% оригінал з сертифікатами якості.
            </motion.p>
            <ul className="space-y-4">
              {[
                "Офіційний викуп будь-якої моделі під запит",
                "Доставка Новою Поштою без передоплати",
                "Консультація з вибору розміру",
                "Гарантія оригінальності",
              ].map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -30, filter: "blur(4px)" }}
                  whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: 0.2 + i * 0.12,
                    ease: [0.25, 0.46, 0.45, 0.94] as const,
                  }}
                  whileHover={{ x: 6, transition: { duration: 0.2 } }}
                  className="flex items-start gap-3 group cursor-default"
                >
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + i * 0.12, type: "spring", stiffness: 300, damping: 15 }}
                    className="w-6 h-6 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center mt-0.5 shrink-0 group-hover:bg-purple-500/30 group-hover:border-purple-500/50 group-hover:shadow-[0_0_12px_rgba(168,85,247,0.4)] transition-all duration-300"
                  >
                    <svg className="w-3.5 h-3.5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </motion.div>
                  <span className="text-gray-300 group-hover:text-white transition-colors duration-300">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30, scale: 0.8, rotateX: -15 }}
                whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.15,
                  ease: [0.25, 0.46, 0.45, 0.94] as const,
                }}
                whileHover={{
                  y: -8,
                  scale: 1.05,
                  borderColor: "rgba(168, 85, 247, 0.5)",
                  boxShadow: "0 20px 40px rgba(168, 85, 247, 0.15), 0 0 60px rgba(168, 85, 247, 0.1)",
                  transition: { duration: 0.3, ease: "easeOut" },
                }}
                className="stat-card group relative bg-gradient-to-b from-[#1a1a24] to-[#0f0f17] border border-white/10 rounded-2xl p-6 text-center cursor-default overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <motion.span
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.15, type: "spring", stiffness: 300, damping: 15 }}
                    className="text-2xl mb-2 block"
                  >
                    {stat.icon}
                  </motion.span>
                  <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2 group-hover:drop-shadow-[0_0_12px_rgba(168,85,247,0.6)] transition-all duration-300">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ReviewCard({ review }: { review: (typeof reviews)[0] }) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.01 }}
      className="review-card bg-gradient-to-b from-[#15151f] to-[#0f0f17] border border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col min-w-[300px] w-[300px] sm:min-w-[380px] sm:w-[380px] min-h-[280px] sm:min-h-[320px] shrink-0 cursor-default"
    >
      <div className="w-10 h-10 flex items-center justify-center bg-purple-500/20 border border-purple-500/30 rounded-full mb-4">
        <svg className="w-5 h-5 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
          <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
        </svg>
      </div>
      <p className="text-gray-300 text-sm leading-relaxed flex-1">{review.text}</p>
      <div className="flex items-center justify-between mt-4 pt-4">
        <span className="font-medium text-sm bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          — {review.name}
        </span>
        <span className="text-xs text-gray-400 border border-white/10 rounded-full px-3 py-1">
          {review.model}
        </span>
      </div>
    </motion.div>
  );
}

function Reviews() {
  const duplicatedReviews = [...reviews, ...reviews];

  return (
    <section id="reviews" className="relative py-20 md:py-32 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[400px] bg-purple-500/5 rounded-full blur-[250px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 relative">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Відгуки клієнтів
            </span>
          </h2>
          <p className="text-gray-400 text-lg">Що кажуть наші покупці</p>
        </motion.div>
      </div>

      <div className="relative mb-8">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0a0a0f] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0a0a0f] to-transparent z-10 pointer-events-none" />
        <div className="flex animate-marquee gap-6">
          {duplicatedReviews.map((review, i) => (
            <ReviewCard key={`review-${review.id}-${i}`} review={review} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Delivery() {
  const steps = [
    { num: "01", title: "Обери модель", desc: "Переглянь каталог та обери кросівки, які тобі подобаються" },
    { num: "02", title: "Напиши менеджеру", desc: "Зв'яжися з нами в Telegram та вкажи модель і розмір" },
    { num: "03", title: "Узгодь розмір", desc: "Менеджер допоможе підібрати ідеальний розмір" },
    { num: "04", title: "Отримай посилку", desc: "Доставка Новою Поштою за 1-3 дні, без передоплати" },
  ];

  return (
    <section id="delivery" className="relative py-20 md:py-32 bg-[#0f0f17]">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[200px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as const }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Доставка та оплата
            </span>
          </h2>
          <motion.p
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="inline-block px-5 py-2.5 bg-green-500/15 border border-green-500/30 rounded-full text-green-300 text-sm font-medium mt-4 hover:bg-green-500/25 hover:border-green-500/50 hover:shadow-[0_0_30px_rgba(34,197,94,0.15)] transition-all duration-300 cursor-default"
          >
            Без передоплати — оплата при отриманні
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Connection line for desktop */}
          <div className="hidden lg:block absolute top-1/2 left-[12%] right-[12%] h-[2px] bg-gradient-to-r from-purple-500/0 via-purple-500/30 to-purple-500/0 -translate-y-1/2 z-0" />

          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40, scale: 0.85, rotateY: -10 }}
              whileInView={{ opacity: 1, y: 0, scale: 1, rotateY: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.6,
                delay: i * 0.18,
                ease: [0.25, 0.46, 0.45, 0.94] as const,
              }}
              whileHover={{
                y: -12,
                scale: 1.05,
                borderColor: "rgba(168, 85, 247, 0.5)",
                boxShadow: "0 25px 50px rgba(168, 85, 247, 0.15), 0 0 80px rgba(168, 85, 247, 0.08)",
                transition: { duration: 0.3, ease: "easeOut" },
              }}
              className="step-card group relative bg-gradient-to-b from-[#15151f] to-[#0f0f17] border border-white/10 rounded-2xl p-6 cursor-default overflow-hidden z-10"
            >
              {/* Hover glow overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Animated number */}
              <motion.span
                initial={{ opacity: 0, scale: 0.5, x: 20 }}
                whileInView={{ opacity: 1, scale: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.18, type: "spring", stiffness: 200, damping: 12 }}
                className="text-6xl font-black bg-gradient-to-br from-purple-500/25 to-pink-500/15 bg-clip-text text-transparent absolute top-3 right-3 group-hover:from-purple-500/40 group-hover:to-pink-500/25 transition-all duration-500 select-none"
              >
                {step.num}
              </motion.span>

              {/* Step indicator dot */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + i * 0.18, type: "spring", stiffness: 400, damping: 15 }}
                className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 mb-4 shadow-[0_0_12px_rgba(168,85,247,0.5)] group-hover:shadow-[0_0_20px_rgba(168,85,247,0.8)] transition-shadow duration-300"
              />

              <h3 className="relative z-10 text-lg font-semibold text-white mb-2 mt-6 group-hover:text-purple-100 transition-colors duration-300">{step.title}</h3>
              <p className="relative z-10 text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">{step.desc}</p>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-purple-500/0 via-purple-500/50 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

const faqItems = [
  { question: "Кросівки оригінальні?", answer: "Так, всі кросівки — 100% оригінал з офіційних магазинів США. Ми працюємо безпосередньо з авторизованими дилерами та надаємо чеки на підтвердження." },
  { question: "Як визначити свій розмір?", answer: "Напишіть нам в Telegram — менеджер допоможе підібрати ідеальний розмір. Для цього потрібно виміряти довжину стопи та надіслати нам ці дані." },
  { question: "Скільки коштує доставка?", answer: "Доставка Новою Поштою по Україні — безкоштовна. Оплата при отриманні, передоплата не потрібна." },
  { question: "Як довго йде доставка?", answer: "Зазвичай доставка займає 1-3 робочих дні залежно від вашого міста. Товар відправляється в день замовлення або наступного робочого дня." },
  { question: "Що робити, якщо розмір не підійшов?", answer: "Ви можете обміняти кросівки на інший розмір протягом 14 днів. Зверніться до нас в Telegram — ми організуємо безкоштовне повернення." },
  { question: "Чи є гарантія?", answer: "Так, ми надаємо гарантію якості на всі кросівки. Якщо виявиться виробничий дефект — ми замінимо товар або повернемо кошти." },
  { question: "Як оплатити замовлення?", answer: "Оплата при отриманні в відділенні Нової Пошти — готівкою або карткою. Передоплата не потрібна." },
  { question: "Чи можна замовити іншу модель?", answer: "Так! Ми здійснюємо викуп будь-якої моделі кросівок з США під запит. Напишіть нам в Telegram з бажаною моделлю — ми розрахуємо вартість." },
  { question: "Звідки привозите кросівки?", answer: "Ми працюємо з офіційними магазинами та авторизованими дилерами в США. Кожна пара має сертифікати оригінальності." },
  { question: "Чи можна купити кілька пар зі знижкою?", answer: "Так, при замовленні від 2 пар діє знижка. Напишіть нам в Telegram — ми розрахуємо індивідуальну пропозицію." },
];

function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="relative py-20 md:py-32 bg-[#0a0a0f]">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-pink-500/5 rounded-full blur-[200px]" />
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Часті питання
            </span>
          </h2>
          <p className="text-gray-400 text-lg">Відповіді на найпопулярніші запитання</p>
        </motion.div>

        <div className="space-y-3">
          {faqItems.map((item, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i * 0.5}
              className="faq-item bg-gradient-to-b from-[#15151f] to-[#0f0f17] border border-white/10 rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left group"
              >
                <span className="font-medium text-white pr-4 group-hover:text-purple-100 transition-colors">
                  {item.question}
                </span>
                <motion.svg
                  animate={{ rotate: openIndex === i ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-5 h-5 text-purple-400 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </motion.svg>
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] as const }}
                  >
                    <div className="px-5 pb-5 text-gray-400 text-sm leading-relaxed border-t border-white/5 pt-4">
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer id="contact" className="relative py-16 border-t border-white/10">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-purple-500/5 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Готовий замовити?
            </span>
          </h2>
          <p className="text-gray-400 text-lg mb-8 max-w-xl mx-auto">
            Напиши нам в Telegram — менеджер допоможе з вибором та оформленням замовлення
          </p>
          <motion.a
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            href={TELEGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="glow-btn inline-flex items-center justify-center gap-2 px-10 py-5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-xl font-semibold text-white shadow-lg shadow-purple-500/30"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
            </svg>
            Написати менеджеру
          </motion.a>

          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4"
          >
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} Serezha Shop. Всі права захищені.
            </p>
            <p className="text-sm text-gray-500">
              Зроблено{" "}
              <a
                href="https://freelance-ua.agency"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-400 hover:text-purple-300 transition-colors"
              >
                Freelance UA || Digital Agency
              </a>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <main className="relative overflow-hidden">
      <Header />
      <Hero />
      <Catalog />
      <About />
      <Reviews />
      <Delivery />
      <FAQ />
      <Footer />
    </main>
  );
}
