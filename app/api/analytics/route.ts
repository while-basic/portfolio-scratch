import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Your analytics logic here
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch analytics' }, { status: 500 });
  }
}
