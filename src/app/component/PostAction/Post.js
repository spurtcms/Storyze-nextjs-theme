"use client"

import React, { Fragment, useEffect, useState } from "react";
import Image from "next/image";

import moment from "moment";
import Header from "../Header";
// import { fetchGraphQl } from "../../api/graphicql";
// import { GET_POSTS_LIST_QUERY } from "../../api/query";
import PostSkeleton from "../../utilites/Skeleton/PostSkeleton";
import { imageUrl } from "@/app/utilites/ImagePath";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
// import { useSearchParams } from "next/navigation";
import DOMPurify from 'dompurify';
import { GET_POSTS_CHANNELLIST_QUERY } from "@/app/api/query";
import { fetchGraphQl } from "@/app/api/graphicql";
import { useSelector } from "react-redux";
import {header_slug_Redux_function} from "@/StoreConfiguration/slices/customer";



const Post = ({ data, listdata,params }) => {
  console.log(params, 'params');
  console.log(data, 'data');
  console.log(listdata, 'listdata');
  const [search, setSearch] = useState("")
  const [listdat, setHeadLis] = useState(listdata)
  const [triger, setTriger] = useState(0)
  const [catLoader, setCatLoader] = useState(true)
  // const [channelid,setChannelid]=useState(null)
  const [catNo, setCatNo] = useState()
  console.log(listdata, "dcdhcbhd")
  const searchParams = useSearchParams()

  const [channelIdvalue, setChannelIdvalue] = useState(searchParams.get("channelId"))
   
  const router = useRouter()

  const catgoId = params.slug[0]
  useEffect(() => {
    setCatNo(catgoId)
  }, [catgoId])

  let {slug} = params;


  // const handleLoad = ({ src }, newChannelIdvalue) => {

  //   setChannelIdvalue(newChannelIdvalue)
  //   searchParams.set("channelId", newChannelIdvalue);
  //    navigate(`/post/${response?.slug}/?channelId=${searchParams.toString()}`)
  //    return src,newChannelIdvalue

  // };

  const handleLoad = ({ src }) => {
    return src
  }


  const postdata = listdat?.ChannelEntriesList?.channelEntriesList?.filter(

    (response) => {
      response?.channelId == data?.ChannelEntryDetail?.channelId
    }
  );


  const sanitizeHTML = (html) => {
    const sanitized = DOMPurify.sanitize(html, {
        // FORBID_TAGS: ['h1', 'img'], // Remove <h1> and <img> tags
        FORBID_ATTR: ['style'], // Remove inline styles for consistency
    });
    // Remove first <img> tag found in the sanitized HTML
    return sanitized
        .replace(/<br\s*\/?>/g, " ") // Replace <br> tags with spaces
            .replace(/<div className="card[^"]*"(.*?)<\/div>/g, '') // Remove specific <div> tags
            // .replace(/<img[^>]*>/g, "") // Remove all <img> tags
            .replace(/<h1[^>]*>.*?<\/h1>/, "") // Remove the first <h1> tag and its content
            .replace(/p-\[24px_60px_10px\]/g, "") // Remove specific styles
            .replace(/<\/?[^>]+(>|$)/g, "") // Remove all remaining HTML tags
            .split(/\s+/) // Split text into words
            // .slice(0, 32) // Limit to the first 35 words
            .join(" ") // Join the words back into a string
            // .concat("...") // Add ellipsis if text is truncated
};


  useEffect(() => {
    setCatLoader(false)
  }, [])
const header_slug = useSelector((s) => s.customerRedux.header_slug_Redux_function)
  console.log(header_slug, "headerSlug")

  return (
    <>
      <Header search={search} setSearch={setSearch} triger={triger} setTriger={setTriger} catNo={catNo} />
      {catLoader == true ?
        <>
          <PostSkeleton />
        </> :
        <>
          <div className="py-8 min-h-screen max-w-screen-2xl m-auto px-10 sm:px-20">
           {/* <Image 
              loader={handleLoad}
              src={`${data?.ChannelEntryDetail?.coverImage}`}
              alt="Picture of the author"
              width={500}
              height={500}
              className="w-full h-postimg"
              onError={({ currentTarget }) => {
                currentTarget.onerror = null;
                currentTarget.src = "/img/no-image.png";
              }}
            />
            */}
             <Image
             src={data?.ChannelEntryDetail?.coverImage || "/img/no-image.png"}
             alt={data?.ChannelEntryDetail?.coverImage ? "Cover image of the author" : "No image available"}
             width={500}
             height={500}
            className="w-full h-postimg"
             unoptimized
              priority // Add this line to indicate that this image is important for LCP
            onError={({ currentTarget }) => {
            currentTarget.onerror = null; // Prevent looping
            currentTarget.src = "/img/no-image.png"; // Fallback image
           }}
          />
            <div className="max-w-full lg:max-w-4xl m-auto">
              <div className="w-full h-px bg-grey mt-2 mb-4"></div>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center justify-center relative h-8 w-8 overflow-hidden rounded-full bg-slate-300">
                  {data?.ChannelEntryDetail?.authorDetails?.profileImagePath ?
                    <Image
                     loader={handleLoad}
                      src={`${imageUrl}${data?.ChannelEntryDetail?.authorDetails?.profileImagePath}`}
                      alt="Picture of the author"
                      width={32}
                      height={32}
                    />
                    :
                    <>
                      {`${data?.ChannelEntryDetail?.authorDetails?.firstName} ${data?.ChannelEntryDetail?.authorDetails?.lastName}`.charAt(0)}
                    </>
                  }

                </div>
                <h5 className="text-primary text-base font-normal">
                  {`${data?.ChannelEntryDetail?.authorDetails?.firstName} ${data?.ChannelEntryDetail?.authorDetails?.lastName}`}
                </h5>
              </div>

              <p className="text-primary text-sm font-normal mb-2 my-3">
                {data?.ChannelEntryDetail?.categories[0]?.at(0)?.categoryName}
              </p>
              <div>
                <h3 className="text-black text-4xl font-bold mb-2">
                  {data?.ChannelEntryDetail?.title}
                </h3>
                   
                <div className="text-black dark:text-white text-lg font-light mb-3 "
                                dangerouslySetInnerHTML={{
                                    __html: sanitizeHTML(data?.ChannelEntryDetail?.description)
                                }}
                            >
                            </div> 
                  
                {/* <p className="text-black dark:text-white  text-lg font-light mb-3 " dangerouslySetInnerHTML={{ __html: data?.ChannelEntryDetail?.description?.replaceAll("<br>", " ").replace(/p-\[24px_60px_10px\]/g, "") }}></p> */}
                
              </div>
            </div>
            <div className="w-full h-px bg-grey my-6"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-8 mb-12">
              {postdata &&
                postdata.map((result,ind) => (
                  <Fragment key={ind}>
                    {result.id !== data?.ChannelEntryDetail?.id ? (
                      <>
                        <div>
                          <Link href={`/post/${result?.slug}`}>
                            {/* <Image 
                              loader={handleLoad}
                              src={`${result?.coverImage}`}
                              alt="Picture of the author"
                              width={500}
                              height={500}
                              className="w-full h-postim"
                              onError={({ currentTarget }) => {
                                currentTarget.onerror = null;
                                currentTarget.src = "/img/no-image.png";
                              }}
                            /> */}
                             <Image
             src={result?.coverImage || "/img/no-image.png"}
             alt={result?.coverImage ? "Cover image of the author" : "No image available"}
             width={500}
             height={500}
            className="w-full h-postimg"
             unoptimized
              priority // Add this line to indicate that this image is important for LCP
            onError={({ currentTarget }) => {
            currentTarget.onerror = null; // Prevent looping
            currentTarget.src = "/img/no-image.png"; // Fallback image
           }}
          />
                          </Link>
                          <p className="text-primary text-sm font-normal mb-2 my-3">
                            {result?.categories[0]?.at(0)?.categoryName}
                          </p>
                          <div>
                            <Link href={`/post/${result?.slug}/?channelIdvalue=${response?.channelId}`}>
                              <h3 className="text-black text-2xl line-clamp-1 overflow-hidden font-bold mb-2">
                                {result?.title}
                              </h3>
                            </Link>
                           <p
                              className="text-gray-500 dark:text-white  text-lg font-light mb-3 desc"
                              dangerouslySetInnerHTML={{
                                __html: result?.description?.replaceAll("<br>", " ").replace(/p-\[24px_60px_10px\]/g, "")
                              }}
                            ></p>

                      {/* <div className="text-black text-lg font-light  mb-3 desc "
                                dangerouslySetInnerHTML={{
                                    __html: sanitizeHTML(result?.description)
                                }}
                            >
                            </div>                   */}
                            <div className="flex items-center gap-3">
                              <div className="flex items-center gap-2">
                                <div className="flex items-center justify-center relative h-8 w-8 overflow-hidden rounded-full bg-slate-300">
                                  {result?.authorDetails?.profileImagePath ?
                                    <Image
                                      loader={handleLoad}
                                      src={`${imageUrl}${result?.authorDetails?.profileImagePath}`}
                                      alt="Picture of the author"
                                      width={32}
                                      height={32}
                                    />
                                    :
                                    <>
                                      {`${result?.authorDetails?.firstName} ${result?.authorDetails?.lastName}`.charAt(0)}
                                    </>
                                  }

                                </div>
                                <h5 className="text-primary text-base font-normal">
                                  {`${result?.authorDetails?.firstName} ${result?.authorDetails?.lastName}`}
                                </h5>
                              </div>
                              <p className="text-black font-normal text-base">

                                {moment(result?.createdOn).format("MMM DD, YYYY")}
                              </p>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      ""
                    )}
                  </Fragment>
                ))}
                
            </div>

            <Link
             href={`/postlist/${header_slug}`}
            className="py-2.5 px-5 me-2 mb-2 text-md font-medium text-black focus:outline-none bg-white rounded-full border border-black hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Back</Link>
        
            {/* {postes?.ChannelList?.channellist?.map((data, slname) => (
                              <Fragment key={slname}>
            <Link
             href={`/postlist/${data?.slugName}`}
             className="py-2.5 px-5 me-2 mb-2 text-md font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-black hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Back</Link>
            </Fragment>
            ))} */}
          </div>
        </>}
    </>
  );
};

export default Post;
