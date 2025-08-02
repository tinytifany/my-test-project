// app/api/todos/route.js
import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

export async function GET() {
  try {
    // Ambil semua todo dari database menggunakan Prisma
    const todos = await prisma.todo.findMany();

    // Kembalikan data todo sebagai respons JSON
    return NextResponse.json(todos);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Something went wrong', error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    // Ambil data todo baru dari body request
    const { task, userId } = await request.json();

    // Pastikan task tidak kosong
    if (!task || !userId) {
      return NextResponse.json({ message: 'Task and user ID are required' }, { status: 400 });
    }

    // Buat todo baru di database menggunakan Prisma
    const newTodo = await prisma.todo.create({
      data: {
        task,
        user_id: userId
      },
    });

    // Kembalikan todo yang baru dibuat sebagai respons
    return NextResponse.json(newTodo, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Something went wrong', error: error.message }, { status: 500 });
  }
}