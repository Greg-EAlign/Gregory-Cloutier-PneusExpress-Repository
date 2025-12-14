"use client";

import { ajoutPlage } from "../actions/ajoutPlage";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Header from "../actions/header";
export default function ReservationForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const plageISO = searchParams.get("plage");

  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  if (!plageISO) {
    return <p className="p-10 text-center">Plage invalide.</p>;
  }
  const displayDate = new Date(plageISO).toLocaleString("fr-CA", {
    dateStyle: "long",
    timeStyle: "short",
  });

  return (
    <div className="min-h-screen bg-gray-100">
<Header/>



      <div className="max-w-3xl mx-auto mt-10 bg-white p-8 text-black rounded-2xl shadow border border-gray-200">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Réservation pour{" "}
          <span className="text-teal-600">{displayDate}</span>
        </h2>

        <form action={ajoutPlage} className="space-y-8">
          {/* ✅ REQUIRED UTC DATETIME FOR PRISMA */}
          <input type="hidden" name="plage" value={plageISO} />

          {/* ✅ CLIENT INFO */}
          <h3 className="text-xl font-semibold text-gray-800">
            Informations du client
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-medium mb-1">Nom</label>
              <input
                name="nom"
                type="text"
                required
                defaultValue={user?.nom || ""}
                className="w-full rounded-xl border border-gray-300 px-4 py-2"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Courriel</label>
              <input
                name="courriel"
                type="email"
                required
                defaultValue={user?.courriel || ""}
                className="w-full rounded-xl border border-gray-300 px-4 py-2"
              />
            </div>
          </div>

          {/* ✅ VEHICLE INFO */}
          <h3 className="text-xl font-semibold text-gray-800">
            Informations du véhicule
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-medium mb-1">Marque</label>
              <input
                name="marque"
                type="text"
                required
                className="w-full rounded-xl border border-gray-300 px-4 py-2"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Modèle</label>
              <input
                name="modele"
                type="text"
                required
                className="w-full rounded-xl border border-gray-300 px-4 py-2"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Année</label>
              <input
                name="annee"
                type="text"
                required
                className="w-full rounded-xl border border-gray-300 px-4 py-2"
              />
            </div>
          </div>

          {/* ✅ BUTTONS */}
          <div className="mt-6 flex gap-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 font-medium"
            >
              Retour
            </button>

            <button
              type="submit"
              className="px-6 py-2 rounded-xl bg-teal-500 text-white hover:bg-teal-600 font-medium"
            >
              Confirmer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
