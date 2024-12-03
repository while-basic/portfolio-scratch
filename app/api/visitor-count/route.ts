import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'visitor-count.json');

export async function GET() {
  try {
    await fs.mkdir(path.join(process.cwd(), 'data'), { recursive: true });
    let visitorCount = 0;
    
    try {
      const data = await fs.readFile(dataFilePath, 'utf8');
      visitorCount = JSON.parse(data).count;
    } catch {
      // File doesn't exist yet, start with 0
    }
    
    return NextResponse.json({ count: visitorCount });
  } catch {
    return NextResponse.json({ error: 'Failed to get visitor count' }, { status: 500 });
  }
}

export async function POST() {
  try {
    await fs.mkdir(path.join(process.cwd(), 'data'), { recursive: true });
    let visitorCount = 0;
    
    try {
      const data = await fs.readFile(dataFilePath, 'utf8');
      visitorCount = JSON.parse(data).count;
    } catch {
      // File doesn't exist yet, start with 0
    }
    
    visitorCount++;
    await fs.writeFile(dataFilePath, JSON.stringify({ count: visitorCount }));
    
    return NextResponse.json({ count: visitorCount });
  } catch {
    return NextResponse.json({ error: 'Failed to update visitor count' }, { status: 500 });
  }
}
