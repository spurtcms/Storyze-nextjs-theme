"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import moment from "moment";
import { imageUrl } from "@/app/utilites/ImagePath";


const Listpage = ({ listdata }) => {

  const groupData = listdata?.ChannelEntriesList?.channelEntriesList.reduce(
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
  let initialdata = [];
  for (const key in groupData) {
    initialdata.push({ detail: key, values: groupData[key] });
  }

  let featuredata = [];

  initialdata.map((data) => {
    data.entrydata = "";
    data.values.map((res) => {
      if (res.featuredEntry == 1) {
        data.entrydata = res;
      }
    });
  });

  featuredata.push(initialdata);
  // let entrydatavalue=[]
  // let feturelists=featuredata.map((res)=>res.filter((dt,index)=>dt.entrydata!="" && fearvalue.push(index)))
  // // let feturelist=featuredata.map((res)=>res.toSpliced(0,1,feturelists))
  // const sortedArtists = [
  //   ...featuredata[0].slice(1),
  //   featuredata?.[0][0],
  // ];


  const hadleLoad = ({ src }) => {
    return src;
  };

  return (
    <>
      <div className="min-h-screen max-w-screen-2xl m-auto px-10 sm:px-20 py-4">
        {featuredata &&
          featuredata.map((result) => (
            <>
              {result&&result?.map((datas, index) => (
             
                <>
                  {index==0 ?(
                    <>
                      <div>
                        <div className="grid grid-cols-1 lg:grid-cols-2">
                         
                          <div className="pb-6 lg:pr-6 border-b lg:border-r lg:border-b-0 border-grey">
                          {datas?.entrydata?
                          
                          
                          <>
                          <Link href={`/post/${datas?.entrydata?.slug}`}>
                            {datas?.entrydata?.coverImage && (
                              <Image
                                loader={hadleLoad}
                                src={`${datas?.entrydata?.coverImage}`}
                                alt="Picture of the author"
                                width={500}
                                height={500}
                                className="w-full h-banner"
                                onError={({ currentTarget }) => {
                                  currentTarget.onerror = null;
                                  currentTarget.src = "/img/no-image.png";
                              }}
                              />
                            )}
                          </Link>

                          <p className="text-primary text-sm font-normal mb-2 my-3">
                            {
                              datas?.entrydata?.categories?.[0]?.at(-1)
                                ?.categoryName
                            }
                          </p>
                          < div>
                            <h3 className="text-black text-3xl font-bold mb-2">
                              {" "}
                              <Link href={`/post/${datas?.entrydata?.slug}`}>
                                {" "}
                                {datas.entrydata.title}{" "}
                              </Link>
                            </h3>
                            <p
                              className="text-gray-500 text-lg font-light line-clamp-3 mb-3 desc"
                              dangerouslySetInnerHTML={{
                                __html: datas.entrydata.description.replaceAll("<br>"," "),}}
                            ></p>
                            <div className="flex items-center gap-3">
                              {datas?.entrydata && (
                                <>
                                  <div className="flex items-center gap-2">
                                    <div class="flex items-center justify-center relative h-8 w-8 overflow-hidden rounded-full bg-slate-300">
                                      {datas?.entrydata?.authorDetails
                                        ?.profileImagePath ? (
                                        <Image
                                          loader={hadleLoad}
                                          src={
                                            `${imageUrl}${datas?.entrydata?.authorDetails
                                              ?.profileImagePath}`
                                          }
                                          alt="Picture of the author"
                                          width={32}
                                          height={32}
                                        />
                                      ) : (
                                        <>
                                          {`${datas?.entrydata?.authorDetails?.firstName} ${datas?.entrydata?.authorDetails?.lastName}`.charAt(
                                            0
                                          )}
                                        </>
                                      )}
                                    </div>
                                    <h5 className="text-primary text-base font-normal">
                                      {`${datas?.entrydata?.authorDetails?.firstName} ${datas?.entrydata?.authorDetails?.lastName}`}
                                    </h5>
                                  </div>
                                  <p className="text-black font-normal text-base">
                                    {moment(datas?.entrydata?.createdOn).format(
                                      "MMM DD, YYYY"
                                    )}
                                  </p>
                                </>
                              )}
                            </div>
                            
                          </div>
                          </>
                          :
                              //  <div dir="ltr">
                              //     <Image
                              //       className=" p-10"
                              //       src="/images/no data.svg"
                              //       width={500}
                              //       height={100}
                              //     />
                              // </div> 
                              <></>
                               } 
                          </div> 
                        
                          
                         
                         {(datas.values.find(value=>{return value.featuredEntry!==1}))
                         
                         ?
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 lg:pl-6 relative">
                            <>
                                  {datas.values.filter(d=>d.featuredEntry!=1).map((response, inde) =>

                                        <>
                                          {inde <= 3 && (
                                              <>
                                                <div>
                                                  <Link href={`/post/${response?.slug}`}>
                                                    <Image
                                                      loader={hadleLoad}
                                                      src={`${response.coverImage}`}
                                                      alt="Picture of the author"
                                                      width={500}
                                                      height={500}
                                                      onError={({ currentTarget }) => {
                                                        currentTarget.onerror = null;
                                                        currentTarget.src = "/img/no-image.png";
                                                    }}
                                                    />
                                                  </Link>
                                                  <p className="text-primary text-sm font-normal mb-2 my-3">
                                                    {response.categories.map((d,inde)=>(
                                                      <>
                                                      {response.categories[inde].at(-1).categoryName}
                                                      </>
                                                    ))}
                                                    
                                                  </p>
                                                  <div>
                                                    <h3 className="text-black  text-2xl font-bold mb-2">
                                                      <Link href={`/post/${response?.slug}`}>
                                                        {response.title}
                                                      </Link>
                                                    </h3>
                                                    <p
                                                      className="text-gray-500 text-lg font-light line-clamp-3 mb-3 desc"
                                                      dangerouslySetInnerHTML={{
                                                        __html:
                                                          response.description.replaceAll("<br>"," "),
                                                      }}
                                                    ></p>
                                                    <div className="flex items-center gap-3">
                                                      <div className="flex items-center gap-2">
                                                        <div class="flex items-center justify-center relative h-8 w-8 overflow-hidden rounded-full bg-slate-300">
                                                          {response
                                                            .authorDetails
                                                            .profileImagePath ? (
                                                            <Image
                                                              loader={hadleLoad}
                                                              src={
                                                                `${imageUrl}${response
                                                                  ?.authorDetails
                                                                  ?.profileImagePath}`
                                                              }
                                                              alt="Picture of the author"
                                                              width={32}
                                                              height={32}
                                                            />
                                                          ) : (
                                                            <>
                                                              {`${response.authorDetails.firstName}${response.authorDetails.lastName}`.charAt(
                                                                0
                                                              )}
                                                            </>
                                                          )}
                                                        </div>
                                                        <h5 className="text-primary text-base font-normal">
                                                          {`${response.authorDetails.firstName}${response.authorDetails.lastName}`}
                                                        </h5>
                                                      </div>
                                                      <p className="text-black font-normal text-base">
                                                        {moment(
                                                          response.createdOn
                                                        ).format(
                                                          "MMM DD, YYYY"
                                                        )}
                                                      </p>
                                                    </div>
                                                  </div>
                                                </div>
                                              </>
                                            )}
                                        </>
                                      
                                  )}
                            </>
                          </div>
                         :
                              <div dir="ltr">
                                  <Image
                                    className=" p-10"
                                    src="/images/no data.svg"
                                    width={500}
                                    height={100}
                                  />
                              </div>
                         }
                          
                          
                        
                         </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="w-full h-px bg-grey my-6"></div>

                      <div className="grid grid-cols-1 lg:grid-cols-2">
                        <div className="pb-6 lg:pr-6 border-b lg:border-r lg:border-b-0 border-grey">
                          {index!=0&&datas.entrydata ? 
                          (
                            <>
                              <Link href={`/post/${datas?.entrydata?.slug}`}>
                                <Image
                                  loader={hadleLoad}
                                  src={`${datas.entrydata.coverImage}`}
                                  alt="Picture of the author"
                                  width={500}
                                  height={500}
                                  className="w-full h-banner"
                                  onError={({ currentTarget }) => {
                                    currentTarget.onerror = null;
                                    currentTarget.src = "/img/no-image.png";
                                }}
                                />
                              </Link>
                              <p className="text-primary text-sm font-normal mb-2 my-3">
                                {datas.entrydata.categories[0].at(-1).categoryName}
                              </p>
                              <div>
                                <h3 className="text-black  text-3xl font-bold mb-2">
                                  <Link href={`/post/${datas?.entrydata?.slug}`}>
                                    {datas.entrydata.title}
                                  </Link>
                                </h3>
                                <p
                                  className="text-gray-500 text-lg font-light line-clamp-3 mb-3 desc"
                                  dangerouslySetInnerHTML={{
                                    __html: datas.entrydata.description.replaceAll("<br>"," "),
                                  }}
                                ></p>
                                <div className="flex items-center gap-3">
                                  <div className="flex items-center gap-2">
                                    <div class="flex items-center justify-center relative h-8 w-8 overflow-hidden rounded-full bg-slate-300">
                                      {datas.entrydata.authorDetails
                                        .profileImagePath ? (
                                        <Image
                                          loader={hadleLoad}
                                          src={
                                            `${imageUrl}${datas.entrydata.authorDetails
                                              .profileImagePath}`
                                          }
                                          alt="Picture of the author"
                                          width={32}
                                          height={32}
                                        />
                                      ) : (
                                        <>
                                          {`${datas?.entrydata?.authorDetails?.firstName} ${datas?.entrydata?.authorDetails?.lastName}`.charAt(
                                            0
                                          )}
                                        </>
                                      )}
                                    </div>
                                    <h5 className="text-primary text-base font-normal">
                                      {`${datas?.entrydata?.authorDetails?.firstName}${datas?.entrydata?.authorDetails?.lastName}`}
                                    </h5>
                                  </div>
                                  <p className="text-black font-normal text-base">
                                    {moment(datas.entrydata.createdOn).format(
                                      "MMM DD, YYYY"
                                    )}
                                  </p>
                                </div>
                              </div>
                            </>
                          ) : (
                            <Image
                              className="p-10 "
                              src="/images/no data.svg"
                              width={500}
                              height={100}
                            />
                          )}
                        </div>


                        {(datas?.values?.find(value=>{return value.featuredEntry!==1})) ?

                         <div className="pt-6 lg:pl-6 lg:pt-0">
                          {datas.values.filter(d=>d.featuredEntry!=1).map((response, ind) =>
                              ind <= 2 && (
                                    <>
                                      <div className="grid grid-cols-1 md:grid-cols-2 pb-3 mb-3 border-b border-grey gap-3 ">
                                        <div>
                                          <p className="text-primary text-sm font-normal mb-2">
                                            {
                                              response?.categories[0]?.at(-1)
                                                .categoryName
                                            }
                                          </p>
                                          <h3 className="text-black text-2xl font-bold mb-2">
                                            <Link href={`/post/${response?.slug}`}>
                                              {response.title}
                                            </Link>
                                          </h3>
                                          <div className="flex items-center gap-3">
                                            <div className="flex items-center gap-2">
                                              <div class="flex items-center justify-center relative h-8 w-8 overflow-hidden rounded-full bg-slate-300">
                                                {response.authorDetails
                                                  .profileImagePath ? (
                                                  <Image
                                                    loader={hadleLoad}
                                                    src={
                                                      `${imageUrl}${response.authorDetails
                                                        .profileImagePath}`
                                                    }
                                                    alt="Picture of the author"
                                                    width={32}
                                                    height={32}
                                                  />
                                                ) : (
                                                  <>
                                                    {`${response.authorDetails.firstName}${response.authorDetails.lastName}`.charAt(
                                                      0
                                                    )}
                                                  </>
                                                )}
                                              </div>
                                              <h5 className="text-primary text-base font-normal">
                                                {`${response.authorDetails.firstName}${response.authorDetails.lastName}`}
                                              </h5>
                                            </div>
                                            <p className="text-black font-normal text-base">
                                              {moment(
                                                response.createdOn
                                              ).format("MMM DD, YYYY")}
                                            </p>
                                          </div>
                                        </div>
                                        <Link href={`/post/${response?.slug}`}>
                                          <Image
                                            loader={hadleLoad}
                                            src={`${response.coverImage}`}
                                            alt="Picture of the author"
                                            width={260}
                                            height={260}
                                            className="h-image"
                                            onError={({ currentTarget }) => {
                                              currentTarget.onerror = null;
                                              currentTarget.src = "/img/no-image.png";
                                          }}
                                          />
                                        </Link>
                                      </div>
                                    </>
                              )
                          )}
                        </div>
                          :
                                <div dir="ltr">
                                  <Image
                                    className=" ps-16"
                                    src="/images/no data.svg"
                                    width={500}
                                    height={100}
                                  />
                              </div>
                            }
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
