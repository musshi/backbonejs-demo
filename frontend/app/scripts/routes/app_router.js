/*global BookStore, Backbone*/

BookStore.Routers = BookStore.Routers || {};


(function () {
  'use strict';

  BookStore.Routers.AppRouter = Backbone.Router.extend({
    el: "#application_view_start_point",
    routes: {
      "lists-:id/edit" : "editlist",
      "list/tasks-:id/edit" : "edittask",    
      "list/tasks-:id/reorder" : "reordertasks",   
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
    
    reordertasks: function(taskId){
      $("#books_table_listing1").hide();
      var myHash = [];
      var listHash = {};
      $("#reorder").sortable({
         stop: function(event, ui) {
           $("#reorder").children('tr').each(function (index, element) {
            var dataTaskId = $(this).find('input:first').attr("value"); 
            myHash.push({"id": dataTaskId, "position": index});        
                      
          });
          
          listHash["list"] = {"tasks": myHash};   
          var listId = ui.item.parent().parent().data("id");
          var taskItemUnCompletedCollection = new BookStore.Collections.TasksCollection();
          taskItemUnCompletedCollection.url = "/api/lists/" + listId + "/update_reorder_position";
          console.log(listHash);   
          taskItemUnCompletedCollection.fetch({
            type: "PUT", 
            data: listHash, 
            success: function() {            
            },
          });
        }
        });
      $("#reorder").disableSelection();
    },
    
    index: function(callback) {
      $("#books_table_listing1").show();
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
      $("#books_table_listing1").show();
      this.listsCollection = new BookStore.Collections.ListsCollection();
      var _this = this;
      this.listsCollection.fetch({
        success: function(collection, response, options) {
          _this.listFormView = new BookStore.Views.ListFormView({collection: collection});
          $(_this.el).find("#book_form_container").html(_this.listFormView.render().el);
          
          var listsCollectionView = new BookStore.Views.ListCollectionView({collection: collection, list_form_view: _this.listFormView});
          $("#books_table_listing2").hide();
          $(_this.el).find("table#books_table_listing1").html(listsCollectionView.render().el);
           
           if(typeof(callback) === "function") {
             callback.call();
           }//end if
        }     
      });
    },
  
    taskShow: function(id, callback) {
      $("#books_table_listing2").show();
      $("#books_table_listing1").show();
      var _this = this;
      this.tasksCollection = new BookStore.Collections.TasksCollection();
      this.tasksCollection.url = "/api/lists/" +  id + "/tasks";
      this.tasksCollection.fetch({
        success: function(collection, response, options) {
          var array1 = [];
          var array2 = [];
          for(var i = 0; i < collection.length; i++) {
            if(collection.models[i].get("completed")) {
              array1.push(collection.models[i]);
            }
            else {
              array2.push(collection.models[i]);
            }
          }
      
          var taskItemCompletedCollection = new BookStore.Collections.TasksCollection(array1);
          var taskItemUnCompletedCollection = new BookStore.Collections.TasksCollection(array2);
          
          _this.tasksFormView = new BookStore.Views.TasksFormView({collection: taskItemUnCompletedCollection});
          $(_this.el).find("#book_form_container").html(_this.tasksFormView.render().el);
          
          var tasksCollectionViewC = new BookStore.Views.TasksCollectionView({collection: taskItemCompletedCollection, tasks_form_view: _this.tasksFormView, otherCollection: taskItemUnCompletedCollection});
          
          var tasksCollectionViewU = new BookStore.Views.TasksCollectionView({collection: taskItemUnCompletedCollection, tasks_form_view: _this.tasksFormView, otherCollection: taskItemCompletedCollection});
          
           $(_this.el).find("table#books_table_listing2").html(tasksCollectionViewU.render().el);
           // console.log(tasksCollectionViewU.render().el);
           $(_this.el).find("table#books_table_listing1").html(tasksCollectionViewC.render().el);
           
            $(_this.el).find("#books_container h5").html(collection.list_name);
            $(_this.el).find("#books_container h5").attr("data-id", id);
            
            $(_this.el).find("#books_container table").attr("data-id", id);
           
           if(typeof(callback) === "function") {
             callback.call();
           }//end if
        }
      });
    },  
  });
})();
