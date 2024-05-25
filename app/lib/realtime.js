import { supabase } from '@/app/lib/supabase';

// define a function to subscribe to the votes table and listen for 'INSERT' events
export const subscribeToVotes = (contestantid, handleNewVote) => {
  return supabase
    .channel(`public:Votes:contestantId=eq.${contestantid}`)
    .on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'Votes' },
      (payload) => {
        handleNewVote(payload.new);
      },
    )
    .subscribe();
};

// define a function to subscribe to the votes table and listen for 'INSERT' events
export const subscribeToPollVotes = (pollId, handleNewVote) => {
  return supabase
    .channel(`public:Votes:pollId=eq.${pollId}`)
    .on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'Votes' },
      (payload) => {
        handleNewVote(payload.new);
      },
    )
    .subscribe();
};
