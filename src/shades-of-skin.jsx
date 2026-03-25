import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import {
  Camera, Upload, Heart, Share2, Star, Search, Filter, ChevronRight,
  ChevronLeft, Sun, Moon, X, Check, Menu, Home, User, ShoppingBag,
  Bell, Settings, Sparkles, Eye, Droplets, Palette, Crown, Lock,
  ArrowRight, Play, Pause, RotateCcw, Zap, Globe, Shield, Smartphone,
  CreditCard, Gift, TrendingUp, Award, Layers, SlidersHorizontal,
  ImageIcon, CircleCheck, CircleX, Info, LogOut, ChevronDown, Minus, Plus
} from "lucide-react";

// ─── Brand & Product Data ───────────────────────────────────────────
const BRANDS = [
  { id: 1, name: "Fenty Beauty", origin: "USA", inclusive: true, categories: ["foundation", "powder", "blush", "lipstick", "eyeshadow"], priceRange: "$$", notable: "Inclusive shade range by Rihanna" },
  { id: 2, name: "MAC Cosmetics", origin: "Canada", inclusive: true, categories: ["foundation", "powder", "blush", "lipstick", "eyeshadow"], priceRange: "$$", notable: "Professional-grade artistry" },
  { id: 3, name: "NARS", origin: "France", inclusive: true, categories: ["foundation", "powder", "blush", "lipstick", "eyeshadow"], priceRange: "$$$", notable: "Bold pigments" },
  { id: 4, name: "Maybelline", origin: "USA", inclusive: true, categories: ["foundation", "powder", "blush", "lipstick", "eyeshadow"], priceRange: "$", notable: "Affordable quality" },
  { id: 5, name: "L'Oréal Paris", origin: "France", inclusive: true, categories: ["foundation", "powder", "blush", "lipstick", "eyeshadow"], priceRange: "$", notable: "Luxury at every price" },
  { id: 6, name: "Estée Lauder", origin: "USA", inclusive: true, categories: ["foundation", "powder", "blush", "lipstick", "eyeshadow"], priceRange: "$$$", notable: "Timeless luxury" },
  { id: 7, name: "Saie", origin: "USA", inclusive: true, categories: ["foundation", "blush", "lipstick"], priceRange: "$$", notable: "Clean beauty essentials" },
  { id: 8, name: "ILIA Beauty", origin: "USA", inclusive: true, categories: ["foundation", "blush", "lipstick", "eyeshadow"], priceRange: "$$", notable: "Clean, skin-friendly" },
  { id: 9, name: "Tower 28", origin: "USA", inclusive: true, categories: ["blush", "lipstick", "foundation"], priceRange: "$$", notable: "Sensitive-skin safe" },
  { id: 10, name: "Pat McGrath Labs", origin: "USA", inclusive: true, categories: ["foundation", "lipstick", "eyeshadow", "blush"], priceRange: "$$$", notable: "Luxury editorial" },
  { id: 11, name: "Charlotte Tilbury", origin: "UK", inclusive: true, categories: ["foundation", "powder", "blush", "lipstick", "eyeshadow"], priceRange: "$$$", notable: "Red carpet glamour" },
  { id: 12, name: "Rare Beauty", origin: "USA", inclusive: true, categories: ["foundation", "blush", "lipstick", "eyeshadow"], priceRange: "$$", notable: "By Selena Gomez" },
  { id: 13, name: "NYX Professional", origin: "USA", inclusive: true, categories: ["foundation", "powder", "blush", "lipstick", "eyeshadow"], priceRange: "$", notable: "Pro looks, accessible price" },
  { id: 14, name: "Lancôme", origin: "France", inclusive: true, categories: ["foundation", "powder", "blush", "lipstick", "eyeshadow"], priceRange: "$$$", notable: "French luxury beauty" },
  { id: 15, name: "Bobbi Brown", origin: "USA", inclusive: true, categories: ["foundation", "powder", "blush", "lipstick", "eyeshadow"], priceRange: "$$$", notable: "Natural beauty philosophy" },
  { id: 16, name: "Too Faced", origin: "USA", inclusive: true, categories: ["foundation", "powder", "blush", "lipstick", "eyeshadow"], priceRange: "$$", notable: "Fun, cruelty-free" },
  { id: 17, name: "Shiseido", origin: "Japan", inclusive: true, categories: ["foundation", "powder", "blush", "lipstick"], priceRange: "$$$", notable: "Japanese innovation" },
  { id: 18, name: "Clinique", origin: "USA", inclusive: true, categories: ["foundation", "powder", "blush", "lipstick"], priceRange: "$$", notable: "Dermatologist-developed" },
  { id: 19, name: "Dior Beauty", origin: "France", inclusive: true, categories: ["foundation", "powder", "blush", "lipstick", "eyeshadow"], priceRange: "$$$", notable: "Haute couture beauty" },
  { id: 20, name: "Urban Decay", origin: "USA", inclusive: true, categories: ["foundation", "eyeshadow", "lipstick"], priceRange: "$$", notable: "Edgy, bold color" },
  { id: 21, name: "Ami Colé", origin: "USA", inclusive: true, categories: ["foundation", "lipstick", "blush"], priceRange: "$$", notable: "Made for melanin-rich skin" },
  { id: 22, name: "Danessa Myricks", origin: "USA", inclusive: true, categories: ["foundation", "eyeshadow", "blush", "lipstick"], priceRange: "$$", notable: "Artistry for all skin tones" },
  { id: 23, name: "Range Beauty", origin: "USA", inclusive: true, categories: ["foundation", "lipstick"], priceRange: "$$", notable: "Inclusive clean beauty" },
  { id: 24, name: "Beauty Bakerie", origin: "USA", inclusive: true, categories: ["foundation", "lipstick", "powder"], priceRange: "$$", notable: "Long-wear, all skin tones" },
  { id: 25, name: "K-Beauty (LANEIGE)", origin: "South Korea", inclusive: true, categories: ["foundation", "lipstick", "blush", "eyeshadow"], priceRange: "$$", notable: "Korean beauty innovation" },
  { id: 26, name: "Sephora Collection", origin: "France", inclusive: true, categories: ["foundation", "powder", "blush", "lipstick", "eyeshadow"], priceRange: "$", notable: "Quality essentials" },
  { id: 27, name: "Covergirl", origin: "USA", inclusive: true, categories: ["foundation", "powder", "blush", "lipstick"], priceRange: "$", notable: "Classic, accessible" },
  { id: 28, name: "bareMinerals", origin: "USA", inclusive: true, categories: ["foundation", "powder", "blush", "lipstick", "eyeshadow"], priceRange: "$$", notable: "Mineral-based clean beauty" },
  { id: 29, name: "Laura Mercier", origin: "France", inclusive: true, categories: ["foundation", "powder", "blush", "lipstick"], priceRange: "$$$", notable: "Flawless face" },
  { id: 30, name: "Hourglass", origin: "USA", inclusive: true, categories: ["foundation", "powder", "blush", "lipstick"], priceRange: "$$$", notable: "Vegan luxury" },
];

const PRODUCT_TYPES = ["foundation", "powder", "blush", "eyeshadow", "lipstick"];

