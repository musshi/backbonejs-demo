/*global frontend, Backbone*/

BookStore.Collections = BookStore.Collections || {};

(function () {
  'use strict';

    BookStore.Collections.TasksCollection = Backbone.Collection.extend({
      url: "/api/lists/:id/tasks",
      model: BookStore.Models.TasksModel,
      parse: function(response) {
        this.list_name = response.list_name;
        this.list_id = response.list_id;
        return response.tasks;
      }
    });

})();
