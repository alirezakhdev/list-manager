import ItemCard from "./ItemCard";

export default function ItemList({ items, onEdit, onDelete }) {
  if (items.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        No items yet. Click "Create New" to add one!
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map(item => (
        <ItemCard key={item.id} item={item} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
}