require "test_helper"

class CompanyTest < ActiveSupport::TestCase
  test "should be valid with a name" do
    company = Company.new(name: "Tech Solutions")
    assert company.valid?
  end

  test "should not be valid without a name" do
    company = Company.new(name: nil)
    assert_not company.valid?
    assert company.errors[:name].any?
  end
end
