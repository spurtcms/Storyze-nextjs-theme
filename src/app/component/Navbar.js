"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";

import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { fetchGraphQl } from "../api/graphicql";
import { GET_POSTS_CHANNELLIST_QUERY } from "../api/query";
import BannerSkeleton from "../utilites/Skeleton/BannerSkeleton";

function Navbar({categories,catNo,setCatNo,setOffset,postes, scrollX ,setscrollX }){
  console.log(setCatNo, 'zxsazx');
  const [postchannel, setPostchannel] = useState(postes);
  const[loader, setLoader] = useState(false);

    const router = useRouter();
    const searchParams = useSearchParams();
  
    let scrl = useRef(null);
    const [scrolEnd, setscrolEnd] = useState(true);
    let scroll = searchParams.get("scroll");
  
  
  
    const slide = (shift) => {
      scrl.current.scrollLeft += shift;
  
      setscrollX(scrollX + shift);
  
      if (
        Math.floor(scrl.current.scrollWidth - scrl.current.scrollLeft) <=
        scrl.current.offsetWidth
      ) {
        setscrolEnd(true);
      } else {
        setscrolEnd(false);
      }
    };
    const scrollCheck = () => {
      setscrollX(scrl.current.scrollLeft);
      if (
        Math.floor(scrl.current.scrollWidth - scrl.current.scrollLeft) <=
        scrl.current.offsetWidth
      ) {
        setscrolEnd(true);
      } else {
        setscrolEnd(false);
      }
    };
    useEffect(() => {
      if (scroll != null) {
        if (scrl.current) {
          scrl.current.scrollLeft = scroll;
        }
      }
    }, [scroll, scrl]);
    useEffect(() => {
      if (scrl.current) {
        if (
          Math.floor(scrl.current.scrollWidth - scrl.current.scrollLeft) <=
          scrl.current.offsetWidth
        ) {
          setscrolEnd(true);
        } else {
          setscrolEnd(false);
        }
      }
    }, [scrl]);
    const handleActive = (data) => {
      setCatNo(data?.slugName);
      console.log(data?.slugName, 'axzsdvmmk');
      console.log(data?.slugName, 'slug');
      if (data?.slugName == null) {
        router.push(`/`);
      } 
      // console.log(catNo, 'asqasq');
      // else {
       
      //   // router.push(`/postlist/${id}/?catgoId=${id}`)
      //   router.push(`/postlist/${data?.slugName}`)
        
      // }
    };
    
  const handleClick = ()=>{
   setLoader(true);
  }


  return (
   <>
   
   <div className="max-w-screen-2xl m-auto px-10 sm:px-20 py-4">
    <div className="flex flex-nowrap flex-row gap-x-2 pb-4 mb-4 justify-start items-center relative">
          {scrollX !== 0 && (
            <button
              onClick={() => slide(-50)}
              class="w-2 h-2 absolute top-[0.625rem] left-[-1.438rem]"
            >
              <Image
                src="/img/arrow-left-colour.svg"
                alt="arrow-left"
                width={15}
                height={15}
                priority
              />
            </button>
          )}

          {postchannel?.ChannelList
           ?.channellist && (
            <>
              <ul
                ref={scrl}
                onScroll={scrollCheck}
                className="flex flex-nowrap flex-row gap-x-2 justify-start items-center overflow-hidden scrollbar-style"
              >
                <li
                  onClick={() => handleActive(null)}
                  className={`whitespace-nowrap px-6 py-2 rounded-3xl border font-base  leading-4 hover:text-white hover:bg-gray-500 hover:border-gray-500 cursor-pointer ${
                    catNo == null
                      ? "border-cyan-500 text-primary"
                      : "border-gray-200 text-gray-600"
                  }`}
                >
                  {" "}
                  All
                </li>
              {postchannel?.ChannelList?.channellist?.map((data, slname) => (
                  <>
                   <div key={slname}>
                   <Link
                      href={`/postlist/${data?.slugName}`}          
                    className={`whitespace-nowrap px-6 py-2 rounded-3xl border font-base  leading-4 hover:text-white hover:bg-gray-500 hover:border-gray-500 cursor-pointer ${
                        catNo == data.slugName
                          ? "border-cyan-500 text-primary"
                          : "border-gray-200 text-gray-600"
                      }`}
                      onClick={handleClick}
                   >
                    {data.channelName}
                  </Link>
                   </div>

                  {/* <li
                    key={index}
                    onClick={() => handleActive(data)}
                    className={`whitespace-nowrap px-6 py-2 rounded-3xl border font-base  leading-4 hover:text-white hover:bg-gray-500 hover:border-gray-500 cursor-pointer ${
                      catNo == data.slugName
                        ? "border-cyan-500 text-primary"
                        : "border-gray-200 text-gray-600"
                    }`}
                    
                  >
                    {" "}
                    {data.channelName}{" "}
                    {console.log(data.channelName, 'channel')}
                  </li> */}
                  
                  </>
                ))}
                
              </ul>
            </>
          )}


          {!scrolEnd && (
            <button
              onClick={() => slide(+50)}
              class="w-2 h-2 absolute top-[0.625rem] right-[-1.438rem]"
            >
              <Image
                src="/img/arrow-right-colour.svg"
                alt="arrow-right"
                width={15}
                height={15}
                priority
              />
            </button>
          )}
        </div>
    </div>
   </>
  )
}

export default Navbar