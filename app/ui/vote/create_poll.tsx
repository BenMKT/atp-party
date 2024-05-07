import React from 'react';
import { FaTimes } from 'react-icons/fa';

// create a modal to capture the user's input and pass the form action to be called when the form is submitted
const CreatePollModal = () => {
  return (
    <div
      className={`fixed left-0 top-0 z-50 flex h-screen w-screen scale-100
    transform items-center justify-center bg-black bg-opacity-50 transition-transform duration-300`}
    >
      <div className="h-7/12 w-11/12 rounded-xl bg-[#0c0c10] p-6 text-[#BBBBBB] shadow-lg shadow-[#1B5CFE] md:w-2/5">
        <div className="flex flex-col">
          <div className="flex flex-row items-center justify-between">
            <p className="font-semibold">Add Poll</p>
            <button className="border-0 bg-transparent focus:outline-none">
              <FaTimes />
            </button>
          </div>
          <form className="mb-5 mt-5 flex flex-col items-start justify-center rounded-xl">
            <div className="mb-3 mt-2 flex w-full items-center rounded-full border border-[#212D4A] px-4 py-4">
              <input
                placeholder="Poll Name"
                className="w-full bg-transparent text-sm placeholder-[#929292] outline-none"
                name="name"
                required
              />
            </div>
            <div
              className="relative mb-3 mt-2 flex w-full
              items-center space-x-2 rounded-full border border-[#212D4A] px-4 py-4"
            >
              <span
                className="absolute left-[2.5px] w-48
                rounded-full bg-[#1B5CFE] bg-opacity-20 px-5 py-3 text-[#4C6AD7]"
              >
                .
              </span>
              <input
                className="w-full bg-transparent text-sm placeholder-transparent outline-none"
                name="starts"
                type="datetime-local"
                placeholder="Start Date and Time"
                required
              />
            </div>
            <div
              className="relative mb-3 mt-2 flex w-full
              items-center space-x-2 rounded-full border border-[#212D4A] px-4 py-4"
            >
              <span
                className="absolute left-[2.5px] w-48
                rounded-full bg-[#1B5CFE] bg-opacity-20 px-5 py-3 text-[#4C6AD7]"
              >
                .
              </span>
              <input
                className="w-full bg-transparent text-sm placeholder-[#929292] outline-none"
                name="ends"
                type="datetime-local"
                required
              />
            </div>
            <div className="mb-3 mt-2 flex w-full items-center rounded-full border border-[#212D4A] px-4 py-4">
              <input
                placeholder="Banner URL"
                type="url"
                className="w-full bg-transparent text-sm placeholder-[#929292] outline-none"
                name="banner"
                required
              />
            </div>
            <div className="mt-2 flex h-20 w-full items-center rounded-xl border border-[#212D4A] px-4 py-4">
              <textarea
                placeholder="Poll Description"
                className="w-full bg-transparent text-sm placeholder-[#929292] outline-none"
                name="banner"
                required
              ></textarea>
            </div>

            <button
              className="mt-2 block h-[48px] w-full rounded-full bg-[#1B5CFE] px-3 text-sm
                font-bold transition-all duration-300 hover:bg-blue-500"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default CreatePollModal;
