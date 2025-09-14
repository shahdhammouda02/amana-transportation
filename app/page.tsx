"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import busData from "./data/data.json";
import "leaflet/dist/leaflet.css";

// Dynamic imports for react-leaflet components
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
  ssr: false,
});
const Polyline = dynamic(
  () => import("react-leaflet").then((mod) => mod.Polyline),
  { ssr: false }
);

interface Stop {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  estimated_arrival: string;
  is_next_stop: boolean;
}

interface Bus {
  id: number;
  name: string;
  route_number: string;
  status: string;
  driver: {
    name: string;
    id: string;
    shift_start: string;
    shift_end: string;
  };
  passengers: {
    current: number;
    capacity: number;
    utilization_percentage: number;
  };
  bus_stops: Stop[];
  current_location: {
    latitude: number;
    longitude: number;
    address: string;
  };
}

export default function HomePage() {
  const [buses, setBuses] = useState<Bus[]>([]);
  const [activeBus, setActiveBus] = useState<Bus | null>(null);
  const [L, setL] = useState<any>(null);

  // Dynamic import of Leaflet on client-side only
  useEffect(() => {
    import("leaflet").then((leaflet) => setL(leaflet));
  }, []);

  useEffect(() => {
    setBuses(busData.bus_lines);
    setActiveBus(busData.bus_lines[0]);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-green-500 text-white p-7 text-center font-bold text-2xl">
        {busData.company_info.name} <br />
        <span className="text-lg font-normal">
          Proudly serving Malaysian Bus Riders since{" "}
          {busData.company_info.founded}
        </span>
      </header>

      {/* Active Bus Map Title */}
      <h2 className="text-2xl font-bold text-center my-6 bg-yellow-100 p-7 border">
        Active Bus Map
      </h2>

      {/* Bus Selection Buttons */}
      <section className="flex justify-center flex-wrap gap-4 py-5 mb-5">
        {buses.map((bus, index) => (
          <div key={bus.id} className="flex flex-col items-center">
            {/* زر الباص */}
            <button
              className={`px-4 py-2 rounded transition-all duration-200 ${
                activeBus?.id === bus.id
                  ? "bg-green-600 text-white shadow"
                  : "bg-white border hover:bg-green-100 hover:shadow-sm"
              }`}
              onClick={() => setActiveBus(bus)}
            >
              {`Bus ${index + 1}`}
            </button>

            {/* Progress Bar */}
            <div className="w-24 h-3 bg-gray-200 rounded-full mt-2">
              <div
                className={`h-3 rounded-full ${
                  bus.passengers.utilization_percentage < 70
                    ? "bg-green-500"
                    : bus.passengers.utilization_percentage < 90
                    ? "bg-yellow-400"
                    : "bg-red-500"
                }`}
                style={{ width: `${bus.passengers.utilization_percentage}%` }}
              ></div>
            </div>

            <span className="text-xs mt-1">
              {`${bus.passengers.current}/${bus.passengers.capacity}`}
            </span>
          </div>
        ))}
      </section>

      {/* Map */}
      {activeBus && L && (
        <MapContainer
          center={[
            activeBus.current_location.latitude,
            activeBus.current_location.longitude,
          ]}
          zoom={12}
          style={{ height: "400px", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/">OSM</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Polyline for bus route */}
          <Polyline
            positions={activeBus.bus_stops.map((stop) => [
              stop.latitude,
              stop.longitude,
            ])}
            color={
              activeBus.id === 1
                ? "red"
                : activeBus.id === 2
                ? "blue"
                : activeBus.id === 3
                ? "orange"
                : activeBus.id === 4
                ? "purple"
                : "green"
            }
          />

          {/* Markers */}
          {activeBus.bus_stops.map((stop) => (
            <Marker
              key={stop.id}
              position={[stop.latitude, stop.longitude]}
              icon={L.icon({
                iconUrl: "https://cdn-icons-png.flaticon.com/512/61/61205.png",
                iconSize: [25, 25],
              })}
            >
              <Popup>
                <strong>{stop.name}</strong>
                <br />
                ETA: {stop.estimated_arrival}
                {stop.is_next_stop && (
                  <span className="text-red-500 font-bold"> (Next Stop)</span>
                )}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      )}

      {/* Bus Schedule Table */}
      <section className="p-4">
        <h2 className="text-2xl font-bold text-center my-6 bg-yellow-100 p-7 border">
          Bus Schedule {activeBus ? `(${activeBus.route_number})` : ""}
        </h2>

        {/* Bus Selection Buttons */}
        <section className="flex justify-center flex-wrap gap-4 py-5 mb-5">
          {buses.map((bus, index) => (
            <div key={bus.id} className="flex flex-col items-center">
              {/* زر الباص */}
              <button
                className={`px-4 py-2 rounded transition-all duration-200 ${
                  activeBus?.id === bus.id
                    ? "bg-green-600 text-white shadow"
                    : "bg-white border hover:bg-green-100 hover:shadow-sm"
                }`}
                onClick={() => setActiveBus(bus)}
              >
                {`Bus ${index + 1}`}
              </button>

              {/* Progress Bar */}
              <div className="w-24 h-3 bg-gray-200 rounded-full mt-2">
                <div
                  className={`h-3 rounded-full ${
                    bus.passengers.utilization_percentage < 70
                      ? "bg-green-500"
                      : bus.passengers.utilization_percentage < 90
                      ? "bg-yellow-400"
                      : "bg-red-500"
                  }`}
                  style={{ width: `${bus.passengers.utilization_percentage}%` }}
                ></div>
              </div>

              <span className="text-xs mt-1">
                {`${bus.passengers.current}/${bus.passengers.capacity}`}
              </span>
            </div>
          ))}
        </section>

        <table className="w-full border border-gray-200">
          <thead>
            <tr className="bg-blue-50">
              <th className="border px-2 py-1 text-left">Bus Stop</th>
              <th className="border px-2 py-1 text-left">
                Next Time of Arrival
              </th>
            </tr>
          </thead>
          <tbody>
            {activeBus?.bus_stops.map((stop) => (
              <tr
                key={stop.id}
                className={stop.is_next_stop ? "bg-yellow-100 font-bold" : ""}
              >
                <td className="border px-2 py-1">{stop.name}</td>
                <td className="border px-2 py-1">{stop.estimated_arrival}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
