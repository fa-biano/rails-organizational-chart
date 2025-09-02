import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import EmployeeForm from './EmployeeForm'
import { IEmployee, IEmployeeFormData, IEmployeeHierarchy } from '../../types/employee.type'
import { fetchManagerId } from '../../utils/fetchManagerId'

const EmployeeEdit: React.FC = () => {
  const { company_id, employee_id } = useParams()
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [employee, setEmployee] = useState<IEmployeeHierarchy | null>(null)

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

  const handleSubmit = async (employeeData: IEmployeeFormData) => {
    setLoading(true)
    setError(null)

    const { manager_email, ...rest } = employeeData

    try {
      let managerId = employee?.manager?.id || ''
      
      if (manager_email !== employee?.manager?.email) {
        managerId = await fetchManagerId(manager_email, company_id)
      }
      
      const payload: Omit<IEmployee, 'id' | 'created_at' | 'updated_at'> = {
        ...rest,
        company_id: company_id || '',
        manager_id: managerId
      }

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

  const initialFormData: IEmployeeFormData = {
    name: employee.name,
    email: employee.email,
    picture: employee.picture || '',
    manager_email: employee.manager?.email || '',
  }

  return (
    <EmployeeForm
      initialData={initialFormData}
      onSubmit={handleSubmit}
      submitButtonText="Atualizar"
      loading={loading}
      error={error}
    />
  )
}

export default EmployeeEdit