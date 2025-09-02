class EmployeesController < ApplicationController
  def index
    employees = Employee.all
    render json: employees
  end

  def show
    employee = Employee.includes(:manager, :subordinates).find(params[:id])
    render json: employee.as_json(include: [ :manager, :subordinates ])
  end

  def create
    employee = Employee.new(employee_params)
    if employee.save
      render json: employee, status: :created
    else
      render json: employee.errors, status: :unprocessable_content
    end
  end

  def update
    employee = Employee.find(params[:id])
    if employee.update(employee_params)
      render json: employee, status: :ok
    else
      render json: employee.errors, status: :unprocessable_content
    end
  end

  def destroy
    employee = Employee.find(params[:id])
    if employee.destroy
      head :no_content
    else
      render json: employee.errors, status: :unprocessable_content
    end
  end

  def find_by_email
    employee = Employee.find_by(email: params[:email], company_id: params[:company_id])

    if employee.nil?
      render json: { error: "Email not found." }, status: :not_found
      return
    end
    render json: employee, status: :ok
  end

  private

  def employee_params
    params.require(:employee).permit(:name, :email, :picture, :company_id, :manager_id)
  end
end
