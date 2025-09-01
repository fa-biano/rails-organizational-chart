import React from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import CompaniesIndex from './components/companies/CompaniesIndex'
import NewCompanyForm from './components/companies/NewCompanyForm'
import CompanyShow from './components/companies/CompanyShow'
import EmployeeNew from './components/employees/EmployeeNew'
import EmployeeEdit from './components/employees/EmployeeEdit'

const root = createRoot(document.getElementById("root")!)

root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<CompaniesIndex />} />
      <Route path="/companies" element={<NewCompanyForm />} />
      <Route path="/companies/:company_id" element={<CompanyShow />} />
      <Route path="/companies/:company_id/employees" element={<EmployeeNew />} />
      <Route path="/companies/:company_id/employees/:employee_id" element={<EmployeeEdit />} />
    </Routes>
  </BrowserRouter>
)
