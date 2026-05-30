"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function Register() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  async function handleRegister() {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    })

    const data = await res.json()

    if (data.error) {
      setError(data.error)
    } else {
      router.push("/login")
    }
  }

  return (
    <main className="min-h-screen bg-blue-950 text-white flex items-center justify-center">
      <div className="bg-gray-900 p-8 rounded-xl w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6">Register</h1>
        {error && <p className="text-red-400 mb-4">{error}</p>}
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg outline-none mb-4"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg outline-none mb-4"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg outline-none mb-6"
        />
        <button
          onClick={handleRegister}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-semibold mb-4"
        >
          Create Account
        </button>
        <p className="text-gray-400 text-center">
          Already have an account?{" "}
          <a href="/login" className="text-blue-400 hover:text-blue-300">Login</a>
        </p>
      </div>
    </main>
  )
}