json.posts do
  json.array! @posts do |post|
    json.id post.id
    json.body post.body
    json.attachments post.attachments
    json.permalink post.permalink
    json.created_at post.created_time
  end
end