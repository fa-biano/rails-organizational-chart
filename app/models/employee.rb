class Employee < ApplicationRecord
  belongs_to :company

  belongs_to :manager, class_name: "Employee", optional: true
  has_many :subordinates, class_name: "Employee", foreign_key: "manager_id"

  validates :name, presence: true
  validates :email, presence: true, uniqueness: { scope: :company_id }

  validate :manager_cannot_be_self
  validate :manager_must_be_from_same_company
  validate :no_circular_management

  private

  def manager_cannot_be_self
    if manager_id.present? && manager_id == id
      errors.add(:manager_id, "cannot be self manager")
    end
  end

  def manager_must_be_from_same_company
    return if manager.nil?

    if manager.company_id != company_id
      errors.add(:manager_id, "manager must be from same company")
    end
  end

  def no_circular_management
    return unless manager&.manager_id.present?

    if manager.manager_id == id
      errors.add(:manager_id, "circular management with #{manager.name} not allowed")
    end
  end
end
