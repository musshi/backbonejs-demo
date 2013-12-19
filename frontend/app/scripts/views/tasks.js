/*global frontend, Backbone, JST*/

BookStore.Views = BookStore.Views || {};

(function () {
    'use strict';

    BookStore.Views.TasksView = Backbone.View.extend({

        template: JST['app/scripts/templates/tasks.ejs']

    });

})();
