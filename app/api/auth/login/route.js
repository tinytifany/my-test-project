// app/api/auth/login/route.js
import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';
import bcrypt from 'bcrypt';

export async function POST(request) {
  try {
    // Ambil email dan password dari body request
    const { email, password } = await request.json();

    // Pastikan email dan password tidak kosong
    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
    }

    // 1. Cari user di database berdasarkan email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    // Jika user tidak ditemukan, kembalikan error
    if (!user) {
      return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
    }

    // 2. Bandingkan password yang diinput dengan password terenkripsi
    const passwordMatch = await bcrypt.compare(password, user.password);

    // Jika password tidak cocok, kembalikan error
    if (!passwordMatch) {
      return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
    }

    // 3. Jika password cocok, user berhasil login
    // Di sini Anda bisa membuat token JWT atau sesi
    // Untuk tes ini, kita cukup kembalikan respons sukses
    return NextResponse.json({ message: 'Login successful', user: { id: user.id, email: user.email } });
    
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Something went wrong', error: error.message }, { status: 500 });
  }
}