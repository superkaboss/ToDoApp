import React, { useState, useEffect } from 'react'
import { Plus, Play, Pause, Check, Trash2 } from 'lucide-react'
import TodoList from './components/TodoList'
import AddTodoForm from './components/AddTodoForm'
import { Todo } from './types'

function App() {
  const [todos, setTodos] = useState<Todo[]>([])

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos')
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const addTodo = (title: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      title,
      completed: false,
      timeSpent: 0,
      isRunning: false,
    }
    setTodos([...todos, newTodo])
  }

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const toggleTimer = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isRunning: !todo.isRunning } : todo
      )
    )
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.isRunning ? { ...todo, timeSpent: todo.timeSpent + 1 } : todo
        )
      )
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Todoアプリ</h1>
        <AddTodoForm addTodo={addTodo} />
        <TodoList
          todos={todos}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
          toggleTimer={toggleTimer}
        />
      </div>
    </div>
  )
}

export default App