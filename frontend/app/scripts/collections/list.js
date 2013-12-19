/*global frontend, Backbone*/

BookStore.Collections = BookStore.Collections || {};

(function () {
  'use strict';

    BookStore.Collections.ListsCollection = Backbone.Collection.extend({
      url: "/api/lists",
      model: BookStore.Models.ListModel

  });

})();
