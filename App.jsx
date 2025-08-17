import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { PlusCircle, Trash2, CheckCircle2 } from 'lucide-react'

export default function App() {
  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState("")

  const addTask = () => {
    if (newTask.trim() === "") return
    setTasks([...tasks, { text: newTask, done: false }])
    setNewTask("")
  }

  const toggleTask = (index) => {
    const updated = [...tasks]
    updated[index].done = !updated[index].done
    setTasks(updated)
  }

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200 via-pink-100 to-blue-200 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-lg"
      >
        <h1 className="text-2xl font-bold text-center mb-6 text-purple-700">
          Dev's Smart To Do List
        </h1>
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Add a new task..."
            className="flex-1 border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-purple-400"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTask()}
          />
          <button
            onClick={addTask}
            className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 flex items-center gap-1"
          >
            <PlusCircle size={20} /> Add
          </button>
        </div>
        <ul className="space-y-3">
          {tasks.map((task, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="flex justify-between items-center bg-gray-50 px-4 py-2 rounded-lg shadow"
            >
              <span
                className={`flex-1 cursor-pointer ${
                  task.done ? "line-through text-gray-400" : ""
                }`}
                onClick={() => toggleTask(index)}
              >
                {task.text}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => toggleTask(index)}
                  className="text-green-500 hover:text-green-700"
                >
                  <CheckCircle2 size={22} />
                </button>
                <button
                  onClick={() => deleteTask(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={22} />
                </button>
              </div>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </div>
  )
}