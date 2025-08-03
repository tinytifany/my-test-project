"use client";

import Image from "next/image";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Periksa status login di localStorage
    const userId = localStorage.getItem('userId');
    
    // Jika userId ada, artinya pengguna sudah login
    if (userId) {
      router.push('/dashboard'); // Langsung arahkan ke dashboard
    }
  }, []);

  return (
    <><div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gray-100 font-sans">
      <main>
        <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-md">
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Selamat Datang di Aplikasi To-Do</h1>

          <div className="text-center space-y-4">
            <p className="text-lg font-medium text-gray-700">Ini adalah halaman utama. Silakan login atau registrasi untuk melanjutkan.</p>
          </div>

          <div className="mt-8 text-center">
            <Link href="/login" className="mr-2">
              <button className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-500 transition-colors disabled:bg-gray-400"
              >Login</button>
            </Link>
            <Link href="/register">
              <button className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-500 transition-colors disabled:bg-gray-400">Register</button>
            </Link>
          </div>
        </div>
      </main>
    </div>
    <div>
    <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <p>Copyright @ Tifany 2025</p>
      </footer>
    </div>
    </>
  );
}
