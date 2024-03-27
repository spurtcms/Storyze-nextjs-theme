"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import moment from "moment";


const Listpage = ({listdata}) => {

  const [catLoader,setCatLoader]=useState(true)



  const groupData = listdata?.channelEntriesList?.channelEntriesList.reduce(
    (acc, items) => {
      if (!acc[items.channelId]) {
        acc[items.channelId] = [items];
      } else {
        acc[items.channelId].push(items);
      }
      return acc;
    },
    {}
  );


  let postdata = [];
  for (const key in groupData) {
    postdata.push({ detail: key, values: groupData[key] });
  }

  let featuredata = [];

  postdata.map((data) => {
    data.fear = "";
    data.values.map((res) => {
      if (res.featuredEntry == 1) {
        data.fear = res;
      }
    });
  });

  featuredata.push(postdata);


  const hadleLoad = ({ src }) => {
    return src;
  };







  return (
    <>

      <div className="min-h-screen max-w-screen-2xl m-auto px-10 sm:px-20 py-4">

        {featuredata &&
          featuredata.map((result) => (
            <>
              

              {result.map((datas, index) => (
                <>
                  {index == 0 ?
                   (
                    <>
                      <div>
                        <div className="grid grid-cols-1 lg:grid-cols-2">
                          <div className="pb-6 lg:pr-6 border-b lg:border-r lg:border-b-0 border-grey">
                            <Link href={`/post/${datas?.fear?.slug}?catgoId=${datas?.fear?.slug}`}>
                            
                              {datas?.fear?.coverImage&&
                              <Image
                              loader={hadleLoad}
                              src={datas?.fear?.coverImage}
                              alt="Picture of the author"
                              width={500}
                              height={500}
                              className="w-full"
                            />}
                              
                            </Link>

                            <p className="text-primary text-sm font-normal mb-2 my-3">
                              {datas?.fear?.categories?.[0]?.at(-1)?.categoryName}
                            </p>
                            <div>
                              <h3 className="text-black text-3xl font-bold mb-2">
                                {" "}
                                <Link href={`/post/${datas?.fear?.slug}?catgoId=${datas?.fear?.slug}`}>
                                  {" "}
                                  {datas.fear.title}{" "}
                                </Link>
                              </h3>
                              <p className="text-gray-500 text-lg font-light line-clamp-3 mb-3" dangerouslySetInnerHTML={{__html:datas.fear.description}}>
                              </p>
                              <div className="flex items-center gap-3">
                                {datas?.fear&&
                                <>
                                <div className="flex items-center gap-2">
                                  <div class="flex items-center justify-center relative h-8 w-8 overflow-hidden rounded-full bg-slate-300">
                                    {datas?.fear?.authorDetails?.ProfileImagePath
                                    ?
                                    <Image
                                    loader={hadleLoad}
                                      src={datas?.fear?.authorDetails?.ProfileImagePath}
                                      alt="Picture of the author"
                                      width={32}
                                      height={32}
                                    />
                                    :
                                    <>
                                    {`${datas?.fear?.authorDetails?.FirstName} ${datas?.fear?.authorDetails?.LastName}`.charAt(0)}
                                    </>
                                   }
                                  
                                  </div>
                                  <h5 className="text-primary text-base font-normal">
                                    {`${datas?.fear?.authorDetails?.FirstName} ${datas?.fear?.authorDetails?.LastName}` } 
                                  </h5>
                                </div>
                                <p className="text-black font-normal text-base">
                                {moment(datas?.fear?.createdOn).format("MMM DD, YYYY")}
                                </p>
                                </>
                                }
                                
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 lg:pl-6">

                            { datas.values>1&&datas.values.map((response) => (
                              <>
                                {response.featuredEntry != 1 ? (
                                  <>
                                    <div>
                                     
                                      <Link href={`/post/${response.slug}?catgoId=${response.slug}`}>
                                        <Image
                                          loader={hadleLoad}
                                          src={response.coverImage}
                                          
                                          alt="Picture of the author"
                                          width={500}
                                          height={500}
                                        />
                                      </Link>
                                      <p className="text-primary text-sm font-normal mb-2 my-3">
                                      {response.categories[0].at(-1).categoryName}
                                      </p>
                                      <div>
                                        <h3 className="text-black  text-2xl font-bold mb-2">
                                        <Link href={`/post/${response.slug}?catgoId=${response.slug}`}>
                                            {response.title}
                                          </Link>
                                        </h3>
                                        <p className="text-gray-500 text-lg font-light line-clamp-3 mb-3" dangerouslySetInnerHTML={{__html: response.description}}>
                                         
                                        </p>
                                        <div className="flex items-center gap-3">
                                          <div className="flex items-center gap-2">
                                          <div class="flex items-center justify-center relative h-8 w-8 overflow-hidden rounded-full bg-slate-300">
                                            
                                            {response.authorDetails.ProfileImagePath?
                                            <Image
                                            loader={hadleLoad}
                                            src={response.authorDetails.ProfileImagePath}
                                            alt="Picture of the author"
                                            width={32}
                                            height={32}
                                          />
                                          :
                                          <>
                                          {`${response.authorDetails.FirstName}${response.authorDetails.LastName}`.charAt(0)}
                                          </>}
                                            
                                            </div>
                                            <h5 className="text-primary text-base font-normal">
                                              {`${response.authorDetails.FirstName}${response.authorDetails.LastName}`}
                                            </h5>
                                          </div>
                                          <p className="text-black font-normal text-base">
                                          {moment(response.createdOn).format("MMM DD, YYYY")}
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </>
                                ) : (
                                  ""
                                )}
                              </>
                            ))}
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      
                      <div className="w-full h-px bg-grey my-6"></div>

                      <div className="grid grid-cols-1 lg:grid-cols-2">
                      
                       <div className="pb-6 lg:pr-6 border-b lg:border-r lg:border-b-0 border-grey">
                       {datas.fear?
                      <>
                         <Link href={`/post/${datas?.fear?.slug}?catgoId=${datas?.fear?.slug}`}>
                            <Image
                              loader={hadleLoad}
                              src={datas.fear.coverImage}
                              alt="Picture of the author"
                              width={500}
                              height={500}
                              className="w-full"
                            />
                          </Link>
                          <p className="text-primary text-sm font-normal mb-2 my-3">
                          {datas.fear.categories[0].at(-1).categoryName}
                          </p>
                          <div>
                            <h3 className="text-black  text-3xl font-bold mb-2">
                            <Link href={`/post/${datas?.fear?.slug}?catgoId=${datas?.fear?.slug}`}>
                               {datas.fear.title}
                              </Link>
                            </h3>
                            <p className="text-gray-500 text-lg font-light line-clamp-3 mb-3" dangerouslySetInnerHTML={{__html: datas.fear.description}}>
                            </p>
                            <div className="flex items-center gap-3">
                              <div className="flex items-center gap-2">
                              <div class="flex items-center justify-center relative h-8 w-8 overflow-hidden rounded-full bg-slate-300">
                                {datas.fear.authorDetails.ProfileImagePath
                                ?
                                <Image
                                 loader={hadleLoad}
                                  src={datas.fear.authorDetails.ProfileImagePath}
                                  alt="Picture of the author"
                                  width={32}
                                  height={32}
                                />
                                :
                                <>
                                 {`${datas?.fear?.authorDetails?.FirstName} ${datas?.fear?.authorDetails?.LastName}`.charAt(0)}
                                </>}
                                
                                </div>
                                <h5 className="text-primary text-base font-normal">
                                  {`${datas.fear.authorDetails.FirstName}${datas.fear.authorDetails.LastName}`}
                                </h5>
                              </div>
                              <p className="text-black font-normal text-base">
                              {moment(datas.fear.createdOn).format("MMM DD, YYYY")}
                              </p>
                            </div>
                          </div>
                          </>  
                          :""}
                        </div>
                      
                       
                        <div className="pt-6 lg:pl-6 lg:pt-0">
                        {datas.values.map((response,ind) => (
                          ind <= 2&&
                                                  
                          
                              <>
                                {response.featuredEntry != 1 && (
                                  <>
                              <div className="grid grid-cols-1 md:grid-cols-2 pb-3 mb-3 border-b border-grey gap-3 ">
                            <div>
                              <p className="text-primary text-sm font-normal mb-2">
                              {response.categories[0].at(-1).categoryName}
                              </p>
                              <h3 className="text-black text-2xl font-bold mb-2">
                              <Link href={`/post/${response.slug}?catgoId=${response.slug}`}>
                                  {response.title}
                                </Link>
                              </h3>
                              <div className="flex items-center gap-3">
                                <div className="flex items-center gap-2">
                                <div class="flex items-center justify-center relative h-8 w-8 overflow-hidden rounded-full bg-slate-300">
                                  
                                  {response.authorDetails.ProfileImagePath
                                  ?
                                  <Image
                                  loader={hadleLoad}
                                    src={response.authorDetails.ProfileImagePath}
                                    alt="Picture of the author"
                                    width={32}
                                    height={32}
                                  />
                                  :
                                  <>
                                  {`${response.authorDetails.FirstName}${response.authorDetails.LastName}`.charAt(0)}
                                  </>}

                                  </div>
                                  <h5 className="text-primary text-base font-normal">
                                   {`${response.authorDetails.FirstName}${response.authorDetails.LastName}`}
                                  </h5>
                                </div>
                                <p className="text-black font-normal text-base">
                                {moment(response.createdOn).format("MMM DD, YYYY")}
                                </p>
                              </div>
                            </div>
                            <Link href={`/post/${response.slug}?catgoId=${response.slug}`}>
                              <Image
                                  loader={hadleLoad}
                                    src={response.coverImage}
                                    alt="Picture of the author"
                                    width={260}
                                    height={260}
                                  />
                            </Link>
                              </div>
                                  </>)
}
                                </>
                                ))}
                        </div>
                      </div>
                    </>
                  )}
                </>
              ))}
            </>
          ))}
      </div>
    </>
  );
};

export default Listpage;
