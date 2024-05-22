'use client';

import { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { supabase } from '@/app/lib/supabase';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
import { updateContestant } from '@/app/lib/actions';
import { PollContestant } from '@/app/lib/definitions';

// create a modal to capture the user's input and pass the form action to be called when the form is submitted
const UpdateContestantModal = ({
  contestant,
  onClose,
}: {
  contestant: PollContestant;
  onClose: () => void;
}) => {
  // get the contestant id from the contestant object
  const contestant_id = contestant.id;
  // create a state to hold the file object from the file form input field
  const [file, setFile] = useState<File | null>(null);
  // handle the file change event and set the file state to the selected file
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
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
    // toast.success('File uploaded successfully!');
    // get the imageURL from supabase storage bucket
    const avatarURL = `https://hgtovaupiuxajqlkjdfg.supabase.co/storage/v1/object/public/images/${data.path}`;
    // get the rest of the form data from the form
    const formElement = document.getElementById('editContestantForm');
    const formData = new FormData(formElement as HTMLFormElement);
    // create a contestant object with the form data and the file path from the uploaded file
    const contestant = {
      name: formData.get('name') as string,
      slogan: formData.get('slogan') as string,
      avatar: avatarURL as string,
    };
    // call the updateContestant action and pass contestant object and the contestant_id
    updateContestant(contestant_id, contestant)
      .then(() => {
        toast.success('Contestant updated successfully!');
        onClose();
      })
      .catch((error: Error) => {
        toast.error('Error updating contestant!');
        console.error(error);
      });
    // reload the page after 3.5 seconds to reflect the changes
    setTimeout(() => window.location.reload(), 3500);
  };

  return (
    <main
      className="fixed left-0 top-0 z-50 flex h-screen w-screen transform
    items-center justify-center bg-black bg-opacity-50 transition-transform duration-300"
    >
      <div className="h-7/12 w-11/12 rounded-xl bg-[#0c0c10] p-6 text-[#BBBBBB] shadow-lg shadow-[#1B5CFE] md:w-2/5">
        <div className="flex flex-col">
          {/* close button */}
          <div className="flex flex-row items-center justify-between">
            <p className="font-semibold">Edit Contestant Details</p>
            <button
              onClick={onClose}
              className="border-0 bg-transparent focus:outline-none"
            >
              <FaTimes />
            </button>
          </div>
          {/* form */}
          <form
            id="editContestantForm"
            className="mb-5 mt-5 flex flex-col items-start justify-center rounded-xl"
            onSubmit={handleSubmit}
          >
            {/* contestant name field */}
            <div className="mb-3 mt-2 flex w-full items-center rounded-full border border-[#212D4A] px-4 py-4">
              <input
                id="name"
                placeholder="username"
                defaultValue={contestant.name}
                className="w-full bg-transparent text-sm placeholder-[#929292] outline-none"
                name="name"
              />
            </div>
            {/* contestant slogan field */}
            <div className="mb-3 mt-2 flex w-full items-center rounded-full border border-[#212D4A] px-4 py-4">
              <input
                id="slogan"
                defaultValue={contestant.slogan || ''}
                placeholder="Contestant Slogan"
                className="w-full bg-transparent text-sm placeholder-[#929292] outline-none"
                name="slogan"
              />
            </div>
            {/* contestant avatar field */}
            <div className="mb-3 mt-2 flex w-full items-center rounded-full border border-[#212D4A] px-4 py-4">
              <input
                id="avatar"
                placeholder="Passport size Photo"
                type="file"
                className="w-full bg-transparent text-sm placeholder-[#929292] outline-none"
                name="avatar"
                required
                onChange={handleFileChange}
              />
            </div>
            {/* update contestant button */}
            <button
              type="submit"
              className="mt-2 block h-[48px] w-full rounded-full bg-[#1B5CFE] px-3 text-sm
                font-bold transition-all duration-300 hover:bg-blue-500"
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default UpdateContestantModal;
