import ContactForm from './contact-form';
import NavBar from '@/app/ui/top-navbar';

// create a contact page component with a contact form
const ContactPage = () => {
  return (
    <main>
      <div className="mb-16 absolute z-10">
        <NavBar />
      </div>
      <div className='mt-16'>
        <ContactForm />
      </div>
    </main>
  );
};

export default ContactPage;
