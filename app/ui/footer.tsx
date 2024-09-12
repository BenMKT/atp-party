import React from 'react';
import { FaGithub, FaLinkedinIn, FaTwitter, FaYoutube } from 'react-icons/fa';

// create a footer component to display social media links and a copyright notice
const Footer = () => {
  return (
    <footer
      className="flex h-[192px] w-full
      flex-col items-center justify-center rounded-t-[24px] bg-white
      bg-opacity-20 px-5 py-[37px] text-black"
    >
      <div className="flex items-center justify-center space-x-4">
        <FaLinkedinIn size={27} />
        <FaYoutube size={27} />
        <FaGithub size={27} />
        <FaTwitter size={27} />
      </div>

      <hr className="mt-3 w-full border-t border-gray-400 sm:w-[450px]" />

      <p className="mt-5 text-sm font-[500px]">©️{new Date().getFullYear()}</p>
      <p className="text-sm font-[500px]">With Love ❤️ by Benson</p>
    </footer>
  );
};

export default Footer;
