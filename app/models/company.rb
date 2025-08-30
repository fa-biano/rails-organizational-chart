class Company < ApplicationRecord
  validates :name, presence: true
  has_many :employees, dependent: :destroy
end
