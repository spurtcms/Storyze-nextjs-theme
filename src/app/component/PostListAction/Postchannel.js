"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import moment from "moment";
import { GET_POSTS_LIST_QUERY } from "@/app/api/query";
import { fetchGraphQl } from "@/app/api/graphicql";
import Header from "@/app/component/Header";
import Navbar from "../Navbar";
import { useSearchParams } from "next/navigation";
import { imageUrl } from "@/app/utilites/ImagePath";
import NodataImg from "../NodataImg";
import { searchapi } from "./searchapi";
import ChannelSkeleton from "@/app/utilites/Skeleton/ChannelSkeleton";
import ViewAllSkeleton from "@/app/utilites/Skeleton/ViewAllSkeleton";
import DOMPurify from 'dompurify';


const Postchannel = ({ data, postdatalist, postchannel, params }) => {
  console.log(postdatalist, "dkjff")
  console.log(postchannel, 'opop');
  const [postes, setPostes] = useState(postchannel);
  console.log(postes, 'ooo');
  const [categories, setCategories] = useState([]);
  const [catNo, setCatNo] = useState(null);
  const [offset, setOffset] = useState(0);
  const [scrollX, setscrollX] = useState(0);

  const searchParams = useSearchParams();

  const channelIdvalue = searchParams.get('channelId')



  params.channelId = channelIdvalue


  // const catgoId = searchParams.get("catgoId");
  const catgoId = params.slug;

  useEffect(() => {
    setCatNo(catgoId);
  }, [catgoId]);


  const [search, setSearch] = useState("");

  const [listdat, setHeadLis] = useState({});
  const [triger, setTriger] = useState(0);
  const [catLoader, setCatLoader] = useState(true);
  console.log(catLoader,'catLoader')

  useEffect(() => {
   setCatLoader(true)
    setHeadLis(postdatalist)
    setCatLoader(false)
    
  }, [])
  console.log(listdat, 'aswsd');

  let initialPostList = 8;
  const incrementInitialPostList = 8;

  const [displayPosts, setDisplayPosts] = useState(initialPostList || []) ;
   console.log(displayPosts, 'ggg');

  const handleLoad = ({ src }) => {
    return src;
  };

  const loadMore = () => {
    setDisplayPosts(displayPosts + incrementInitialPostList);
  };

  const PostListdata = listdat?.ChannelEntriesList?.channelEntriesList?.filter(
    (response) => response.channelId === data?.ChannelDetail?.id
  );

  console.log(PostListdata, "dbhfdjfd")
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
  }, [search]);

  // useEffect(() => {
  //   if(postdatalist){
  //     setLoader(false)
  //   }
  // }, []);

  console.log(PostListdata,'PostListdata');


    const sanitizeHTML = (html) => {
      const sanitized = DOMPurify.sanitize(html, {
          // FORBID_TAGS: ['h1', 'img'], // Remove <h1> and <img> tags
          FORBID_ATTR: ['style'], // Remove inline styles for consistency
      });
      // Remove first <img> tag found in the sanitized HTML
      return sanitized
          .replace(/<br\s*\/?>/g, " ") // Replace <br> tags with spaces
              .replace(/<div className="card[^"]*"(.*?)<\/div>/g, '') // Remove specific <div> tags
              .replace(/<img[^>]*>/g, "") // Remove all <img> tags
              .replace(/<h1[^>]*>.*?<\/h1>/, "") // Remove the first <h1> tag and its content
              .replace(/p-\[24px_60px_10px\]/g, "") // Remove specific styles
              .replace(/<\/?[^>]+(>|$)/g, "") // Remove all remaining HTML tags
              .split(/\s+/) // Split text into words
              // .slice(0, 30) // Limit to the first 35 words
              .join(" ") // Join the words back into a string
              .concat("...") // Add ellipsis if text is truncated
  };

  return (
    <>
    
      <Header
        search={search}
        setSearch={setSearch}
        triger={triger}
        setTriger={setTriger}
      />setSearch


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
        
       {catLoader == false ? <>
        <div className=" py-8 min-h-screen max-w-screen-2xl m-auto px-10 sm:px-20">
        

          <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-6">
            <div className="flex flex-col gap-4">
              <h4 className="text-black text-5xl font-bold">
                {data?.ChannelDetail?.channelName}
                {console.log(data?.ChannelDetail?.channelName, 'fsefffsd')}
              </h4>
            {/* <div
                className="text-gray-500 text-xl font-normal line-clamp-3 mb-3 desc"
                dangerouslySetInnerHTML={{
                  __html: data?.ChannelDetail?.channelDescription.replaceAll("<br>", " "),
                }}
              ></div>*/}
                <div className="text-gray-500 text-lg font-light line-clamp-2 mb-3 desc h-[131px] overflow-hidden"
                                dangerouslySetInnerHTML={{
                                    __html: sanitizeHTML( data?.ChannelDetail?.channelDescription)
                                }}
                            >
                            </div>
            </div>
            {data?.ChannelDetail?.imagePath ? (
             //<Image
               // loader={handleLoad}
                //src={`${imageUrl}${data?.ChannelDetail?.imagePath}`}
                //alt="Picture of the author"
                //width={500}
                //height={500}
                //className="w-full"
              ///> 
                  <Image
                    src={`${imageUrl}${data?.ChannelDetail?.imagePath}` || "/img/no-image.png"}
                    alt={`${imageUrl}${data?.ChannelDetail?.imagePath}` ? "Cover image of the author" : "No image available"}
                   width={500}
                    height={500}
                    className="w-full"
                    unoptimized
                    priority // Add this line to indicate that this image is important for LCP
                    onError={({ currentTarget }) => {
                    currentTarget.onerror = null; // Prevent looping
                   currentTarget.src = "/img/no-image.png"; // Fallback image
                    }}
                   /> 

            ) : (
              // <div>
              //   <Image
              //     loader={handleLoad}
              //     className="ps-16"
              //     src="/images/no data.svg"
              //     alt="Picture of the author"
              //     width={500}
              //     height={500}
              //   />
              // </div>
              ""
            )}
          </div>

          
        
          {PostListdata?.length != 0  && postdatalist!==undefined && postdatalist!==null?
            <>


              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-8 mb-12">

                {PostListdata?.slice(0, displayPosts)?.map((response, item) => (
                  <>
                   <div key={item} >
                    
                  {  console.log(displayPosts,"displaywhat")}
                    <div className='flex flex-col'>
                      <Link href={`/post/${response?.slug}/${response?.channelId}`}>
                       {/* <Image
                          loader={handleLoad}
                          src={response?.coverImage}
                          alt="Picture of the author"
                          width={500}
                          height={500}
                          className="w-full h-channel"
                          onError={({ currentTarget }) => {
                            currentTarget.onerror = null;
                            currentTarget.src = "/img/no-image.png";
                          }}
                        /> */}
                     <Image
                    src={response?.coverImage || "/img/no-image.png"}
                    alt={response?.coverImage ? "Cover image of the author" : "No image available"}
                   width={500}
                    height={500}
                    className="w-full h-channel"
                    unoptimized
                    priority // Add this line to indicate that this image is important for LCP
                    onError={({ currentTarget }) => {
                    currentTarget.onerror = null; // Prevent looping
                   currentTarget.src = "/img/no-image.png"; // Fallback image
                    }}
                   /> 
                      </Link>
                      <p className="text-primary text-sm font-normal mb-2 my-3">
                        { response?.categories?.[0]?.at(0)?.categoryName}
                      </p>
                      <div className='flex flex-col grow'> 
                        <Link href={`/post/${response?.slug}/${response?.channelId}`}>

                          <h3 className="text-black text-2xl line-clamp-1 font-bold mb-2 overflow-hidden">
                            {response?.title}
                          </h3>
                        </Link>
                       {/* <div
                          className="text-gray-500 text-lg font-light line-clamp-2 mb-3 desc h-[131px] overflow-hidden"
                          dangerouslySetInnerHTML={{
                            __html: response?.description?.replaceAll("<br>", " ").replaceAll(/<div class="card[^"]*"(.*?)<\/div>/g, '').replaceAll(/<img[^>]*>/g, "").replace(/p-\[24px_60px_10px\]/g, "")
                          }}
                        /> */}

                            <div className="text-gray-500 text-lg font-light line-clamp-3 desc  mb-3 desc overflow-hidden"
                                dangerouslySetInnerHTML={{
                                    __html: sanitizeHTML(response?.description)
                                }}
                            >
                            </div>
                        <div className="flex items-center gap-3 mt-auto">
                          <div className="flex items-center gap-2">
                            <div class="flex items-center justify-center relative h-8 w-8 overflow-hidden rounded-full bg-slate-300">
                              {response?.authorDetails?.profileImagePath ? (
                                <Image
                                  loader={handleLoad}
                                  src={`${imageUrl}${response?.authorDetails?.profileImagePath}`}
                                  alt="Picture of the author"
                                  width={32}
                                  height={32}
                                />
                              ) : (
                                <>
                                  {`${response?.authorDetails?.firstName} ${response?.authorDetails?.lastName}`.charAt(
                                    0
                                  )}
                                </>
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

                   </div>
                  </>
                ))
                }
              </div>

              {console.log(displayPosts,'displayPosts',PostListdata?.length)}

              {displayPosts < PostListdata?.length ? (
                <div className="flex justify-center">
                  <button
                    className="px-4 py-2 rounded-full text-white text-base font-medium bg-dark-grey"
                    onClick={()=>loadMore()}
                  >
                    Load More
                  </button>
                </div>
              ) : (
                ""
              )}

            </> :
            <>
              <div className="w-full h-px bg-grey my-6">
                <NodataImg />

              </div>
            </>
          }
      
         </div>
              </>:
              <>
              <ChannelSkeleton/>
              </>}
      </>
    </>
  );
};

export default Postchannel;






