
import Header from "@/app/component/Header";
import LoginPageHeader from "@/app/component/LoginPageHeader";
import Link from "next/link";
import React from "react";

export const metadata = {
    title: 'Reset Password',
    description: '...',
  }

const ResetPassword = () => {




    return (
        <>
             {/* <head>
                <title>Reset Password</title>
            </head> */}

            <LoginPageHeader/>

            <section className='bg-[#FFFFFF] lg:bg-[transparent] min-h-[calc(100vh-120px)] p-[16px] flex flex-col
             max-md:min-h-[calc(100vh-68px)] max-xl:min-h-[calc(100vh-79px)] max-[1300px]:p-[16px]'>
                <div className='w-[90%] mx-auto max-[1400px]:w-full mb-auto'>
                    <ul className='flex space-x-1 mb-[55px] max-[1300px]:mb-[24px] items-center'>
                        <li>
                            <Link href="/">
                                <img src="/img/home.svg" alt="home" />
                            </Link>
                        </li>
                        <li>
                            <img src="/img/crumb-arrow.svg" alt="arrow" />
                        </li>
                        <li>
                            <Link href="/auth/signin" className='text-[14px] font-normal leading-4 text-black hover:underline dark:text-white'>
                                Login
                            </Link>
                        </li>
                        <li>
                            <img src="/img/crumb-arrow.svg" alt="arrow" />
                        </li>
                        <li>
                            <p className='text-[14px] font-semibold leading-4 text-black dark:text-white'>
                                Reset password
                            </p>
                        </li>
                    </ul>
                </div>
            {/* password reset*/}

            <div className='max-w-[394px] mx-auto mb-auto'>
                <h1 className='text-[36px] font-semibold leading-[43px] text-black text-center mb-[17px] max-sm:text-[28px]'>Password Reset</h1>
                <p className='text-base font-medium leading-[17px] text-[#83838D] dark:text-white text-center mb-[40px]'>Your password has been successfully reset.
                    click below to login  </p>
                <Link href="/auth/signin" className='bg-[#1D1D1F] border border-[#D8D8D8] text-[14px] leading-[16px] p-[12px] w-full block h-[42px] font-semibold text-[#FFFFFF] mt-[30px] rounded-[4px] text-center hover:bg-[#28282c] max-w-[334px] mx-auto'>Continue</Link>
                <div className="flex items-center space-x-[4px] mt-[30px] justify-center"><p className="text-[12px] font-medium leading-[14px] text-[#83838D] dark:text-white">Back to</p><Link href="/auth/signin" className="text-[12px] font-semibold leading-[14px] hover:underline text-black">Login</Link></div>

            </div>
</section>
</>
    )

}
export default ResetPassword