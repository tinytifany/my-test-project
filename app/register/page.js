// app/register/page.js
"use client";

import Link from 'next/link';
import { useState } from 'react';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); // Mencegah form dari refresh halaman

    try {
      // Kirim data ke API registrasi yang sudah kita buat
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      setMessage(data.message); // Tampilkan pesan dari API

      // Jika berhasil, kosongkan form
      if (response.ok) {
        setEmail('');
        setPassword('');
      }

    } catch (error) {
      console.error(error);
      setMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <div style={{ border:'1px solid black', padding: '2rem', maxWidth: '400px', margin: 'auto' }}>
      <h1>Register</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ border:'1px solid black', width: '100%', padding: '0.5rem' }}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ border:'1px solid black', width: '100%', padding: '0.5rem' }}
          />
        </div>
        <button type="submit" style={{ border:'1px solid black', padding: '0.5rem' }}>
          Register
        </button>
      </form>
      {message && <p>{message}</p>}
      <div style={{ marginTop: '1rem' }}>
      Sudah punya akun? <Link href="/login">Login di sini</Link>
    </div>
    </div>
  );
}