"use client";

import { useState, useEffect } from 'react';

export default function JokePage() {
  const [joke, setJoke] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Fungsi untuk mengambil lelucon baru
  const fetchNewJoke = async () => {
    setIsLoading(true);
    setError('');
    setJoke(null);

    try {
      const response = await fetch('https://official-joke-api.appspot.com/jokes/random');
      if (!response.ok) {
        throw new Error('Failed to fetch joke. Please try again.');
      }
      const data = await response.json();
      setJoke(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Panggil fungsi saat komponen pertama kali dimuat
  useEffect(() => {
    fetchNewJoke();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gray-100 font-sans">
      <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Random Joke</h1>

        {isLoading && <p className="text-center text-gray-600">Loading...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        {joke && (
          <div className="text-center space-y-4">
            <p className="text-lg font-medium text-gray-700">{joke.setup}</p>
            <p className="text-xl font-bold text-gray-900">{joke.punchline}</p>
          </div>
        )}

        <div className="mt-8 text-center">
          <button
            onClick={fetchNewJoke}
            disabled={isLoading}
            className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-500 transition-colors disabled:bg-gray-400"
          >
            {isLoading ? 'Fetching...' : 'Get Another Joke'}
          </button>
        </div>
      </div>
    </div>
  );
}