class Api::ListsController < ApplicationController
  skip_before_filter :verify_authenticity_token 
  
  def index
    render json: List.all
  end
   
  def create
    @list = List.new(params[:list].permit(:name, :tasks))
    if @list.save
      render :json => @list
    else
      render :json => {:result => "failed"}
    end
  end
  
  def update
    @list = List.find(params[:id])
    if @list.update_attributes(params[:list].permit(:name, :tasks))
      render :json => @list
    else
      render :json => {:result => "failed"}
    end
  end
  
  def destroy
    @list = List.find(params[:id])
    @list.destroy
    render :json => {:result => "ok"}
  end
  
  def show
    @list = List.find(params[:id])
    render :json => @list
  end
  
  def update_reorder_position
     @list = List.find(params[:id].to_i)
     # @list.update_attributes(params[:list].permit(:tasks))
     tasks = params[:list][:tasks]    
     # puts tasks
     tasks.each do |k,v|
       # puts v
       task = @list.tasks.find(v["id"].to_i)
       if task.present?
         puts task.id
         puts task.position
         # task.update_attribute(:position => v["position"].to_i)
         task.position = v["position"].to_i
         task.save()
       end 
     end   
     render :json => {:result => "successful"}
    
  end
end
