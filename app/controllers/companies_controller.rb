class CompaniesController < ApplicationController
  # protect_from_forgery with: :null_session
  def index
    @companies = Company.all
    render json: @companies
  end

  def new
  end

  def create
    @company = Company.new(company_params)
    if @company.save
      render json: @company, status: :created
    else
      render json: @company.errors, status: :unprocessable_entity
    end
  end

  def show
    @company = Company.find(params[:id])
    render json: @company
  end

  def company_params
    params.require(:company).permit(:name)
  end
end
