"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const router = useRouter();
  const pathname = usePathname(); // Gunakan usePathname untuk mendapatkan path

  const checkLoginStatus = () => {
    const userId = localStorage.getItem('userId');
    const email = localStorage.getItem('userEmail');
    if (userId) {
      setIsLoggedIn(true);
      setUserEmail(email);
    } else {
      setIsLoggedIn(false);
      setUserEmail('');
    }
  };

  useEffect(() => {
    checkLoginStatus();
  }, [pathname]); // Jalankan fungsi saat URL berubah

  const handleLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('userEmail');
    router.push('/login');
  };

  if (!isLoggedIn) {
    return null;
  }

  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: '#f0f0f0' }}>
      <span style={{ fontWeight: 'bold' }}>Aplikasi To-Do</span>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span style={{ marginRight: '1rem' }}>{userEmail}</span>
        <Link href="/dashboard" style={{ marginRight: '1rem' }}>Dashboard</Link>
        <Link href="/joke" style={{ marginRight: '1rem' }}>Joke</Link>
        <button onClick={handleLogout} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors">Logout</button>
      </div>
    </nav>
  );
}