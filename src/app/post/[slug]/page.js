

import { fetchGraphQll } from '@/app/api/graphicql'
import { GET_POSTS_LIST_QUERY, GET_POSTS_SLUG_QUERY } from '@/app/api/query'

import Post from '@/app/component/Post'

export async function generateMetadata({params}) {

  let variable_slug={ "limit": 100, "offset": 0,"slug":params.slug}

  const postesdfs=await fetchGraphQll(GET_POSTS_SLUG_QUERY, variable_slug)
 let title=postesdfs?.channelEntryDetail?.metaTitle
 let description=postesdfs?.channelEntryDetail?.metaDescription

console.log(description,'postesdfs')
  return {
    title,
    description,
  };
 
}


const page = async({params}) => {


  let {slug}=params


  let variable_slug={ "limit": 100, "offset": 0,"slug": slug}

  const postes=await fetchGraphQll(GET_POSTS_SLUG_QUERY, variable_slug)
  


let variable_list = { limit: 100, offset: 0 };

const Listdata=await fetchGraphQll(GET_POSTS_LIST_QUERY, variable_list)


  return (
    <>
   <Post data={postes} listdata={Listdata}/>

   </>
  )
}

export default page