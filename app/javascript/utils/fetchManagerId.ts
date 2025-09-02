export const fetchManagerId = async (managerEmail: string = '', companyId: string = ''): Promise<string> => {
  if (!managerEmail) return ''
  const url = `/api/employees/find_by_email?email=${managerEmail}&company_id=${companyId}`
  
  const managerResponse = await fetch(url)
  if (!managerResponse.ok) throw new Error('Gestor não encontrado ou email inválido')
  
  const manager = await managerResponse.json()
  return manager.id
}
