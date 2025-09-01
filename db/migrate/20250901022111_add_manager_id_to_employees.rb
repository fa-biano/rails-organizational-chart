class AddManagerIdToEmployees < ActiveRecord::Migration[8.0]
  def change
    add_column :employees, :manager_id, :uuid
    add_index :employees, :manager_id
    add_foreign_key :employees, :employees, column: :manager_id, on_delete: :nullify
  end
end
