/*global BookStore, Backbone, JST*/

BookStore.Views = BookStore.Views || {};

(function () {
  'use strict';

  BookStore.Views.ListFormView = Backbone.View.extend({
    template: JST['app/scripts/templates/list_form.ejs'],
    tagName: "div",
    events: {
      "click button[type=submit]": "submitBookForm",
      "click a.cancel": "cancelBookForm"
    },
    
    ui: {
      form: "#book_form",
      nameFieldSelector: ".name-field",  
    },
    
    render: function() {
      this.$el.append(this.template());
      return this;
    },
    
    loadList: function(list) {
      this.$el.find(this.ui.nameFieldSelector).val(list.get('name'));     
      this.list = list;
    },
    
    
    loadshowList: function(list) {
      this.$el.find(this.ui.nameFieldSelector).val(list.get('name'));
      this.list = list;
    },
    
    cancelBookForm: function(event) {
      event.preventDefault();
      Backbone.history.navigate('/', false);
      this.resetForm();
      this.list = null;
    },
    
    submitBookForm: function(event) {
      event.preventDefault();
      var _this = this;
      var goingToSaveList = null;
      var updatedAttributes = {
        name: this.$el.find(this.ui.nameFieldSelector).val(),
      };
      
      if(this.list) {
        goingToSaveList = this.list;        
      } else {
        goingToSaveList = new BookStore.Models.ListModel();
      }//end else
      
      goingToSaveList.set(updatedAttributes);
      goingToSaveList.save(goingToSaveList.attributes, {
        success: function(model) {          
          if(!_this.list) {
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
