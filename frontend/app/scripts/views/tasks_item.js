/*global BookStore, Backbone, JST*/

BookStore.Views = BookStore.Views || {};

(function () {
  'use strict';

  BookStore.Views.tasksItemView = Backbone.View.extend({
    
    template: JST['app/scripts/templates/tasks_item.ejs'],
    tagName: "tr",
    events: {
      "click button.remove-button": "removeTasks",
      "click button.edit-button"  : "editTasks",
      "change p.item-task input"  : "changecompleted"
    },
    
    initialize: function(options) {
      this.listenTo(this.model, "remove", this.remove);
      this.listenTo(this.model, "change", this.render);
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
    
    removeTasks: function(event) {
      var confirm = window.confirm("Are you sure that you want to delete this tasks?");
      if(confirm) {        
        this.model.destroy();
      }//end if
    },
    // changecompleted: function{
 //      
 //      
 //    },
    
  });
})();
