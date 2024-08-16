'use client';

import { useState } from 'react';
import { Button } from '../button';

// create a policies component to render the official party documentation
const Policies = () => {
  // create a state to keep track of the pdf source
  const [pdfSrc, setPdfSrc] = useState('');

  // create a function to set the pdf source when a file is selected
  const openPDF = (pdfName: string) => {
    setPdfSrc(pdfName);
  };

  // create a list of files to be displayed
  const files = [
    { name: 'View Document 1', url: '/test1.pdf' },
    { name: 'View Document 2', url: '/test2.docx' },
  ];

  return (
    <main className="bg-background text-primary-foreground flex h-screen flex-col items-center bg-sky-50 p-4 md:p-8">
      <h1 className="mb-8 text-center text-3xl font-bold">
        Official Party Documentation
      </h1>
      {/* map the files to buttons that will open the pdf in an iframe */}
      <div className="flex flex-wrap gap-3 md:w-3/4">
        {files.map((file, index) => (
          <Button
            key={index}
            onClick={() => openPDF(file.url)}
            className="mb-4 rounded-lg px-4 py-2"
          >
            {file.name}
          </Button>
        ))}
      </div>
      {/* render the pdf in an iframe when a file is selected */}
      {pdfSrc && (
        <div className="mt-8 h-3/4 w-3/4">
          <iframe src={pdfSrc} className="h-full w-full rounded-lg" />
        </div>
      )}
    </main>
  );
};

export default Policies;
