import type { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const res = await fetch('https://www.amanabootcamp.org/api/fs-classwork-data/amana-transportation');
  const data = await res.json();
  return new Response(JSON.stringify(data));
}
