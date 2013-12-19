/*global frontend, Backbone, JST*/

BookStore.Views = BookStore.Views || {};

(function () {
    'use strict';

    BookStore.Views.ListView = Backbone.View.extend({

        template: JST['app/scripts/templates/list.ejs']

    });

})();
