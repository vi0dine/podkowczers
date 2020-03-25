class AddNotificationTokenToTheUser < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :notifications_token, :string
  end
end
