/*
 * Design: Canopy & Craft — Premium Artisan Service
 * Home page: Composes all sections in a cinematic storytelling flow.
 * Sections alternate between light and dark backgrounds for contrast.
 */

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Stats from "@/components/Stats";
import Services from "@/components/Services";
import Process from "@/components/Process";
import WhyChooseUs from "@/components/WhyChooseUs";
import EmergencyCTA from "@/components/EmergencyCTA";
import Reviews from "@/components/Reviews";
import ServiceAreas from "@/components/ServiceAreas";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Stats />
        <Services />
        <Process />
        <WhyChooseUs />
        <EmergencyCTA />
        <Reviews />
        <ServiceAreas />
        <Contact />
      </main>
      <Footer />
      <FloatingActions />
    </div>
  );
}
