class CreateReviews < ActiveRecord::Migration[6.0]
  def change
    create_table :reviews do |t|
      t.string :title
      t.text :body
      t.integer :rate
      t.belongs_to :user
      t.belongs_to :event
      t.timestamps
    end

    add_index :reviews, %i[user_id event_id]
  end
end
