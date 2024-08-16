'use client';

import { AiFillPrinter } from 'react-icons/ai';
import { Button } from './button';

// create a print button component to print the tables
const PrintButton = () => {
  return (
    <main>
      <Button
        onClick={() => window.print()}
        className="print-button flex gap-2"
      >
        <AiFillPrinter className="size-6" />
        <span className="hidden md:block">Print</span>
      </Button>
    </main>
  );
};

export default PrintButton;
