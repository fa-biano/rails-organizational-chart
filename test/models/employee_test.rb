require "test_helper"

class EmployeeTest < ActiveSupport::TestCase
  setup do
    @company = companies(:uol)
  end

  test "should be valid with a name and email" do
    employee = employees(:john_from_uol)
    assert employee.valid?
  end

  test "should not be valid without a name" do
    employee = Employee.new(name: nil, email: "john@example.com", company: @company)
    assert_not employee.valid?
    assert employee.errors[:name].any?
  end

  test "should not be valid without an email" do
    employee = Employee.new(name: "John Doe", email: nil, company: @company)
    assert_not employee.valid?
    assert employee.errors[:email].any?
  end

  test "should not be valid with a duplicate email" do
    Employee.create(name: "Jane Doe", email: "jane@example.com", company: @company)
    duplicate_employee = Employee.new(name: "Another Jane", email: "jane@example.com", company: @company)
    assert_not duplicate_employee.valid?
    assert_includes duplicate_employee.errors[:email], "has already been taken"
  end
end
