class CompaniesController < ApplicationController
  def index
    @companies = Company.all

    respond_to do |format|
      format.html
      format.json { render json: @companies }
    end
  end

  def new
  end

  def create
    company = Company.new(company_params)
    if company.save
      render json: company, status: :created
    else
      render json: company.errors, status: :unprocessable_entity
    end
  end

  def show
    company = Company.includes(:employees).find(params[:id])
    render json: company.as_json(include: :employees)
  end

  private

  def company_params
    params.require(:company).permit(:name)
  end
end
