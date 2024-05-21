import { fetchGraphQl } from '@/app/api/graphicql'
import { GET_POSTS_LIST_QUERY, GET_POSTS_SLUG_QUERY } from '@/app/api/query'
import React from 'react'
import Post from './Post'


export async function generateMetadata({params}) {

    let variable_slug={ "limit": 50, "offset": 0,"slug":params.slug}
  
    const postesdfs=await fetchGraphQl(GET_POSTS_SLUG_QUERY, variable_slug)

   let title=postesdfs?.channelEntryDetail?.metaTitle
   let description=postesdfs?.channelEntryDetail?.metaDescription
  
    return {
      title,
      description,
    };
   
  }

const Postaction =async ({params}) => {


  let {slug}=params


  let variable_slug={"slug": slug}

  const postes=await fetchGraphQl(GET_POSTS_SLUG_QUERY, variable_slug)
  

let variable_list = { limit: 50, offset: 0,requireData:{authorDetails:true,categories:true}};

const Listdata=await fetchGraphQl(GET_POSTS_LIST_QUERY, variable_list)

  return (
    <>
    <Post data={postes} listdata={Listdata} params={params}/>
    </>
  )
}

export default Postaction
