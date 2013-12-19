class RemoveTasksToLists < ActiveRecord::Migration
  def change
    # remove_column :lists, :tasks, :string
    remove_column :lists, :task, :string
  end
end