const SHADE_FAMILIES = {
  foundation: [
    { name: "Porcelain", hex: "#F5DEB3", undertone: "cool" },
    { name: "Ivory", hex: "#FAEBD7", undertone: "neutral" },
    { name: "Fair", hex: "#F5E6D3", undertone: "warm" },
    { name: "Light", hex: "#E8D4B8", undertone: "neutral" },
    { name: "Light Medium", hex: "#D4B896", undertone: "warm" },
    { name: "Medium", hex: "#C8A882", undertone: "neutral" },
    { name: "Medium Tan", hex: "#B8956A", undertone: "warm" },
    { name: "Tan", hex: "#A67B5B", undertone: "neutral" },
    { name: "Caramel", hex: "#8B6914", undertone: "warm" },
    { name: "Mocha", hex: "#7B5B3A", undertone: "neutral" },
    { name: "Chestnut", hex: "#6B4226", undertone: "warm" },
    { name: "Espresso", hex: "#4A2C0A", undertone: "neutral" },
    { name: "Deep Ebony", hex: "#3B1E08", undertone: "cool" },
    { name: "Rich Mahogany", hex: "#5C3317", undertone: "warm" },
  ],
  powder: [
    { name: "Translucent", hex: "#FFF8F0", undertone: "neutral" },
    { name: "Banana", hex: "#F5E6A8", undertone: "warm" },
    { name: "Light", hex: "#F0DCC8", undertone: "neutral" },
    { name: "Medium", hex: "#D4B896", undertone: "warm" },
    { name: "Deep", hex: "#8B6914", undertone: "neutral" },
    { name: "Rich", hex: "#6B4226", undertone: "warm" },
  ],
  blush: [
    { name: "Baby Pink", hex: "#FFB6C1", undertone: "cool" },
    { name: "Rose", hex: "#E8828A", undertone: "neutral" },
    { name: "Peach", hex: "#FFAB91", undertone: "warm" },
    { name: "Coral", hex: "#FF7F50", undertone: "warm" },
    { name: "Berry", hex: "#C44569", undertone: "cool" },
    { name: "Mauve", hex: "#B47487", undertone: "neutral" },
    { name: "Plum", hex: "#8E4585", undertone: "cool" },
    { name: "Terracotta", hex: "#CC6B49", undertone: "warm" },
    { name: "Wine", hex: "#722F37", undertone: "cool" },
    { name: "Deep Berry", hex: "#7B2D5F", undertone: "cool" },
  ],
  eyeshadow: [
    { name: "Champagne", hex: "#F7E7CE", undertone: "warm" },
    { name: "Rose Gold", hex: "#D4A574", undertone: "warm" },
    { name: "Bronze", hex: "#CD7F32", undertone: "warm" },
    { name: "Taupe", hex: "#9C8A7C", undertone: "neutral" },
    { name: "Smoke", hex: "#708090", undertone: "cool" },
    { name: "Plum", hex: "#8E4585", undertone: "cool" },
    { name: "Forest", hex: "#4A6741", undertone: "neutral" },
    { name: "Navy", hex: "#2C3E6B", undertone: "cool" },
    { name: "Copper", hex: "#B87333", undertone: "warm" },
    { name: "Midnight", hex: "#2C2C3A", undertone: "cool" },
  ],
  lipstick: [
    { name: "Nude Pink", hex: "#D4A5A5", undertone: "neutral" },
    { name: "Mauve", hex: "#C07B8A", undertone: "cool" },
    { name: "Rose", hex: "#D64D6A", undertone: "neutral" },
    { name: "Classic Red", hex: "#CC0000", undertone: "neutral" },
    { name: "Berry", hex: "#8B1A4A", undertone: "cool" },
    { name: "Coral", hex: "#E8734A", undertone: "warm" },
    { name: "Plum", hex: "#6B2D5B", undertone: "cool" },
    { name: "Terracotta", hex: "#B85C3A", undertone: "warm" },
    { name: "Burgundy", hex: "#6B1C23", undertone: "cool" },
    { name: "Deep Wine", hex: "#4A0E2E", undertone: "cool" },
    { name: "Brown Nude", hex: "#A0522D", undertone: "warm" },
    { name: "Chocolate", hex: "#5C3A21", undertone: "warm" },
  ],
};

// Generate products for each brand
const generateProducts = () => {
  const products = [];
  let id = 1;
  BRANDS.forEach((brand) => {
    brand.categories.forEach((cat) => {
      const shades = SHADE_FAMILIES[cat] || [];
      shades.forEach((shade) => {
        products.push({
          id: id++,
          brandId: brand.id,
          brandName: brand.name,
          category: cat,
          shadeName: shade.name,
          hex: shade.hex,
          undertone: shade.undertone,
          price: brand.priceRange === "$" ? Math.floor(Math.random() * 10) + 8 : brand.priceRange === "$$" ? Math.floor(Math.random() * 15) + 22 : Math.floor(Math.random() * 20) + 38,
          rating: (Math.random() * 1.5 + 3.5).toFixed(1),
          reviews: Math.floor(Math.random() * 2000) + 50,
        });
      });
    });
  });
  return products;
};

const ALL_PRODUCTS = generateProducts();

// Skin quiz questions
const SKIN_QUIZ = [
  { q: "How does your skin feel after washing?", options: [
    { text: "Tight and dry", type: "dry" },
    { text: "Comfortable", type: "normal" },
    { text: "Oily, especially T-zone", type: "combination" },
    { text: "Oily all over", type: "oily" },
  ]},
  { q: "How often do you experience breakouts?", options: [
    { text: "Rarely", type: "dry" },
    { text: "Occasionally", type: "normal" },
    { text: "Frequently in T-zone", type: "combination" },
    { text: "Frequently all over", type: "oily" },
  ]},
  { q: "How does your skin react to sun?", options: [
    { text: "Burns easily, rarely tans", type: "cool" },
    { text: "Burns then tans", type: "neutral" },
    { text: "Tans easily, rarely burns", type: "warm" },
    { text: "Never burns, always tans", type: "warm" },
  ]},
  { q: "What color are the veins on your inner wrist?", options: [
    { text: "Blue or purple", type: "cool" },
    { text: "Mix of blue and green", type: "neutral" },
    { text: "Green or olive", type: "warm" },
  ]},
];

const SUBSCRIPTION_PLANS = [
  { id: "monthly", name: "Monthly", price: 9.99, period: "month", features: ["Unlimited try-ons", "All 30 brands", "Save & share looks", "AI recommendations"] },
  { id: "quarterly", name: "Quarterly", price: 24.99, period: "3 months", features: ["Everything in Monthly", "Priority new shades", "Exclusive brand previews", "Offline mode"], savings: "17%" },
  { id: "annual", name: "Annual", price: 79.99, period: "year", features: ["Everything in Quarterly", "Early access features", "Personal shade profile", "VIP support"], savings: "33%", popular: true },
];

