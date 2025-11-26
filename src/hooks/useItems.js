// src/hooks/useItems.js
import { useState, useEffect } from "react";

const STORAGE_KEY = "list-manager-items";

export const useItems = () => {
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === null) return [];
      const parsed = JSON.parse(saved);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {}
  }, [items]);

  const addItem = (title, subtitle) => {
    const newItem = {
      id: Date.now() + Math.random(),
      title: title.trim(),
      subtitle: subtitle.trim(),
      createdAt: new Date().toISOString(),
    };
    setItems((prev) => [...prev, newItem]);
  };

  const updateItem = (id, title, subtitle) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, title: title.trim(), subtitle: subtitle.trim() }
          : item
      )
    );
  };

  const deleteItem = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  return {
    items,
    addItem,
    updateItem,
    deleteItem,
  };
};