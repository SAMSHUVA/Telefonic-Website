import { ReactLenis } from '@studio-freight/react-lenis'
import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import HeroCanvas from './components/HeroCanvas';
import PricingSection from './components/PricingSection';
import Footer from './components/Footer';
import GenericPage from './components/GenericPage';
import TravelPage from './components/TravelPage';
import ServicePage from './components/ServicePage';
import HomePage from './components/HomePage';
import GalleryPage from './components/GalleryPage'; // Added GalleryPage import
import ContactPage from './components/ContactPage'; // Added ContactPage import
import JournalPage from './components/JournalPage'; // Added JournalPage import
import Preloader from './components/Preloader';
import AdminDashboard from './components/admin/AdminDashboard';
import { useState } from 'react';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AppContent() {
  const [loading, setLoading] = useState(true);
  const lenisOptions = {
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  };

  const { pathname } = useLocation();
  const isAdminPath = pathname === '/admin';

  return (
    <ReactLenis root options={lenisOptions}>
      <div className="bg-[#0c0c0c] min-h-screen text-white selection:bg-white selection:text-black font-sans relative">
        <div className="fixed inset-0 pointer-events-none noise-overlay z-[99]" />
        {loading && <Preloader onComplete={() => setLoading(false)} />}
        {!isAdminPath && <Header isLoaded={!loading} />}
        <ScrollToTop />

        <Routes>
          <Route path="/" element={<HomePage isLoaded={!loading} />} />
          <Route path="/journal" element={<JournalPage />} /> {/* Added JournalPage route */}
          <Route path="/about" element={<GenericPage title="About Us" subtitle="Our Story" image="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2670&auto=format&fit=crop" />} />
          <Route path="/dates" element={<GenericPage title="Availability" subtitle="Plan Your Stay" image="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2673&auto=format&fit=crop" />} />
          <Route path="/travel" element={<TravelPage />} />
          <Route path="/gallery" element={<GalleryPage />} /> {/* Changed to GalleryPage */}
          <Route path="/phones" element={
            <ServicePage
              title="iPhone Collection"
              subtitle="The Pinnacle of Innovation"
              category="phones"
              heroImage="https://images.unsplash.com/photo-1632661674596-df8be070a5c5?q=80&w=2574&auto=format&fit=crop"
              description="Experience the future with the latest iPhone series. From the titanium-framed Pro models to the versatile standard editions, we offer the most advanced mobile technology available."
              features={[
                { title: "A18 Pro Chip", desc: "Unmatched performance" },
                { title: "Pro Camera System", desc: "48MP Fusion camera" },
                { title: "Apple Intelligence", desc: "Deeply integrated AI" },
                { title: "Titanium Build", desc: "Lightweight & durable" }
              ]}
            />
          } />
          <Route path="/luxury-tech" element={
            <ServicePage
              title="Premium Smartphones"
              subtitle="Beyond Boundaries"
              category="phones"
              heroImage="https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?q=80&w=2671&auto=format&fit=crop"
              description="Discover our curated selection of ultra-premium Android flagships. From the latest Samsung Galaxy S series to exclusive foldable tech, we bring you the best of global engineering."
              features={[
                { title: "Dynamic AMOLED", desc: "Industry-leading displays" },
                { title: "200MP Zoom", desc: "Capture every detail" },
                { title: "Foldable Tech", desc: "The future is flexible" },
                { title: "Ultra Fast Charge", desc: "Full power in minutes" }
              ]}
            />
          } />
          <Route path="/watches" element={
            <ServicePage
              title="Luxury Horology"
              subtitle="Timeless Precision"
              category="watches"
              heroImage="https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?q=80&w=2621&auto=format&fit=crop"
              description="Explore our collection of fine Swiss and luxury timepieces. From heritage automatics to modern high-tech watches, find the perfect companion for your wrist."
              features={[
                { title: "Swiss Made", desc: "Unmatched craftsmanship" },
                { title: "Rare Editions", desc: "For the collector" },
                { title: "Authenticity", desc: "Guaranteed & verified" },
                { title: "Aftercare", desc: "Expert servicing & care" }
              ]}
            />
          } />
          <Route path="/bags" element={
            <ServicePage
              title="Premium Accessories"
              subtitle="The Finishing Touch"
              category="bags"
              heroImage="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=2574&auto=format&fit=crop"
              description="Elevate your style with our exclusive range of luxury leather goods and tech accessories. Hand-selected bags and protective cases crafted from the world's finest materials."
              features={[
                { title: "Italian Leather", desc: "Premium handcrafted" },
                { title: "Bespoke Fit", desc: "Engineered for your tech" },
                { title: "Limited Drops", desc: "Unique designs" },
                { title: "Durability", desc: "Built to last a lifetime" }
              ]}
            />
          } />
          <Route path="/contact" element={<ContactPage />} /> {/* Changed to ContactPage */}
          <Route path="/support" element={<GenericPage title="Support" subtitle="We're Here to Help" image="/phones/MGF44_AV2.jpg" />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>

        {!isAdminPath && <Footer />}
      </div>
    </ReactLenis>
  )
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App
