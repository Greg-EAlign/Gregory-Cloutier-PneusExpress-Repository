"use client";

import { modificationPlage } from "@/app/actions/modifierPlage";
import { useRouter } from "next/navigation";
import Header from "@/app/actions/header";

export default function ModificationForm({ reservation }: { reservation: any }) {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="max-w-3xl mx-auto mt-10 p-8 rounded-2xl shadow border border-gray-200 text-black">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Modifier la réservation pour{" "}
          <span className="text-teal-600">
            {new Date(reservation.plage).toLocaleString("fr-CA", {
              dateStyle: "long",
              timeStyle: "short",
            })}
          </span>
        </h2>

        <form action={modificationPlage} className="space-y-8">
          <input type="hidden" name="id" value={reservation.id} />

          {/* DATE/TIME */}
          <div>
            <label className="block font-medium mb-1">Plage horaire</label>
            <input
              type="datetime-local"
              name="plage"
              defaultValue={reservation.plage.toISOString().slice(0, 16)}
              className="w-full rounded-xl border border-gray-300 px-4 py-2"
            />
          </div>

          {/* CLIENT INFO */}
          <h3 className="text-xl font-semibold text-gray-800">Informations du client</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-medium mb-1">Nom</label>
              <input
                name="nom"
                defaultValue={reservation.nom}
                className="w-full rounded-xl border border-gray-300 px-4 py-2"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Courriel</label>
              <input
                name="courriel"
                defaultValue={reservation.courriel}
                className="w-full rounded-xl border border-gray-300 px-4 py-2"
              />
            </div>
          </div>

          {/* VEHICLE INFO */}
          <h3 className="text-xl font-semibold text-gray-800">Informations du véhicule</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-medium mb-1">Marque</label>
              <input
                name="marque"
                defaultValue={reservation.marque}
                className="w-full rounded-xl border border-gray-300 px-4 py-2"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Modèle</label>
              <input
                name="modele"
                defaultValue={reservation.modele}
                className="w-full rounded-xl border border-gray-300 px-4 py-2"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Année</label>
              <input
                name="annee"
                defaultValue={reservation.annee}
                className="w-full rounded-xl border border-gray-300 px-4 py-2"
              />
            </div>
          </div>

          {/* BUTTONS */}
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
