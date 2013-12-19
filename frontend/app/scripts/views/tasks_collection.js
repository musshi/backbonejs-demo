/*global BookStore, Backbone, JST*/

BookStore.Views = BookStore.Views || {};

(function () {
  'use strict';

  BookStore.Views.TasksCollectionView = Backbone.View.extend({    
    template: JST['app/scripts/templates/tasks_collection.ejs'],
    tagName: "tbody",
    
    initialize: function(options) {
      this.listenTo(this.collection, "add", this.addOne);
      this.tasksFormView = options.tasks_form_view;
    },
    
    render: function() {
      this.collection.forEach(this.addOne, this);
      return this;
    },
    
    addOne: function(tasks) {
      var tasksView = new BookStore.Views.tasksItemView({model: tasks, form_view: this.tasksFormView});
      this.$el.append(tasksView.render().el);
    }
  });
})();
