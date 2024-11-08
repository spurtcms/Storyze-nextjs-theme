import { fetchGraphQl } from "@/app/api/graphicql";
import { GET_POSTS_LIST_QUERY } from "@/app/api/query";

export const searchapi = async (search, setHeadLis, setCatLoader ) =>{
    let variable_list = {
        "commonFilter": {
          "limit": 10,
          "offset": 0,
          "keyword":search
        },
        "entryFilter": {
          "Status": "Publish"
        },
        "AdditionalData": {
          "categories": true,
          "authorDetails":true
        }
      }
  
      
  
     let entries=await fetchGraphQl(GET_POSTS_LIST_QUERY,variable_list);
  
      setHeadLis(entries)
      if(entries){
        setCatLoader(false)
      }
}