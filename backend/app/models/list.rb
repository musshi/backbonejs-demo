class List < ActiveRecord::Base
  # attr_accessible :name, :tasks_attributes
  has_many :tasks
  accepts_nested_attributes_for :tasks
end
