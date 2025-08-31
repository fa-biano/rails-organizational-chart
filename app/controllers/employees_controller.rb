class EmployeesController < ApplicationController
  def index
    employees = Employee.all
    render json: employees
  end

  def show
    employee = Employee.find(params[:id])
    render json: employee
  end

  def create
    employee = Employee.new(employee_params)
    if employee.save
      render json: employee, status: :created
    else
      render json: employee.errors, status: :unprocessable_entity
    end
  end

  def update
    employee = Employee.find(params[:id])
    if employee.update(employee_params)
      render json: employee, status: :ok
    else
      render json: employee.errors, status: :unprocessable_entity
    end
  end

  def destroy
    employee = Employee.find(params[:id])
    if employee.destroy
      head :no_content
    else
      render json: employee.errors, status: :unprocessable_entity
    end
  end

  private

  def employee_params
    params.require(:employee).permit(:name, :email, :picture, :company_id)
  end
end
