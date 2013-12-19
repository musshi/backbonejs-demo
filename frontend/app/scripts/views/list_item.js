/*global BookStore, Backbone, JST*/

BookStore.Views = BookStore.Views || {};

(function () {
  'use strict';

  BookStore.Views.listItemView = Backbone.View.extend({
    
    template: JST['app/scripts/templates/list_item.ejs'],
    tagName: "tr",
    events: {
      "click button.removelist-button": "removeList",
      "click button.editlist-button": "editList",
      "click button.showtasks-button": "showTasks"
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
        
    editList: function(event) {
      event.preventDefault();
      Backbone.history.navigate('#lists-' + this.model.get('id') + "/edit", false);
      this.formView.loadList(this.model);
    },
    
    removeList: function(event) {
      var confirm = window.confirm("Are you sure that you want to delete this list?");
      if(confirm) {        
        this.model.destroy();
      }//end if
    },
    
    showTasks: function(event) {
      event.preventDefault();
      Backbone.history.navigate("/lists/" + this.model.get('id') + "/tasks", true);
      this.formView.loadList(this.model);
    }
  });
})();
