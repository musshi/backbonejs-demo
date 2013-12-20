Backend::Application.routes.draw do
  get "/api/tasks/find_list_by_taskid/:id", :controller => "api/tasks", action: :find_list_by_taskid
  post "/api/tasks/update_complete", :controller => "api/tasks", action: :update_complete
  
  namespace :api do
    resources :books
    resources :lists do
      resources :tasks
    end
  end
end
