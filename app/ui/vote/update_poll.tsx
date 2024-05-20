'use client';

import { FaTimes } from 'react-icons/fa';
import { supabase } from '@/app/lib/supabase';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
import { updatePoll } from '@/app/lib/actions';
import { useState } from 'react';
import { EditPoll, Poll } from '@/app/lib/definitions';

// create a modal to capture the user's input and pass the form action to be called when the form is submitted
const UpdatePollModal = ({
  poll_data,
  onClose,
}: {
  poll_data: Poll;
  onClose: () => void;
}) => {
  // create a state to hold the file object from the file form input field
  const [file, setFile] = useState<File | null>(null);
  const poll_id = poll_data.id;

  // handle the file change event and set the file state to the selected file
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  // convert the date object into a string in the 'YYYY-MM-DDThh:mm' format
  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

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
    // get the imageURL from supabase storage bucket
    const bannerURL = `https://hgtovaupiuxajqlkjdfg.supabase.co/storage/v1/object/public/images/${data.path}`;
    // get the rest of the form data from the form
    const formElement = document.getElementById('editPollForm');
    const formData = new FormData(formElement as HTMLFormElement);
    // create a poll object with the form data and the file path from the uploaded file
    const editPoll: EditPoll = {
      title: formData.get('title') as string,
      startDate: new Date(formData.get('startDate') as string),
      endDate: new Date(formData.get('endDate') as string),
      description: formData.get('description') as string,
      banner: bannerURL,
    };

    updatePoll(poll_id, editPoll)
      .then(() => {
        toast.success('Poll updated successfully!');
        onClose();
      })
      .catch((error: Error) => {
        toast.error('Error updating poll.');
        console.error(error);
      });
    // reload the page after 3.5 seconds to reflect the changes
    setTimeout(() => window.location.reload(), 3500);
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
            <p className="font-semibold">Edit Poll</p>
            <button
              onClick={onClose}
              className="border-0 bg-transparent focus:outline-none"
            >
              <FaTimes />
            </button>
          </div>
          {/* form */}
          <form
            id="editPollForm"
            onSubmit={handleSubmit}
            className="mb-5 mt-5 flex flex-col items-start justify-center rounded-xl"
          >
            {/* poll title field */}
            <div className="mb-3 mt-2 flex w-full items-center rounded-full border border-[#212D4A] px-4 py-4">
              <input
                id="title"
                defaultValue={poll_data.title}
                placeholder="Poll Title"
                className="w-full bg-transparent text-sm placeholder-[#929292] outline-none"
                name="title"
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
              >.
              </span>
              <input
                id="startDate"
                defaultValue={formatDate(new Date(poll_data.startDate))}
                className="w-full bg-transparent text-sm placeholder-transparent outline-none"
                name="startDate"
                type="datetime-local"
                placeholder="Poll Start Date and Time"
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
              >.
              </span>
              <input
                id="endDate"
                className="w-full bg-transparent text-sm placeholder-[#929292] outline-none"
                name="endDate"
                defaultValue={formatDate(new Date(poll_data.endDate))}
                placeholder="Poll End Date and Time"
                type="datetime-local"
              />
            </div>
            {/* banner field */}
            <div className="mb-3 mt-2 flex w-full items-center rounded-full border border-[#212D4A] px-4 py-4">
              <input
                id="banner"
                type="file"
                placeholder="Poll Banner"
                className="w-full bg-transparent text-sm placeholder-[#929292] outline-none"
                name="banner"
                onChange={handleFileChange}
              />
            </div>
            {/* description */}
            <div className="mt-2 flex h-20 w-full items-center rounded-xl border border-[#212D4A] px-4 py-4">
              <textarea
                id="description"
                placeholder="Poll Description"
                defaultValue={poll_data.description}
                className="w-full bg-transparent text-sm placeholder-[#929292] outline-none"
                name="description"
              ></textarea>
            </div>
            {/* date poll button */}
            <button
              type="submit"
              className="mt-2 block h-[48px] w-full rounded-full bg-[#1B5CFE] px-3 text-sm
                font-bold transition-all duration-300 hover:bg-blue-500"
            >
              Update Poll
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default UpdatePollModal;
