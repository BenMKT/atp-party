import { TownHallMeeting } from './definitions';

export const getZoomMeetings = async (): Promise<TownHallMeeting[]> => {
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

    // Transform the Zoom meetings data
    const meetings =
      data.meetings?.map((meeting: any) => {
        // Calculate end time based on start_time and duration
        const startTime = new Date(meeting.start_time);
        const endTime = new Date(
          startTime.getTime() + meeting.duration * 60000,
        ); // duration is in minutes

        return {
          id: meeting.id,
          topic: meeting.topic,
          start_time: meeting.start_time,
          end_time: endTime.toISOString(),
          join_url: meeting.join_url,
          duration: meeting.duration,
          // If current time is past end time, mark as 'ended' else if current time is past start time, mark as 'started' else mark as 'waiting'
          status: endTime < new Date() ? 'ended' : (startTime < new Date() ? 'started' : 'waiting'),
        };
      }) || [];

    return meetings;
  } catch (error) {
    console.error('Error fetching Zoom meetings:', error);
    return [];
  }
}