// ─── Styles ─────────────────────────────────────────────────────────
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&display=swap');
  
  :root {
    --brand-cream: #F5EDE3;
    --brand-beige: #E8D5C0;
    --brand-gold: #B8860B;
    --brand-gold-light: #D4A843;
    --brand-brown: #5C3317;
    --brand-brown-dark: #3B1E08;
    --brand-rose: #C07B8A;
    --brand-berry: #8B1A4A;
    --brand-white: #FEFCF9;
    --brand-black: #1A1210;
    --brand-gray: #8A7E74;
    --brand-gray-light: #C8BDB0;
    --shadow-sm: 0 1px 3px rgba(92,51,23,0.08);
    --shadow-md: 0 4px 16px rgba(92,51,23,0.10);
    --shadow-lg: 0 8px 32px rgba(92,51,23,0.12);
    --shadow-xl: 0 16px 48px rgba(92,51,23,0.15);
    --radius: 16px;
    --radius-sm: 10px;
    --radius-xs: 6px;
    --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  * { margin: 0; padding: 0; box-sizing: border-box; }
  
  .sos-app {
    font-family: 'DM Sans', sans-serif;
    background: var(--brand-cream);
    color: var(--brand-black);
    min-height: 100vh;
    max-width: 430px;
    margin: 0 auto;
    position: relative;
    overflow-x: hidden;
  }
  
  .sos-app.dark {
    --brand-cream: #1A1210;
    --brand-beige: #2C2218;
    --brand-white: #1E1814;
    --brand-black: #F5EDE3;
    --brand-gray: #A89E94;
    --brand-gray-light: #4A3E34;
  }
  
  h1, h2, h3, h4 {
    font-family: 'Cormorant Garamond', serif;
    font-weight: 600;
    letter-spacing: -0.01em;
  }
  
  /* ── Splash Screen ─── */
  .splash {
    position: fixed; inset: 0; z-index: 100;
    background: linear-gradient(160deg, #F5EDE3 0%, #E8D5C0 40%, #D4A843 100%);
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    animation: splashFade 0.5s ease 2.5s forwards;
  }
  @keyframes splashFade { to { opacity: 0; pointer-events: none; } }
  .splash-logo {
    width: 120px; height: 120px; border-radius: 30px;
    background: var(--brand-brown); display: flex; align-items: center; justify-content: center;
    animation: splashPulse 1s ease infinite alternate;
  }
  @keyframes splashPulse { to { transform: scale(1.05); } }
  .splash-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 32px; font-weight: 700; color: var(--brand-brown-dark);
    margin-top: 24px; letter-spacing: 2px;
  }
  .splash-sub { font-size: 13px; color: var(--brand-gray); margin-top: 8px; letter-spacing: 3px; text-transform: uppercase; }
  .splash-loader {
    width: 120px; height: 3px; background: rgba(92,51,23,0.15);
    border-radius: 2px; margin-top: 40px; overflow: hidden;
  }
  .splash-loader-bar { height: 100%; background: var(--brand-brown); border-radius: 2px; animation: splashLoad 2.3s ease forwards; }
  @keyframes splashLoad { from { width: 0; } to { width: 100%; } }
  
  /* ── Header ─── */
  .header {
    position: sticky; top: 0; z-index: 50;
    background: rgba(254,252,249,0.85); backdrop-filter: blur(20px) saturate(1.8);
    padding: 12px 20px; display: flex; align-items: center; justify-content: space-between;
    border-bottom: 1px solid rgba(200,189,176,0.3);
  }
  .dark .header { background: rgba(30,24,20,0.85); }
  .header-logo { font-family: 'Cormorant Garamond', serif; font-size: 22px; font-weight: 700; color: var(--brand-brown); }
  .header-actions { display: flex; gap: 8px; }
  .icon-btn {
    width: 40px; height: 40px; border-radius: 12px; border: none;
    background: rgba(200,189,176,0.2); display: flex; align-items: center; justify-content: center;
    cursor: pointer; color: var(--brand-brown); transition: var(--transition);
  }
  .icon-btn:hover { background: rgba(200,189,176,0.4); }
  
  /* ── Bottom Nav ─── */
  .bottom-nav {
    position: fixed; bottom: 0; left: 50%; transform: translateX(-50%);
    max-width: 430px; width: 100%; z-index: 50;
    background: rgba(254,252,249,0.92); backdrop-filter: blur(20px) saturate(1.8);
    display: flex; justify-content: space-around; align-items: center;
    padding: 8px 8px 28px 8px;
    border-top: 1px solid rgba(200,189,176,0.3);
  }
  .dark .bottom-nav { background: rgba(30,24,20,0.92); }
  .nav-item {
    display: flex; flex-direction: column; align-items: center; gap: 3px;
    padding: 6px 16px; border-radius: 14px; border: none;
    background: transparent; cursor: pointer; color: var(--brand-gray);
    font-size: 10px; font-family: 'DM Sans', sans-serif; font-weight: 500;
    transition: var(--transition);
  }
  .nav-item.active { color: var(--brand-gold); background: rgba(184,134,11,0.08); }
  
  /* ── Content ─── */
  .content { padding: 0 0 90px 0; }
  .section-pad { padding: 0 20px; }
  
  /* ── Hero ─── */
  .hero {
    position: relative; padding: 32px 20px 40px;
    background: linear-gradient(160deg, var(--brand-cream) 0%, var(--brand-beige) 100%);
    overflow: hidden;
  }
  .hero::after {
    content: ''; position: absolute; right: -60px; top: -40px;
    width: 200px; height: 200px; border-radius: 50%;
    background: radial-gradient(circle, rgba(184,134,11,0.1) 0%, transparent 70%);
  }
  .hero-eyebrow {
    font-size: 11px; text-transform: uppercase; letter-spacing: 3px;
    color: var(--brand-gold); font-weight: 600; margin-bottom: 12px;
  }
  .hero h1 { font-size: 34px; line-height: 1.15; margin-bottom: 12px; color: var(--brand-brown-dark); }
  .hero p { font-size: 15px; color: var(--brand-gray); line-height: 1.5; margin-bottom: 24px; max-width: 300px; }
  .hero-cta {
    display: inline-flex; align-items: center; gap: 10px;
    background: var(--brand-brown); color: #fff;
    padding: 14px 28px; border-radius: 14px; border: none;
    font-family: 'DM Sans', sans-serif; font-size: 15px; font-weight: 600;
    cursor: pointer; transition: var(--transition);
    box-shadow: 0 4px 20px rgba(92,51,23,0.25);
  }
  .hero-cta:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(92,51,23,0.35); }
  
  /* ── Cards ─── */
  .card {
    background: var(--brand-white); border-radius: var(--radius);
    box-shadow: var(--shadow-sm); overflow: hidden;
    transition: var(--transition);
  }
  .card:hover { box-shadow: var(--shadow-md); }
  
  .section-title {
    font-size: 24px; margin-bottom: 16px; padding-top: 28px;
    color: var(--brand-brown-dark);
  }
  .section-subtitle { font-size: 13px; color: var(--brand-gray); margin-top: -12px; margin-bottom: 16px; }
  
  /* ── Brand Carousel ─── */
  .brand-scroll { display: flex; gap: 12px; overflow-x: auto; padding: 0 20px 8px; scrollbar-width: none; }
  .brand-scroll::-webkit-scrollbar { display: none; }
  .brand-chip {
    flex-shrink: 0; padding: 10px 20px; border-radius: 50px;
    background: var(--brand-white); border: 1.5px solid var(--brand-gray-light);
    font-size: 13px; font-weight: 500; white-space: nowrap;
    cursor: pointer; transition: var(--transition); font-family: 'DM Sans', sans-serif;
    color: var(--brand-brown);
  }
  .brand-chip.active { background: var(--brand-brown); color: #fff; border-color: var(--brand-brown); }
  
  /* ── Product Grid ─── */
  .product-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; padding: 0 20px; }
  .product-card {
    background: var(--brand-white); border-radius: var(--radius);
    padding: 16px; cursor: pointer; transition: var(--transition);
    border: 1.5px solid transparent; position: relative;
  }
  .product-card:hover { border-color: var(--brand-gold-light); transform: translateY(-2px); }
  .product-swatch {
    width: 100%; aspect-ratio: 1; border-radius: var(--radius-sm);
    margin-bottom: 12px; position: relative; overflow: hidden;
  }
  .product-swatch::after {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.06) 100%);
    border-radius: inherit;
  }
  .product-brand { font-size: 10px; text-transform: uppercase; letter-spacing: 1.5px; color: var(--brand-gray); margin-bottom: 4px; }
  .product-name { font-family: 'Cormorant Garamond', serif; font-size: 16px; font-weight: 600; margin-bottom: 4px; }
  .product-price { font-size: 14px; font-weight: 600; color: var(--brand-gold); }
  .product-rating { display: flex; align-items: center; gap: 4px; font-size: 12px; color: var(--brand-gray); margin-top: 4px; }
  .product-fav {
    position: absolute; top: 12px; right: 12px; z-index: 2;
    width: 32px; height: 32px; border-radius: 50%;
    background: rgba(255,255,255,0.85); border: none; cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    transition: var(--transition);
  }
  
  /* ── Try On View ─── */
  .tryon-area {
    position: relative; width: 100%; aspect-ratio: 3/4;
    background: #2C2218; border-radius: 0 0 var(--radius) var(--radius);
    overflow: hidden; display: flex; align-items: center; justify-content: center;
  }
  .tryon-placeholder {
    text-align: center; color: rgba(255,255,255,0.6); padding: 40px;
  }
  .tryon-placeholder svg { margin-bottom: 16px; opacity: 0.4; }
  .tryon-controls {
    position: absolute; bottom: 20px; left: 20px; right: 20px;
    display: flex; gap: 10px; justify-content: center;
  }
  .tryon-btn {
    padding: 10px 20px; border-radius: 50px; border: none;
    background: rgba(255,255,255,0.15); backdrop-filter: blur(10px);
    color: #fff; font-family: 'DM Sans', sans-serif; font-size: 13px;
    font-weight: 500; cursor: pointer; display: flex; align-items: center; gap: 6px;
    transition: var(--transition);
  }
  .tryon-btn.primary { background: var(--brand-gold); color: #fff; }
  
  /* ── Shade Picker ─── */
  .shade-picker { padding: 20px; }
  .shade-row { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 12px; }
  .shade-dot {
    width: 40px; height: 40px; border-radius: 50%; border: 3px solid transparent;
    cursor: pointer; transition: var(--transition); position: relative;
  }
  .shade-dot.active { border-color: var(--brand-gold); transform: scale(1.15); box-shadow: 0 0 0 2px var(--brand-cream), 0 0 0 4px var(--brand-gold); }
  .shade-dot:hover { transform: scale(1.1); }
  .shade-label { font-size: 11px; color: var(--brand-gray); text-align: center; margin-top: 4px; }
  
  /* ── Quiz ─── */
  .quiz-card {
    background: linear-gradient(135deg, var(--brand-brown) 0%, var(--brand-brown-dark) 100%);
    border-radius: var(--radius); padding: 28px; margin: 0 20px; color: #fff;
  }
  .quiz-card h3 { font-size: 24px; margin-bottom: 8px; color: #fff; }
  .quiz-card p { font-size: 14px; opacity: 0.8; margin-bottom: 20px; }
  .quiz-option {
    display: block; width: 100%; padding: 14px 18px; margin-bottom: 10px;
    border-radius: var(--radius-sm); border: 1.5px solid rgba(255,255,255,0.2);
    background: rgba(255,255,255,0.08); color: #fff; font-family: 'DM Sans', sans-serif;
    font-size: 14px; cursor: pointer; text-align: left; transition: var(--transition);
  }
  .quiz-option:hover { background: rgba(255,255,255,0.15); border-color: rgba(255,255,255,0.4); }
  .quiz-option.selected { background: var(--brand-gold); border-color: var(--brand-gold); }
  .quiz-progress { display: flex; gap: 6px; margin-bottom: 20px; }
  .quiz-dot { width: 24px; height: 3px; border-radius: 2px; background: rgba(255,255,255,0.2); }
  .quiz-dot.filled { background: var(--brand-gold); }
  
  /* ── Subscription ─── */
  .sub-card {
    border: 2px solid var(--brand-gray-light); border-radius: var(--radius);
    padding: 24px; margin-bottom: 14px; cursor: pointer; transition: var(--transition);
    background: var(--brand-white); position: relative;
  }
  .sub-card.popular { border-color: var(--brand-gold); }
  .sub-card.selected { border-color: var(--brand-brown); background: rgba(92,51,23,0.03); }
  .sub-badge {
    position: absolute; top: -10px; right: 16px;
    background: var(--brand-gold); color: #fff; font-size: 11px;
    font-weight: 600; padding: 3px 12px; border-radius: 50px;
  }
  .sub-price { font-family: 'Cormorant Garamond', serif; font-size: 36px; font-weight: 700; color: var(--brand-brown); }
  .sub-period { font-size: 14px; color: var(--brand-gray); }
  .sub-features { margin-top: 12px; }
  .sub-feature { display: flex; align-items: center; gap: 8px; font-size: 13px; color: var(--brand-gray); margin-bottom: 6px; }
  
  .cta-btn {
    width: 100%; padding: 16px; border-radius: 14px; border: none;
    background: var(--brand-brown); color: #fff;
    font-family: 'DM Sans', sans-serif; font-size: 16px; font-weight: 600;
    cursor: pointer; transition: var(--transition);
    display: flex; align-items: center; justify-content: center; gap: 8px;
  }
  .cta-btn:hover { background: var(--brand-brown-dark); }
  .cta-btn:disabled { opacity: 0.5; cursor: not-allowed; }
  .cta-btn.outline { background: transparent; color: var(--brand-brown); border: 2px solid var(--brand-brown); }
  .cta-btn.gold { background: var(--brand-gold); }
  
  /* ── Modal ─── */
  .modal-overlay {
    position: fixed; inset: 0; z-index: 80;
    background: rgba(0,0,0,0.5); backdrop-filter: blur(4px);
    display: flex; align-items: flex-end; justify-content: center;
    animation: fadeIn 0.2s ease;
  }
  @keyframes fadeIn { from { opacity: 0; } }
  .modal-sheet {
    max-width: 430px; width: 100%; max-height: 85vh;
    background: var(--brand-cream); border-radius: 24px 24px 0 0;
    padding: 8px 0 0; overflow-y: auto; animation: slideUp 0.3s ease;
  }
  @keyframes slideUp { from { transform: translateY(100%); } }
  .modal-handle { width: 40px; height: 4px; border-radius: 2px; background: var(--brand-gray-light); margin: 0 auto 16px; }
  .modal-body { padding: 0 20px 32px; }
  
  /* ── Profile ─── */
  .profile-header {
    text-align: center; padding: 24px 20px;
    background: linear-gradient(160deg, var(--brand-beige) 0%, var(--brand-cream) 100%);
  }
  .profile-avatar {
    width: 80px; height: 80px; border-radius: 50%;
    background: var(--brand-brown); color: #fff;
    display: flex; align-items: center; justify-content: center;
    margin: 0 auto 12px; font-family: 'Cormorant Garamond', serif;
    font-size: 32px; font-weight: 700;
  }
  .profile-name { font-size: 22px; color: var(--brand-brown-dark); }
  .profile-stat {
    display: flex; justify-content: center; gap: 32px; margin-top: 16px;
  }
  .profile-stat-item { text-align: center; }
  .profile-stat-num { font-family: 'Cormorant Garamond', serif; font-size: 24px; font-weight: 700; color: var(--brand-brown); }
  .profile-stat-label { font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: var(--brand-gray); }
  
  .menu-list { padding: 12px 20px; }
  .menu-item {
    display: flex; align-items: center; gap: 14px; padding: 16px 0;
    border-bottom: 1px solid rgba(200,189,176,0.2); cursor: pointer;
    color: var(--brand-black); font-size: 15px; transition: var(--transition);
  }
  .menu-item:last-child { border-bottom: none; }
  .menu-item:hover { color: var(--brand-gold); }
  .menu-icon { width: 36px; height: 36px; border-radius: 10px; background: rgba(184,134,11,0.08); display: flex; align-items: center; justify-content: center; color: var(--brand-gold); }
  .menu-arrow { margin-left: auto; color: var(--brand-gray-light); }
  
  /* ── Misc ─── */
  .search-bar {
    display: flex; align-items: center; gap: 10px;
    background: var(--brand-white); border-radius: 14px;
    padding: 12px 16px; margin: 0 20px 16px;
    border: 1.5px solid var(--brand-gray-light);
  }
  .search-bar input {
    flex: 1; border: none; background: none; outline: none;
    font-family: 'DM Sans', sans-serif; font-size: 15px; color: var(--brand-black);
  }
  .search-bar input::placeholder { color: var(--brand-gray); }
  
  .tab-bar { display: flex; gap: 4px; padding: 4px; background: var(--brand-white); border-radius: 14px; margin: 0 20px 16px; }
  .tab-item {
    flex: 1; padding: 10px; border-radius: 10px; border: none;
    background: transparent; font-family: 'DM Sans', sans-serif;
    font-size: 13px; font-weight: 500; cursor: pointer;
    color: var(--brand-gray); transition: var(--transition);
    text-transform: capitalize;
  }
  .tab-item.active { background: var(--brand-brown); color: #fff; }
  
  .empty-state { text-align: center; padding: 60px 20px; color: var(--brand-gray); }
  .empty-state svg { margin-bottom: 16px; opacity: 0.3; }
  
  .badge { display: inline-flex; align-items: center; gap: 4px; padding: 4px 10px; border-radius: 50px; font-size: 11px; font-weight: 600; }
  .badge-gold { background: rgba(184,134,11,0.1); color: var(--brand-gold); }
  .badge-green { background: rgba(76,175,80,0.1); color: #4CAF50; }
  
  .toast {
    position: fixed; bottom: 100px; left: 50%; transform: translateX(-50%);
    background: var(--brand-brown); color: #fff; padding: 12px 24px;
    border-radius: 50px; font-size: 14px; font-weight: 500; z-index: 90;
    box-shadow: var(--shadow-lg); animation: toastIn 0.3s ease, toastOut 0.3s ease 2.2s forwards;
    display: flex; align-items: center; gap: 8px; white-space: nowrap;
  }
  @keyframes toastIn { from { opacity: 0; transform: translateX(-50%) translateY(20px); } }
  @keyframes toastOut { to { opacity: 0; transform: translateX(-50%) translateY(20px); } }
  
  .filter-chips { display: flex; gap: 8px; overflow-x: auto; padding: 0 20px 12px; scrollbar-width: none; }
  .filter-chips::-webkit-scrollbar { display: none; }
  .filter-chip {
    padding: 8px 16px; border-radius: 50px; border: 1.5px solid var(--brand-gray-light);
    background: var(--brand-white); font-size: 12px; font-weight: 500;
    cursor: pointer; white-space: nowrap; transition: var(--transition);
    font-family: 'DM Sans', sans-serif; color: var(--brand-brown);
  }
  .filter-chip.active { background: var(--brand-brown); color: #fff; border-color: var(--brand-brown); }
  
  .comparison-row {
    display: flex; gap: 8px; overflow-x: auto; padding: 0 20px;
    scrollbar-width: none;
  }
  .comparison-row::-webkit-scrollbar { display: none; }
  .comparison-item {
    flex-shrink: 0; width: 140px; text-align: center;
    background: var(--brand-white); border-radius: var(--radius-sm);
    padding: 12px; border: 1.5px solid var(--brand-gray-light);
  }
  .comparison-swatch {
    width: 60px; height: 60px; border-radius: 50%;
    margin: 0 auto 8px;
  }

  .notification-dot {
    width: 8px; height: 8px; border-radius: 50%;
    background: var(--brand-berry); position: absolute; top: 8px; right: 8px;
  }

  .ai-result-card {
    background: linear-gradient(135deg, rgba(184,134,11,0.05) 0%, rgba(184,134,11,0.02) 100%);
    border: 1.5px solid rgba(184,134,11,0.2); border-radius: var(--radius);
    padding: 20px; margin: 12px 20px;
  }
  .ai-match-score {
    font-family: 'Cormorant Garamond', serif; font-size: 42px;
    font-weight: 700; color: var(--brand-gold);
  }

  .onboarding-step { padding: 40px 24px; text-align: center; min-height: 70vh; display: flex; flex-direction: column; align-items: center; justify-content: center; }
  .onboarding-icon { width: 100px; height: 100px; border-radius: 30px; background: rgba(184,134,11,0.08); display: flex; align-items: center; justify-content: center; margin-bottom: 24px; color: var(--brand-gold); }
  .onboarding-title { font-size: 28px; color: var(--brand-brown-dark); margin-bottom: 12px; }
  .onboarding-desc { font-size: 15px; color: var(--brand-gray); line-height: 1.6; max-width: 300px; }
  .onboarding-dots { display: flex; gap: 8px; justify-content: center; margin-top: 32px; }
  .onboarding-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--brand-gray-light); transition: var(--transition); }
  .onboarding-dot.active { width: 24px; border-radius: 4px; background: var(--brand-gold); }
  
  .offline-banner {
    background: rgba(184,134,11,0.1); color: var(--brand-gold);
    padding: 8px 20px; font-size: 12px; font-weight: 500;
    display: flex; align-items: center; gap: 8px; justify-content: center;
  }

  .img-captured {
    width: 100%; height: 100%; object-fit: cover;
  }
  
  .comparison-slider {
    position: absolute; inset: 0; display: flex;
  }
  .comparison-half {
    flex: 1; display: flex; align-items: center; justify-content: center;
    font-size: 13px; color: rgba(255,255,255,0.7);
    font-weight: 500; text-transform: uppercase; letter-spacing: 1px;
  }
  .comparison-divider {
    width: 2px; background: rgba(255,255,255,0.5);
  }
`;

// ─── Main App Component ─────────────────────────────────────────────
export default function ShadesOfSkin() {
  const [showSplash, setShowSplash] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [onboardingStep, setOnboardingStep] = useState(0);
  const [darkMode, setDarkMode] = useState(false);
  const [currentTab, setCurrentTab] = useState("home");
  const [isOnline, setIsOnline] = useState(true);
  const [toast, setToast] = useState(null);
  const [user, setUser] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [authForm, setAuthForm] = useState({ name: "", email: "", password: "" });

  // Try-on state
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedShade, setSelectedShade] = useState(null);
  const [tryOnActive, setTryOnActive] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [history, setHistory] = useState([]);

  // Browse state
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("foundation");
  const [searchQuery, setSearchQuery] = useState("");
  const [showProductDetail, setShowProductDetail] = useState(null);

  // Quiz state
  const [quizStep, setQuizStep] = useState(-1);
  const [quizAnswers, setQuizAnswers] = useState([]);
  const [quizResult, setQuizResult] = useState(null);

  // Subscription
  const [subscription, setSubscription] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState("annual");
  const [trialUsed, setTrialUsed] = useState(0);

  // Notifications
  const [notifications, setNotifications] = useState([
    { id: 1, text: "Welcome to Shades of Skin! Start your free trial.", time: "Just now", read: false },
    { id: 2, text: "New shades from Fenty Beauty are here!", time: "1h ago", read: false },
    { id: 3, text: "Saie just dropped clean foundation shades", time: "3h ago", read: true },
  ]);
  const [showNotifications, setShowNotifications] = useState(false);

  const fileInputRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => {
      setShowSplash(false);
      if (!user) setShowOnboarding(true);
    }, 3000);
    return () => clearTimeout(t);
  }, []);

  const showToast = useCallback((msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  }, []);

  const toggleFavorite = useCallback((productId) => {
    setFavorites(prev => prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]);
    showToast(favorites.includes(productId) ? "Removed from favorites" : "Added to favorites");
  }, [favorites, showToast]);

  const handleAuth = () => {
    if (authMode === "signup" && !authForm.name) return;
    if (!authForm.email || !authForm.password) return;
    setUser({ name: authForm.name || "Beauty Lover", email: authForm.email, skinType: null, undertone: null });
    setShowAuthModal(false);
    setShowOnboarding(false);
    showToast("Welcome to Shades of Skin!");
  };

  const handlePhotoCapture = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setCapturedPhoto(ev.target.result);
        showToast("Photo uploaded! Choose a shade to try.");
        setCurrentTab("tryon");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleQuizAnswer = (answer) => {
    const newAnswers = [...quizAnswers, answer];
    setQuizAnswers(newAnswers);
    if (quizStep < SKIN_QUIZ.length - 1) {
      setQuizStep(quizStep + 1);
    } else {
      const skinTypes = newAnswers.slice(0, 2);
      const undertones = newAnswers.slice(2);
      const skinType = skinTypes.sort((a, b) => skinTypes.filter(v => v === a).length - skinTypes.filter(v => v === b).length).pop();
      const undertone = undertones.sort((a, b) => undertones.filter(v => v === a).length - undertones.filter(v => v === b).length).pop();
      setQuizResult({ skinType, undertone });
      if (user) setUser({ ...user, skinType, undertone });
      showToast("Your skin profile is ready!");
    }
  };

  const startTrial = () => {
    if (trialUsed >= 3) {
      showToast("Free trial limit reached. Subscribe for unlimited access!");
      return;
    }
    setTrialUsed(prev => prev + 1);
    setTryOnActive(true);
    showToast(`Free trial: ${3 - trialUsed - 1} try-ons remaining`);
  };

  const filteredProducts = useMemo(() => {
    let prods = ALL_PRODUCTS;
    if (selectedBrand) prods = prods.filter(p => p.brandId === selectedBrand);
    if (selectedCategory) prods = prods.filter(p => p.category === selectedCategory);
    if (searchQuery) prods = prods.filter(p =>
      p.brandName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.shadeName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return prods.slice(0, 20);
  }, [selectedBrand, selectedCategory, searchQuery]);

  const recommendedProducts = useMemo(() => {
    if (!quizResult) return ALL_PRODUCTS.filter(p => p.category === "foundation").slice(0, 6);
    return ALL_PRODUCTS.filter(p => p.undertone === quizResult.undertone && p.category === "foundation").slice(0, 6);
  }, [quizResult]);

  // ── Onboarding ──
  const onboardingSteps = [
    { icon: <Camera size={40} />, title: "Capture Your Look", desc: "Take a photo in natural outdoor light for the most accurate shade matching experience." },
    { icon: <Sparkles size={40} />, title: "AI Shade Match", desc: "Our AI analyzes your skin tone and undertone to recommend perfect shades from 30+ global brands." },
    { icon: <Palette size={40} />, title: "Try Before You Buy", desc: "Virtually try foundations, powders, blush, eyeshadow, and lipstick to see exactly how they'll look on you." },
  ];

  if (showSplash) {
    return (
      <>
        <style>{css}</style>
        <div className="sos-app">
          <div className="splash">
            <div className="splash-logo">
              <Sparkles size={48} color="#D4A843" />
            </div>
            <div className="splash-title">SHADES OF SKIN</div>
            <div className="splash-sub">Find Your Perfect Shade</div>
            <div className="splash-loader"><div className="splash-loader-bar" /></div>
          </div>
        </div>
      </>
    );
  }

  if (showOnboarding && !user) {
    return (
      <>
        <style>{css}</style>
        <div className="sos-app">
          <div className="onboarding-step">
            <div className="onboarding-icon">{onboardingSteps[onboardingStep].icon}</div>
            <h2 className="onboarding-title">{onboardingSteps[onboardingStep].title}</h2>
            <p className="onboarding-desc">{onboardingSteps[onboardingStep].desc}</p>
            <div className="onboarding-dots">
              {onboardingSteps.map((_, i) => (
                <div key={i} className={`onboarding-dot ${i === onboardingStep ? "active" : ""}`} />
              ))}
            </div>
            <div style={{ marginTop: 40, width: "100%", padding: "0 20px" }}>
              {onboardingStep < 2 ? (
                <button className="cta-btn" onClick={() => setOnboardingStep(onboardingStep + 1)}>
                  Next <ArrowRight size={18} />
                </button>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <button className="cta-btn" onClick={() => { setAuthMode("signup"); setShowAuthModal(true); setShowOnboarding(false); }}>
                    Get Started <ArrowRight size={18} />
                  </button>
                  <button className="cta-btn outline" onClick={() => { setAuthMode("login"); setShowAuthModal(true); setShowOnboarding(false); }}>
                    I have an account
                  </button>
                </div>
              )}
              {onboardingStep > 0 && (
                <button style={{ marginTop: 12, background: "none", border: "none", color: "var(--brand-gray)", cursor: "pointer", fontSize: 14, fontFamily: "'DM Sans', sans-serif" }}
                  onClick={() => setOnboardingStep(onboardingStep - 1)}>
                  Back
                </button>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }

  // ── Auth Modal ──
  const AuthModal = () => showAuthModal ? (
    <div className="modal-overlay" onClick={() => setShowAuthModal(false)}>
      <div className="modal-sheet" onClick={e => e.stopPropagation()}>
        <div className="modal-handle" />
        <div className="modal-body">
          <h2 style={{ fontSize: 28, marginBottom: 8, color: "var(--brand-brown-dark)" }}>
            {authMode === "signup" ? "Create Account" : "Welcome Back"}
          </h2>
          <p style={{ fontSize: 14, color: "var(--brand-gray)", marginBottom: 24 }}>
            {authMode === "signup" ? "Join thousands finding their perfect shade" : "Sign in to access your shade profile"}
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {authMode === "signup" && (
              <input placeholder="Full Name" value={authForm.name}
                onChange={e => setAuthForm({...authForm, name: e.target.value})}
                style={{ padding: "14px 16px", borderRadius: 12, border: "1.5px solid var(--brand-gray-light)", background: "var(--brand-white)", fontFamily: "'DM Sans', sans-serif", fontSize: 15, outline: "none", color: "var(--brand-black)" }} />
            )}
            <input placeholder="Email" type="email" value={authForm.email}
              onChange={e => setAuthForm({...authForm, email: e.target.value})}
              style={{ padding: "14px 16px", borderRadius: 12, border: "1.5px solid var(--brand-gray-light)", background: "var(--brand-white)", fontFamily: "'DM Sans', sans-serif", fontSize: 15, outline: "none", color: "var(--brand-black)" }} />
            <input placeholder="Password" type="password" value={authForm.password}
              onChange={e => setAuthForm({...authForm, password: e.target.value})}
              style={{ padding: "14px 16px", borderRadius: 12, border: "1.5px solid var(--brand-gray-light)", background: "var(--brand-white)", fontFamily: "'DM Sans', sans-serif", fontSize: 15, outline: "none", color: "var(--brand-black)" }} />
            <button className="cta-btn" onClick={handleAuth} style={{ marginTop: 8 }}>
              {authMode === "signup" ? "Create Account" : "Sign In"}
            </button>
            <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
              <button className="cta-btn outline" style={{ flex: 1, fontSize: 13, padding: 12 }} onClick={handleAuth}>
                <Globe size={16} /> Google
              </button>
              <button className="cta-btn outline" style={{ flex: 1, fontSize: 13, padding: 12 }} onClick={handleAuth}>
                <Smartphone size={16} /> Apple
              </button>
            </div>
            <p style={{ fontSize: 13, color: "var(--brand-gray)", textAlign: "center", marginTop: 8 }}>
              {authMode === "signup" ? "Already have an account?" : "Don't have an account?"}
              <button style={{ background: "none", border: "none", color: "var(--brand-gold)", cursor: "pointer", fontWeight: 600, fontFamily: "'DM Sans', sans-serif", fontSize: 13, marginLeft: 4 }}
                onClick={() => setAuthMode(authMode === "signup" ? "login" : "signup")}>
                {authMode === "signup" ? "Sign In" : "Sign Up"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  ) : null;

  // ── Notification Sheet ──
  const NotificationSheet = () => showNotifications ? (
    <div className="modal-overlay" onClick={() => setShowNotifications(false)}>
      <div className="modal-sheet" onClick={e => e.stopPropagation()}>
        <div className="modal-handle" />
        <div className="modal-body">
          <h3 style={{ fontSize: 22, marginBottom: 16 }}>Notifications</h3>
          {notifications.map(n => (
            <div key={n.id} style={{ padding: "14px 0", borderBottom: "1px solid var(--brand-gray-light)", display: "flex", gap: 12, alignItems: "start" }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: n.read ? "transparent" : "var(--brand-berry)", marginTop: 6, flexShrink: 0 }} />
              <div>
                <p style={{ fontSize: 14, lineHeight: 1.4 }}>{n.text}</p>
                <p style={{ fontSize: 12, color: "var(--brand-gray)", marginTop: 4 }}>{n.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ) : null;

  // ── Product Detail Sheet ──
  const ProductDetail = () => showProductDetail ? (
    <div className="modal-overlay" onClick={() => setShowProductDetail(null)}>
      <div className="modal-sheet" onClick={e => e.stopPropagation()}>
        <div className="modal-handle" />
        <div className="modal-body">
          <div style={{ display: "flex", gap: 16, marginBottom: 20 }}>
            <div style={{ width: 100, height: 100, borderRadius: 16, background: showProductDetail.hex }} />
            <div>
              <p style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 1.5, color: "var(--brand-gray)" }}>{showProductDetail.brandName}</p>
              <h3 style={{ fontSize: 22, marginBottom: 4 }}>{showProductDetail.shadeName}</h3>
              <p style={{ fontSize: 13, color: "var(--brand-gray)", textTransform: "capitalize" }}>{showProductDetail.category}</p>
              <p style={{ fontSize: 18, fontWeight: 600, color: "var(--brand-gold)", marginTop: 4 }}>${showProductDetail.price}</p>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
            <Star size={14} fill="var(--brand-gold)" color="var(--brand-gold)" />
            <span style={{ fontSize: 14, fontWeight: 600 }}>{showProductDetail.rating}</span>
            <span style={{ fontSize: 13, color: "var(--brand-gray)" }}>({showProductDetail.reviews} reviews)</span>
            <span className="badge badge-gold" style={{ marginLeft: "auto" }}>{showProductDetail.undertone} undertone</span>
          </div>
          <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
            <button className="cta-btn" style={{ flex: 1 }} onClick={() => {
              setSelectedShade(showProductDetail);
              setShowProductDetail(null);
              setCurrentTab("tryon");
            }}>
              <Eye size={16} /> Try On
            </button>
            <button className="cta-btn outline" style={{ width: 52, padding: 0 }} onClick={() => toggleFavorite(showProductDetail.id)}>
              <Heart size={18} fill={favorites.includes(showProductDetail.id) ? "var(--brand-berry)" : "none"} color={favorites.includes(showProductDetail.id) ? "var(--brand-berry)" : "var(--brand-brown)"} />
            </button>
          </div>
          <h4 style={{ fontSize: 16, marginBottom: 8 }}>Similar Shades</h4>
          <div className="comparison-row" style={{ padding: 0 }}>
            {ALL_PRODUCTS.filter(p => p.category === showProductDetail.category && p.undertone === showProductDetail.undertone && p.id !== showProductDetail.id).slice(0, 5).map(p => (
              <div key={p.id} className="comparison-item" onClick={() => setShowProductDetail(p)}>
                <div className="comparison-swatch" style={{ background: p.hex }} />
                <p style={{ fontSize: 11, color: "var(--brand-gray)" }}>{p.brandName}</p>
                <p style={{ fontSize: 13, fontWeight: 600 }}>{p.shadeName}</p>
                <p style={{ fontSize: 12, color: "var(--brand-gold)" }}>${p.price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  ) : null;

  // ── Home Tab ──
  const HomeTab = () => (
    <div>
      <div className="hero">
        <div className="hero-eyebrow">AI-Powered Beauty</div>
        <h1>Find Your<br />Perfect Shade</h1>
        <p>Try makeup from 30 top brands virtually. No store visits needed.</p>
        <button className="hero-cta" onClick={() => user ? handlePhotoCapture() : setShowAuthModal(true)}>
          <Camera size={18} /> Take a Photo
        </button>
      </div>

      {!isOnline && (
        <div className="offline-banner">
          <Globe size={14} /> You're offline. Some features are limited.
        </div>
      )}

      {/* Quick Actions */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, padding: "20px 20px 0" }}>
        {[
          { icon: <Camera size={20} />, label: "Capture", action: () => user ? handlePhotoCapture() : setShowAuthModal(true) },
          { icon: <Sparkles size={20} />, label: "AI Match", action: () => { if (user) { setQuizStep(0); setQuizAnswers([]); setQuizResult(null); } else setShowAuthModal(true); } },
          { icon: <Palette size={20} />, label: "Browse", action: () => setCurrentTab("browse") },
        ].map((a, i) => (
          <button key={i} onClick={a.action}
            style={{ background: "var(--brand-white)", border: "1.5px solid var(--brand-gray-light)", borderRadius: 14, padding: "16px 8px", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, cursor: "pointer", color: "var(--brand-brown)", fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 500, transition: "var(--transition)" }}>
            {a.icon}
            {a.label}
          </button>
        ))}
      </div>

      {/* AI Quiz Prompt */}
      {quizStep === -1 && !quizResult && (
        <div style={{ padding: "20px 20px 0" }}>
          <div className="quiz-card">
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <Zap size={18} color="#D4A843" />
              <span style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: 2, color: "rgba(255,255,255,0.6)" }}>AI Skin Analysis</span>
            </div>
            <h3>Discover Your Shade Profile</h3>
            <p>Take a 30-second quiz and our AI will match you with your perfect shades across all 30 brands.</p>
            <button className="cta-btn gold" style={{ marginTop: 4 }}
              onClick={() => { if (user) { setQuizStep(0); } else { setShowAuthModal(true); } }}>
              Start Quiz <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Active Quiz */}
      {quizStep >= 0 && !quizResult && (
        <div style={{ padding: "20px 20px 0" }}>
          <div className="quiz-card">
            <div className="quiz-progress">
              {SKIN_QUIZ.map((_, i) => (
                <div key={i} className={`quiz-dot ${i <= quizStep ? "filled" : ""}`} />
              ))}
            </div>
            <p style={{ fontSize: 12, opacity: 0.6, marginBottom: 12 }}>Question {quizStep + 1} of {SKIN_QUIZ.length}</p>
            <h3 style={{ fontSize: 20, marginBottom: 16 }}>{SKIN_QUIZ[quizStep].q}</h3>
            {SKIN_QUIZ[quizStep].options.map((opt, i) => (
              <button key={i} className="quiz-option" onClick={() => handleQuizAnswer(opt.type)}>
                {opt.text}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quiz Result */}
      {quizResult && (
        <div className="ai-result-card">
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
            <Sparkles size={18} color="var(--brand-gold)" />
            <span style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: 2, color: "var(--brand-gold)", fontWeight: 600 }}>Your Shade Profile</span>
          </div>
          <div style={{ display: "flex", gap: 16, marginBottom: 16 }}>
            <div>
              <p style={{ fontSize: 12, color: "var(--brand-gray)", marginBottom: 4 }}>Skin Type</p>
              <p style={{ fontSize: 18, fontWeight: 600, textTransform: "capitalize" }}>{quizResult.skinType}</p>
            </div>
            <div>
              <p style={{ fontSize: 12, color: "var(--brand-gray)", marginBottom: 4 }}>Undertone</p>
              <p style={{ fontSize: 18, fontWeight: 600, textTransform: "capitalize" }}>{quizResult.undertone}</p>
            </div>
          </div>
          <button className="cta-btn" onClick={() => setCurrentTab("browse")}>
            See Recommended Shades <ArrowRight size={16} />
          </button>
        </div>
      )}

      {/* Recommended */}
      <div className="section-pad">
        <h2 className="section-title">Recommended For You</h2>
      </div>
      <div style={{ display: "flex", gap: 12, overflowX: "auto", padding: "0 20px 8px", scrollbarWidth: "none" }}>
        {recommendedProducts.map(p => (
          <div key={p.id} style={{ flexShrink: 0, width: 150, cursor: "pointer" }} onClick={() => setShowProductDetail(p)}>
            <div style={{ width: 150, height: 150, borderRadius: 14, background: p.hex, marginBottom: 8 }} />
            <p style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: 1, color: "var(--brand-gray)" }}>{p.brandName}</p>
            <p style={{ fontSize: 14, fontWeight: 600 }}>{p.shadeName}</p>
            <p style={{ fontSize: 13, color: "var(--brand-gold)" }}>${p.price}</p>
          </div>
        ))}
      </div>

      {/* Brands */}
      <div className="section-pad">
        <h2 className="section-title">Top Brands</h2>
        <p className="section-subtitle">30 globally trusted cosmetic brands</p>
      </div>
      <div className="brand-scroll">
        {BRANDS.slice(0, 15).map(b => (
          <button key={b.id} className="brand-chip" onClick={() => { setSelectedBrand(b.id); setCurrentTab("browse"); }}>
            {b.name}
          </button>
        ))}
      </div>

      {/* Subscription CTA */}
      {!subscription && (
        <div style={{ padding: "24px 20px" }}>
          <div style={{ background: "linear-gradient(135deg, var(--brand-brown) 0%, #2C1810 100%)", borderRadius: "var(--radius)", padding: 24, color: "#fff" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <Crown size={18} color="#D4A843" />
              <span style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: 2, color: "rgba(255,255,255,0.6)" }}>Premium</span>
            </div>
            <h3 style={{ fontSize: 22, color: "#fff", marginBottom: 8 }}>Unlock Unlimited Try-Ons</h3>
            <p style={{ fontSize: 14, opacity: 0.7, marginBottom: 16 }}>Access all 30 brands, save looks, share with friends, and get AI-powered recommendations.</p>
            <button className="cta-btn gold" onClick={() => setCurrentTab("subscribe")}>
              View Plans <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );

  // ── Browse Tab ──
  const BrowseTab = () => (
    <div>
      <div className="section-pad" style={{ paddingTop: 16 }}>
        <h2 className="section-title" style={{ paddingTop: 0 }}>Browse Products</h2>
      </div>
      <div className="search-bar">
        <Search size={18} color="var(--brand-gray)" />
        <input placeholder="Search brands or shades..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
        {searchQuery && <button style={{ background: "none", border: "none", cursor: "pointer" }} onClick={() => setSearchQuery("")}><X size={16} color="var(--brand-gray)" /></button>}
      </div>

      <div className="brand-scroll" style={{ marginBottom: 8 }}>
        <button className={`brand-chip ${!selectedBrand ? "active" : ""}`} onClick={() => setSelectedBrand(null)}>All Brands</button>
        {BRANDS.map(b => (
          <button key={b.id} className={`brand-chip ${selectedBrand === b.id ? "active" : ""}`}
            onClick={() => setSelectedBrand(selectedBrand === b.id ? null : b.id)}>
            {b.name}
          </button>
        ))}
      </div>

      <div className="tab-bar">
        {PRODUCT_TYPES.map(t => (
          <button key={t} className={`tab-item ${selectedCategory === t ? "active" : ""}`}
            onClick={() => setSelectedCategory(t)}>
            {t}
          </button>
        ))}
      </div>

      <div className="product-grid">
        {filteredProducts.map(p => (
          <div key={p.id} className="product-card" onClick={() => setShowProductDetail(p)}>
            <button className="product-fav" onClick={e => { e.stopPropagation(); toggleFavorite(p.id); }}>
              <Heart size={14} fill={favorites.includes(p.id) ? "var(--brand-berry)" : "none"} color={favorites.includes(p.id) ? "var(--brand-berry)" : "var(--brand-gray)"} />
            </button>
            <div className="product-swatch" style={{ background: p.hex }} />
            <p className="product-brand">{p.brandName}</p>
            <p className="product-name">{p.shadeName}</p>
            <p className="product-price">${p.price}</p>
            <div className="product-rating">
              <Star size={10} fill="var(--brand-gold)" color="var(--brand-gold)" />
              {p.rating} ({p.reviews})
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="empty-state">
          <Search size={40} />
          <p>No products found. Try adjusting your filters.</p>
        </div>
      )}
    </div>
  );

  // ── Try-On Tab ──
  const TryOnTab = () => (
    <div>
      <div className="tryon-area">
        {capturedPhoto ? (
          <>
            <img src={capturedPhoto} className="img-captured" alt="Your photo" />
            {selectedShade && tryOnActive && (
              <div style={{ position: "absolute", inset: 0, background: selectedShade.hex, opacity: 0.18, mixBlendMode: "multiply", borderRadius: "inherit" }} />
            )}
            {showComparison && (
              <div className="comparison-slider">
                <div className="comparison-half" style={{ background: "transparent" }}>Before</div>
                <div className="comparison-divider" />
                <div className="comparison-half" style={{ background: selectedShade ? `${selectedShade.hex}22` : "transparent" }}>After</div>
              </div>
            )}
          </>
        ) : (
          <div className="tryon-placeholder">
            <Camera size={48} />
            <p style={{ fontSize: 16, fontWeight: 500, marginBottom: 8 }}>Take a Photo to Start</p>
            <p style={{ fontSize: 13 }}>For best results, take your photo outdoors in natural light</p>
          </div>
        )}
        <div className="tryon-controls">
          <button className="tryon-btn primary" onClick={handlePhotoCapture}>
            <Camera size={16} /> {capturedPhoto ? "Retake" : "Capture"}
          </button>
          {capturedPhoto && (
            <>
              <button className="tryon-btn" onClick={() => setShowComparison(!showComparison)}>
                <Layers size={16} /> Compare
              </button>
              <button className="tryon-btn" onClick={() => { if (selectedShade) { showToast("Look shared!"); } }}>
                <Share2 size={16} /> Share
              </button>
            </>
          )}
        </div>
      </div>

      {capturedPhoto && (
        <div className="shade-picker">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
            <h3 style={{ fontSize: 18 }}>Choose a Shade</h3>
            {selectedShade && <span className="badge badge-gold">{selectedShade.undertone} undertone</span>}
          </div>

          <div className="tab-bar" style={{ margin: "12px 0" }}>
            {PRODUCT_TYPES.map(t => (
              <button key={t} className={`tab-item ${selectedCategory === t ? "active" : ""}`}
                onClick={() => setSelectedCategory(t)} style={{ fontSize: 11 }}>
                {t}
              </button>
            ))}
          </div>

          <div className="shade-row">
            {(SHADE_FAMILIES[selectedCategory] || []).map((shade, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div className={`shade-dot ${selectedShade?.name === shade.name && selectedShade?.hex === shade.hex ? "active" : ""}`}
                  style={{ background: shade.hex }}
                  onClick={() => {
                    setSelectedShade(shade);
                    if (!subscription && trialUsed >= 3) {
                      showToast("Subscribe for unlimited try-ons!");
                    } else if (!subscription) {
                      startTrial();
                    } else {
                      setTryOnActive(true);
                    }
                  }} />
                <div className="shade-label">{shade.name}</div>
              </div>
            ))}
          </div>

          {selectedShade && tryOnActive && (
            <div className="ai-result-card" style={{ margin: "16px 0 0" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div className="ai-match-score">96%</div>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 600 }}>AI Match Score</p>
                  <p style={{ fontSize: 12, color: "var(--brand-gray)" }}>Excellent match for your skin tone</p>
                </div>
              </div>
              <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
                <button className="cta-btn" style={{ flex: 1, fontSize: 13, padding: 12 }}
                  onClick={() => toggleFavorite(`shade-${selectedShade.name}`)}>
                  <Heart size={14} /> Save Look
                </button>
                <button className="cta-btn outline" style={{ flex: 1, fontSize: 13, padding: 12 }}>
                  <ShoppingBag size={14} /> Buy Now
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      <input ref={fileInputRef} type="file" accept="image/*" capture="environment" onChange={handleFileUpload} style={{ display: "none" }} />
    </div>
  );

  // ── Favorites Tab ──
  const FavoritesTab = () => {
    const favProducts = ALL_PRODUCTS.filter(p => favorites.includes(p.id));
    return (
      <div>
        <div className="section-pad" style={{ paddingTop: 16 }}>
          <h2 className="section-title" style={{ paddingTop: 0 }}>Saved Looks</h2>
          <p style={{ fontSize: 14, color: "var(--brand-gray)", marginBottom: 16 }}>{favProducts.length} favorites</p>
        </div>
        {favProducts.length > 0 ? (
          <div className="product-grid">
            {favProducts.map(p => (
              <div key={p.id} className="product-card" onClick={() => setShowProductDetail(p)}>
                <button className="product-fav" onClick={e => { e.stopPropagation(); toggleFavorite(p.id); }}>
                  <Heart size={14} fill="var(--brand-berry)" color="var(--brand-berry)" />
                </button>
                <div className="product-swatch" style={{ background: p.hex }} />
                <p className="product-brand">{p.brandName}</p>
                <p className="product-name">{p.shadeName}</p>
                <p className="product-price">${p.price}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <Heart size={40} />
            <p style={{ marginTop: 8, fontSize: 15, fontWeight: 500 }}>No favorites yet</p>
            <p style={{ fontSize: 13, marginTop: 4 }}>Heart products you love to save them here</p>
            <button className="cta-btn" style={{ marginTop: 20, width: "auto", display: "inline-flex" }}
              onClick={() => setCurrentTab("browse")}>
              Browse Products
            </button>
          </div>
        )}
      </div>
    );
  };

  // ── Subscribe Tab ──
  const SubscribeTab = () => (
    <div style={{ padding: "16px 20px" }}>
      <h2 className="section-title" style={{ paddingTop: 0 }}>Choose Your Plan</h2>
      <p style={{ fontSize: 14, color: "var(--brand-gray)", marginBottom: 20 }}>Unlock unlimited try-ons and premium features</p>

      {!subscription && trialUsed < 3 && (
        <div style={{ background: "rgba(76,175,80,0.08)", border: "1.5px solid rgba(76,175,80,0.2)", borderRadius: "var(--radius-sm)", padding: 16, marginBottom: 16, display: "flex", alignItems: "center", gap: 12 }}>
          <Gift size={20} color="#4CAF50" />
          <div>
            <p style={{ fontSize: 14, fontWeight: 600 }}>Free Trial Active</p>
            <p style={{ fontSize: 12, color: "var(--brand-gray)" }}>{3 - trialUsed} of 3 free try-ons remaining</p>
          </div>
        </div>
      )}

      {SUBSCRIPTION_PLANS.map(plan => (
        <div key={plan.id} className={`sub-card ${plan.popular ? "popular" : ""} ${selectedPlan === plan.id ? "selected" : ""}`}
          onClick={() => setSelectedPlan(plan.id)}>
          {plan.popular && <div className="sub-badge">Most Popular</div>}
          {plan.savings && <span className="badge badge-green" style={{ position: "absolute", top: plan.popular ? -10 : 12, left: 16 }}>Save {plan.savings}</span>}
          <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginTop: plan.savings ? 16 : 0 }}>
            <span className="sub-price">${plan.price}</span>
            <span className="sub-period">/ {plan.period}</span>
          </div>
          <div className="sub-features">
            {plan.features.map((f, i) => (
              <div key={i} className="sub-feature">
                <Check size={14} color="var(--brand-gold)" />
                {f}
              </div>
            ))}
          </div>
        </div>
      ))}

      <button className="cta-btn" onClick={() => {
        if (!user) { setShowAuthModal(true); return; }
        setSubscription(selectedPlan);
        showToast("Subscription activated! Enjoy unlimited try-ons.");
      }}>
        <CreditCard size={18} /> Subscribe Now
      </button>
      <p style={{ fontSize: 11, color: "var(--brand-gray)", textAlign: "center", marginTop: 12 }}>
        Cancel anytime. Secure payment via Apple Pay, Google Pay, or card.
      </p>
    </div>
  );

  // ── Profile Tab ──
  const ProfileTab = () => (
    <div>
      <div className="profile-header">
        <div className="profile-avatar">{user?.name?.[0] || "G"}</div>
        <h2 className="profile-name">{user?.name || "Guest"}</h2>
        <p style={{ fontSize: 13, color: "var(--brand-gray)", marginTop: 4 }}>{user?.email || "Sign in to save your preferences"}</p>
        {quizResult && (
          <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 12 }}>
            <span className="badge badge-gold">{quizResult.skinType} skin</span>
            <span className="badge badge-gold">{quizResult.undertone} undertone</span>
          </div>
        )}
        <div className="profile-stat">
          <div className="profile-stat-item">
            <div className="profile-stat-num">{favorites.length}</div>
            <div className="profile-stat-label">Favorites</div>
          </div>
          <div className="profile-stat-item">
            <div className="profile-stat-num">{history.length}</div>
            <div className="profile-stat-label">Try-Ons</div>
          </div>
          <div className="profile-stat-item">
            <div className="profile-stat-num">{subscription ? "Pro" : "Free"}</div>
            <div className="profile-stat-label">Plan</div>
          </div>
        </div>
      </div>

      <div className="menu-list">
        {[
          { icon: <User size={18} />, label: "Edit Profile", action: () => showToast("Coming soon") },
          { icon: <Palette size={18} />, label: "Retake Skin Quiz", action: () => { setQuizStep(0); setQuizAnswers([]); setQuizResult(null); setCurrentTab("home"); } },
          { icon: <Crown size={18} />, label: subscription ? "Manage Subscription" : "Upgrade to Pro", action: () => setCurrentTab("subscribe") },
          { icon: <Shield size={18} />, label: "Privacy & Data" },
          { icon: <Bell size={18} />, label: "Notification Settings" },
          { icon: darkMode ? <Sun size={18} /> : <Moon size={18} />, label: darkMode ? "Light Mode" : "Dark Mode", action: () => setDarkMode(!darkMode) },
          { icon: <Info size={18} />, label: "Help & Tutorials" },
        ].map((item, i) => (
          <div key={i} className="menu-item" onClick={item.action}>
            <div className="menu-icon">{item.icon}</div>
            {item.label}
            <ChevronRight size={16} className="menu-arrow" />
          </div>
        ))}
        {user && (
          <div className="menu-item" onClick={() => { setUser(null); showToast("Signed out"); }} style={{ color: "var(--brand-berry)" }}>
            <div className="menu-icon" style={{ background: "rgba(139,26,74,0.08)", color: "var(--brand-berry)" }}><LogOut size={18} /></div>
            Sign Out
          </div>
        )}
        {!user && (
          <div className="menu-item" onClick={() => setShowAuthModal(true)} style={{ color: "var(--brand-gold)" }}>
            <div className="menu-icon"><User size={18} /></div>
            Sign In / Create Account
            <ChevronRight size={16} className="menu-arrow" />
          </div>
        )}
      </div>

      <div style={{ padding: "20px", textAlign: "center" }}>
        <p style={{ fontSize: 11, color: "var(--brand-gray)" }}>Shades of Skin v1.0.0</p>
        <p style={{ fontSize: 11, color: "var(--brand-gray)", marginTop: 4 }}>30 Brands · 5 Product Types · AI-Powered</p>
      </div>
    </div>
  );

  const tabs = {
    home: HomeTab,
    browse: BrowseTab,
    tryon: TryOnTab,
    favorites: FavoritesTab,
    subscribe: SubscribeTab,
    profile: ProfileTab,
  };

  const TabComponent = tabs[currentTab] || HomeTab;

  return (
    <>
      <style>{css}</style>
      <div className={`sos-app ${darkMode ? "dark" : ""}`}>
        {/* Header */}
        <div className="header">
          <div className="header-logo">SHADES OF SKIN</div>
          <div className="header-actions">
            <button className="icon-btn" onClick={() => setShowNotifications(true)} style={{ position: "relative" }}>
              <Bell size={18} />
              {notifications.some(n => !n.read) && <div className="notification-dot" />}
            </button>
            <button className="icon-btn" onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="content">
          <TabComponent />
        </div>

        {/* Bottom Nav */}
        <div className="bottom-nav">
          {[
            { id: "home", icon: <Home size={20} />, label: "Home" },
            { id: "browse", icon: <Search size={20} />, label: "Browse" },
            { id: "tryon", icon: <Camera size={20} />, label: "Try On" },
            { id: "favorites", icon: <Heart size={20} />, label: "Saved" },
            { id: "profile", icon: <User size={20} />, label: "Profile" },
          ].map(tab => (
            <button key={tab.id} className={`nav-item ${currentTab === tab.id ? "active" : ""}`}
              onClick={() => setCurrentTab(tab.id)}>
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Modals */}
        <AuthModal />
        <NotificationSheet />
        <ProductDetail />

        {/* Toast */}
        {toast && <div className="toast"><Check size={16} /> {toast}</div>}

        {/* Hidden file input */}
        <input ref={fileInputRef} type="file" accept="image/*" capture="environment" onChange={handleFileUpload} style={{ display: "none" }} />
      </div>
    </>
  );
}
