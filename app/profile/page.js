'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getAccessToken, removeAccessToken } from '../../lib/auth';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = getAccessToken();
      if (!token) {
        // Jika tidak ada token, arahkan ke halaman login
        router.push('/login');
        return;
      }

      try {
        const response = await fetch('https://fakeapi.platzi.com/en/rest/auth-jwt/profile', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch profile. Please log in again.');
        }

        const data = await response.json();
        setUser(data);
      } catch (err) {
        setError(err.message);
        // Hapus token yang tidak valid dan arahkan ke login
        removeAccessToken();
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [router]);

  const handleLogout = () => {
    removeAccessToken();
    router.push('/login');
  };

  if (loading) {
    return <div className="text-center mt-12">Loading...</div>;
  }

  if (error) {
    return <p className="text-center mt-12 text-red-500">{error}</p>;
  }

  return (
    <div className="flex justify-center items-center h-screen flex-col gap-5">
      <h1 className="text-2xl font-bold">User Profile</h1>
      {user && (
        <div className="text-left p-6 border rounded-lg shadow-md w-80 bg-white">
          <p><strong>Nama:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>
        </div>
      )}
      <button onClick={handleLogout} className="px-5 py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
        Logout
      </button>
    </div>
  );
};

export default ProfilePage;