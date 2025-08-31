import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

interface Company {
  id: string
  name: string
  created_at: string
  updated_at: string
}

// interface CompanyShowProps {
//   companyId: string
// }

// const CompanyShow: React.FC<CompanyShowProps> = ({ companyId }) => {
const CompanyShow: React.FC = () => {
  const { id } = useParams()
  const [company, setCompany] = useState<Company | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const response = await fetch(`/api/companies/${id}.json`)
        if (!response.ok) throw new Error('Erro ao carregar empresa')
        const data = await response.json()
        setCompany(data)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchCompany()
  }, [id])

  if (loading) return <p className="text-center mt-8">Carregando empresa...</p>
  if (error) return <p className="text-red-500 text-center mt-8">{error}</p>
  if (!company) return <p className="text-center mt-8">Empresa não encontrada.</p>

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-gray-50 border border-gray-200 rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4 text-center">{company.name}</h1>
      <p className="text-gray-600 text-sm">
        Criada em: {new Date(company.created_at).toLocaleDateString()}
      </p>
      <p className="text-gray-600 text-sm">
        Última atualização: {new Date(company.updated_at).toLocaleDateString()}
      </p>
    </div>
  )
}

export default CompanyShow
