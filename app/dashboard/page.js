// app/dashboard/page.js
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function DashboardPage() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState('');
  const [userId, setUserId] = useState(null);
  const router = useRouter();

  // Efek untuk memeriksa status login dan mengambil userId
  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(parseInt(storedUserId));
      fetchTodos(parseInt(storedUserId));
    } else {
      router.push('/login'); // Arahkan ke login jika belum login
    }
  }, []);

  // --- READ: Mengambil semua todo berdasarkan userId ---
  const fetchTodos = async (currentUserId) => {
    if (!currentUserId) return;
    try {
      const response = await fetch('/api/todos');
      const data = await response.json();
      // Filter todo hanya milik user yang sedang login
      setTodos(data.filter(todo => todo.user_id === currentUserId));
    } catch (error) {
      console.error('Failed to fetch todos:', error);
    }
  };

  // --- CREATE: Menambahkan todo baru ---
  const handleCreateTodo = async (e) => {
    e.preventDefault();
    if (!task || !userId) return;

    try {
      const response = await fetch('/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ task, userId }),
      });

      if (response.ok) {
        setTask('');
        fetchTodos(userId); // <-- Ini sudah benar
      }
    } catch (error) {
      console.error('Failed to create todo:', error);
    }
  };

  // --- UPDATE: Memperbarui status todo ---
  const handleUpdateTodo = async (id, is_completed) => {
    try {
      await fetch(`/api/todos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_completed: !is_completed }),
      });
      fetchTodos(userId); // <-- Tambahkan baris ini
    } catch (error) {
      console.error('Failed to update todo:', error);
    }
  };

  // --- DELETE: Menghapus todo ---
  const handleDeleteTodo = async (id) => {
    try {
      await fetch(`/api/todos/${id}`, {
        method: 'DELETE',
      });
      fetchTodos(userId); // <-- Tambahkan baris ini
    } catch (error) {
      console.error('Failed to delete todo:', error);
    }
  };

  // --- LOGOUT: Menghapus status login dan mengarahkan ke halaman login ---
  const handleLogout = () => {
    localStorage.removeItem('userId'); // Hapus userId dari localStorage
    router.push('/login'); // Arahkan kembali ke halaman login
  };

  if (userId === null) {
    return <div>Loading...</div>; // Tampilkan loading saat memeriksa login
  }

  return (
    <div className="container-class-tailwind">
      <div className="p-8 max-w-2xl mx-auto font-sans">
        <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold m-0">To-Do List</h1>
            {/* <button onClick={handleLogout} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors">
            Logout
            </button> */}
        </div>

      {/* Form untuk CREATE */}
      <form onSubmit={handleCreateTodo} className="flex mb-8">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Add a new task..."
          className="flex-grow p-3 border border-gray-300 rounded mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button type="submit" className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
          Add
        </button>
      </form>

      {/* Daftar todo untuk READ, UPDATE, DELETE */}
      <ul className="list-none p-0">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex justify-between items-center p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors"
          >
            <span
              className={`flex-grow ${todo.is_completed ? 'line-through text-gray-500' : ''}`}
            >
              {todo.task}
            </span>
            <div>
              <button
                onClick={() => handleUpdateTodo(todo.id, todo.is_completed)}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors mr-2"
              >
                {todo.is_completed ? 'Undo' : 'Complete'}
              </button>
              <button onClick={() => handleDeleteTodo(todo.id)} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors">
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      </div>
    </div>
  );
}