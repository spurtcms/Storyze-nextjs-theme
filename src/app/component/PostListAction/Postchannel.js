"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import moment from "moment";
import { GET_POSTS_LIST_QUERY } from "@/app/api/query";
import { fetchGraphQl } from "@/app/api/graphicql";
import Header from "@/app/component/Header";
// import ChannelSkeleton from "../../utilites/Skeleton/ChannelSkeleton";
import Navbar from "../Navbar";
import { useSearchParams } from "next/navigation";
import { imageUrl } from "@/app/utilites/ImagePath";

const Postchannel = ({ data, postdatalist, postchannel,params}) => {

  const [postes, setPostes] = useState(postchannel);
  const [categories, setCategories] = useState([]);
  const [catNo, setCatNo] = useState(null);
  // const [loader, setLoader] = useState(true);
  const [offset, setOffset] = useState(0);
  const [scrollX, setscrollX] = useState(0);
  // const searchParams = useSearchParams();
  // const catgoId = searchParams.get("catgoId");
  const catgoId = params.slug;

  useEffect(() => {
    setCatNo(catgoId);
  }, [catgoId]);


  const [search, setSearch] = useState("");

  const [listdat, setHeadLis] = useState(postdatalist);
  const [triger, setTriger] = useState(0);
  const [catLoader, setCatLoader] = useState(true);


  let initialPostList = 8;
  const incrementInitialPostList = 8;

  const [displayPosts, setDisplayPosts] = useState(initialPostList);

  const handleLoad = ({ src }) => {
    return src;
  };

  const loadMore = () => {
    setDisplayPosts(displayPosts + incrementInitialPostList);
  };

  const PostListdata = listdat?.ChannelEntriesList?.channelEntriesList.filter(
    (response) => response.channelId === data?.ChannelDetail?.id
  );

  const SearchList=async()=>{
  if (search != "") {
    let variable_list = { limit: 50, offset: 0, title: search,requireData:{authorDetails:true,categories:true}};

   let entries=await fetchGraphQl(GET_POSTS_LIST_QUERY,variable_list);

    setHeadLis(entries)
    if(entries){
      setCatLoader(false)
    }
    
  }
  else{
    setHeadLis(postdatalist)
  }

}
  useEffect(() => {
    SearchList()
  }, [search]);

  // useEffect(() => {
  //   if(postdatalist){
  //     setCatLoader(false);
  //   }
  // }, []);

  console.log(postchannel,"PostListdata")
  return (
    <>
      <Header
        search={search}
        setSearch={setSearch}
        triger={triger}
        setTriger={setTriger}
      />
     
       
        <>
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
          <div className=" py-8 min-h-screen max-w-screen-2xl m-auto px-10 sm:px-20">
            <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-6">
              <div className="flex flex-col gap-4">
                <h4 className="text-black text-5xl font-bold">
                  {data?.ChannelDetail?.channelName}
                </h4>
                <div
                  className="text-gray-500 text-xl font-normal line-clamp-3 mb-3 desc"
                  dangerouslySetInnerHTML={{
                    __html: data?.ChannelDetail?.channelDescription.replaceAll("<br>"," "),
                  }}
                ></div>
              </div>
              {data?.ChannelDetail?.imagePath ? (
                <Image
                  loader={handleLoad}
                  src={`${imageUrl}${data?.ChannelDetail?.imagePath}`}
                  alt="Picture of the author"
                  width={500}
                  height={500}
                  className="w-full"
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
            <div className="w-full h-px bg-grey my-6"></div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-8 mb-12">
              {PostListdata?.slice(0, displayPosts)?.map((response) => (
                <>
                  <div>
                     <Link href={`/post/${response?.slug}`}>
                      <Image
                        loader={handleLoad}
                        src={`${response.coverImage}`}
                        alt="Picture of the author"
                        width={500}
                        height={500}
                        className="w-full h-channel"
                        onError={({ currentTarget }) => {
                          currentTarget.onerror = null;
                          currentTarget.src = "/img/no-image.png";
                      }}
                      />
                    </Link>
                    <p className="text-primary text-sm font-normal mb-2 my-3">
                      {response?.categories[0]?.at(-1)?.categoryName}
                    </p>
                    <div>
                    <Link href={`/post/${response?.slug}`}>
                        <h3 className="text-black text-2xl font-bold mb-2">
                          {response.title}
                        </h3>
                      </Link>
                     <div
                        className="text-gray-500 text-lg font-light line-clamp-2 mb-3 desc"
                        dangerouslySetInnerHTML={{
                          __html: response?.description.replaceAll("<br>"," "),
                        }}
                      />
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          <div class="flex items-center justify-center relative h-8 w-8 overflow-hidden rounded-full bg-slate-300">
                            {response.authorDetails.profileImagePath ? (
                              <Image
                                loader={handleLoad}
                                src={`${imageUrl}${response.authorDetails.profileImagePath}`}
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
                          {moment(response.createdOn).format("MMM DD, YYYY")}
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              ))}
            </div>
            {displayPosts < PostListdata.length ? (
              <div className="flex justify-center">
                <button
                  className="px-4 py-2 rounded-full text-white text-base font-medium bg-dark-grey"
                  onClick={loadMore}
                >
                  Load More
                </button>
              </div>
            ) : (
              ""
            )}
          </div>
        </>
      
    
    </>
  );
};

export default Postchannel;
