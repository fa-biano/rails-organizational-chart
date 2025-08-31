import React from "react"
import { createRoot } from "react-dom/client"
import App from "./components/App"
import NewCompanyForm from './components/companies/NewCompanyForm'
import CompaniesIndex from './components/companies/CompaniesIndex'
import CompanyShow from './components/companies/CompanyShow'

document.addEventListener("DOMContentLoaded", () => {
  const rootElement = document.getElementById("root")
  if (rootElement) {
    createRoot(rootElement).render(<App />)
  }

  const newCompanyForm = document.getElementById("new-company-form")
  if (newCompanyForm) {
    createRoot(newCompanyForm).render(<NewCompanyForm />)
  }

  const companiesIndexElement = document.getElementById("companies-index")
  if (companiesIndexElement) {
    createRoot(companiesIndexElement).render(<CompaniesIndex />)
  }

  const companyDiv = document.getElementById("companies-show")
  if (companyDiv) {
    const companyId = companyDiv.dataset.companyId!
    createRoot(companyDiv).render(<CompanyShow companyId={companyId} />)
  }
})
