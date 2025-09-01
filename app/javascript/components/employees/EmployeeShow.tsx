import React from "react"
import { useNavigate } from 'react-router-dom'
import { IEmployee } from '../../types/employee.type.'
import { BsFillPersonFill } from 'react-icons/bs';

interface EmployeeShowProps {
  employee: IEmployee
  onDelete?: (id: string) => void
}

const EmployeeShow: React.FC<EmployeeShowProps> = ({ employee, onDelete }) => {
  const navigate = useNavigate()

  const handleDelete = async () => {
    if (!window.confirm("Tem certeza que deseja excluir este employee?")) return

    try {
      const response = await fetch(`/api/employees/${employee.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]')?.getAttribute("content") || "",
        },
      })

      if (!response.ok) throw new Error("Erro ao excluir employee")

      if (onDelete) onDelete(employee.id)
    } catch (err: any) {
      alert(err.message)
    }
  }

return (
    <div className="flex items-center justify-between gap-4 p-4 border border-gray-200 rounded-md shadow-sm mb-2">
      <div className="flex items-center gap-4">
        {employee.picture ? (
          <img
            src={employee.picture}
            alt="Employee picture"
            className="w-12 h-12 rounded-full object-cover"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
            <BsFillPersonFill size={24} />
          </div>
        )}
        
        <div className="max-w-[200px] sm:max-w-[350px] overflow-hidden">
          <h2 className="font-medium text-gray-800 truncate whitespace-nowrap">{employee.name}</h2>
          <p className="text-sm text-gray-600 truncate whitespace-nowrap">{employee.email}</p>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          className="py-1 px-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition cursor-pointer text-sm"
          onClick={() => navigate(`/employees/${employee.id}/edit`)}
        >
          Editar
        </button>
        <button
          className="py-1 px-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition cursor-pointer text-sm"
          onClick={handleDelete}
        >
          Excluir
        </button>
      </div>
    </div>
  )
}

export default EmployeeShow
