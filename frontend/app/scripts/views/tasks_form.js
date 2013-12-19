/*global BookStore, Backbone, JST*/

BookStore.Views = BookStore.Views || {};

(function () {
  'use strict';

  BookStore.Views.TasksFormView = Backbone.View.extend({
    template: JST['app/scripts/templates/tasks_form.ejs'],
    tagName: "div",
    events: {
      "click button[type=submit]": "submittasksForm",
      "click a.cancel": "cancelBookForm"
    },
    
    ui: {
      form: "#tasks_form",
      nameFieldSelector: ".name-field",  
    },
    
    render: function() {
      this.$el.append(this.template());
      return this;
    },
    
    loadTasks: function(tasks) {
      this.$el.find(this.ui.nameFieldSelector).val(tasks.get('name'));     
      this.tasks = tasks;
    },
        
    cancelBookForm: function(event) {
      event.preventDefault();
      var list_id = $("#books_container h5").attr("data-id");
      Backbone.history.navigate("/lists/" + list_id + "/tasks", true);
      this.resetForm();
      this.tasks = null;
    },
    
    submittasksForm: function(event) {
      event.preventDefault();
      var _this = this;
      var goingToSavetasks = null;
      var updatedAttributes = {
        name: this.$el.find(this.ui.nameFieldSelector).val(),
      };
      
      if(this.tasks) {
        goingToSavetasks = this.tasks;  
      } else {
        goingToSavetasks = new BookStore.Models.TasksModel();
      }//end else
      
      var list_id = $("#books_container h5").attr("data-id");      
      goingToSavetasks.url = "/api/lists/"+ list_id +"/tasks";      
      goingToSavetasks.set(updatedAttributes);
      goingToSavetasks.save(goingToSavetasks.attributes, {
        //type: "POST",(put and post using one form)
        success: function(model) {          
          if(!_this.tasks) {
            _this.collection.add(model);
            _this.collection.url = "/api/lists/"+ list_id +"/tasks";
            _this.collection.fetch({
              type: "GET",
              success: function(collection, response) {
                _this.collection = collection;
              }
            });
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
