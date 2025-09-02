export interface IEmployee {
  id: string
  name: string
  email: string
  picture?: string
  company_id: string
  manager_id?: string
}

export interface IEmployeeFromDB extends IEmployee {
  created_at: string
  updated_at: string
}

export interface IEmployeeHierarchy extends IEmployeeFromDB {
  manager?: IEmployeeFromDB
  subordinates: IEmployeeFromDB[]
}

export type IEmployeeFormData = Pick<IEmployee, 'name' | 'email' | 'picture'> & {
  manager_email?: string
}
