class Task < ActiveRecord::Base
  belongs_to :list
  # attr_accessible :name
  
  def toggle_completed
    self.completed = !self.completed
    self.save
  end
  
  def update_tasks(name)
    self.name = name
    self.save
  end
end
