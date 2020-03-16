# frozen_string_literal: true

class FetchFbPostsJob < ApplicationJob
  queue_as :facebook

  def perform
    FacebookApiService.new.call
  end
end
