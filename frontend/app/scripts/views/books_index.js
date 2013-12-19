/*global BookStore, Backbone, JST*/

BookStore.Views = BookStore.Views || {};

(function () {
  'use strict';

  BookStore.Views.BooksIndexView = Backbone.View.extend({

    template: JST['app/scripts/templates/books_index.ejs']

  });

})();
