require "test_helper"

class EmployeesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @employee = employees(:john_from_uol)
  end
  test "should get index" do
    get employees_url
    assert_response :success
  end

  test "should create employee" do
    assert_difference("Employee.count", 1) do
      post employees_url, params: {
        employee: {
          name: "New Employee",
          email: "new_employee@example.com",
          picture: "picture_url",
          company_id: companies(:uol).id
        }
      }, as: :json
    end

    assert_response :created

    json_response = JSON.parse(@response.body)
    assert_equal "new_employee@example.com", json_response["email"]
  end

  test "should show employee" do
    get employee_url(@employee)
    assert_response :success
  end


  test "should update employee" do
    patch employee_url(@employee), params: { employee: { name: "Atualizado" } }, as: :json
    assert_response :ok

    @employee.reload
    assert_equal "Atualizado", @employee.name
  end

  test "should destroy employee" do
    assert_difference("Employee.count", -1) do
      delete employee_url(@employee), as: :json
    end

    assert_response :no_content
  end
end
