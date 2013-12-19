/*global BookStore, Backbone, JST*/

BookStore.Views = BookStore.Views || {};

(function () {
  'use strict';

  BookStore.Views.BooksCollectionView = Backbone.View.extend({    
    template: JST['app/scripts/templates/books_collection.ejs'],
    tagName: "tbody",
    
    initialize: function(options) {
      this.listenTo(this.collection, "add", this.addOne);
      this.bookFormView = options.book_form_view;
    },
    
    render: function() {
      this.collection.forEach(this.addOne, this);
      return this;
    },
    
    addOne: function(book) {
      var bookView = new BookStore.Views.BooksItemView({model: book, form_view: this.bookFormView});
      this.$el.append(bookView.render().el);
    }
  });
})();
