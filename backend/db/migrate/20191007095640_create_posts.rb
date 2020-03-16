class CreatePosts < ActiveRecord::Migration[6.0]
  def change
    create_table :posts do |t|
      t.text :body
      t.json :attachments
      t.string :permalink
      t.datetime :created_time
      t.timestamps
    end
  end
end
