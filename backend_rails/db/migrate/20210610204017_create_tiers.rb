class CreateTiers < ActiveRecord::Migration[6.1]
  def change
    create_table :tiers do |t|
      t.integer :page_id
      t.string :name
      t.integer :from
      t.integer :to
      t.string :benefits
      t.string :exclusive
      t.string :contract_hash
      t.string :link
      t.string :batch_hash

      t.timestamps
    end
  end
end
