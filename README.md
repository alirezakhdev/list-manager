
# List Manager – React CRUD App

A clean and responsive list management app built with React 18 + TailwindCSS.

## Architecture Overview

```
src/
├── components/
│   ├── ItemCard.jsx      → Single item display
│   ├── ItemList.jsx      → Grid layout + empty state
│   └── ItemModal.jsx     → Reusable modal for create & edit
├── hooks/
│   └── useItems.js       → All state & CRUD logic (add, update, delete, localStorage
└── App.jsx               → Composition + search

All business logic is extracted into a custom hook (`useItems`) to keep components clean and testable.

## State Management Choice

I chose a custom hook (`useItems`) instead of Context or Zustand because:
- The app is small and has only one source of truth
- custom hook gives the best developer experience with zero overhead
- keeps the component tree simple and avoids prop-drilling
- fully reusable and easy to unit test

If the app grew larger I would switch to Zustand or Redux Toolkit.

## localStorage Implementation

Used lazy initial state (`useState(() => {...})`) so data is loaded synchronously and works reliably even in Vite dev mode with hot reloads.

## Form Handling & Validation

Used React Hook Form because:
- industry-standard for React forms
- significantly cleaner and less error-prone than manual validation
- built-in performance optimizations

I can rewrite the validation manually without any library in a few minutes if strictly required.

## Bonus Feature

Added real-time search (title + subtitle) using `useMemo` for optimal performance.

## AI Assistance

I wrote every line of code myself.  
I only asked Grok for a quick tip on making one modal work for both create and edit modes — then implemented it completely on my own, debugged all issues (including localStorage in dev mode), and added search + extra validation rules.
