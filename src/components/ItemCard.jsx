export default function ItemCard({ item, onEdit, onDelete }) {
  const date = new Date(item.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="bg-white p-5 rounded-lg shadow-md border border-gray-200">
      <h3 className="text-xl font-semibold text-gray-800">{item.title}</h3>
      <p className="text-gray-600 mt-1">{item.subtitle}</p>
      <p className="text-sm text-gray-500 mt-3">Created: {date}</p>

      <div className="mt-4 flex gap-2">
        <button
          onClick={() => onEdit(item)}
          className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 text-sm"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(item.id)}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
        >
          Delete
        </button>
      </div>
    </div>
  );
}