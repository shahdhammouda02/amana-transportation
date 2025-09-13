"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useRouteContext } from "../context/RouteContext";
import { BusLocation } from "../types/bus";
import { useEffect, useState } from "react";

// Fix marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const MapComponent = () => {
  const { selectedRoute } = useRouteContext();
  const [busLocations, setBusLocations] = useState<BusLocation[]>([]);

  useEffect(() => {
    const fetchBuses = async () => {
      try {
        const res = await fetch(
          "api/fetcher"
        );
        const data = await res.json();
        setBusLocations(data.buses || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchBuses();
  }, []);

  const center: [number, number] = [3.139, 101.6869];

  return (
    <div className="h-96 w-full rounded-lg shadow-md">
      <MapContainer
        center={center}
        zoom={12}
        style={{ height: "100%", width: "100%", borderRadius: "0.5rem" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        {selectedRoute?.path && (
          <Polyline positions={selectedRoute.path} color="blue" weight={4} />
        )}
        {selectedRoute?.stops?.map((stop) => (
          <Marker key={stop.id} position={[stop.lat, stop.lng]}>
            <Popup>
              {stop.name} <br />
              Next Bus Arrival: {stop.time || "-"}
            </Popup>
          </Marker>
        ))}

        {busLocations.map((bus) => (
          <Marker key={bus.busId} position={[bus.lat, bus.lng]}>
            <Popup>
              <strong>{bus.name}</strong> <br />
              Status: {bus.status || "-"} <br />
              Capacity: {bus.capacity || "-"} <br />
              Next Stop: {bus.nextStop || "-"}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
