

import { fetchGraphQll } from '@/app/api/graphicql'
import { GET_POSTS_LIST_QUERY, GET_POSTS_SLUG_QUERY } from '@/app/api/query'
import Header from '@/app/component/Header'
import Post from '@/app/component/Post'
// import BannerSkeleton from '@/app/utilites/Skeleton/BannerSkeleton'
// import PostSkeleton from '@/app/utilites/Skeleton/PostSkeleton'
// import { useSearchParams } from 'next/navigation'
// import React, { useEffect, useState } from 'react'

const page = async({params}) => {

  // const searchParams = useSearchParams()
  // const [postes,setPostes]=useState([])
  // const [catLoader,setCatLoader]=useState(true)

  let {slug}=params

 

  // useEffect(()=>{
   
  //   let variable_slug={ "limit": 10, "offset": 0,"slug": slug}

  //   fetchGraphQl(GET_POSTS_SLUG_QUERY,variable_slug,setPostes,setCatLoader)
   
  // },[slug])

  // console.log(postes,slug,"slug")

  // server side

  let variable_slug={ "limit": 10, "offset": 0,"slug": slug}

  const postes=await fetchGraphQll(GET_POSTS_SLUG_QUERY, variable_slug)
  
  console.log(postes,"datsss")


let variable_list = { limit: 10, offset: 0 };

const Listdata=await fetchGraphQll(GET_POSTS_LIST_QUERY, variable_list)

console.log(Listdata,"datsss")

  return (
    <>
   {/* <Header/> */}
   <Post data={postes} listdata={Listdata}/>
   {/* {catLoader==true?
   <>
   <PostSkeleton/>
   </>:
   <>
   <Post data={postes}/>
   </>} */}
   
   </>
  )
}

export default page