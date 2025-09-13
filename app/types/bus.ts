export interface Stop {
  id: string;
  name: string;
  lat: number;
  lng: number;
  time?: string;
  isNext?: boolean;
}

// خط باص
export interface BusRoute {
  id: string;
  name: string;
  start: string;
  end: string;
  stops: Stop[];
  path?: [number, number][];
}

export interface BusLocation {
  busId: string;
  lat: number;
  lng: number;
  name: string;
  status?: string;
  capacity?: string;
  nextStop?: string;
}

export interface Bus {
  id: string;
  routeId: string;
  plateNumber: string;
  driverName: string;
  currentLocation?: BusLocation;
}

export interface StopSchedule {
  stopId: string;
  stopName: string;
  arrivalTime: string;
  departureTime: string;
  isNext?: boolean;
}

export interface BusSchedule {
  busId: string;
  busName: string;
  stops: StopSchedule[];
}
