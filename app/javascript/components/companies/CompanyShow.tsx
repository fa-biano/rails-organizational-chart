import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import EmployeeShow from '../employees/EmployeeShow'
import { ICompany } from '../../types/company.type'
import { IEmployee } from '../../types/employee.type.'

const CompanyShow: React.FC = () => {
  const { company_id } = useParams()
  const [company, setCompany] = useState<ICompany | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [employees, setEmployees] = useState<IEmployee[]>([])
  const navigate = useNavigate()

  const fetchCompany = async () => {
    try {
      const response = await fetch(`/api/companies/${company_id}.json`)
      if (!response.ok) throw new Error('Erro ao carregar empresa')
      const companyData: ICompany = await response.json()
      
      setCompany(companyData)
      
      if (companyData.employees && companyData.employees.length > 0) {
        const employeeData = Array.from(companyData.employees)
        setEmployees(employeeData)
      }
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }
  
  const handleDelete = (id: string) => {
    setEmployees(prev => prev.filter(employee => employee.id !== id))
  }

  useEffect(() => {
    fetchCompany()
  }, [company_id])

  if (loading) return <p className="text-center mt-8">Carregando empresa...</p>
  if (error) return <p className="text-red-500 text-center mt-8">{error}</p>
  if (!company) return <p className="text-center mt-8">Empresa não encontrada.</p>

  return (
    <main className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 p-6 bg-gray-50 border border-gray-200 rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4 text-center">{company.name}</h1>
      <p className="text-gray-600 text-sm">
        Criada em: {new Date(company.created_at).toLocaleDateString()}
      </p>
      <p className="text-gray-600 text-sm">
        Última atualização: {new Date(company.updated_at).toLocaleDateString()}
      </p>
      <p className="text-gray-600 text-sm">
        Total de colaboradores: {employees.length}
      </p>
      <div className="mt-6 text-center">
        <button
          onClick={() => navigate(`/companies/${company.id}/employees`)}
          className="py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 transition cursor-pointer"
        >
          Adicionar Colaborador
        </button>
      </div>

      <div className="mt-6">
        <h2 className="text-lg font-bold mb-4">Colaboradores</h2>
          {employees.length === 0 ? (
            <p className="text-gray-500">Nenhum colaborador(a) cadastrado(a).</p>
          ) : (
            employees.map(employee => (
              <EmployeeShow
                key={employee.id}
                employee={employee}
                onDelete={handleDelete}
              />
            ))
          )}
      </div>
    </main>
  )
}

export default CompanyShow
