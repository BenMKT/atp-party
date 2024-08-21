import { Button } from '@/app/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';

// add metadata title for the get involved page
export const metadata: Metadata = {
  title: 'Get Involved',
};

// create a component for the get involved page
const GetInvolved = () => {
  return (
    <main className="min-h-screen bg-sky-50 md:pt-16">
      <div className="text-center">
        <h1 className="pt-10 text-4xl font-bold text-blue-500">Get Involved</h1>
        <p className="mx-auto px-10 py-5 text-sky-900 md:w-3/4">
          Whether you are a student, a professional, or just someone who cares
          about the future of our country, there are many ways you can help us
          make a difference. From volunteering your time to donating money,
          there are numerous ways you can get involved and be a force for good.
        </p>
      </div>
      <div className="space-y-10 p-8 md:flex md:gap-10 md:space-y-0">
        <div className="md:w-1/3">
          <Image
            className="w-full rounded-t-lg "
            src={'/aboutevent.webp'}
            alt="organize an event"
            width={300}
            height={300}
            priority
          />
          <div className="rounded-b-lg bg-sky-200">
            <h2 className="py-5 text-center text-2xl font-bold text-blue-500">
              Organize an Event
            </h2>

            <p className="px-8 pb-8 text-sky-900">
              Organizing an event is a great way to help us spread the word
              about our cause. Whether you are planning a fundraiser, a rally,
              or a community service project, please don&apos;t hesitate to
              reach out and help us make a difference.
            </p>
            <Link className="flex justify-end px-8 pb-3" href="/contact">
              <Button>Get in Touch</Button>
            </Link>
          </div>
        </div>
        <div className="md:w-1/3">
          <Image
            className="w-full rounded-t-lg "
            src={'/aboutvolunteer.webp'}
            alt="volunteer"
            width={300}
            height={300}
            priority
          />
          <div className="rounded-b-lg bg-sky-200">
            <h2 className="py-5 text-center text-2xl  font-bold text-blue-500">
              Volunteer
            </h2>

            <p className="px-8 pb-2 text-sky-900">
              Volunteering is a great way to help us make a difference. Whether
              you are a student, a professional, or just someone who cares about
              the future of our country, there are numerous ways to get involved
              and together we can be a force for real change.
            </p>
            <Link className="flex justify-end px-8 pb-3" href="/contact">
              <Button>Get in Touch</Button>
            </Link>
          </div>
        </div>
        <div className="md:w-1/3">
          <Image
            className="w-full rounded-t-lg "
            src={'/aboutdonate.webp'}
            alt="donate"
            width={300}
            height={300}
            priority
          />
          <div className="rounded-b-lg bg-sky-200">
            <h2 className="py-5 text-center text-2xl  font-bold text-blue-500">
              Donate
            </h2>

            <p className="px-8 pb-2 text-sky-900">
              Be part of something great and help plant a seed of hope to
              millions of children who are depending on us to make a real
              difference by utilizing your kind donations to build a better
              brighter future full of opportunities through good governance.
            </p>
            <Link className="flex justify-end px-8 pb-3" href="/contact">
              <Button>Get in Touch</Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default GetInvolved;
