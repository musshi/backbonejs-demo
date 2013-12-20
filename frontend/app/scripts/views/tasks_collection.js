/*global BookStore, Backbone, JST*/

BookStore.Views = BookStore.Views || {};

(function () {
  'use strict';

  BookStore.Views.TasksCollectionView = Backbone.View.extend({    
    template: JST['app/scripts/templates/tasks_collection.ejs'],
    tagName: "tbody",
    
    initialize: function(options) {
      
      this.otherCollection = options.otherCollection;
      this.listenTo(this.collection, "add", this.addOne);
      this.listenTo(this.collection, "toggleStatus", this.removeFromCollection);
      this.listenTo(this.collection, "remove", this.render);
      this.tasksFormView = options.tasks_form_view;
    },
    
    removeFromCollection: function(task) {
      this.collection.remove(task);
      this.otherCollection.add(task);
    },
    
    render: function() {
      this.$el.html("");
      this.collection.forEach(this.addOne, this);
      return this;
    },
    
    addOne: function(tasks) {
      var tasksView = new BookStore.Views.tasksItemView({model: tasks, form_view: this.tasksFormView});
      this.$el.append(tasksView.render().el);
    }
  });
})();
