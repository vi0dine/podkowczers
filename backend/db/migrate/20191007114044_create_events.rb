class CreateEvents < ActiveRecord::Migration[6.0]
  def change
    create_table :events do |t|
      t.string :place
      t.datetime :starts_at
      t.integer :estimated_length
      t.belongs_to :concert
      t.timestamps
    end
  end
end
