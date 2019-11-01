class CreateUsers < ActiveRecord::Migration[6.0]
  def change
    create_table :users do |t|
      t.string :email, unique: true
      t.string :password_digest
      t.integer :role, default: 0
      t.integer :coins_count, default: 0
      t.timestamps
    end
  end
end
