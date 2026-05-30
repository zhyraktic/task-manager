"use client"

import { useState, useEffect } from "react"
import Navbar from "@/components/Navbar"

interface Task {
  id: number
  title: string
  completed: boolean
}

export default function Dashboard() {
  const [showForm, setShowForm] = useState(false)
  const [taskTitle, setTaskTitle] = useState("")
  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {
    fetch("/api/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data))
  }, [])

  async function handleAddTask() {
    if (taskTitle.trim() === "") return
    const res = await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: taskTitle }),
    })
    const newTask = await res.json()
    setTasks([newTask, ...tasks])
    setTaskTitle("")
    setShowForm(false)
  }

  async function handleDelete(id: number) {
    await fetch(`/api/tasks/${id}`, { method: "DELETE" })
    setTasks(tasks.filter((task) => task.id !== id))
  }

  async function handleComplete(id: number, completed: boolean) {
    const res = await fetch(`/api/tasks/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: !completed }),
    })
    const updated = await res.json()
    setTasks(tasks.map((task) => (task.id === id ? updated : task)))
  }

  return (
    <main className="min-h-screen bg-blue-950 text-white">
      <Navbar />
      <div className="flex flex-col items-center mt-20">
        <h1 className="text-5xl font-bold mb-8">Dashboard</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold"
        >
          {showForm ? "Cancel" : "Add Task"}
        </button>

        {showForm && (
          <div className="mt-8 bg-gray-900 p-6 rounded-xl w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">New Task</h2>
            <input
              type="text"
              placeholder="Task title..."
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg outline-none mb-4"
            />
            <button
              onClick={handleAddTask}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-semibold"
            >
              Save Task
            </button>
          </div>
        )}

        <div className="mt-10 w-full max-w-md flex flex-col gap-3">
          {tasks.map((task) => (
            <div key={task.id} className="bg-gray-900 px-6 py-4 rounded-xl flex items-center justify-between">
              <span className={task.completed ? "line-through text-gray-500" : ""}>
                {task.title}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => handleComplete(task.id, task.completed)}
                  className="bg-green-500 hover:bg-green-600 px-3 py-1 rounded-lg text-sm"
                >
                  {task.completed ? "Undo" : "Done"}
                </button>
                <button
                  onClick={() => handleDelete(task.id)}
                  className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded-lg text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}