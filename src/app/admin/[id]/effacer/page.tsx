import {prisma} from "../../../../../lib/prisma";
import { notFound } from "next/navigation";

import Link from "next/link"
export default async function Post({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const post = await prisma.reservation.findUnique({
    where: { id: parseInt(id) },
  });
  const deleteUser = await prisma.reservation.delete({
  where: { id: parseInt(id) },
})
  

  if (!post) {
    notFound();
  }

  return (
    
    
     <div className="min-h-screen bg-gray-100 ">
      <header className="w-full bg-gradient-to-r from-teal-500 to-cyan-300 py-4 px-6 shadow">
        <h1 className="text-2xl font-bold text-white">Pneus Express</h1>
      </header>

      <article className="max-w-2xl space-y-4 font-[family-name:var(--font-geist-sans)]">
        <h1 className="text-4xl font-bold mb-8 text-[#333333]"> Réservation {post.id} effacée avec succès!</h1>

        <Link
      href={`/admin`}
      className="px-4 py-2 inline-block bg-teal-400 hover:bg-teal-500 text-black font-semibold rounded-lg"
    >
      Retour
    </Link>
      </article>
    </div>
  );
}