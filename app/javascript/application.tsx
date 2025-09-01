import React from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import CompaniesIndex from './components/companies/CompaniesIndex'
import NewCompanyForm from './components/companies/NewCompanyForm'
import CompanyShow from './components/companies/CompanyShow'
import EmployeeNew from './components/employees/EmployeeNew'

const root = createRoot(document.getElementById("root")!)

root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<CompaniesIndex />} />
      <Route path="/companies" element={<NewCompanyForm />} />
      <Route path="/companies/:id" element={<CompanyShow />} />
      <Route path="/companies/:id/employees" element={<EmployeeNew />} />
    </Routes>
  </BrowserRouter>
)
