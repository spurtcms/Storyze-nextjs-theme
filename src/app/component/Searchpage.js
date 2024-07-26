import moment from 'moment'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { imageUrl } from '../utilites/ImagePath'

const Searchpage = ({listdata}) => {

    
    const handleLoad=({src})=>{
     return src
    }

  return (
    <>
     <div className="max-w-screen-2xl m-auto px-10 sm:px-20 py-4">
          {listdata?.channelEntriesList?.channelEntriesList.length>0?
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-8 mb-12">
              {listdata?.channelEntriesList?.channelEntriesList.map((response) => (
                <>
                  <div>
                    <Link href={`/post/${response?.slug}?catgoId=${response?.slug}`}>
                      <Image
                        loader={handleLoad}
                        src={`${imageUrl}${response.coverImage}`}
                        alt="Picture of the author"
                        width={500}
                        height={500}
                        className="w-full h-channel"
                      />
                    </Link>
                    <p className="text-primary text-sm font-normal mb-2 my-3">
                      {response?.categories[0].at(-1).categoryName}
                    </p>
                    <div>
                      <Link href={`/post/${response?.slug}?catgoId=${response?.slug}`}>
                        <h3 className="text-black text-2xl font-bold mb-2">
                          {response.title}
                        </h3>
                      </Link>
                      <p
                        className="text-gray-500 text-lg font-light line-clamp-2 mb-3 desc"
                        dangerouslySetInnerHTML={{
                          __html: response.description.replaceAll("<br>"," "),
                        }}
                      ></p>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          <div class="flex items-center justify-center relative h-8 w-8 overflow-hidden rounded-full bg-slate-300">
                            {response.authorDetails.ProfileImagePath ? (
                              <Image
                                loader={handleLoad}
                                src={`${imageUrl}${response.authorDetails.ProfileImagePath}`}
                                alt="Picture of the author"
                                width={32}
                                height={32}
                              />
                            ) : (
                              <>
                                {`${response.authorDetails.FirstName} ${response.authorDetails.LastName}`.charAt(
                                  0
                                )}
                              </>
                            )}
                          </div>
                          <h5 className="text-primary text-base font-normal">
                            {`${response.authorDetails.FirstName} ${response.authorDetails.LastName}`}
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
