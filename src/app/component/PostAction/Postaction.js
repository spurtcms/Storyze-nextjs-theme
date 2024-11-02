import { fetchGraphQl } from '@/app/api/graphicql'
import { GET_POSTS_LIST_QUERY, GET_POSTS_SLUG_QUERY } from '@/app/api/query'
import React from 'react'
import Post from './Post'
import { notFound } from 'next/navigation'


export async function generateMetadata({ params }) {

  let variable_slug = { "limit": 50, "offset": 0, "slug": params.slug }

  const post = await fetchGraphQl(GET_POSTS_SLUG_QUERY, variable_slug)

  let title = post?.channelEntryDetail?.metaTitle
  let description = post?.channelEntryDetail?.metaDescription

  return {
    title,
    description,
  };

}

const Postaction = async ({ params }) => {


  let { slug } = params


  let variable_slug = { "slug": params?.slug, "AdditionalData": { "authorDetails": true, "categories": true } };

  const postes = await fetchGraphQl(GET_POSTS_SLUG_QUERY, variable_slug)

  if (!postes) {
    return notFound();
  }

  let  variable_list={ "commonFilter": {"limit": 10,"offset": 0}, "entryFilter": { "categorySlug": "blog",}, "AdditionalData": { "authorDetails": true, "categories": true }};

  const Listdata = await fetchGraphQl(GET_POSTS_LIST_QUERY, variable_list)

  return (
    <>

      <Post data={postes} listdata={Listdata} params={params} />
    </>
  )
}

export default Postaction
