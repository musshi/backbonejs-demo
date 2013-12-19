/*global BookStore, Backbone*/

BookStore.Collections = BookStore.Collections || {};

(function () {
  'use strict';

  BookStore.Collections.BooksCollection = Backbone.Collection.extend({
    url: "/api/books",
    model: BookStore.Models.BookModel

  });

})();
