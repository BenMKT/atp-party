'use client';

import { FaTimes } from 'react-icons/fa';
import { supabase } from '@/app/lib/supabase';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
import { createPoll } from '@/app/lib/actions';
import { useEffect, useState } from 'react';

// create a modal to capture the user's input and pass the form action to be called when the form is submitted
const CreatePollModal = ({ onClose }: { onClose: () => void }) => {
  // create a state to hold the file object from the file form input field
  const [file, setFile] = useState<File | null>(null);

  // handle the file change event and set the file state to the selected file
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  // prevent scrolling when the modal is open
  useEffect(() => {
    // Scroll to the top of the page
    window.scrollTo(0, 0);
    // Add the no-scroll class to the body when the modal is open
    document.body.classList.add('no-scroll');
    return () => {
      // Remove the no-scroll class from the body when the modal is closed
      document.body.classList.remove('no-scroll');
    };
  }, []);

  // handle the form submission event
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // get the image object file from the form
    if (!file) {
      toast.error('Please select a file.');
      return;
    }
    // upload the file to supabase storage and get the file path through destructuring
    const filename = `${uuidv4()}-${file.name}`;
    const { data, error } = await supabase.storage
      .from('images')
      .upload(filename, file);
    if (error) {
      toast.error(error.message);
      return;
    }
    // toast.success('File uploaded successfully!');
    // get the rest of the form data from the form
    const formElement = document.getElementById('pollForm');
    const formData = new FormData(formElement as HTMLFormElement);
    // create a poll with the form data and the file path from the uploaded file
    createPoll(data, formData)
      .then(() => {
        toast.success('Poll created successfully!');
        onClose();
      })
      .catch((error: Error) => {
        toast.error('Error creating poll.');
        console.error(error);
      });
  };

  return (
    <main
      className={`fixed left-0 top-0 z-50 flex h-screen w-screen scale-100
    transform items-center justify-center bg-black bg-opacity-50 transition-transform duration-300`}
    >
      <div className="h-7/12 w-11/12 rounded-xl bg-[#0c0c10] p-6 text-[#BBBBBB] shadow-lg shadow-[#1B5CFE] md:w-2/5">
        <div className="flex flex-col">
          {/* close button */}
          <div className="flex flex-row items-center justify-between">
            <p className="font-semibold">Add Poll</p>
            <button
              type="button"
              aria-label="Close"
              onClick={onClose}
              className="border-0 bg-transparent focus:outline-none"
            >
              <FaTimes />
            </button>
          </div>
          {/* form */}
          <form
            id="pollForm"
            onSubmit={handleSubmit}
            className="mb-5 mt-5 flex flex-col items-start justify-center rounded-xl"
          >
            {/* poll title field */}
            <div className="mb-3 mt-2 flex w-full items-center rounded-full border border-[#212D4A] px-4 py-4">
              <input
                id="title"
                placeholder="Poll Title"
                className="w-full bg-transparent text-sm placeholder-[#929292] outline-none"
                name="title"
                required
              />
            </div>
            {/* start date field */}
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
                id="startDate"
                className="date-input w-full bg-transparent text-sm outline-none"
                name="startDate"
                type="datetime-local"
                placeholder="Start Date and Time"
                required
              />
            </div>
            {/* end date field */}
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
                id="endDate"
                className="date-input w-full bg-transparent text-sm outline-none"
                name="endDate"
                placeholder="End Date and Time"
                type="datetime-local"
                required
              />
            </div>
            {/* banner field */}
            <div className="mb-3 mt-2 flex w-full items-center rounded-full border border-[#212D4A] px-4 py-4">
              <input
                id="banner"
                type="file"
                placeholder="Banner"
                className="w-full bg-transparent text-sm placeholder-[#929292] outline-none"
                name="banner"
                required
                onChange={handleFileChange}
              />
            </div>
            {/* description */}
            <div className="mt-2 flex h-20 w-full items-center rounded-xl border border-[#212D4A] px-4 py-4">
              <textarea
                id="description"
                placeholder="Poll Description"
                className="w-full bg-transparent text-sm placeholder-[#929292] outline-none"
                name="description"
                required
              ></textarea>
            </div>
            {/* create poll button */}
            <button
              type="submit"
              className="mt-2 block h-[48px] w-full rounded-full bg-[#1B5CFE] px-3 text-sm
                font-bold hover:scale-105 active:-scale-95"
            >
              Create Poll
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};
export default CreatePollModal;
