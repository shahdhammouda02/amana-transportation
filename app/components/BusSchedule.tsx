'use client';

import { BusSchedule } from '../types/bus';
import { useEffect, useState } from 'react';

const BusScheduleComponent = () => {
  const [schedules, setSchedules] = useState<BusSchedule[]>([]);
  const [selectedBusId, setSelectedBusId] = useState<string>('');

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const res = await fetch('/api/fetcher');
        const data = await res.json();
        const fetchedSchedules: BusSchedule[] = data.schedule || [];
        setSchedules(fetchedSchedules);
        if (fetchedSchedules.length > 0) setSelectedBusId(fetchedSchedules[0].busId);
      } catch (err) {
        console.error(err);
      }
    };
    fetchSchedules();
  }, []);

  const selectedSchedule = schedules.find((s) => s.busId === selectedBusId);

  return (
    <div className="bg-amber-100 p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-black text-center mt-3">Bus Schedule</h2>

      <div className="flex gap-2 mb-4 flex-wrap">
        {schedules.map((bus) => (
          <button
            key={bus.busId}
            className={`px-4 py-2 rounded ${
              selectedBusId === bus.busId ? 'bg-green-600 text-white' : 'bg-gray-300 text-gray-700'
            }`}
            onClick={() => setSelectedBusId(bus.busId)}
          >
            {bus.busName}
          </button>
        ))}
      </div>

      {selectedSchedule && (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stop
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Arrival
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Departure
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {selectedSchedule.stops.map((stop) => (
                <tr key={stop.stopId} className={stop.isNext ? 'bg-orange-100' : undefined}>
                  <td className="px-4 py-4 text-sm text-gray-900">{stop.stopName}</td>
                  <td className="px-4 py-4 text-sm text-gray-500">{stop.arrivalTime}</td>
                  <td className="px-4 py-4 text-sm text-gray-500">{stop.departureTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BusScheduleComponent;
