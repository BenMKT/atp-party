import { getZoomMeetings } from '@/app/lib/zoom-api';
import { NextResponse } from 'next/server';

// This is the API route for fetching zoom meetings for the attendance tracker page 
export async function GET() {
  try {
    const meetings = await getZoomMeetings();
    return NextResponse.json(meetings);
  } catch (error) {
    console.error('Error in Zoom API route:', error);
    return NextResponse.json(
      { error: 'Failed to fetch meetings' },
      { status: 500 },
    );
  }
}
