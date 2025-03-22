import moment from 'moment'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { imageUrl } from '../utilites/ImagePath'
import DOMPurify from 'dompurify';

const Searchpage = ({listdata}) => {
  console.log(listdata, 'asxzas');
    const handleLoad=({src})=>{
     return src
    }

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
                .slice(0, 32) // Limit to the first 35 words
                .join(" ") // Join the words back into a string
                .concat("...") // Add ellipsis if text is truncated
    };
  return (
    <>
     <div className="max-w-screen-2xl m-auto px-10 sm:px-20 py-4">
          {listdata?.ChannelEntriesList?.channelEntriesList?.length > 0?
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-8 mb-12">
              {listdata?.ChannelEntriesList?.channelEntriesList.map((response, id) => (
                <>
                  <div key={id} >
                    <Link href={`/post/${response?.slug}?catgoId=${response?.slug}`}>
                     {/* <Image
                        loader={handleLoad}
                        src={`${response?.coverImage}`}
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
                                  src={response.coverImage || "/img/no-image.png"}
                                  alt={response.coverImage ? "Cover image of the author" : "No image available"}
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
                      {response?.categories?.[0]?.at(-1)?.categoryName}
                      {console.log(response?.categories?.[0]?.at(-1)?.categoryName, 'zxcvb')}
                    </p>
                    <div>
                      <Link href={`/post/${response?.slug}?catgoId=${response?.slug}`}>
                        <h3 className="text-black text-2xl line-clamp-1 overflow-hidden font-bold mb-2">
                          {response?.title}
                        </h3>
                      </Link>
                      {/* <p
                        className="text-gray-500 text-lg font-light line-clamp-2 mb-3 desc"
                        dangerouslySetInnerHTML={{
                          __html: response?.description?.replaceAll("<br>"," ").replace(/p-\[24px_60px_10px\]/g, "")
                        }}
                      ></p> */}
                       <div className="text-gray-500 text-lg font-light line-clamp-3 mb-3 desc overflow-hidden"
                                dangerouslySetInnerHTML={{
                                    __html: sanitizeHTML(response?.description)
                                }}
                            >
                            </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          <div class="flex items-center justify-center relative h-8 w-8 overflow-hidden rounded-full bg-slate-300">
                            {response?.authorDetails?.profileImagePath ? (
                              <>
                                <Image
                               loader={handleLoad}
                                src={`${imageUrl}${response?.authorDetails?.profileImagePath}`}
                                alt="Picture of the author"
                                width={32}
                                height={32}
                              />
                              
                              </>
                              
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
                </>
              ))}
            </div>
           :
                            <>
                            
                              <div className='flex justify-center items-center h-[80vh]'>
                                  <Image
                                    className=" ps-16"
                                    src="/images/no data.svg"
                                    width={500}
                                    height={100}
                                  />
                                 

                              </div>
                             
                             
                              </>
                              }
     </div>
    </>
  )
}

export default Searchpage
