import React, { useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import Tree from 'react-d3-tree'
import { IEmployeeFromDB } from '../../types/employee.type'
import { ICompany } from '../../types/company.type'

interface IOrgChartNode {
  name: string
  attributes?: {
    email: string
    id: string
    role?: string
  }
  children?: IOrgChartNode[]
}

const EmployeeOrgChart: React.FC = () => {
  const { company_id, employee_id } = useParams()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [treeData, setTreeData] = useState<IOrgChartNode[]>([])

  const buildEmployeeTree = useCallback((employees: IEmployeeFromDB[], employeeId: string) => {
    const nodes = employees.reduce((acc, emp) => {
      acc[emp.id] = {
        name: emp.name,
        attributes: { email: emp.email, id: emp.id },
        children: []
      }
      return acc
    }, {} as { [key: string]: IOrgChartNode })

    const currentEmployee = employees.find(emp => emp.id === employeeId)
    if (!currentEmployee) return []

    const rootNode: IOrgChartNode[] = []
    let centralNode: IOrgChartNode = {
      name: currentEmployee.name,
      attributes: { email: currentEmployee.email, id: currentEmployee.id, role: 'Colaborador(a) Atual' },
      children: []
    }

    const directReports = employees.filter(emp => emp.manager_id === currentEmployee.id)
    directReports.forEach(report => {
      const reportNode: IOrgChartNode = {
        name: report.name,
        attributes: { email: report.email, id: report.id, role: 'Liderado Direto' },
        children: []
      }
      const secondLevelReports = employees.filter(emp => emp.manager_id === report.id)
      secondLevelReports.forEach(secReport => {
        reportNode.children?.push({
          name: secReport.name,
          attributes: { email: secReport.email, id: secReport.id, role: 'Liderado 2º Nível' }
        })
      })
      centralNode.children?.push(reportNode)
    })

    const manager = employees.find(emp => emp.id === currentEmployee.manager_id)
    if (manager) {
      const peers = employees.filter(emp => emp.manager_id === manager.id && emp.id !== currentEmployee.id)
      const managerNode: IOrgChartNode = {
        name: manager.name,
        attributes: { email: manager.email, id: manager.id, role: 'Gestor(a)' },
        children: []
      }
      managerNode.children?.push(centralNode)
      peers.forEach(peer => {
        managerNode.children?.push({
          name: peer.name,
          attributes: { email: peer.email, id: peer.id, role: 'Par' }
        })
      })
      rootNode.push(managerNode)
    } else {
      rootNode.push(centralNode)
    }

    return rootNode
  }, [])

  useEffect(() => {
    const fetchAndBuildTree = async () => {
      setLoading(true)
      try {
        const response = await fetch(`/api/companies/${company_id}.json`)
        if (!response.ok) {
          throw new Error('Erro ao carregar colaboradores')
        }

        const companyData: ICompany = await response.json()
        const employeesData: IEmployeeFromDB[] = companyData.employees || []
        const newTreeData = buildEmployeeTree(employeesData, employee_id || '')
        setTreeData(newTreeData)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    if (company_id && employee_id) {
      fetchAndBuildTree()
    }
  }, [company_id, employee_id, buildEmployeeTree])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <span className="text-gray-500 text-lg animate-pulse">Carregando organograma...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-96">
        <span className="text-red-600 font-medium">{error}</span>
      </div>
    )
  }

  if (treeData.length === 0) {
    return <p className="text-center mt-8">Nenhum dado de organograma encontrado.</p>
  }

  <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Organograma do Colaborador(a)</h1>


  return (
    <main className="max-w-6xl mx-auto px-4 py-8 bg-white rounded-xl shadow-lg border border-gray-200">
      <h1 className="text-2xl font-bold mb-4 text-center">Organograma do Colaborador(a)</h1>
      <div className="w-full h-[600px] bg-gray-50 border border-gray-300 rounded-lg overflow-hidden">
        <Tree
          data={treeData}
          translate={{ x: 300, y: 50 }}
          orientation="vertical"
          zoomable={true}
          collapsible={true}
          pathFunc="step"
          nodeSize={{ x: 200, y: 150 }}
          renderCustomNodeElement={({ nodeDatum, toggleNode }) => (
            <g>
              <rect
                x={-100}
                y={-40}
                width={200}
                height={80}
                rx={12}
                fill={
                  nodeDatum.attributes?.role === 'Colaborador(a) Atual'
                    ? '#e0f2fe'
                    : nodeDatum.attributes?.role === 'Gestor(a)'
                    ? '#fef3c7'
                    : nodeDatum.attributes?.role === 'Liderado Direto'
                    ? '#ede9fe'
                    : nodeDatum.attributes?.role === 'Liderado 2º Nível'
                    ? '#f0fdf4'
                    : '#f3f4f6'
                }
                stroke="#d1d5db"
                strokeWidth={1.5}
                onClick={toggleNode}
              />
              <text className="font-semibold" x="0" y="-10" textAnchor="middle" fill="#111827">
                {nodeDatum.name}
              </text>
              <text className="text-sm" x="0" y="10" textAnchor="middle" fill="#6b7280">
                {nodeDatum.attributes?.role}
              </text>
            </g>
          )}
        />
      </div>
    </main>
  )
}

export default EmployeeOrgChart
