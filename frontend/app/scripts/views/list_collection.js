/*global BookStore, Backbone, JST*/

BookStore.Views = BookStore.Views || {};

(function () {
  'use strict';

  BookStore.Views.ListCollectionView = Backbone.View.extend({    
    template: JST['app/scripts/templates/list_collection.ejs'],
    tagName: "tbody",
    
    initialize: function(options) {
      this.listenTo(this.collection, "add", this.addOne);
      this.listFormView = options.list_form_view;
    },
    
    render: function() {
      this.collection.forEach(this.addOne, this);
      return this;
    },
    
    addOne: function(list) {
      var listView = new BookStore.Views.listItemView({model: list, form_view: this.listFormView});
      this.$el.append(listView.render().el);
    }
  });
})();
