'use client';

import { useEffect, useState } from 'react';
import { lusitana } from '@/app/ui/fonts';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import digitalKenya5 from '@/public/digitalKenya5.jpg';
import digitalKenya3 from '@/public/digitalKenya3.jpg';
import digitalKenya4 from '@/public/digitalKenya4.jpg';
import digitalKenya6 from '@/public/digitalKenya6.jpg';
import { motion } from 'framer-motion';

// create a component to display the landing/home page
const HomePage = () => {
  const session = useSession().data;
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [digitalKenya5, digitalKenya3, digitalKenya4, digitalKenya6];

  const texts = [
    'Embracing Technology for Good Governance',
    'Empowering Communities Through Innovation',
    'Building a Sustainable Future with Technology',
    'Transforming Kenya Through Digital Innovation',
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, [texts.length]);

  return (
    <main className="flex h-screen flex-col pt-16">
      <div className="flex flex-1 flex-col overflow-hidden">
        {session && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{
              repeat: Infinity,
              repeatDelay: 15,
              duration: 5,
              type: 'tween',
              ease: 'easeInOut',
            }}
            className={`${lusitana.className} absolute flex items-center gap-1 p-2 font-bold md:text-white`}
          >
            <div className="h-[32px] w-[32px] rounded-full bg-green-400" />
            Welcome, Ambassador {session?.user?.name}, to the future!
          </motion.div>
        )}
        <div className="flex flex-1 flex-col-reverse overflow-hidden md:flex-row">
          <div
            id="slideshow"
            className={`${lusitana.className} flex flex-1 items-center justify-center bg-black px-8 py-1 font-serif text-4xl font-bold text-gray-200 md:text-7xl`}
          >
            <motion.h1
              key={currentIndex} // Change the key to currentIndex
              initial={{ opacity: 0, y: '-100vw' }} // Start with 0 opacity and -100vh on the y-axis
              animate={{ opacity: 1, y: 0 }} // Animate to full opacity and y-axis to 0
              transition={{
                type: 'spring',
                stiffness: 120,
                damping: 12,
                mass: 2.5,
                velocity: 0,
                restSpeed: 0.5,
                restDelta: 0.5,
              }} // Duration of the animation
            >
              {texts[currentIndex]}
            </motion.h1>
          </div>
          <div className=" h-auto overflow-hidden md:flex-1">
            <Image
              src={images[currentIndex]}
              className="h-full w-full object-cover"
              sizes="100vw"
              alt="Image of youth embracing technology for good governance"
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default HomePage;
