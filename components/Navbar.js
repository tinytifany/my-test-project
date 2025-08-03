"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const router = useRouter();
  const pathname = usePathname(); // Gunakan usePathname untuk mendapatkan path

  const checkLoginStatus = () => {
    const userId = localStorage.getItem('userId');
    const name = localStorage.getItem('userName');
    if (userId) {
      setIsLoggedIn(true);
      setUserName(name);
    } else {
      setIsLoggedIn(false);
      setUserName('');
    }
  };

  useEffect(() => {
    checkLoginStatus();
  }, [pathname]); // Jalankan fungsi saat URL berubah

  const handleLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    setIsLoggedIn(false);
    setUserName('');
    router.push('/login');
  };

  if (!isLoggedIn) {
    return null;
  }

  // URL avatar dari DiceBear API. 'seed' diisi dengan nama pengguna.
  const avatarUrl = `https://api.dicebear.com/7.x/pixel-art/svg?seed=${userName}`;

  return (
    <div className="min-h-full">
      <nav className="bg-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
                <img
                  alt="Your Company"
                  src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                  className="size-8"
                />
                <span className="font-bold text-xl text-gray-300 hover:bg-gray-700 hover:text-white">Aplikasi To-Do</span>
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <Link href="/dashboard" className="rounded-md px-3 py-2 text-lg font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Dashboard</Link>
                  <Link href="/joke" className="rounded-md px-3 py-2 text-lg font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Joke</Link>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="ml-4 flex items-center">
                  <button 
                    onClick={handleLogout} 
                    className="px-3 py-1 text-sm font-medium bg-red-500 text-white rounded hover:bg-red-600 transition-colors mx-5"
                  >
                    Logout
                  </button>
                <div className="flex flex-col items-center">
                  <img
                    src={avatarUrl}
                    alt="User Avatar"
                    className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus-visible:ring-2 focus-visible:ring-white"
                  />
                  <p className="text-xs font-medium text-gray-300">{userName}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}