import { TownHallMeeting } from './definitions';

export async function getZoomMeetings(): Promise<TownHallMeeting[]> {
  const ZOOM_API_KEY = process.env.ZOOM_API_KEY;
  const ZOOM_API_SECRET = process.env.ZOOM_API_SECRET;
  const ZOOM_ACCESS_TOKEN = process.env.ZOOM_ACCESS_TOKEN;
  const ZOOM_ACCOUNT_ID = process.env.ZOOM_ACCOUNT_ID;

  if (!ZOOM_API_KEY || !ZOOM_API_SECRET || !ZOOM_ACCESS_TOKEN || !ZOOM_ACCOUNT_ID) {
    throw new Error('Missing Zoom API credentials');
  }

  try {
    const response = await fetch(`https://api.zoom.us/v2/users/me/meetings`, {
      headers: {
        Authorization: `Bearer ${ZOOM_ACCESS_TOKEN}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Zoom API Error:', errorData);
      throw new Error(`Failed to fetch Zoom meetings: ${response.statusText}`);
    }

    const data = await response.json();
    return data.meetings?.slice(0, 50) || []; // Return only first 50 meetings or empty array
  } catch (error) {
    console.error('Error fetching Zoom meetings:', error);
    return [];
  }
}
