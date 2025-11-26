// import { useState } from 'react';
// import { useItems } from './hooks/useItems';
// import ItemList from './components/ItemList';
// import ItemModal from './components/ItemModal';

// export default function App() {
//   const { items, addItem, updateItem, deleteItem } = useItems();
//   const [modalOpen, setModalOpen] = useState(false);
//   const [editingItem, setEditingItem] = useState(null);

//   const openCreateModal = () => {
//     setEditingItem(null);
//     setModalOpen(true);
//   };

//   const openEditModal = (item) => {
//     setEditingItem(item);
//     setModalOpen(true);
//   };

//   const handleSubmit = ({ title, subtitle }) => {
//     if (editingItem) {
//       updateItem(editingItem.id, title, subtitle);
//     } else {
//       addItem(title, subtitle);
//     }
//   };

//   return (
//     <>
//       <div className="min-h-screen bg-gray-50">
//         <div className="max-w-6xl mx-auto p-6">
//           <div className="flex justify-between items-center mb-8">
//             <h1 className="text-4xl font-bold text-gray-800">My List</h1>
//             <button
//               onClick={openCreateModal}
//               className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
//             >
//               + Create New
//             </button>
//           </div>

//           <ItemList
//             items={items}
//             onEdit={openEditModal}
//             onDelete={deleteItem}
//           />

//           <ItemModal
//             isOpen={modalOpen}
//             onClose={() => setModalOpen(false)}
//             onSubmit={handleSubmit}
//             initialData={editingItem}
//           />
//         </div>
//       </div>
//     </>
//   );
// }

import { useState, useMemo } from 'react';
import { useItems } from './hooks/useItems';
import ItemList from './components/ItemList';
import ItemModal from './components/ItemModal';

export default function App() {
  const { items, addItem, updateItem, deleteItem } = useItems();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredItems = useMemo(() => {
    if (!searchTerm.trim()) return items;
    const term = searchTerm.toLowerCase();
    return items.filter(item => 
      item.title.toLowerCase().includes(term) || 
      item.subtitle.toLowerCase().includes(term)
    );
  }, [items, searchTerm]);

  const openCreateModal = () => {
    setEditingItem(null);
    setModalOpen(true);
  };

  const openEditModal = (item) => {
    setEditingItem(item);
    setModalOpen(true);
  };

  const handleSubmit = ({ title, subtitle }) => {
    if (editingItem) {
      updateItem(editingItem.id, title, subtitle);
    } else {
      addItem(title, subtitle);
    }
    setModalOpen(false);
    setEditingItem(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <h1 className="text-4xl font-bold text-gray-800">My List</h1>
          <button
            onClick={openCreateModal}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
          >
            + Create New
          </button>
        </div>

        <div className="mb-8">
          <input
            type="text"
            placeholder="Search in title or subtitle..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-md px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {searchTerm && filteredItems.length === 0 && (
          <p className="text-gray-600 mb-6">No items found for "{searchTerm}"</p>
        )}

        <ItemList
          items={filteredItems}
          onEdit={openEditModal}
          onDelete={deleteItem}
        />

        <ItemModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onSubmit={handleSubmit}
          initialData={editingItem}
        />
      </div>
    </div>
  );
}