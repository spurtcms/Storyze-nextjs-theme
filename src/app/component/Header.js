"use client";

import React from "react";
import ThemeSwitch from "@/app/utilites/ThemeSwitch";
import Link from "next/link";

const Header = ({ search, setSearch, triger, setTriger, catNo }) => {
  const handleChange = (e) => {
    setSearch(e.target.value);
    setTriger(triger + 1);
  };
  return (
    <>
      <header className="bg-black-700 shadow-lg">
        <nav className="flex items-center justify-between  py-6 sm:px-20 px-6 sm:px-10 max-w-screen-2xl m-auto ">
          <Link href="/" onClick={()=>setSearch("")}>
            <img src="/images/Spurt-logo.svg"></img>
          </Link>
          <ul className="list-none flex gap-4 items-center">
            {catNo == undefined && (
                <div className="relative">
                  <input
                    type="text"
                    placeholder="search..."
                    value={search}
                    onChange={(e) => handleChange(e)}
                    className="rounded-3xl ps-6 py-2 bg-transparent border border-slate-400 h-7 sm:w-auto w-28 text-xs text-white"
                  />
                  <img
                    src="/images/search.svg"
                    className="absolute top-2 left-2 h-3"
                  />
                </div> 
            )}
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
