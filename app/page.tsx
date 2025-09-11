import MapComponent from "./components/MapComponent";
import BusRouteSelector from "./components/BusRouteSelector";
import BusSchedule from "./components/BusSchedule";

export default function Home() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-green-400 text-black py-12 text-center shadow-lg mb-8">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
          Amana Transportation
        </h1>
        <p className="text-base sm:text-lg md:text-xl px-4 max-w-3xl mx-auto">
          Proudly Servicing Malaysian Bus Riders Since 2019!
        </p>
      </section>

      {/* Content Layout */}
      <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="lg:col-span-1 order-2 lg:order-1">
          <BusRouteSelector />
        </div>

        <div className="lg:col-span-2 order-1 lg:order-2">
          <MapComponent />
        </div>
      </div>

      <div className="container mx-auto px-4 mt-8">
        <BusSchedule />
      </div>
    </div>
  );
}
