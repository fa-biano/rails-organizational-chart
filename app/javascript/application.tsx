import React from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import CompaniesIndex from './components/companies/CompaniesIndex'
import NewCompanyForm from './components/companies/NewCompanyForm'
import CompanyShow from './components/companies/CompanyShow'

const root = createRoot(document.getElementById("root")!)

root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<CompaniesIndex />} />
      <Route path="/companies/new" element={<NewCompanyForm />} />
      <Route path="/companies/:id" element={<CompanyShow />} />
    </Routes>
  </BrowserRouter>
)
