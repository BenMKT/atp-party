import { TownHallMeeting } from './definitions';

export const getZoomMeetings = async (
  page: number = 1,
  pageSize: number = 12,
  searchQuery?: string,
  sortOrder: 'asc' | 'desc' = 'desc',
  startDate?: string,
  endDate?: string,
) => {
  const ZOOM_API_KEY = process.env.ZOOM_API_KEY;
  const ZOOM_API_SECRET = process.env.ZOOM_API_SECRET;
  const ZOOM_ACCESS_TOKEN = process.env.ZOOM_ACCESS_TOKEN;
  const ZOOM_ACCOUNT_ID = process.env.ZOOM_ACCOUNT_ID;

  if (
    !ZOOM_API_KEY ||
    !ZOOM_API_SECRET ||
    !ZOOM_ACCESS_TOKEN ||
    !ZOOM_ACCOUNT_ID
  ) {
    console.error('Missing Zoom API credentials');
    return { meetings: [], totalMeetings: 0 };
  }

  try {
    const response = await fetch(
      `https://api.zoom.us/v2/users/me/meetings?page_size=${pageSize}&page_number=${page}`,
      {
        headers: {
          Authorization: `Bearer ${ZOOM_ACCESS_TOKEN}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        next: { revalidate: 3600 }, // Cache for 1 hour
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Zoom API Error:', errorData);
      throw new Error(`Failed to fetch Zoom meetings: ${response.statusText}`);
    }

    const data = await response.json();

    // Transform and filter the Zoom meetings data based on search query
    let meetings: TownHallMeeting[] =
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
          status:
            endTime < new Date()
              ? 'ended'
              : startTime < new Date()
                ? 'started'
                : 'waiting',
        };
      }) || [];

    // Filter meetings if search query is provided
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      meetings = meetings.filter((meeting) =>
        meeting.topic.toLowerCase().includes(query),
      );
    }

    // Apply date range filter if provided
    if (startDate || endDate) {
      meetings = meetings.filter((meeting) => {
        const meetingDate = new Date(meeting.start_time);
        const start = startDate ? new Date(startDate) : new Date(0);
        const end = endDate ? new Date(endDate) : new Date(8640000000000000); // Max date
        return meetingDate >= start && meetingDate <= end;
      });
    }

    // Sort meetings by start time
    meetings.sort((a, b) => {
      const dateA = new Date(a.start_time);
      const dateB = new Date(b.start_time);
      return sortOrder === 'asc'
        ? dateA.getTime() - dateB.getTime()
        : dateB.getTime() - dateA.getTime();
    });

    return {
      meetings,
      totalMeetings:
        searchQuery || startDate || endDate
          ? meetings.length
          : data.total_records || 0,
    };
  } catch (error) {
    console.error('Error fetching Zoom meetings:', error);
    return { meetings: [], totalMeetings: 0 };
  }
};
