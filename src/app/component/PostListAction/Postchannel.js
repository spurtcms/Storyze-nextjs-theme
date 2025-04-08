"use client";

import React, { Fragment, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import moment from "moment";
import { useDispatch } from "react-redux";
import { useSearchParams } from "next/navigation";
import DOMPurify from 'dompurify';
import Header from "@/app/component/Header";
import Navbar from "../Navbar";
import NodataImg from "../NodataImg";
import ChannelSkeleton from "@/app/utilites/Skeleton/ChannelSkeleton";
import { header_slug_Redux_function } from "@/StoreConfiguration/slices/customer";
import { imageUrl } from "@/app/utilites/ImagePath";
import { searchapi } from "./searchapi";

const Postchannel = ({ data, postdatalist, postchannel, params }) => {
  const [postes, setPostes] = useState(postchannel);
  const [categories, setCategories] = useState([]);
  const [catNo, setCatNo] = useState(null);
  const [search, setSearch] = useState("");
  const [listdat, setHeadLis] = useState({});
  const [triger, setTriger] = useState(0);
  const [offset, setOffset] = useState(0);
  const [scrollX, setscrollX] = useState(0);
  const [catLoader, setCatLoader] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 8; // Number of posts to display per page

  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const channelIdvalue = searchParams.get('channelId');
  params.channelId = channelIdvalue;

  useEffect(() => {
    let slug = params?.slug;
    dispatch(header_slug_Redux_function(slug));
  }, []);

  const catgoId = params.slug;
  useEffect(() => {
    setCatNo(catgoId);
  }, [catgoId]);

  useEffect(() => {
    setCatLoader(true);
    setHeadLis(postdatalist);
    setCatLoader(false);
  }, []);

  const PostListdata = listdat?.ChannelEntriesList?.channelEntriesList?.filter(
    (response) => response.channelId === data?.ChannelDetail?.id
  );


  const SearchList = async () => {
    if (search != "") {
      searchapi(search, setHeadLis, setCatLoader)
      // let variable_list = { limit: 50, offset: 0, title: search,requireData:{authorDetails:true,categories:true}};
      //   let variable_list = {
      //     "commonFilter": {
      //       "limit": 10,
      //       "offset": 0,
      //       "keyword":search
      //     },
      //     "entryFilter": {
      //       "Status": "Publish"
      //     },
      //     "AdditionalData": {
      //       "categories": true,
      //       "authorDetails":true
      //     }
      //   }



      //  let entries=await fetchGraphQl(GET_POSTS_LIST_QUERY,variable_list);

      //   setHeadLis(entries)
      //   if(entries){
      //     setCatLoader(false)
      //   }

    }
    else {
      setHeadLis(postdatalist)
    }

  }


  useEffect(() => {
    SearchList()
  }, [triger]);

  const sanitizeHTML = (html) => {
    const sanitized = DOMPurify.sanitize(html, {
      FORBID_ATTR: ['style'],
    });
    return sanitized
      .replace(/<br\s*\/?>/g, " ")
      .replace(/<div className="card[^"]*"(.*?)<\/div>/g, '')
      .replace(/<img[^>]*>/g, "")
      .replace(/<h1[^>]*>.*?<\/h1>/, "")
      .replace(/p-\[24px_60px_10px\]/g, "")
      .replace(/<\/?[^>]+(>|$)/g, "")
      .split(/\s+/)
      .join(" ")
      .concat("...");
  };

  // const loadMore = () => {
  //   setDisplayPosts(displayPosts + incrementInitialPostList);
  // };
 
  // const handlePrevious = () => {
  //   if (displayPosts - incrementInitialPostList >= 0) {
  //     setDisplayPosts(displayPosts - incrementInitialPostList);
  //   }
  // };
  
  // const handleNext = () => {
  //   // console.log(displayPosts + incrementInitialPostList <= PostListdata.length,'erwerwerwe')
  //   // if (displayPosts + incrementInitialPostList <= PostListdata.length) {
  //     setDisplayPosts(displayPosts + incrementInitialPostList);
  //   // }
  // };

// Pagination Logic
const totalPosts = PostListdata ? PostListdata.length : 0; 
const totalPages = Math.ceil(totalPosts / postsPerPage);

const indexOfLastPost = currentPage * postsPerPage;
const indexOfFirstPost = indexOfLastPost - postsPerPage;
const currentPosts = PostListdata ? PostListdata.slice(indexOfFirstPost, indexOfLastPost) : []; 

const handlePrevious = () => {
  if (currentPage > 1) {
    setCurrentPage(currentPage - 1);
  }
};

const handleNext = () => {
  if (currentPage < totalPages) {
    setCurrentPage(currentPage + 1);
  }
};

const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <>
       <Header
        search={search}
        setSearch={setSearch}
        triger={triger}
        setTriger={setTriger}
      />
      <>

       {/* {catLoader == false ? <> */}
        <Navbar
          categories={categories}
          catNo={catNo}
          setCatNo={setCatNo}
          postes={postes}
          setPostes={setPostes}
          setOffset={setOffset}
          scrollX={scrollX}
          setscrollX={setscrollX}
          
        />
       {/* </>:<>
         <ViewAllSkeleton/>
       </>} */}
      {catLoader === false ? (
        <div className="py-8 min-h-screen max-w-screen-2xl m-auto px-10 sm:px-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-6">
            <div className="flex flex-col gap-4">
              <h4 className="text-black text-5xl font-bold">
                {data?.ChannelDetail?.channelName}
              </h4>
              <div className="text-black dark:text-white text-lg font-light line-clamp-2 mb-3 desc h-[131px] overflow-hidden"
                dangerouslySetInnerHTML={{
                  __html: sanitizeHTML(data?.ChannelDetail?.channelDescription)
                }}
              >
              </div>
            </div>
            {data?.ChannelDetail?.imagePath ? (
              <Image
                src={`${imageUrl}${data?.ChannelDetail?.imagePath}` || "/img/no-image.png"}
                alt={`${imageUrl}${data?.ChannelDetail?.imagePath}` ? "Cover image of the author" : "No image available"}
                width={500}
                height={500}
                className="w-full"
                unoptimized
                priority
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null;
                  currentTarget.src = "/img/no-image.png";
                }}
              />
            ) : (
              ""
            )}
          </div>

          {PostListdata?.length !== 0 && postdatalist !== undefined && postdatalist !== null ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-8 mb-12">
                {currentPosts?.map((response, item) => (
                  <Fragment key={item}>
                    <div className='flex flex-col'>
                      <Link href={`/post/${response?.slug}/${response?.channelId}`}>
                        <Image
                          src={response?.coverImage || "/img/no-image.png"}
                          alt={response?.coverImage ? "Cover image of the author" : "No image available"}
                          width={500}
                          height={500}
                          className="w-full h-channel"
                          unoptimized
                          priority
                          onError={({ currentTarget }) => {
                            currentTarget.onerror = null;
                            currentTarget.src = "/img/no-image.png";
                          }}
                        />
                      </Link>
                      <p className="text-primary text-sm font-normal mb-2 my-3">
                        {response?.categories?.[0]?.at(0)?.categoryName}
                      </p>
                      <div className='flex flex-col grow'>
                        <Link href={`/post/${response?.slug}/${response?.channelId}`}>
                          <h3 className="text-black text-2xl line-clamp-1 font-bold mb-2 overflow-hidden">
                            {response?.title}
                          </h3>
                        </Link>
                        <div className="text-black dark:text-white text-lg font-light line-clamp-3 desc mb-3 desc overflow-hidden"
                          dangerouslySetInnerHTML={{
                            __html: sanitizeHTML(response?.description)
                          }}
                        >
                        </div>
                        <div className="flex items-center gap-3 mt-auto">
                          <div className="flex items-center gap-2">
                            <div className="flex items-center justify-center relative h-8 w-8 overflow-hidden rounded-full bg-slate-300">
                              {response?.authorDetails?.profileImagePath ? (
                                <Image
                                  src={`${imageUrl}${response?.authorDetails?.profileImagePath}`}
                                  alt="Picture of the author"
                                  width={32}
                                  height={32}
                                />
                              ) : (
                                `${response?.authorDetails?.firstName} ${response?.authorDetails?.lastName}`.charAt(0)
                              )}
                            </div>
                            <h5 className="text-primary text-base font-normal">
                              {`${response?.authorDetails?.firstName} ${response?.authorDetails?.lastName}`}
                            </h5>
                          </div>
                          <p className="text-black font-normal text-base">
                            {moment(response?.createdOn).format("MMM DD, YYYY")}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Fragment>
                ))}
              </div>

              {PostListdata?.length > postsPerPage && (
  <div className="mb-10 flex items-center justify-center">
    <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className="relative inline-flex items-center gap-1 rounded-l-md border border-gray-300 bg-white px-3 py-2 pr-4 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 disabled:pointer-events-none disabled:opacity-40 dark:border-gray-500 dark:bg-gray-800 dark:text-gray-300"
      >
        <img src="/img/arrow-left-colour.svg" alt="Previous" />
        <span>Previous</span>
      </button>

      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => setCurrentPage(number)}
          className={`relative inline-flex items-center border border-gray-300 bg-white px-3 py-2 text-sm font-medium ${currentPage === number ? 'text-blue-600 border-blue-600 hover:bg-blue-400' : 'text-gray-400 hover:bg-gray-50'} focus:z-20`}
        >
          {number}
        </button>
      ))}

      <button
        onClick={handleNext}
        disabled={currentPage >= totalPages}
        className="relative inline-flex items-center gap-1 rounded-r-md border border-gray-300 bg-white px-3 py-2 pl-4 text-sm font-medium disabled:pointer-events-none disabled:opacity-40 text-gray-500 hover:bg-gray-50 focus:z-2 dark:bg-gray-800 dark:text-gray-300"
      >
        <span>Next</span>
        <img src="/img/arrow-right-colour.svg" alt="Next" />
      </button>
    </nav>
  </div>
)}
            </>
          ) : (
            <>
              <div className="w-full h-px bg-grey my-6">
                <NodataImg />
              </div>
            </>
          )}
        </div>
      ) : (
        <ChannelSkeleton />
      )}
    </>
    </>
  );
};

export default Postchannel;