import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const response = await axios.get(`http://localhost:5555/api/user/${id}`);
    console.log(response);
    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to retrieve user' }, { status: 500 });
  }
}
