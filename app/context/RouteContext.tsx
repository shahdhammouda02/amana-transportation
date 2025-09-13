"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { BusRoute } from "../types/bus";

interface RouteContextType {
  routes: BusRoute[];
  setRoutes: (routes: BusRoute[]) => void;
  selectedRoute: BusRoute | null;
  setSelectedRoute: (route: BusRoute | null) => void;
}

const RouteContext = createContext<RouteContextType | undefined>(undefined);

export const RouteProvider = ({ children }: { children: ReactNode }) => {
  const [routes, setRoutes] = useState<BusRoute[]>([]);
  const [selectedRoute, setSelectedRoute] = useState<BusRoute | null>(null);

  return (
    <RouteContext.Provider
      value={{ routes, setRoutes, selectedRoute, setSelectedRoute }}
    >
      {children}
    </RouteContext.Provider>
  );
};

export const useRouteContext = () => {
  const context = useContext(RouteContext);
  if (!context)
    throw new Error("useRouteContext must be used within RouteProvider");
  return context;
};
