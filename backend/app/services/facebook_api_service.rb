class FacebookApiService
  def initialize
    @graph = Koala::Facebook::API.new
    @feed = @graph.get_connections('157457481027199', 'feed?fields=attachments{media,subattachments,type},message,created_time,permalink_url')
  end

  def call
    @feed.each do |post|
      post.deep_symbolize_keys!

      attachments = []

      post[:attachments][:data].each do |attachment|
        if attachment[:subattachments]
          attachment[:subattachments][:data].each do |attachment|
            puts attachment
            attachments << { type: attachment.dig(:type), src: attachment.dig(:media, :image, :src) }
          end
        else
          puts attachment
          attachments << { type: attachment.dig(:type), src: attachment.dig(:media, :source) || attachment.dig(:media, :image, :src) }
        end
      end

      Post.create(
          body: post[:message],
          permalink: post[:permalink_url],
          created_time: post[:created_time],
          attachments: { media: attachments }
      )
    end
  end
end