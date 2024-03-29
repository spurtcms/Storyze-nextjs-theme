

import { fetchGraphQll } from '@/app/api/graphicql'
import { GET_POSTS_LIST_QUERY, GET_POSTS_SLUG_QUERY } from '@/app/api/query'

import Post from '@/app/component/Post'


const page = async({params}) => {


  let {slug}=params


  let variable_slug={ "limit": 10, "offset": 0,"slug": slug}

  const postes=await fetchGraphQll(GET_POSTS_SLUG_QUERY, variable_slug)
  


let variable_list = { limit: 10, offset: 0 };

const Listdata=await fetchGraphQll(GET_POSTS_LIST_QUERY, variable_list)


  return (
    <>
   <Post data={postes} listdata={Listdata}/>

   </>
  )
}

export default page