// app/api/auth/logout/route.js
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    // Di sini Anda bisa menambahkan logika untuk menghapus cookie atau token
    // Namun, untuk tes ini, kita cukup mengembalikan respons sukses

    return NextResponse.json({ message: 'Logout successful' });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Something went wrong', error: error.message }, { status: 500 });
  }
}