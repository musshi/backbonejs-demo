/*global BookStore, Backbone, JST*/

BookStore.Views = BookStore.Views || {};

(function () {
  'use strict';

  BookStore.Views.tasksItemView = Backbone.View.extend({
    template: JST['app/scripts/templates/tasks_item.ejs'],
    tagName: "tr",
    events: {
      "click button.remove-button"  : "removeTasks",
      "click button.edit-button"    : "editTasks",
      "click p.item-task input"     : "changecompleted",
      "click button.reorder-button" : "reorderTasks"
    },
    
    initialize: function(options) {
      this.listenTo(this.model, "remove", this.remove);
      this.listenTo(this.model, "change", this.render);
      this.listenTo(this.model, "change:completed", this.render);
      this.formView = options.form_view;
    },
            
    render: function() {
      this.$el.html(this.template(this.model.attributes));
      return this;
    },
        
    editTasks: function(event) {
      event.preventDefault();
      Backbone.history.navigate('#list/tasks-' + this.model.get('id') + "/edit", true);
      this.formView.loadTasks(this.model);
    },
    
    reorderTasks: function(event){
      event.preventDefault();
      var list_id = $("#books_container h5").attr("data-id");
      Backbone.history.navigate('#list/' + list_id + '/tasks/' + this.model.get('id') + "/reorder", true);
      this.formView.loadTasks(this.model);
    },
    
    removeTasks: function(event) {
      var confirm = window.confirm("Are you sure that you want to delete this tasks?");
      if(confirm) {
        this.model.destroy();
      }//end if
    },
    
    changecompleted: function(event){
      var task_id = parseInt(this.model.get("id"));
      var _this = this;
      var taskUpdateCompleteModel = new BookStore.Models.TasksModel();
      taskUpdateCompleteModel.url = "/api/tasks/update_complete";
      taskUpdateCompleteModel.fetch({
        type: "POST",
        data: {id: task_id}, 
        success: function() {
          _this.model.toggleSelected();
          _this.model.trigger("toggleStatus", _this.model);
        },
        error: function(){ }
      });
    },
    
  });
})();
