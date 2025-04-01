import React from "react";
import ThemeSwitch from "../utilites/ThemeSwitch";
import Link from "next/link";

function LoginPageHeader() {
  return (
    <>
      <header className="bg-black-700 shadow-lg">
        <nav className="flex items-center justify-between  py-6 sm:px-20 px-6 max-w-screen-2xl m-auto ">
          <Link href="/">
            <img src="/images/Spurt-logo.svg"></img>
          </Link>
          <ul className="list-none flex gap-10 items-center justify-space-evenly">
            <li>
              <a
                href="/auth/signin"
                className="p-[10px_32px] inline-block rounded-[50px] text-base font-semibold leading-[27px]
                     text-[#FFFFFF] bg-cyan-500 whitespace-nowrap max-md:p-[10px] max-md:leading-none  max-md:text-sm hover:bg-[#28282c] max-sm:!ml-0"
              >
                Join Now
              </a>
            </li>

            <li>
              <ThemeSwitch />
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}

export default LoginPageHeader;
