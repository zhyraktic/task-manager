"use client"

import { signOut } from "next-auth/react"

export default function Navbar() {
  return (
    <nav className="w-full bg-gray-900 px-8 py-4 flex items-center justify-between">
      <h1 className="text-white font-bold text-xl">TaskManager</h1>
      <div className="flex gap-4 items-center">
        <a href="/" className="text-gray-400 hover:text-white">Home</a>
        <a href="/dashboard" className="text-gray-400 hover:text-white">Dashboard</a>
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-lg text-sm"
        >
          Logout
        </button>
      </div>
    </nav>
  )
}