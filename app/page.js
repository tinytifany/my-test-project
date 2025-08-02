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
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
      <div style={{ padding: '2rem', maxWidth: '400px', margin: 'auto', textAlign: 'center' }}>
      <h1>Selamat Datang di Aplikasi To-Do</h1>
      <p>Ini adalah halaman utama. Silakan login atau registrasi untuk melanjutkan.</p>
      <div style={{ marginTop: '2rem' }}>
        <Link href="/login" style={{ marginRight: '1rem' }}>
          <button>Login</button>
        </Link>
        <Link href="/register">
          <button>Register</button>
        </Link>
      </div>
    </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <p>Copyright @ Tifany 2025</p>
       </footer>
    </div>
  );
}
