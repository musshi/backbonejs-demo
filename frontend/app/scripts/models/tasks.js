/*global frontend, Backbone*/

BookStore.Models = BookStore.Models || {};

(function () {
    'use strict';

    BookStore.Models.TasksModel = Backbone.Model.extend({
      // urlRoot: "/api/lists/:id/tasks"
      toggleSelected: function(){
        this.set('completed', !this.get("completed")); 
      }
    });

})();
