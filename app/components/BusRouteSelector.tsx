'use client';

import { useEffect } from 'react';
import { useRouteContext } from '../context/RouteContext';
import { BusRoute } from '../types/bus';

const BusRouteSelector = () => {
  const { routes, setRoutes, selectedRoute, setSelectedRoute } = useRouteContext();

  useEffect(() => {
  const fetchRoutes = async () => {
    try {
      const res = await fetch('/api/fetcher');
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      const fetchedRoutes: BusRoute[] = data.routes || [];
      setRoutes(fetchedRoutes);
      if (fetchedRoutes.length > 0) setSelectedRoute(fetchedRoutes[0]);
    } catch (err) {
      console.error('Error fetching routes:', err);
    }
  };
  fetchRoutes();
}, [setRoutes, setSelectedRoute]);


  return (
    <div className="bg-amber-100 p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-black text-center">Active Bus Map</h2>
      <div className="flex flex-wrap gap-2">
        {routes.map((route) => (
          <button
            key={route.id}
            className={`px-4 py-2 rounded ${
              selectedRoute?.id === route.id ? 'bg-green-600 text-white' : 'bg-gray-300 text-gray-700'
            }`}
            onClick={() => setSelectedRoute(route)}
          >
            {route.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BusRouteSelector;
