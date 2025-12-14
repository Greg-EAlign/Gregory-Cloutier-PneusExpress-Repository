version:

"use client"
import Link from "next/link"

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-teal-300 to-teal-600 text-white px-6 py-4 flex justify-between items-center shadow">
      <h1 className="text-2xl font-bold">Pneus Express</h1>
      <div className="flex space-x-4">
        <Link href="/" className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800">
          Accueil
        </Link>
        <Link href="/apropos" className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800">
          Apropos
        </Link>
        <Link href="/admin" className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800">
          Admin
        </Link>
      </div>
    </header>
  )
}