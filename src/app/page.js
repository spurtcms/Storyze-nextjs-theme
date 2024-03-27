


import { GET_POSTS_CHANNELLIST_QUERY, GET_POSTS_LIST_QUERY } from '@/app/api/query'
import { fetchGraphQll } from '@/app/api/graphicql'
import { Suspense } from 'react'
import Listpost from '@/app/component/Listpost'


export default async function page() {


 let variable_category={"limit": 10, "offset":0,"hierarchylevel": 0}
 const postchannel=await fetchGraphQll(GET_POSTS_CHANNELLIST_QUERY,variable_category)  




let variable_list = { limit: 10, offset: 0 };

const Listdata=await fetchGraphQll(GET_POSTS_LIST_QUERY, variable_list)

  

    return (
        <>  
            <Suspense fallback={null}>
            <Listpost headList={Listdata} postchannel={postchannel}/>
            </Suspense>    
        </>
    )
}


















// import Image from "next/image";
// import Login from "@/app/component/Login"

// export default function page() {
//   return (
//    <>
//    <Login/>
//    </>
//   );
// }
