Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get 'developer_stats', action: :developer_stats, controller: 'stats'
      get 'repository_stats', action: :repository_stats, controller: 'stats'
    end
  end
end
