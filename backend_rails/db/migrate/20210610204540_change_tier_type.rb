class ChangeTierType < ActiveRecord::Migration[6.1]
  def change
    change_column :tiers, :benefits, :text
    change_column :tiers, :exclusive, :text
  end
end
