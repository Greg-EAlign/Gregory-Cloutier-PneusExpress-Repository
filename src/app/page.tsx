"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import Header from "./actions/header";
interface Slot {
  hour: number;
  label: string;
  spots: number;
}

interface Day {
  name: string;
  date: string; 
  display: string;
  slots: Slot[];
}
export default function ReservationPage() {
  const router = useRouter();

  const [weekStart, setWeekStart] = useState(new Date(2025, 11, 7));
  const [weekDaysData, setWeekDaysData] = useState<Day[]>([]);

  // Fetch week data from API
  useEffect(() => {
    async function fetchWeek() {
      try {
        const res = await fetch(`/api/week?start=${weekStart.toISOString()}`);
        if (!res.ok) throw new Error("Failed to fetch week data");
        const data: Day[] = await res.json();
        setWeekDaysData(data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchWeek();
  }, [weekStart]);

  const changeWeek = (direction: number) => {
    const newDate = new Date(weekStart);
    newDate.setDate(weekStart.getDate() + direction * 7);
    setWeekStart(newDate);
  };

  return (
    <div className="min-h-screen bg-gray-100 text-black ">
      <Header/>
      
      <div className="text-center mt-6 text-black">
        <h2 className="text-3xl font-bold">Réserver une plage horaire</h2>
        <div className="mt-2 flex justify-center items-center gap-4">
          <button onClick={() => changeWeek(-1)}>
            <ChevronLeft size={24} />
          </button>
          <p className="text-xl font-semibold">
            Semaine du {weekStart.toLocaleDateString("fr-CA")}
          </p>
          <button onClick={() => changeWeek(1)}>
            <ChevronRight size={24} />
          </button>
        </div>
      </div>

      {/* Week Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-10">
        
        {weekDaysData.map((day: Day, i: number) => (
          <div key={i} className="bg-white rounded-2xl shadow p-4">
            <h3 className="text-lg font-bold">
              {day.name}
              <span className="block text-sm text-gray-500">{day.display}</span>
            </h3>

            <div className="mt-4 space-y-2">
              {day.slots.map((slot: Slot, index: number) => {
                const plageDate = new Date(day.date);
                plageDate.setHours(slot.hour, 0, 0, 0);

                return (
                  <button
                    key={index}
                    onClick={() =>
                      router.push(`/reservation?plage=${plageDate.toISOString()}`)
                    }
                    className={`w-full py-2 px-3 rounded-xl border ${
                      slot.spots > 0
                        ? "bg-green-50 hover:bg-green-100"
                        : "bg-gray-200 cursor-not-allowed"
                    }`}
                    disabled={slot.spots === 0}
                  >
                    <p className="font-medium">{slot.label}</p>
                    <p>{slot.spots} place(s)</p>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
