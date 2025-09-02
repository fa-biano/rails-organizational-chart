import React, { useState } from 'react'
import { IEmployee, IEmployeeFormData } from '../../types/employee.type'

interface EmployeeFormProps {
  initialData?: IEmployeeFormData
  onSubmit: (data: IEmployeeFormData) => Promise<void>
  submitButtonText: string
  loading: boolean
  error: string | null
}

const EmployeeForm: React.FC<EmployeeFormProps> = ({
  initialData = { name: '', email: '', picture: '', manager_email: '' },
  onSubmit,
  submitButtonText,
  loading,
  error,
}) => {
  const [name, setName] = useState(initialData.name)
  const [email, setEmail] = useState(initialData.email)
  const [picture, setPicture] = useState(initialData.picture || '')
  const [managerEmail, setManagerEmail] = useState(initialData.manager_email || '')

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    await onSubmit({ name, email, picture, manager_email: managerEmail })
  }

  return (
    <main className="w-full max-w-3xl mx-auto mt-8 px-4 sm:px-6 lg:px-8 p-6 bg-gray-50 border border-gray-200 rounded-lg shadow">
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

        <div>
          <label className="block text-sm font-medium">E-mail do Gestor (opcional)</label>
          <input
            type="email"
            className="w-full border rounded px-3 py-2"
            value={managerEmail}
            onChange={(event) => setManagerEmail(event.target.value)}
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
    </main>
  )
}

export default EmployeeForm
