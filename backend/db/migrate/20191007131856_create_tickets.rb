class CreateTickets < ActiveRecord::Migration[6.0]
  def change
    create_table :tickets do |t|
      t.string :sector
      t.integer :row
      t.integer :seat
      t.boolean :reserved, default: false
      t.boolean :mailed, default: false
      t.string :qr_code
      t.belongs_to :user
      t.belongs_to :event
      t.timestamps
    end

    add_index :tickets, %i[event_id sector row seat]
  end
end
