import React from 'react'
import { Play, Pause, Check, Trash2 } from 'lucide-react'
import { Todo } from '../types'

interface TodoListProps {
  todos: Todo[]
  toggleTodo: (id: number) => void
  deleteTodo: (id: number) => void
  toggleTimer: (id: number) => void
}

const TodoList: React.FC<TodoListProps> = ({ todos, toggleTodo, deleteTodo, toggleTimer }) => {
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  return (
    <ul className="space-y-2">
      {todos.map((todo) => (
        <li
          key={todo.id}
          className={`flex items-center justify-between p-2 rounded ${
            todo.completed ? 'bg-green-100' : 'bg-gray-100'
          }`}
        >
          <span className={`flex-grow ${todo.completed ? 'line-through' : ''}`}>
            {todo.title}
          </span>
          <span className="mr-2">{formatTime(todo.timeSpent)}</span>
          <button
            onClick={() => toggleTimer(todo.id)}
            className={`p-1 rounded ${
              todo.isRunning ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
            }`}
          >
            {todo.isRunning ? <Pause size={16} /> : <Play size={16} />}
          </button>
          <button
            onClick={() => toggleTodo(todo.id)}
            className="p-1 ml-1 bg-blue-500 text-white rounded"
          >
            <Check size={16} />
          </button>
          <button
            onClick={() => deleteTodo(todo.id)}
            className="p-1 ml-1 bg-red-500 text-white rounded"
          >
            <Trash2 size={16} />
          </button>
        </li>
      ))}
    </ul>
  )
}

export default TodoList