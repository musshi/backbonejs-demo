class Api::TasksController < ApplicationController
   skip_before_filter :verify_authenticity_token 
   
  def index
    @list = List.find(params[:list_id])
    render :json => { tasks: @list.tasks, list_name: @list.name, list_id: @list.id }
  end
 
 def create
   @list = List.find(params[:list_id])
   @task = @list.tasks.create(params[:task].permit(:name)) # params[:task] == {:name => "abc", "active": true}
   render :json => @task
 end
 
 def destroy
   @list = List.find(params[:list_id])
   @task = @list.tasks.find(params[:id])  # params[:id] = 10
   @task.destroy 
   render :json => {:result => "ok"}
 end
 
 def update
   @list = List.find(params[:list_id])
   @task = @list.tasks.find(params[:id])
   if @task.update_tasks(params[:name])
     render :json => @task
   else
     render :json => {:result => "failed"}
   end
 end
 
 
 def find_list_by_taskid
   @task = Task.find(params[:id])
   render :json => { list_id: @task.list_id }
 end
 
 def update_complete
   @task = Task.find(params[:id])   
   if @task.toggle_completed
     render :json => {:result => "success"}
   else
     render :json => {:result => "failed"}
   end
 end

end