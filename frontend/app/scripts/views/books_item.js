/*global BookStore, Backbone, JST*/

BookStore.Views = BookStore.Views || {};

(function () {
  'use strict';

  BookStore.Views.BooksItemView = Backbone.View.extend({
    
    template: JST['app/scripts/templates/books_item.ejs'],
    tagName: "tr",
    events: {
      "click button.remove-button": "removeBook",
      "click button.edit-button": "editBook"
    },
    
    initialize: function(options) {
      this.listenTo(this.model, "remove", this.remove);
      this.listenTo(this.model, "change", this.render);
      this.formView = options.form_view;
    },
            
    render: function() {
      this.$el.html(this.template(this.model.attributes));
      return this;
    },
    
    editBook: function(event) {
      event.preventDefault();
      Backbone.history.navigate('#books-' + this.model.get('id') + "/edit", false);
      this.formView.loadBook(this.model);
    },
    
    removeBook: function(event) {
      var confirm = window.confirm("Are you sure that you want to delete this book?");
      if(confirm) {        
        this.model.destroy();
      }//end if
    }
  });
})();
