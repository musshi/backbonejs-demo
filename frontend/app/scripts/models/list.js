/*global frontend, Backbone*/

BookStore.Models = BookStore.Models || {};

(function () {
    'use strict';

    BookStore.Models.ListModel = Backbone.Model.extend({
      urlRoot: "/api/lists"
    });

})();
