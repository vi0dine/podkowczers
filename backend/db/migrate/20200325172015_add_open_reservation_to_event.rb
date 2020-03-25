class AddOpenReservationToEvent < ActiveRecord::Migration[6.0]
  def change
    add_column :events, :reservation_open, :boolean, default: false
    add_column :events, :reservation_opened_at, :datetime
  end
end
