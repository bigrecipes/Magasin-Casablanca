import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CategoriesSection } from './components/CategoriesSection';
import { ShopCatalog } from './components/ShopCatalog';
import { ReviewsSection } from './components/ReviewsSection';
import { StoreLocation } from './components/StoreLocation';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { AdminDashboard } from './components/AdminDashboard';

const MainContent: React.FC = () => {
  const { activeTab, setSelectedCategory } = useStore();

  return (
    <div className="min-h-screen flex flex-col justify-between selection:bg-neutral-900 selection:text-white">
      <Header />

      <main className="flex-1">
        {activeTab === 'home' && (
          <>
            <Hero />
            <CategoriesSection />
            <ShopCatalog />
            <ReviewsSection />
            <StoreLocation />
          </>
        )}

        {activeTab === 'shop' && <ShopCatalog />}

        {activeTab === 'new' && (
          <div className="pt-2">
            <ShopCatalog />
          </div>
        )}

        {activeTab === 'collections' && (
          <div className="pt-2">
            <ShopCatalog />
          </div>
        )}

        {activeTab === 'about' && (
          <>
            <AboutSection />
            <StoreLocation />
          </>
        )}

        {activeTab === 'contact' && (
          <>
            <ContactSection />
            <StoreLocation />
          </>
        )}

        {activeTab === 'admin' && <AdminDashboard />}
      </main>

      <Footer />

      {/* Global Interactive Overlays */}
      <ProductModal />
      <CartDrawer />
      <CheckoutModal />
      <FloatingWhatsApp />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <MainContent />
    </StoreProvider>
  );
}
