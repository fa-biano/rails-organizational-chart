import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import EmployeeForm from './EmployeeForm'
import { IEmployee } from '../../types/employee.type'

const EmployeeEdit: React.FC = () => {
  const { company_id, employee_id } = useParams()
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [employee, setEmployee] = useState<IEmployee | null>(null)

  useEffect(() => {
    const fetchEmployee = async () => {
      setLoading(true)
      try {
        const response = await fetch(`/api/employees/${employee_id}.json`)
        if (!response.ok) {
          throw new Error('Funcionário não encontrado')
        }
        const data = await response.json()
        setEmployee(data)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchEmployee()
  }, [employee_id])

  const handleSubmit = async (employeeData: Pick<IEmployee, 'name' | 'email' | 'picture'>) => {
    setLoading(true)
    setError(null)

    const payload: Omit<IEmployee, 'id' | 'created_at' | 'updated_at'> = {
      ...employeeData,
      company_id: company_id || '',
    }

    try {
      const response = await fetch(`/api/employees/${employee_id}.json`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''
        },
        body: JSON.stringify({ employee: payload })
      })

      if (!response.ok) {
        const errData = await response.json()
        throw new Error(errData.error || 'Erro ao atualizar funcionário')
      }

      navigate(`/companies/${company_id}`)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (loading && !employee) {
    return <p className="text-center mt-8">Carregando dados do funcionário...</p>
  }

  if (error && !employee) {
    return <p className="text-center mt-8 text-red-500">{error}</p>
  }

  if (!employee) {
    return null
  }

  return (
    <EmployeeForm
      initialData={employee}
      onSubmit={handleSubmit}
      submitButtonText="Atualizar"
      loading={loading}
      error={error}
    />
  )
}

export default EmployeeEdit