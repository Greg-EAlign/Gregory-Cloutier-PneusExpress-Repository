
import { prisma } from "../../../lib/prisma";
import Link from "next/link"
import Header from "../actions/header";
import { Reservation } from "../../../generated/prisma/browser";
export default async function AdminPage() {
  const reservations = await prisma.reservation.findMany({
    orderBy: { plage: "asc" }
  });

  return (
    <div className="min-h-screen bg-gray-100 text-black">
      {/* Top Bar */}
      <Header/>

      <div className="flex p-6 gap-10">
        {/* Sidebar */}
        <aside className="w-60">
          <h1 className="text-xl font-bold mb-4">ADMIN</h1>
<Link
      href="/"
      className="px-4 py-2 inline-block bg-teal-400 hover:bg-teal-500 text-black font-semibold rounded-lg"
    >
            Créer

</Link>
          
        </aside>

        {/* Appointment List */}
        <main className="flex-1">
          <h2 className="text-2xl font-bold mb-6">Liste des rendez-vous</h2>

          <div className="space-y-4">
  {reservations.map((a : Reservation) => (
    <Link
      key={a.id}
      href={`/admin/${a.id}`} // dynamic route
      className="block bg-white shadow rounded-xl p-4 flex justify-between items-center border hover:bg-gray-50"
    >
      <div>
        <p className="font-semibold text-lg">{a.nom} {a.id}</p>
        <p className="text-sm text-gray-600">
          Date: {a.plage.toLocaleDateString()}
        </p>
      </div>


    </Link>
  ))}
</div>
        </main>
      </div>
    </div>
  );
}
