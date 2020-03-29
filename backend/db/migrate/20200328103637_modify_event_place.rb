class ModifyEventPlace < ActiveRecord::Migration[6.0]
  def change
    create_table :places do |t|
      t.string :name, null: false
      t.json :plan, null: false
    end
    remove_column :events, :place
    add_reference :events, :place
  end
end
