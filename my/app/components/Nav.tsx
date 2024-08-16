'use client';

import { usePathname } from 'next/navigation';

export const Nav = () => {
  const pathname = usePathname();

  return (
    <header className="flex bg-slate-600 text-gray-50">
      <div className="container mx-auto flex flex-col flex-wrap items-center justify-between p-5 md:flex-row">
        <a className="title-font mb-4 flex items-center font-medium text-gray-50 md:mb-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            className="h-10 w-10 rounded-full bg-indigo-500 p-2 text-white"
            viewBox="0 0 24 24"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
          <span className="ml-3 text-xl">Cook</span>
        </a>
        <div className="flex flex-1">
          <nav className="flex flex-wrap items-center justify-center text-base md:ml-auto">
            <a className="mr-5 hover:text-gray-400">First Link</a>
            <a className="mr-5 hover:text-gray-400">Second Link</a>
            <a className="mr-5 hover:text-gray-400">Third Link</a>
            <a className="mr-5 hover:text-gray-400">Fourth Link</a>
          </nav>
          <button className="mt-4 inline-flex items-center rounded border-0 bg-gray-800 px-3 py-1 text-base hover:bg-gray-950 focus:outline-none md:mt-0">
            logout
            <svg
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              className="ml-1 h-4 w-4"
              viewBox="0 0 24 24"
            >
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};
