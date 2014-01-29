class CreateMcps < ActiveRecord::Migration
  def change
    create_table :mcps do |t|
      t.string :ip_address

      t.timestamps
    end
  end
end
