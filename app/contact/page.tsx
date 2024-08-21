import ContactForm from './contact-form';
import NavBar from '@/app/ui/top-navbar';
import type { Metadata } from 'next';

// add metadata title for the contact page
export const metadata: Metadata = {
  title: 'Contact',
};

// create a contact page component with a contact form
const ContactPage = () => {
  return (
    <main>
      <div className="absolute z-10 mb-16">
        <NavBar />
      </div>
      <div className="mt-16">
        <ContactForm />
      </div>
    </main>
  );
};

export default ContactPage;
