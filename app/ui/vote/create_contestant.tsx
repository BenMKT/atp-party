'use client';

import { useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { supabase } from '@/app/lib/supabase';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
import { createContestant } from '@/app/lib/actions';
import { useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';

// create a modal to capture the user's input and pass the form action to be called when the form is submitted
const ContestantModal = ({ onClose }: { onClose: () => void }) => {
  const paramsId = useParams();
  const poll_id = paramsId.id as string;
  // get the session data from the useSession hook
  const session = useSession().data;

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
    // get the imageURL from supabase storage bucket
    const avatarURL = `https://hgtovaupiuxajqlkjdfg.supabase.co/storage/v1/object/public/images/${data.path}`;
    // get the rest of the form data from the form
    const formElement = document.getElementById('contestantForm');
    const formData = new FormData(formElement as HTMLFormElement);
    // create a contestant with the form data and the file path from the uploaded file
    const contestant = {
      id: uuidv4() as string,
      name: formData.get('name') as string,
      slogan: formData.get('slogan') as string,
      avatar: avatarURL as string,
      pollId: poll_id as string,
      createdAt: new Date() as Date,
      updatedAt: new Date() as Date,
      userId: session?.user?.id as string,
    };
    // call the createContestant action and pass contestant object
    createContestant(contestant)
      .then(() => {
        toast.success('Contestant created successfully!');
        onClose();
      })
      .catch((error: Error) => {
        toast.error('Error: You can contestant in only one poll.');
        console.error(error);
      });
    // revalidation done by supabase real-time subscription
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
            <p className="font-semibold">Fill Contestant Details</p>
            <button
              type="button"
              onClick={onClose}
              className="border-0 bg-transparent focus:outline-none"
              aria-label="Close modal"
            >
              <FaTimes />
            </button>
          </div>
          {/* form */}
          <form
            id="contestantForm"
            className="mb-5 mt-5 flex flex-col items-start justify-center rounded-xl"
            onSubmit={handleSubmit}
          >
            {/* contestant name field */}
            <div className="mb-3 mt-2 flex w-full flex-col gap-2">
              <label htmlFor="name" className="text-sm">Full Name</label>
              <div className="flex w-full items-center rounded-full border border-[#212D4A] px-4 py-4">
              <input
                id="name"
                readOnly
                defaultValue={session?.user?.name as string}
                className="w-full bg-transparent text-sm placeholder-[#929292] outline-none"
                name="name"
              />
            </div>
            </div>

            {/* contestant slogan field */}
            <div className="mb-3 mt-2 flex w-full flex-col gap-2">
              <label htmlFor="slogan" className="text-sm">Slogan</label>
              <div className="flex w-full items-center rounded-full border border-[#212D4A] px-4 py-4">
                <input
                  id="slogan"
                  placeholder="Enter your campaign slogan"
                  className="w-full bg-transparent text-sm placeholder-[#929292] outline-none"
                  name="slogan"
                />
              </div>
            </div>

            {/* contestant avatar field */}
            <div className="mb-3 mt-2 flex w-full flex-col gap-2">
              <label htmlFor="avatar" className="text-sm">Profile Photo</label>
              <div className="flex w-full items-center rounded-full border border-[#212D4A] px-4 py-4">
                <input
                  id="avatar"
                  type="file"
                  className="w-full bg-transparent text-sm placeholder-[#929292] outline-none"
                  name="avatar"
                  required
                  onChange={handleFileChange}
                />
              </div>
            </div>

            {/* create contestant button */}
            <button
              type="submit"
              className="mt-2 block h-[48px] w-full rounded-full bg-[#1B5CFE] px-3 text-sm
                font-bold hover:scale-105 active:scale-95"
            >
              Contest
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default ContestantModal;
