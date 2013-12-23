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
    
    loadTasks: function(task) {
      this.$el.find(this.ui.nameFieldSelector).val(task.get('name'));     
      this.task = task;
    },
        
    cancelBookForm: function(event) {
      event.preventDefault();
      var list_id = $("#books_container h5").attr("data-id");
      Backbone.history.navigate("/lists/" + list_id + "/tasks", true);
      this.resetForm();
      this.task = null;
    },
    
    submittasksForm: function(event) {
      event.preventDefault();
      var _this = this;
      var goingToSavetask = null;
      var updatedAttributes = {
        name: this.$el.find(this.ui.nameFieldSelector).val(),
      };
      
      var list_id = $("#books_container h5").attr("data-id"); 
      var type = "POST";
      var url = "";
      if(this.task) {
        goingToSavetask = this.task;
        type = "PUT";
        url = "/api/lists/"+ list_id +"/tasks/" + this.task.id;
      } else {
        goingToSavetask = new BookStore.Models.TasksModel();
        type = "POST";
        url = "/api/lists/"+ list_id +"/tasks";
      }//end else
                
      goingToSavetask.url = url;      
      goingToSavetask.set(updatedAttributes);
      goingToSavetask.save(goingToSavetask.attributes, {
        //type: "POST",(put and post using one form)
        type: type,
        success: function(model) {
          if(!_this.task) {
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
