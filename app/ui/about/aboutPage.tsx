'use client';

import { useState, useEffect } from 'react';
import { Button } from '../button';
import Link from 'next/link';
import WhoWeAre from './whoWeAre';
import Origins from './origins';
import History from './history';

// create a slideshow widget for the about page
const AboutPageWidget = () => {
  // create a state to keep track of the current slide index
  const [slideIndex, setSlideIndex] = useState(0);

  // create a list/array of slides for the slideshow
  const slides = [
    <div key="who-we-are">
      <WhoWeAre />
    </div>,
    <div key="origins">
      <Origins />
    </div>,
    <div key="history">
      <History />
    </div>,
  ];

  // create a timer to automatically change the slide every 35 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setSlideIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 35000);

    return () => clearInterval(timer);
  }, [slides.length]);

  // create a function to change the slide index by a number (n) when the next or previous button is clicked
  const plusSlides = (n: number) => {
    setSlideIndex(
      (prevIndex) => (prevIndex + n + slides.length) % slides.length,
    );
  };

  return (
    <main className="relative min-h-screen p-4">
      <div className="absolute inset-0 bg-black bg-cover opacity-50"></div>
      <h1 className="mb-4 text-center text-4xl font-bold text-white">
        About ATP
      </h1>
      <div className="container relative z-10 mx-auto flex h-full justify-center px-4 py-8">
        <div>
          <div className="mt-8 max-w-2xl rounded-lg bg-sky-50 bg-opacity-60 p-6 shadow-lg">
            <div id="slideshow" className="relative flex gap-2 overflow-hidden">
              <Button className="mt-16" onClick={() => plusSlides(-1)}>
                &#10094;
              </Button>
              <div className="slides">
                {slides.map((text, index) => (
                  <div
                    key={index}
                    className={`slide ${index === slideIndex ? 'block' : 'hidden'}`}
                  >
                    <div>{text}</div>
                  </div>
                ))}
              </div>
              <Button className="mt-16" onClick={() => plusSlides(1)}>
                &#10095;
              </Button>
            </div>
            <h2 className="mb-2 mt-8 text-2xl font-semibold">Our Mission</h2>
            <p className="text-black">
              To provide a platform where the youth can come together, air their
              views and always be involved in their nation&apos;s governance
              ensuring sustainable progressive governance.
            </p>
            <Link href="./dashboard/members/register">
              <Button className="mt-2">Join Us</Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AboutPageWidget;
