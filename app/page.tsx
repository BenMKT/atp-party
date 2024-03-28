import { lusitana } from '@/app/ui/fonts';

import React from "react";

const HomePage = () => {
  return (
    <main>
      <h1 className={`${lusitana.className} text-6xl font-bold`}>Welcome to ATP app!</h1>
    </main>
  );
};

export default HomePage;
