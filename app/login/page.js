// app/login/page.js
"use client";

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      setMessage(data.message);
      
      if (response.ok) {
        // Simpan userId dan email di localStorage
        localStorage.setItem('userId', data.user.id);
        localStorage.setItem('userEmail', data.user.email);
        
        router.push('/dashboard');
      }

    } catch (error) {
      console.error(error);
      setMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '400px', margin: 'auto' }}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </div>
        <button type="submit" style={{ padding: '0.5rem' }}>
          Login
        </button>
      </form>
      {message && <p>{message}</p>}
      <div style={{ marginTop: '1rem' }}>
      Belum punya akun? <Link href="/register">Daftar di sini</Link>
    </div>
    </div>
  );
}