import { ReactLenis } from '@studio-freight/react-lenis'
import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import HeroCanvas from './components/HeroCanvas';
import PricingSection from './components/PricingSection';
import Footer from './components/Footer';
import ServicePage from './components/ServicePage';
import HomePage from './components/HomePage';
import GalleryPage from './components/GalleryPage'; // Added GalleryPage import
import ContactPage from './components/ContactPage'; // Added ContactPage import
import Preloader from './components/Preloader';
import AdminDashboard from './components/admin/AdminDashboard';
import AuthPage from './components/AuthPage';
import LegalPage from './components/LegalPage';
import SupportPage from './components/SupportPage';
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
  const isAuthPath = pathname === '/login';
  const hideGlobalUI = isAdminPath || isAuthPath;

  // Ensure any persistent scroll lock is removed when loading finished
  useEffect(() => {
    if (!loading) {
      document.body.classList.remove('antigravity-scroll-lock');
      document.body.style.overflow = 'visible';
      document.body.style.overflowX = 'clip';
      document.body.style.width = '100%';
      document.body.style.margin = '0';
      document.body.style.padding = '0';
    }
  }, [loading]);

  return (
    <ReactLenis root options={lenisOptions}>
      <div className="bg-[#0c0c0c] min-h-screen text-white selection:bg-white selection:text-black font-sans relative">
        <div className="fixed inset-0 pointer-events-none noise-overlay z-[99]" />
        {loading && <Preloader onComplete={() => setLoading(false)} />}
        {!hideGlobalUI && <Header isLoaded={!loading} />}
        <ScrollToTop />

        <Routes>
          <Route path="/" element={<HomePage isLoaded={!loading} />} />
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
          <Route path="/support" element={<SupportPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/privacy" element={
            <LegalPage
              title="Privacy Policy"
              lastUpdated="February 15, 2026"
              sections={[
                {
                  title: "Information We Collect",
                  content: [
                    "We collect information that you provide directly to us, such as when you create an account, make a purchase, or contact our support team. This may include your name, email address, and payment information.",
                    "We also automatically collect certain information when you visit our website, including your IP address, browser type, and how you interact with our content."
                  ]
                },
                {
                  title: "How We Use Your Information",
                  content: [
                    "We use the information we collect to provide and improve our services, process your transactions, and communicate with you about your account.",
                    "We may also use your information to personalize your experience and send you marketing communications that we believe may be of interest to you."
                  ]
                },
                {
                  title: "Data Security",
                  content: [
                    "We take the security of your data seriously and implement industry-standard measures to protect it from unauthorized access, disclosure, or alteration.",
                    "However, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security."
                  ]
                }
              ]}
            />
          } />
          <Route path="/terms" element={
            <LegalPage
              title="Terms of Service"
              lastUpdated="February 15, 2026"
              sections={[
                {
                  title: "Acceptance of Terms",
                  content: [
                    "By accessing or using our website, you agree to be bound by these Terms of Service and all applicable laws and regulations.",
                    "If you do not agree with any of these terms, you are prohibited from using or accessing this site."
                  ]
                },
                {
                  title: "User Responsibilities",
                  content: [
                    "You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.",
                    "You agree to use our services only for lawful purposes and in accordance with these terms."
                  ]
                },
                {
                  title: "Intellectual Property",
                  content: [
                    "All content on this website, including text, graphics, logos, and images, is the property of Telefonic Essentials and is protected by intellectual property laws.",
                    "You may not reproduce, distribute, or modify any content from this site without our prior written consent."
                  ]
                }
              ]}
            />
          } />
        </Routes>

        {!hideGlobalUI && <Footer />}
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
