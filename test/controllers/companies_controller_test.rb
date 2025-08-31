require "test_helper"

class CompaniesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @company = companies(:uol)
  end

  test "should get index" do
    get companies_url
    assert_response :success
  end

  test "should get new" do
    get new_company_url
    assert_response :success
  end

test "should create company" do
  assert_difference("Company.count", 1) do
    post companies_url, params: { company: { name: "New Company" } }, as: :json
  end

  assert_response :created

  json_response = JSON.parse(@response.body)
  assert_equal "New Company", json_response["name"]
end


  test "should show company" do
    get company_url(@company)
    assert_response :success
  end
end
