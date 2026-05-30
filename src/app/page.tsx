import Navbar from "@/components/Navbar"

export default function Home() {
  return (
    <main className="min-h-screen bg-blue-950 text-white flex flex-col items-center">
      <Navbar />
      <h1 className="text-7xl font-bold mb-4">My Task Manager</h1>
      <p className="text-blue-400 text-lg">Stay organized. Get things done.</p>
    </main>
  )
}