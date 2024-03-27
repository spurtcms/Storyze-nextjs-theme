

import { fetchGraphQl, fetchGraphQll } from '@/app/api/graphicql'
import { GET_POSTS_CHANNELLIST_QUERY, GET_POSTS_CHANNELLIST_SLUG_QUERY, GET_POSTS_LIST_QUERY } from '@/app/api/query'
import Header from '@/app/component/Header'
import Postchannel from '@/app/component/Postchannel'
import ChannelSkeleton from '@/app/utilites/Skeleton/ChannelSkeleton'
import React from 'react'

const page = async({params}) => {

    // const [postdata,setPostdata]=useState([])
    // const [catLoader,setCatLoader]=useState(true)
    let {slug}=params

    // useEffect(()=>{
    //     let variable_list={ "limit": 10, "offset": 0,channelId:slug}
    //     // let variable_slug={ "limit": 10, "offset": 0,"channelEntryId": slug}
    //     // fetchGraphQl(GET_POSTS_SLUG_QUERY,variable_slug,setPostes)
    //     fetchGraphQl(GET_POSTS_LIST_QUERY,variable_list,setPostdata,setCatLoader)
    //   },[slug])

    //   console.log(postdata,"postdata")

    let variable_category={"limit": 10, "offset":0,"hierarchylevel": 0}
    const postchannel=await fetchGraphQll(GET_POSTS_CHANNELLIST_QUERY,variable_category)  



    let variable_slug={ "limit": 10, "offset": 0}

    const postdatalist=await fetchGraphQll(GET_POSTS_LIST_QUERY, variable_slug)
    
    console.log(postdatalist.channelEntriesList.channelEntriesList,"datslist")
  
  
  let variable_list = { channelId:slug};
  
  const postdata=await fetchGraphQll(GET_POSTS_CHANNELLIST_SLUG_QUERY, variable_list)
  
  console.log(postdata,"datsss")
  return (
 <>
 {/* <Header/> */}
 {/* {catLoader==true?
 <>
 <ChannelSkeleton/>
 </>:
  <Postchannel data={postdata}/>
 } */}

<Postchannel data={postdata} postdatalist={postdatalist} postchannel={postchannel}/>
 </>
  )
}

export default page




