// app/api/todos/[id]/route.js
import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma'; // Sesuaikan path

export async function PUT(request, { params }) {
    try {
      const id = params.id; // Ambil ID dari URL dengan cara yang disarankan
      const { task, is_completed } = await request.json();
  
      if (!task && is_completed === undefined) {
        return NextResponse.json({ message: 'Task or completion status is required' }, { status: 400 });
      }
      
      const updatedTodo = await prisma.todo.update({
        where: { id: parseInt(id) },
        data: {
          task,
          is_completed
        },
      });
  
      return NextResponse.json(updatedTodo);
    } catch (error) {
      console.error(error);
      return NextResponse.json({ message: 'Something went wrong', error: error.message }, { status: 500 });
    }
}
  
export async function DELETE(request, { params }) {
    try {
      const id = params.id; // Ambil ID dari URL
      
      await prisma.todo.delete({
        where: { id: parseInt(id) },
      });
  
      return NextResponse.json({ message: 'Todo deleted successfully' });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ message: 'Something went wrong', error: error.message }, { status: 500 });
    }
}