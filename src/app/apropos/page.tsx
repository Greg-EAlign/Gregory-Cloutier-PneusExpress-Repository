
import { prisma } from "../../../lib/prisma";
import Link from "next/link"
import Header from "../actions/header";
export default async function Apropos() {
  const reservations = await prisma.reservation.findMany({
    orderBy: { plage: "asc" }
  });

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Bar */}
      <Header/>
<div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-2xl shadow border border-gray-200">
<p className="text-xl font-semibold text-gray-800 mt-4">VERSIONS:</p>
<p className='text-black'>VS code version 1.106</p>
<p className='text-black'>Npm 10.9.3</p>
<p className='text-black'>Next.js 16.0.7</p>
<p className='text-black'>"lucide-react": "^0.556.0",</p>
<p className='text-black'>  "next": "16.0.7",</p>
<p className='text-black'>   "prisma": "^7.1.0",</p>
<p className='text-black'>   "react": "19.2.0",</p>
<p className='text-black'>   "react-dom": "19.2.0"</p>
<p className="text-xl font-semibold text-gray-800 mt-2">DÉVELOPPEUR:</p>
<p className='text-black'>    Grégory Cloutier:</p>
<p className='text-black'>    202239523:</p>



<p className='text-black'>    Technique de l'informatique, Automne 2025:</p>
  </div>
      <div className="flex p-6 gap-10">
        {/* Sidebar */}
        </div>
    </div>
  );
}
