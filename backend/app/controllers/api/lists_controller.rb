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
  
end
