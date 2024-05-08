import { FaTimes } from 'react-icons/fa';

// create a modal to capture the user's input and pass the form action to be called when the form is submitted
const ContestantModal = ({ onClose }: { onClose: () => void }) => {
  return (
    <div
      className="fixed left-0 top-0 z-50 flex h-screen w-screen transform
    items-center justify-center bg-black bg-opacity-50 transition-transform duration-300"
    >
      <div className="h-7/12 w-11/12 rounded-xl bg-[#0c0c10] p-6 text-[#BBBBBB] shadow-lg shadow-[#1B5CFE] md:w-2/5">
        <div className="flex flex-col">
          {/* close button */}
          <div className="flex flex-row items-center justify-between">
            <p className="font-semibold">Fill Contestant Details</p>
            <button
              onClick={onClose}
              className="border-0 bg-transparent focus:outline-none"
            >
              <FaTimes />
            </button>
          </div>
          {/* form */}
          <form className="mb-5 mt-5 flex flex-col items-start justify-center rounded-xl">
            {/* contestant name field */}
            <div className="mb-3 mt-2 flex w-full items-center rounded-full border border-[#212D4A] px-4 py-4">
              <input
                defaultValue="Contestant / Logged-in user name"
                className="w-full cursor-not-allowed bg-transparent text-sm placeholder-[#929292] outline-none"
                name="name"
                disabled
              />
            </div>
            {/* contestant slogan field */}
            <div className="mb-3 mt-2 flex w-full items-center rounded-full border border-[#212D4A] px-4 py-4">
              <input
                placeholder="Contestant Slogan"
                className="w-full bg-transparent text-sm placeholder-[#929292] outline-none"
                name="slogan"
              />
            </div>
            {/* contestant avatar field */}
            <div className="mb-3 mt-2 flex w-full items-center rounded-full border border-[#212D4A] px-4 py-4">
              <input
                placeholder="Passport size Photo"
                type="file"
                className="w-full bg-transparent text-sm placeholder-[#929292] outline-none"
                name="avatar"
                required
              />
            </div>
            {/* create contestant button */}
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

export default ContestantModal;
