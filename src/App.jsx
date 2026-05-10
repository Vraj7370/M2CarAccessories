import { useEffect, useState } from 'react';
import Cursor from './components/Cursor';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import { BrandsStrip } from './components/Brands';
import About from './components/About';
import Categories from './components/Categories';
import Products from './components/Products';
import Brands from './components/Brands';
import Testimonials from './components/Testimonials';
import Appointment from './components/Appointment';
import Instagram from './components/Instagram';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FloatingActions from './components/FloatingActions';
import MobileBottomNav from './components/MobileBottomNav';
import StatsSection from './components/StatsSection';
import Toast from './components/Toast';

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 2800);
    return () => clearTimeout(t);
  }, []);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 4000);
  };

  const divider = <div className="h-px bg-gradient-to-r from-transparent via-[#C9A84C]/25 to-transparent" />;

  return (
    <>
      <Cursor />
      <Loader />
      <Toast toast={toast} />
      {loaded && (
        <>
          <Navbar />
          <main>
            <Hero />
            <BrandsStrip />
            <StatsSection />
            {divider}
            <About />
            {divider}
            <Categories />
            {divider}
            <Products showToast={showToast} />
            {divider}
            <Brands />
            {divider}
            <Testimonials />
            {divider}
            <Appointment showToast={showToast} />
            {divider}
            <Instagram />
            {divider}
            <Contact showToast={showToast} />
          </main>
          <Footer />
          <FloatingActions />
          <MobileBottomNav />
        </>
      )}
    </>
  );
}
