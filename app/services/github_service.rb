require 'httparty'

class GithubService
  include HTTParty
  base_uri 'github-trending-api.now.sh'

  default_timeout 10 # hard timeout after 10 second

  def initialize(language, period)
    @language = language
    @period = period
  end

  def developer_path
    "/developers?"
  end

   def repository_path
    "/repositories?"
  end


  def handle_timeouts
    begin
      yield
    rescue Net::OpenTimeout, Net::ReadTimeout
      {}
    end
  end

  def get_developer_stats
    handle_timeouts do
      url = "#{developer_path}language=#{ @language }&since=#{ @period }"
      self.class.get(url, {}).parsed_response
    end
  end

  def get_repository_stats
    handle_timeouts do
      url = "#{ repository_path }language=#{ @language }&since=#{ @period }"
      self.class.get(url, {}).parsed_response
    end
  end
end
