// app/api/auth/register/route.js
import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma'; // Sesuaikan path jika berbeda
import bcrypt from 'bcrypt';

export async function POST(request) {
  try {
    // Ambil email dan password dari body request
    const { email, password } = await request.json();

    // Pastikan email dan password tidak kosong
    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
    }

    // 1. Cek apakah user sudah terdaftar
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ message: 'User already exists' }, { status: 409 });
    }

    // 2. Enkripsi password sebelum disimpan
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Simpan user baru ke database
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    // 4. Berikan respons sukses
    return NextResponse.json({ message: 'User created successfully', user: { id: newUser.id, email: newUser.email } }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Something went wrong', error: error.message }, { status: 500 });
  }
}