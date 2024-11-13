import { fetchGraphQl } from '@/app/api/graphicql';
import { GET_POSTS_CHANNELLIST_QUERY, GET_POSTS_CHANNELLIST_SLUG_QUERY, GET_POSTS_LIST_QUERY } from '@/app/api/query';
import React from 'react'
import Postchannel from './Postchannel';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }) {

  // let variable_list = { limit: 20, offset: 0 };
  let variable_list = {
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

  const datas = await fetchGraphQl(GET_POSTS_LIST_QUERY, variable_list)

  let title = ''
  let description = ''
  datas?.ChannelEntriesList?.channelEntriesList.map((response) => {

    if (response.slug == params.slug) {
      title = response.metaTitle
      description = response.metaDescription
    }
  })
  return {
    title,
    description,
  };

}

const Postlistaction = async ({ params }) => {

  let { slug } = params

  let variable_category = { "limit": 50, "offset": 0, "hierarchylevel": 0 }
  const postchannel = await fetchGraphQl(GET_POSTS_CHANNELLIST_QUERY, variable_category)

  let variable_list = { "slug": slug,"active":true };

  const postdata = await fetchGraphQl(GET_POSTS_CHANNELLIST_SLUG_QUERY, variable_list)


  // let variable_slug = { "limit": 50, "offset": 0, requireData: { authorDetails: true, categories: true } }
  // let variable_slug = { "commonFilter": { "limit": 0, "offset": 0 }, "entryFilter": { "categorySlug": "","channelId":postdata?.ChannelDetail?.id }, "AdditionalData": { "authorDetails": true, "categories": true } };

  let variable_slug = {
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

  const postdatalist = await fetchGraphQl(GET_POSTS_LIST_QUERY, variable_slug)




  if (!postdata) {
    return notFound();
  }
  return (
    <>
      <Postchannel data={postdata} postdatalist={postdatalist} postchannel={postchannel} params={params} />
    </>
  )
}

export default Postlistaction
