Backend::Application.routes.draw do
  get "/api/tasks/find_list_by_taskid/:id", :controller => "api/tasks", action: :find_list_by_taskid
  post "/api/tasks/update_complete", :controller => "api/tasks", action: :update_complete
  # put "/api/lists/update_reorder_position", :controller => "api/lists", action: :update_reorder_position
  
  namespace :api do
    resources :books
    resources :lists do
      member do
        put 'update_reorder_position'
      end
      resources :tasks
    end
  end
end
