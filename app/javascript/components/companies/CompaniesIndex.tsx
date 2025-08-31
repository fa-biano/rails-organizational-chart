import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

interface Company {
  id: number
  name: string
}

const CompaniesIndex: React.FC = () => {
  const [companies, setCompanies] = useState<Company[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const navigate = useNavigate()

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await fetch("/api/companies.json")
        if (!response.ok) {
          throw new Error("Erro ao carregar empresas")
        }
        const data = await response.json()
        setCompanies(data)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchCompanies()
  }, [])

  if (loading) return (
    <p className="text-center text-gray-600 mt-8 text-lg">
      Carregando empresas...
    </p>
  )
  
  if (error) return <p className="text-red-600">{error}</p>

  return (
    <div className="max-w-3xl mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Lista de Empresas</h1>
      <button
          className="py-2 px-4 mb-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition cursor-pointer"
          onClick={() => navigate("/companies/new")}
        >
          Nova Empresa
      </button>

      {companies.length === 0 ? (
        <p>Nenhuma empresa cadastrada.</p>
      ) : (
          <ul className="divide-y divide-gray-200 border border-gray-200 rounded-md">
            {companies.map((company) => {
              return (
                <li
                  key={company.id}
                  className="p-4 hover:bg-gray-50 cursor-pointer"
                  onClick={() => navigate(`/companies/${company.id}`) }
                >
                  {company.name}
                </li>
              )
            })}
          </ul>

      )}
    </div>
  )
}

export default CompaniesIndex
