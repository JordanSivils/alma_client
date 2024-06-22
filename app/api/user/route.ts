import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function PUT(req: NextRequest) {
  const { id, name } = await req.json();
  console.log('Received PUT request with:', { id, name });

  try {
    const response = await axios.put('http://localhost:5555/api/user', { id, name });
    console.log('Response from Express API:', response.data);
    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
  }
}
