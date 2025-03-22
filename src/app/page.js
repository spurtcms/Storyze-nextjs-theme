
// import { GET_POSTS_CHANNELLIST_QUERY, GET_POSTS_LIST_QUERY } from '@/app/api/query'
// import { Suspense } from 'react'
// import Listpost from '@/app/component/HomePage/Listpost'
// import { fetchGraphQl } from './api/graphicql'
// export default async function page() {

//     let variable_category = {
//         "filter": {
//             "limit": 10,
//             "offset": 0
//         }
//     }
//     const postchannel = await fetchGraphQl(GET_POSTS_CHANNELLIST_QUERY, variable_category)

//     // let  variable_list={ "commonFilter": {"limit": 10,"offset": 0}, "entryFilter": { "categorySlug": "",}, "AdditionalData": { "authorDetails": true, "categories": true }};

//     let variable_list = {
//         "commonFilter": {
//           "limit": 10,
//           "offset": 0,
//           "keyword":""
//         },
//         "entryFilter": {
//           "Status": "Publish"
//         },
//         "AdditionalData": {
//           "categories": true,
//           "authorDetails":true
//         }
//       }
    
//     const Listdata = await fetchGraphQl(GET_POSTS_LIST_QUERY, variable_list)
//     return (
//         <>
//             <Suspense fallback={null}>
//                 <Listpost headList={Listdata} postchannel={postchannel} />
//             </Suspense>
//         </>
//     )
// }



import React, { Suspense } from "react";
import Listpost from "./component/HomePage/Listpost";

const Page=()=>{
  return(
    <>
    <Suspense>
    <Listpost/>
    </Suspense>
    </>
  )
}
export default Page;








