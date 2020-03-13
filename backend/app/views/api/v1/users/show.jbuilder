json.user do
  json.id @user.id
  json.email @user.email
  json.coins @user.coins_count
  json.tickets @user.tickets
  json.reservations @user.user_reservations
end