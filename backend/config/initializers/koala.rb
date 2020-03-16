Koala.configure do |config|
  config.access_token = ENV['FB_ACCESS_TOKEN']
  config.app_access_token = ENV['FB_APP_ACCESS_TOKEN']
  config.app_id = ENV['FB_APP_ID']
  config.app_secret = ENV['FB_APP_SECRET']
end