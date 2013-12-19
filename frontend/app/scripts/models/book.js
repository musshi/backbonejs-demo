/*global BookStore, Backbone*/

BookStore.Models = BookStore.Models || {};

(function () {
  'use strict';

  BookStore.Models.BookModel = Backbone.Model.extend({
    urlRoot: "/api/books"
  });

})();
