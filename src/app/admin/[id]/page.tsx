import {prisma} from "../../../../lib/prisma";
import { notFound } from "next/navigation";
import Header from "@/app/actions/header";

import Link from "next/link"
export default async function Post({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const post = await prisma.reservation.findUnique({
    where: { id: parseInt(id) },
  });
  

  if (!post) {
    notFound();
  }

  return (
    
    
    <div className="min-h-screen bg-gray-100 text-black">
      {/* Top Bar */}
      <Header/>

      <article className="max-w-2xl mx-auto space-y-6 font-[family-name:var(--font-geist-sans)] p-6 bg-white rounded-2xl shadow border border-gray-200">
  <h1 className="text-3xl font-bold text-gray-800 mb-4">Réservation #{post.id}</h1>

  {/* Plage horaire */}
  <p className="text-gray-700">
    <span className="font-semibold">Plage horaire:</span>{" "}
    {new Date(post.plage).toLocaleString("fr-CA", {
      dateStyle: "long",
      timeStyle: "short",
    })}
  </p>

  {/* Client Info */}
  <div className="space-y-2">
    <h2 className="text-xl font-semibold text-gray-800 mt-4">Informations du client</h2>
    <p>
      <span className="font-semibold">Nom:</span> {post.nom}
    </p>
    <p>
      <span className="font-semibold">Courriel:</span> {post.courriel}
    </p>
  </div>

  {/* Vehicle Info */}
  <div className="space-y-2">
    <h2 className="text-xl font-semibold text-gray-800 mt-4" >Informations du véhicule</h2>
    <p>
      <span className="font-semibold">Marque:</span> {post.marque}
    </p>
    <p>
      <span className="font-semibold">Modèle:</span> {post.modele}
    </p>
    <p>
      <span className="font-semibold">Année:</span> {post.annee}
    </p>
  </div>

  {/* Buttons */}
  <div className="mt-6 flex flex-wrap gap-4">
    <Link
      href={`/admin/${post.id}/modifier`}
      className="px-6 py-2 rounded-xl bg-teal-500 text-white hover:bg-teal-600 font-medium"
    >
      Modifier
    </Link>
    <Link
      href={`/admin/${post.id}/effacer`}
      className="px-6 py-2 rounded-xl bg-red-500 text-white hover:bg-red-600 font-medium"
    >
      Effacer
    </Link>
    <Link
      href={`/admin`}
      className="px-6 py-2 rounded-xl bg-gray-200 text-gray-800 hover:bg-gray-300 font-medium"
    >
      Retour
    </Link>
  </div>
</article>

    </div>
  );
}