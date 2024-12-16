import { getZoomMeetings } from '@/app/lib/zoom-api';
import { TownHallBadge } from '@/app/ui/accountability/town-hall-badge';
import { lusitana } from '@/app/ui/fonts';
import { TownHallMeeting } from '@/app/lib/definitions';

const Accountability = async () => {
  // Fetch upcoming town hall meetings from Zoom API
  const meetings: TownHallMeeting[] = await getZoomMeetings();

  return (
    <div className="min-h-screen bg-sky-50 p-6 md:p-12">
      <div className="mb-8">
        <h1 className={`${lusitana.className} text-4xl text-center font-bold`}>
          ATP Virtual County Hall Meetings
        </h1>
        <p className="text-muted-foreground mt-2 text-center">
          Join our virtual county hall meetings to engage with party leadership and fellow members in their various jurisdictions to enhance leadership accessibility and promote accountability.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {meetings.map((meeting) => (
          <TownHallBadge
            key={meeting.id}
            id={meeting.id}
            topic={meeting.topic}
            startTime={meeting.start_time}
            joinUrl={meeting.join_url}
            duration={meeting.duration}
            status={meeting.status}
          />
        ))}
      </div>
    </div>
  );
};

export default Accountability;
