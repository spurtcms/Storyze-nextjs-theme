import { fetchGraphQl } from '@/app/api/graphicql'
import { GET_POSTS_LIST_QUERY, GET_POSTS_SLUG_QUERY } from '@/app/api/query'
import React from 'react'
import Post from './Post'
import { notFound } from 'next/navigation'


export async function generateMetadata({ params }) {

  let variable_slug = { "limit": 50, "offset": 0, "slug": params.slug[0] }

  const post = await fetchGraphQl(GET_POSTS_SLUG_QUERY, variable_slug)

  let title = post?.channelEntryDetail?.metaTitle
  let description = post?.channelEntryDetail?.metaDescription

  return {
    title,
    description,
  };

}

const Postaction = async ({ params }) => {




  let variable_slug = { "slug": params?.slug[0], "AdditionalData": { "authorDetails": true, "categories": true } , "channelId": params?.slug[1]};
 console.log(variable_slug,"variable_slug")

  const postes = await fetchGraphQl(GET_POSTS_SLUG_QUERY, variable_slug)
console.log(postes,'sdadasdasdas')
  if (!postes) {
    return notFound();
  }

  // let  variable_list={ "commonFilter": {"limit": 10,"offset": 0}, "entryFilter": { "categorySlug": "blog",}, "AdditionalData": { "authorDetails": true, "categories": true }};

  let  variable_list = {
    "commonFilter": {
      "limit": 10,
      "offset": 0,
      "keyword":""
    },
    "entryFilter": {
      "Status": "Publish"
    },
    "AdditionalData": {
      "categories": true,
      "authorDetails":true
    }
  }
  const Listdata = await fetchGraphQl(GET_POSTS_LIST_QUERY, variable_list)

  return (
    <>

      <Post data={postes} listdata={Listdata} params={params} />
    </>
  )
}

export default Postaction
