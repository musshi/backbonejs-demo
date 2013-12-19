class Api::BooksController < ApplicationController
  skip_before_filter :verify_authenticity_token 
  
  def index
    render :json => Book.all
  end
  
  def create
    book = Book.new(params[:book].permit(:name, :author, :description))
    if book.save
      render :json => book
    else
      render :json => {:result => "failed"}
    end
  end
  
  def destroy
    book = Book.find(params[:id])
    book.destroy
    render :json => {:result => "ok"}
  end
  
  def update
    book = Book.find(params[:id])
    if book.update_attributes(params[:book].permit(:name, :author, :description))
      render :json => book
    else
      render :json => {:result => "failed"}
    end
  end
  
  def show
    book = Book.find(params[:id])
    render :json => book
  end
end
