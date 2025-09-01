import React from 'react'
import { IEmployee } from '../../types/employee.type'

interface EmployeeFormProps {
  initialData?: Pick<IEmployee, 'name' | 'email' | 'picture'>
  onSubmit: (data: Pick<IEmployee, 'name' | 'email' | 'picture'>) => Promise<void>
  submitButtonText: string
  loading: boolean
  error: string | null
}

const EmployeeForm: React.FC<EmployeeFormProps> = ({
  initialData = { name: '', email: '', picture: '' },
  onSubmit,
  submitButtonText,
  loading,
  error,
}) => {
  const [name, setName] = React.useState(initialData.name)
  const [email, setEmail] = React.useState(initialData.email)
  const [picture, setPicture] = React.useState(initialData.picture)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    await onSubmit({ name, email, picture: picture || '' })
  }

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white border border-gray-200 rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4 text-center">{submitButtonText} Colaborador(a)</h1>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Nome</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">E-mail</label>
          <input
            type="email"
            className="w-full border rounded px-3 py-2"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">URL Foto (opcional)</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            value={picture}
            onChange={(event) => setPicture(event.target.value)}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50 cursor-pointer"
        >
          {loading ? 'Processando...' : submitButtonText}
        </button>
      </form>
    </div>
  )
}

export default EmployeeForm