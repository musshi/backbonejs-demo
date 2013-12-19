/*global BookStore, Backbone*/

BookStore.Routers = BookStore.Routers || {};


(function () {
  'use strict';

  BookStore.Routers.AppRouter = Backbone.Router.extend({
    el: "#application_view_start_point",
    routes: {
      "lists-:id/edit" : "editlist",
      "list/tasks-:id/edit" : "edittask",    
      "": "index",
      "lists": "lists",
      "lists/:id/tasks": "taskShow"
    },

    editlist: function(listId) {
      var _this = this;
      this.lists(function() {
        var list = _this.listCollection.findWhere({id: parseInt(listId, 10)});
        _this.listFormView.loadList(list);
      });
    },
    
    edittask: function(tasksId) {
      var _this = this;
      this.taskListModel = new BookStore.Models.TasksModel();
      this.taskListModel.url = "/api/tasks/find_list_by_taskid/" + tasksId;
      this.taskListModel.fetch({
        success: function(model, response) {
          var list_id = parseInt(model.get("list_id"));
          _this.taskShow(list_id, function() {
            var tasks = _this.tasksCollection.findWhere({id: parseInt(tasksId, 10)});
            _this.tasksFormView.loadTasks(tasks);
          })
        }
      });      
    },
    
    index: function(callback) {
      var _this = this;
      this.booksCollection = new BookStore.Collections.BooksCollection();
      this.booksCollection.fetch({
        success: function(collection, response, options) {
          _this.bookFormView = new BookStore.Views.BookFormView({collection: collection});
          $(_this.el).find("#book_form_container").html(_this.bookFormView.render().el);
                    
          var booksCollectionView = new BookStore.Views.BooksCollectionView({collection: collection, book_form_view: _this.bookFormView});
          $(_this.el).find("table#books_table_listing").html(booksCollectionView.render().el);
          
          if(typeof(callback) === "function") {
            callback.call();
          }//end if
        }
      });
    },
    
    lists: function(){
      this.listsCollection = new BookStore.Collections.ListsCollection();
      var _this = this;
      this.listsCollection.fetch({
        success: function(collection, response, options) {
          _this.listFormView = new BookStore.Views.ListFormView({collection: collection});
          $(_this.el).find("#book_form_container").html(_this.listFormView.render().el);
          
          var listsCollectionView = new BookStore.Views.ListCollectionView({collection: collection, list_form_view: _this.listFormView});
           $(_this.el).find("table#books_table_listing").html(listsCollectionView.render().el);
           
           if(typeof(callback) === "function") {
             callback.call();
           }//end if
        }     
      });
    },
  
    taskShow: function(id, callback) {
      var _this = this;
      this.tasksCollection = new BookStore.Collections.TasksCollection();
      this.tasksCollection.url = "/api/lists/" +  id + "/tasks";
      this.tasksCollection.fetch({
        success: function(collection, response, options) {
          _this.tasksFormView = new BookStore.Views.TasksFormView({collection: collection});
          $(_this.el).find("#book_form_container").html(_this.tasksFormView.render().el);
          var tasksCollectionView = new BookStore.Views.TasksCollectionView({collection: collection, tasks_form_view: _this.tasksFormView});
           $(_this.el).find("table#books_table_listing").html(tasksCollectionView.render().el);
           
            $(_this.el).find("#books_container h5").html(collection.list_name);
            $(_this.el).find("#books_container h5").attr("data-id", id);
           
           if(typeof(callback) === "function") {
             callback.call();
           }//end if
        }
      });
    }     
  });
})();
