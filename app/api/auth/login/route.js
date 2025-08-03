import { NextResponse } from 'next/server';

export async function POST(request) {
  const { email, password } = await request.json();

  if (email === 'john@mail.com' && password === 'changeme') {
    // Membuat token palsu untuk simulasi
    const accessToken = 'fake-jwt-token-12345';
    return NextResponse.json({ access_token: accessToken }, { status: 200 });
  } else {
    return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
  }
}