'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';

// create a pagination component to navigate through the pages of the bills table

const Pagination = ({ totalPages }: { totalPages: number }) => {
  // get the current pathname and search query params from the URL
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  // create a function to generate the page URL based on the page number
  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };
  // display the pagination buttons
  return (
    <main>
      <div className="pagination join">
        {/* Previous page button */}
        <button
          type="button"
          disabled={currentPage === 1}
          className="btn join-item hover:scale-105 hover:bg-gray-400 active:scale-90"
        >
          <Link href={createPageURL(currentPage - 1)}>
            <FaAngleLeft />
          </Link>
        </button>
        {/* Page numbers */}
        {Array.from({ length: totalPages }, (_, i) => (
          <Link
            key={i + 1}
            href={createPageURL(i + 1)}
            className={`btn join-item hover:scale-105 hover:bg-gray-400 active:scale-90 ${currentPage === i + 1 ? 'btn-active' : ''}`}
          >
            {i + 1}
          </Link>
        ))}
        {/* Next page button */}
        <button
          type="button"
          disabled={currentPage === totalPages}
          className="btn join-item hover:scale-105 hover:bg-gray-400 active:scale-90"
        >
          <Link href={createPageURL(currentPage + 1)}>
            <FaAngleRight />
          </Link>
        </button>
      </div>
    </main>
  );
};

export default Pagination;
