class CreateResults < ActiveRecord::Migration
  def change
    create_table :results do |t|
      t.references :test
      t.string :status
      t.text :log
      t.string :recording

      t.timestamps
    end
  end
end
