"use client";

import { useState, useEffect } from 'react';

export default function JokePage() {
  const [joke, setJoke] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchJoke();
  }, []);

  const fetchJoke = async () => {
    try {
      setError(''); // Hapus error sebelumnya
      const response = await fetch('https://v2.jokeapi.dev/joke/Any?type=single');
      
      if (!response.ok) {
        throw new Error('Failed to fetch joke');
      }

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.message);
      }
      
      setJoke(data.joke);
      
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: 'auto', textAlign: 'center' }}>
      <h1>Random Joke</h1>
      <div style={{ margin: '2rem 0', minHeight: '100px', border: '1px solid #ccc', padding: '1rem', borderRadius: '8px' }}>
        {error ? (
          <p style={{ color: 'red' }}>{error}</p>
        ) : (
          <p>{joke || 'Loading a joke...'}</p>
        )}
      </div>
      <button onClick={fetchJoke} style={{ padding: '0.75rem 1.5rem' }}>
        Get Another Joke
      </button>
    </div>
  );
}