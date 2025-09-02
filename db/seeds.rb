# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# db/seeds.rb

# Clean existing data
Employee.delete_all
Company.delete_all

# Create companies
companies = [
  { id: "07c44c09-596a-4554-9740-6653c4ae33ed", name: "Minha Empresa" },
  { id: "115837fb-0e42-4e87-8490-b8db49573448", name: "Google" },
  { id: "67521dbe-6c35-4091-a028-81f3c5430fd7", name: "AWS" }
]

companies.each do |c|
  Company.create!(c)
end

employees = [
  {
    id: "03a0fb56-fe5f-4ebf-8c8b-28464b910892",
    name: "Ronaldo",
    email: "ronaldo@aws.com",
    picture: "",
    company_id: "67521dbe-6c35-4091-a028-81f3c5430fd7",
    created_at: "2025-09-01T00:41:01.442Z",
    updated_at: "2025-09-01T00:41:01.442Z",
    manager_id: nil
  },
  {
    id: "e9a05bc8-355b-49a4-aa6a-87636a4d0b09",
    name: "Joao Google 1",
    email: "joao1@google.com",
    picture: "",
    company_id: "115837fb-0e42-4e87-8490-b8db49573448",
    created_at: "2025-09-01T03:40:27.455Z",
    updated_at: "2025-09-01T03:40:27.455Z",
    manager_id: nil
  },
  {
    id: "f7fccb7f-caf8-46a9-82f9-8b35628a5ead",
    name: "Esse é meu Patrão",
    email: "email_do_chefe@uol.com",
    picture: "",
    company_id: "07c44c09-596a-4554-9740-6653c4ae33ed",
    created_at: "2025-09-01T03:51:27.488Z",
    updated_at: "2025-09-01T03:51:27.488Z",
    manager_id: nil
  },
  {
    id: "7e992b9e-d2cd-4adb-977c-526a08ab1f1b",
    name: "Fabiano de Souza",
    email: "fabiano_dev@uol.com",
    picture: "",
    company_id: "07c44c09-596a-4554-9740-6653c4ae33ed",
    created_at: "2025-08-31T23:14:39.847Z",
    updated_at: "2025-09-02T04:21:47.361Z",
    manager_id: "f7fccb7f-caf8-46a9-82f9-8b35628a5ead"
  },
  {
    id: "332d86f4-2fd3-4716-983a-a49721fe7f2c",
    name: "Joao Teste 5",
    email: "joao5@teste.com",
    picture: "",
    company_id: "07c44c09-596a-4554-9740-6653c4ae33ed",
    created_at: "2025-09-01T01:11:33.358Z",
    updated_at: "2025-09-02T04:22:07.784Z",
    manager_id: "f7fccb7f-caf8-46a9-82f9-8b35628a5ead"
  },
  {
    id: "45f7321f-0531-4479-8b88-fe6a1006a3f9",
    name: "Joao Teste 3",
    email: "joao3@teste.com",
    picture: "",
    company_id: "07c44c09-596a-4554-9740-6653c4ae33ed",
    created_at: "2025-09-01T03:37:29.179Z",
    updated_at: "2025-09-02T04:22:33.518Z",
    manager_id: "f7fccb7f-caf8-46a9-82f9-8b35628a5ead"
  },
  {
    id: "ff167406-af70-4275-95e6-acb0d79f582e",
    name: "Joao Teste 2",
    email: "joao2@teste.com",
    picture: "",
    company_id: "07c44c09-596a-4554-9740-6653c4ae33ed",
    created_at: "2025-09-01T03:37:03.793Z",
    updated_at: "2025-09-02T04:27:44.351Z",
    manager_id: "7e992b9e-d2cd-4adb-977c-526a08ab1f1b"
  },
  {
    id: "61d6c709-b22f-4893-966a-d938d6e3004a",
    name: "Atualizado Teste 6",
    email: "teste6@teste.com",
    picture: "",
    company_id: "07c44c09-596a-4554-9740-6653c4ae33ed",
    created_at: "2025-09-01T23:12:56.824Z",
    updated_at: "2025-09-01T23:39:25.330Z",
    manager_id: nil
  },
  {
    id: "c39a312d-bf03-4cbb-ba10-fe12391ae0d9",
    name: "Funcionario do Google",
    email: "aaaaaaa@google.com",
    picture: "",
    company_id: "115837fb-0e42-4e87-8490-b8db49573448",
    created_at: "2025-09-01T23:44:47.419Z",
    updated_at: "2025-09-01T23:44:47.419Z",
    manager_id: nil
  },
  {
    id: "2abd8523-9f94-4390-bbbf-75a2a0c4d05e",
    name: "Teste da Silva Sauro",
    email: "bota_um_email_grande_pra_caramba@testecompany.com",
    picture: "",
    company_id: "07c44c09-596a-4554-9740-6653c4ae33ed",
    created_at: "2025-09-01T00:56:32.007Z",
    updated_at: "2025-09-02T02:40:07.315Z",
    manager_id: "7e992b9e-d2cd-4adb-977c-526a08ab1f1b"
  },
  {
    id: "bca11240-8645-4a6a-a00c-06c6ec2a35da",
    name: "Liderado 2_2",
    email: "liderado22@teste.com",
    picture: "",
    company_id: "07c44c09-596a-4554-9740-6653c4ae33ed",
    created_at: "2025-09-02T04:24:28.320Z",
    updated_at: "2025-09-02T04:24:28.320Z",
    manager_id: "2abd8523-9f94-4390-bbbf-75a2a0c4d05e"
  },
  {
    id: "fa53b5fc-e74a-43ff-82e4-ee7d2765eaae",
    name: "Liderado 2_3",
    email: "liderado23@teste.com",
    picture: "",
    company_id: "07c44c09-596a-4554-9740-6653c4ae33ed",
    created_at: "2025-09-02T04:24:48.324Z",
    updated_at: "2025-09-02T04:24:48.324Z",
    manager_id: "2abd8523-9f94-4390-bbbf-75a2a0c4d05e"
  },
  {
    id: "7b3dcb3c-a7f6-4d93-952b-0e38deef28b6",
    name: "Liderado 2_1",
    email: "liderado21@teste.com",
    picture: "",
    company_id: "07c44c09-596a-4554-9740-6653c4ae33ed",
    created_at: "2025-09-02T04:23:35.123Z",
    updated_at: "2025-09-02T04:28:08.445Z",
    manager_id: "ff167406-af70-4275-95e6-acb0d79f582e"
  }
]

employees.each do |e|
  Employee.create!(e)
end

puts "Seed data loaded successfully!"
