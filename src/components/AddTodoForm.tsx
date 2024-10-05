import React, { useState } from 'react'
import { Plus } from 'lucide-react'

interface AddTodoFormProps {
  addTodo: (title: string) => void
}

const AddTodoForm: React.FC<AddTodoFormProps> = ({ addTodo }) => {
  const [title, setTitle] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (title.trim()) {
      addTodo(title.trim())
      setTitle('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex mb-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="新しいタスクを入力..."
        className="flex-grow p-2 border rounded-l"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded-r flex items-center"
      >
        <Plus size={20} />
        <span className="ml-1">追加</span>
      </button>
    </form>
  )
}

export default AddTodoForm