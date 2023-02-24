class CreateRestaurants < ActiveRecord::Migration[7.0]
  def change
    create_table :restaurants do |t|
      t.string :name, null: false
      t.string :url, null: false
      t.text :description
      t.string :open

      t.timestamps
    end
  end
end
