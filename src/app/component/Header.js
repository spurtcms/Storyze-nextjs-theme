"use client";

import React, { useCallback, useEffect, useState } from "react";
import ThemeSwitch from "@/app/utilites/ThemeSwitch";
import Link from "next/link";

const Header = ({ search, setSearch, triger, setTriger, catNo }) => {


  const [debounceTimeout, setDebounceTimeout] = useState(null);
  const [searchInput, setSearchInput] = useState(search);

  const handleChange = (e) => {
    const searchValue = e.target.value;
    setSearchInput(searchValue);

    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    const timeout = setTimeout(() => {
      setSearch(searchValue);
      setTriger((prev) => prev + 1);
    }, 500);

    setDebounceTimeout(timeout);
  };

  useEffect(() => {
    setSearchInput(search);
  }, [search]);


  const handleClick = (e) => {
    setSearch("")
    setTriger(triger + 1)
  }
  return (
    <>
      <header className="bg-black-700 shadow-lg">
        <nav className="flex items-center justify-between  py-6 sm:px-20 px-6 max-w-screen-2xl m-auto ">
          <Link href="/" onClick={() => setSearch("")}>
            <img src="/images/Spurt-logo.svg"></img>
          </Link>
          <ul className="list-none flex gap-10 items-center justify-space-evenly">
            {catNo == undefined && (
              <div className="relative">

                <input
                  type="text"
                  placeholder="Search..."
                  value={searchInput}
                  onChange={handleChange}
                  className="rounded-3xl ps-6 py-2 bg-transparent border border-slate-400 h-7 sm:w-auto w-28 text-xs text-white"
                />
                <img
                  alt='search'
                  src="/images/search.svg"
                  className="absolute top-2 left-2 h-3"
                />
                <button
                  className="absolute text-gray mt-2 right-2 h-1 cursor-pointer"
                  onClick={(e) => handleClick(e)}
                  disabled={search === ""}
                >
                  <img
                    src='/img/close.svg'
                    alt='close'
                    className={search === "" ? "hidden" : ""}
                  />
                </button>
              </div>
            )}

            <li>
              <a href="/auth/signin" className='p-[10px_32px] inline-block rounded-[50px] text-base font-semibold leading-[27px]
                     text-[#FFFFFF] bg-cyan-500 whitespace-nowrap max-md:p-[10px] max-md:leading-none  max-md:text-sm hover:bg-[#28282c] max-sm:!ml-0'>Join Now</a>
            </li>

            <li>
              <ThemeSwitch />
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Header;


