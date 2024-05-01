'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useForm, ValidationError } from '@formspree/react';
import { toast } from 'react-toastify';

// create a contact form component to capture user input
const ContactForm = () => {
  // use the useForm hook to handle form state, submission, validation, reset, and error handling
  const [state, handleSubmit, reset] = useForm('mdoqbndz');

  // display success messages to the user using react-toastify on successful form submission and reset the form 
  if (state.succeeded) {
    toast.success('Message Submitted Successfully!', {
      position: 'bottom-center',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    reset();// reset form on successful submission
  }
  // else if (state.errors) {
  //   const errorMessage = Object.values(state.errors).join(', ');
  //   toast.error(errorMessage, {
  //     position: 'bottom-center',
  //     autoClose: 3000, // Close after 3 seconds
  //     hideProgressBar: false,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //   });
  // }

  return (
    <main>
      <div>
        {/* top container with tagline and backgroundImage  */}
        <div className="relative">
          {/* background image section  */}
          <section className="h-[43vh] w-full bg-black bg-cover bg-center brightness-50 lg:h-[44vh]"></section>

          {/* tagline division  */}
          <div className="absolute left-[5%] top-[17%] -translate-y-1/2 text-white md:left-[10%]">
            <h1 className="text-3xl font-bold md:text-5xl">Get In Touch</h1>
            <p className="text-sm md:text-lg">#PamojaTwaweza!</p>
          </div>
        </div>

        {/* bottom relative container  */}
        <div className="relative h-[1150px] w-full bg-blue-300 md:h-[65vh] lg:h-[49vh]">
          {/* division with floating form  */}
          <div className="absolute -top-[10%] left-1/2 grid h-fit w-4/5 -translate-x-1/2 grid-cols-1 overflow-hidden rounded text-white shadow md:-top-[42%] md:w-[90%] md:grid-cols-3 lg:w-4/5">
            {/* form or left div container  */}
            <div className="col-span-2 h-full bg-gray-800 p-2 md:p-4">
              <form onSubmit={handleSubmit}>
                {/* form top part containing mail icon and heading  */}
                <div className="flex flex-col items-start justify-around p-4 pt-8 md:flex-row md:items-center">
                  {/* heading  */}
                  <h2 className="text-2xl font-semibold md:text-3xl">
                    Send Us A Message
                  </h2>

                  {/* mail svg icon  */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-mail-forward"
                    width="33"
                    height="33"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="#fff"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M12 18h-7a2 2 0 0 1 -2 -2v-10a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v7.5" />
                    <path d="M3 6l9 6l9 -6" />
                    <path d="M15 18h6" />
                    <path d="M18 15l3 3l-3 3" />
                  </svg>
                </div>
                {/* bottom form with input fields  */}
                <div className="grid grid-cols-1 gap-8 px-4 py-6 text-sm md:grid-cols-2 md:px-8 md:py-12">
                  {/* name input  */}
                  <div className="flex flex-col gap-1">
                    <label htmlFor="name" className="font-semibold">
                      Name <span className="text-red-500">&#42;</span>
                    </label>
                    <input
                      className="rounded-md border-[1px] border-white bg-gray-800 p-2"
                      placeholder="Enter Your Name"
                      required
                      id="name"
                      name="name"
                      type="text"
                    />
                  </div>
                  <ValidationError
                    field="email"
                    prefix="Email"
                    errors={state.errors}
                  />

                  {/* email input  */}
                  <div className="flex flex-col gap-1">
                    <label htmlFor="email" className="font-semibold">
                      Email <span className="text-red-500">&#42;</span>
                    </label>
                    <input
                      className="rounded-md border-[1px] border-white bg-gray-800 p-2"
                      placeholder="user@user.com"
                      required
                      id="email"
                      name="email"
                      type="email"
                    />
                  </div>
                  <ValidationError
                    field="email"
                    prefix="Email"
                    errors={state.errors}
                  />

                  {/* phone number input  */}
                  <div className="flex flex-col gap-1">
                    <label htmlFor="phone" className="font-semibold">
                      Phone <span className="text-red-500">&#42;</span>
                    </label>
                    <input
                      className="rounded-md border-[1px] border-white bg-gray-800 p-2"
                      placeholder="+254700000000"
                      id="phone"
                      required
                      name="phone"
                      type="tel"
                    />
                  </div>
                  <ValidationError
                    field="phone"
                    prefix="Phone"
                    errors={state.errors}
                  />

                  {/* subject input  */}
                  <div className="flex flex-col gap-1">
                    <label htmlFor="subject" className="font-semibold">
                      Subject <span className="text-red-500">&#42;</span>
                    </label>
                    <input
                      className="rounded-md border-[1px] border-white bg-gray-800 p-2"
                      placeholder="Enter Your Subject"
                      required
                      name="subject"
                      id="subject"
                      type="text"
                    />
                  </div>
                  <ValidationError
                    field="subject"
                    prefix="Subject"
                    errors={state.errors}
                  />

                  {/* message input  */}
                  <div className="flex flex-col gap-1 md:col-span-2">
                    <label htmlFor="message" className="font-semibold">
                      Message <span className="text-red-500">&#42;</span>
                    </label>
                    <input
                      className="rounded-md border-[1px] border-white bg-gray-800 p-2"
                      placeholder="Enter Your Message"
                      required
                      id="message"
                      name="message"
                      type="text"
                    />
                  </div>
                  <ValidationError
                    field="message"
                    prefix="Message"
                    errors={state.errors}
                  />
                </div>
                {/* display succuss and error messages */}
                <div>

                </div>

                {/* submit button div  */}
                <div className="flex items-center justify-center px-8 py-4 md:justify-end">
                  {/* submit button  */}
                  <button className="flex items-center gap-2 rounded-md border-2 border-white bg-gray-800 px-4 py-2 transition-all hover:scale-95 md:px-6 md:py-4">
                    <span className="text-xl">Submit</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon icon-tabler icon-tabler-brand-telegram"
                      width="30"
                      height="30"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="#fff"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M15 10l-4 4l6 6l4 -16l-18 7l4 2l2 6l3 -4" />
                    </svg>
                  </button>
                </div>
              </form>
            </div>

            {/* right div  */}
            <div className="grid h-[500px] grid-cols-1 grid-rows-5 bg-blue-800 px-4 py-6 md:h-full">
              {/* heading tag  */}
              <h2 className="text-center text-xl font-semibold md:text-start lg:text-2xl">
                Contact Information
              </h2>

              {/* email and icon  */}
              <div className="row-span-4 flex flex-col items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-mail-share"
                  width="35"
                  height="35"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="#fff"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M13 19h-8a2 2 0 0 1 -2 -2v-10a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v6" />
                  <path d="M3 7l9 6l9 -6" />
                  <path d="M16 22l5 -5" />
                  <path d="M21 21.5v-4.5h-4.5" />
                </svg>
                <span>yourmail@support.com</span>
              </div>

              {/* social icons div  */}
              <div className="flex items-center justify-center gap-4 md:justify-start">
                <Link title="youtube" href="#">
                  <Image
                    width={32}
                    height={32}
                    alt="youtube"
                    className="invert"
                    src="https://www.svgrepo.com/show/521936/youtube.svg"
                  />
                </Link>
                <Link title="linkedin" href="#">
                  <Image
                    width={48}
                    height={48}
                    alt="linkedin"
                    className="invert"
                    src="https://www.svgrepo.com/show/520815/linkedin.svg"
                  />
                </Link>
                <Link title="instagram" href="#">
                  <Image
                    width={32}
                    height={32}
                    alt="instagram"
                    className="invert"
                    src="https://www.svgrepo.com/show/521711/instagram.svg"
                  />
                </Link>
                <Link title="github" href="#">
                  <Image
                    width={32}
                    height={32}
                    alt="github"
                    className="invert"
                    src="https://www.svgrepo.com/show/512317/github-142.svg"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ContactForm;
