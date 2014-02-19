class CreateSettings < ActiveRecord::Migration
  def change
    create_table :settings do |t|
      t.string :smtp
      t.string :email

      t.timestamps
    end
  end
end
