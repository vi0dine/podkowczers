# frozen_string_literal: true

source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '2.6.5'
gem 'rails', '~> 6.0.0'

gem 'bcrypt', '~> 3.1.7'
gem 'bootsnap', '>= 1.4.2', require: false
gem 'ed25519'
gem 'fast_jsonapi'
gem 'interactor', '~> 3.0'
gem 'jwt_sessions'
gem 'pg'
gem 'puma', '~> 3.11'
gem 'rack-cors'
gem 'redis', '~> 4.0'
gem 'rqrcode'
gem 'sidekiq', '~> 6.0', '>= 6.0.2'
gem 'wicked_pdf'
gem 'wkhtmltopdf-binary'

group :development, :test do
  gem 'byebug', platforms: %i[mri mingw x64_mingw]
  gem 'database_cleaner'
  gem 'dotenv-rails'
  gem 'factory_bot_rails'
  gem 'faker'
  gem 'hirb'
  gem 'rspec-rails', '~> 3.8'
end

group :test do
  gem 'nyan-cat-formatter'
  gem 'rack-test'
  gem 'shoulda-matchers'
end

group :development do
  gem 'listen', '>= 3.0.5', '< 3.2'
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
end

gem 'tzinfo-data', platforms: %i[mingw mswin x64_mingw jruby]
