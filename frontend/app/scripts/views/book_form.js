/*global BookStore, Backbone, JST*/

BookStore.Views = BookStore.Views || {};

(function () {
  'use strict';

  BookStore.Views.BookFormView = Backbone.View.extend({
    template: JST['app/scripts/templates/book_form.ejs'],
    tagName: "div",
    events: {
      "click button[type=submit]": "submitBookForm",
      "click a.cancel": "cancelBookForm"
    },
    
    ui: {
      form: "#book_form",
      nameFieldSelector: ".name-field",
      authorFieldSelector: ".author-field",
      descriptionFieldSelector: ".description-field"
    },
    
    render: function() {
      this.$el.append(this.template());
      return this;
    },
    
    loadBook: function(book) {
      this.$el.find(this.ui.nameFieldSelector).val(book.get('name'));
      this.$el.find(this.ui.authorFieldSelector).val(book.get('author'));
      this.$el.find(this.ui.descriptionFieldSelector).val(book.get('description'));
      this.book = book;
    },
    
    cancelBookForm: function(event) {
      event.preventDefault();
      Backbone.history.navigate('/', false);
      this.resetForm();
      this.book = null;
    },
    
    submitBookForm: function(event) {
      event.preventDefault();
      var _this = this;
      var goingToSaveBook = null;
      var updatedAttributes = {
        name: this.$el.find(this.ui.nameFieldSelector).val(),
        author: this.$el.find(this.ui.authorFieldSelector).val(),
        description: this.$el.find(this.ui.descriptionFieldSelector).val()
      };
      
      if(this.book) {
        goingToSaveBook = this.book;        
      } else {
        goingToSaveBook = new BookStore.Models.BookModel();
      }//end else
      
      goingToSaveBook.set(updatedAttributes);
      goingToSaveBook.save(goingToSaveBook.attributes, {
        success: function(model) {          
          if(!_this.book) {
            _this.collection.add(model);
          }//end if
          _this.cancelBookForm(event);
        }
      });
      
      return false;
    },
    
    resetForm: function() {
      this.$el.find(this.ui.form)[0].reset();
    }
  });

})();
