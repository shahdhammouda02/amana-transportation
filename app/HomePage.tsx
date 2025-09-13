'use client';

import { RouteProvider } from './context/RouteContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BusRouteSelector from './components/BusRouteSelector';
import BusSchedule from './components/BusSchedule';
import dynamic from 'next/dynamic';

// الخريطة Client-only
const MapComponent = dynamic(() => import('./components/MapComponent'), { ssr: false });

export default function HomePage() {
  return (
    <RouteProvider>
      <Navbar />
      <main className="flex-grow min-h-screen bg-gray-100 p-4 space-y-8">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-green-600 to-green-700 text-white py-12 text-center shadow-lg mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Amana Transportation
          </h1>
          <p className="text-base sm:text-lg md:text-xl px-4 max-w-3xl mx-auto">
            Proudly Servicing Malaysian Bus Riders Since 2019!
          </p>
        </section>

        {/* Main Content */}
        <BusRouteSelector />
        <MapComponent />
        <BusSchedule />
      </main>
      <Footer />
    </RouteProvider>
  );
}
