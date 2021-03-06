class CreateTests < ActiveRecord::Migration
  def change
    create_table :tests do |t|
      t.references :tenant, index: true
      t.references :mcp, index: true
      t.integer :status, :default => 0
      t.string :phone_number

      t.timestamps
    end
  end
end
