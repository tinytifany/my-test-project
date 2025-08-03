'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getAccessToken } from '../lib/auth';

const HomePage = () => {
  const router = useRouter();

  useEffect(() => {
    // Cek apakah ada token, jika ya, arahkan ke halaman profil
    if (getAccessToken()) {
      router.push('/profile');
    } else {
      router.push('/login');
    }
  }, [router]);

  return <div className="text-center mt-12">Loading...</div>;
};

export default HomePage;