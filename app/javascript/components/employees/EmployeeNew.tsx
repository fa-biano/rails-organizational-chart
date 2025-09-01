import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { IEmployee } from '../../types/employee.type'
import EmployeeForm from './EmployeeForm'

const EmployeeNew: React.FC = () => {
  const { company_id } = useParams()
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (employeeData: Pick<IEmployee, 'name' | 'email' | 'picture'>) => {
    setLoading(true)
    setError(null)

    const payload: Omit<IEmployee, 'id' | 'created_at' | 'updated_at'> = {
      ...employeeData,
      company_id: company_id || '',
    }

    try {
      const response = await fetch('/api/employees.json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''
        },
        body: JSON.stringify({ employee: payload })
      })

      if (!response.ok) {
        const errData = await response.json()
        throw new Error(errData.error || 'Erro ao criar funcionário')
      }

      navigate(`/companies/${company_id}`)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <EmployeeForm
      onSubmit={handleSubmit}
      submitButtonText="Criar"
      loading={loading}
      error={error}
    />
  )
}

export default EmployeeNew
