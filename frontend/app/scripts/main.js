/*global BookStore, $*/


window.BookStore = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  init: function () {
    'use strict';    
    
    $.ajaxPrefilter(function(options, originalOptions, jqXHR) {
      options.url = 'http://localhost:3000' + options.url;
    });
    
    var bookstoreRouter = new BookStore.Routers.AppRouter();
    Backbone.history.start({pushState: false});
  }
};

$(document).ready(function () {
  'use strict';
  BookStore.init();
});
