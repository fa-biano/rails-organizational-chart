class CreateEmployees < ActiveRecord::Migration[8.0]
  def change
    create_table :employees, id: :uuid do |t|
      t.string :name
      t.string :email
      t.string :picture
      # t.uuid :company_id, null: false
      t.references :company, null: false, foreign_key: true, type: :uuid

      t.timestamps
    end

    # add_foreign_key :employees, :companies
    # add_index :employees, :company_id
  end
end
