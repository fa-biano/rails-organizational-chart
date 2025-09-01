import { IEmployee } from './employee.type'

export interface ICompany {
  id: string
  name: string
  created_at: string
  updated_at: string
  employees?: IEmployee[]
}
