class Task < ActiveRecord::Base
  # default_scope { where(color: 'red') }
  default_scope order("position ASC")
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
