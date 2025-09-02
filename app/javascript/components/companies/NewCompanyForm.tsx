import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"

const NewCompanyForm: React.FC = () => {
  const [name, setName] = useState('')
  const [errors, setErrors] = useState<string[]>([])
  const navigate = useNavigate()

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    try {
      const response = await fetch('/api/companies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''
        },
        body: JSON.stringify({ company: { name } })
      })

      if (response.ok) {
          navigate('/')
      } else {
        const errorData = await response.json()
        setErrors(errorData.errors || ['Ocorreu um erro ao salvar.'])
      }
    } catch (error) {
      console.error('Erro ao enviar o formulário:', error)
      setErrors(['Ocorreu um erro inesperado.'])
    }
  }

  return (
    <main className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 p-6 bg-gray-50 border border-gray-200 rounded-lg shadow">
      <h1 className="text-xl font-bold mb-4 text-center text-gray-800">Adicionar Nova Empresa</h1>
      
      {errors.length > 0 && (
        <div className="mb-4 p-3 border border-red-400 bg-red-50 text-red-700 rounded">
          <ul className="list-disc list-inside">
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label htmlFor="company-name" className="block font-medium text-gray-700">Nome da Empresa:</label>
          <input
            type="text"
            id="company-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            minLength={2}
            required
            className="w-full border rounded px-3 py-2 focus:border-blue-500 focus:ring focus:ring-blue-500/50"
          />
        </div>
        <button type="submit" className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 cursor-pointer transition">Salvar Empresa</button>
      </form>
    </main>
  )
}

export default NewCompanyForm
