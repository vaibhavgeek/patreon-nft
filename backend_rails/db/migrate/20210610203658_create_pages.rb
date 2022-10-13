class CreatePages < ActiveRecord::Migration[6.1]
  def change
    create_table :pages do |t|
      t.string :name
      t.string :markdown
      t.string :owner_address
      t.string :link

      t.timestamps
    end
  end
end
