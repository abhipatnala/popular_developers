class Api::V1::StatsController < ApplicationController

  def developer_stats
    render json: github_service.get_developer_stats
  end

  def repository_stats
    render json: github_service.get_repository_stats
  end

  private

  def github_service
    @github_service ||= GithubService.new(language, period)
  end

  def language
    @language ||= params[:language]
  end

  def period
    @period ||= params[:period]
  end

end
