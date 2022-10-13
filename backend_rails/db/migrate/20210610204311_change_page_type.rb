class ChangePageType < ActiveRecord::Migration[6.1]
  def change
    change_column :pages, :markdown, :text
  end
end
