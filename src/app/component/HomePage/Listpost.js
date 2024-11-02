

"use client"


import React from 'react'
import Header from '@/app/component/Header'
import Listpage from '@/app/component/HomePage/Listpage'
import Navbar from '@/app/component/Navbar'

import { useEffect, useState } from "react";
import {useSearchParams } from "next/navigation";
import { fetchGraphQl, fetchGraphQll } from "../../api/graphicql";
import { GET_POSTS_LIST_QUERY } from '../../api/query'
import BannerSkeleton from '../../utilites/Skeleton/BannerSkeleton'
import ViewAllSkeleton from '../../utilites/Skeleton/ViewAllSkeleton'
import Searchpage from '../Searchpage'

const Listpost = ({headList,postchannel}) => {


    const [postes,setPostes]=useState(postchannel)
    const [categories,setCategories]=useState([])
    const [catNo,setCatNo]=useState(null)
    const [catLoader,setCatLoader]=useState(true)
    const [offset,setOffset]=useState(0)
    const [scrollX, setscrollX] = useState(0);
    const searchParams = useSearchParams()
    // const catgoId=searchParams.get("catgoId")

    const [search,setSearch]=useState("")

    const [listdata,setHeadList]=useState(headList)
    const [triger,setTriger]=useState(0)

    const [channelid,setChannelid]=useState(null)

  
     const searchList=async()=>{
      if(triger!=0){
        let variable_list = { limit: 30, offset: 0,title:search,channelId:channelid,requireData:{authorDetails:true,categories:true}};
  
      let entries=await fetchGraphQl(GET_POSTS_LIST_QUERY, variable_list)  
       setHeadList(entries)
       setCatLoader(false)
        }
     }
   
      useEffect(()=>{
        searchList()
      },[search])
    
      useEffect(()=>{
        setCatLoader(false)
      },[])

  
    const handleScroll = (e) => {
  
      const scrollHeight = e.target.documentElement.scrollHeight;
      const currentHeight = Math.ceil(
        e.target.documentElement.scrollTop + window.innerHeight
      );
      if (currentHeight + 1 >= scrollHeight) {  
        setOffset(offset+5) 
      }
    };
  
    useEffect(() => {
      window.addEventListener("scroll", handleScroll);
    }, []);
  return (
   <>
           <Header search={search} setSearch={setSearch} triger={triger}setTriger={setTriger} />
           {catLoader==true?
             <>
             <ViewAllSkeleton/>
             <BannerSkeleton/>
             </>
            :
            search==""?
            <>
      
            <Navbar categories={categories} catNo={catNo} setCatNo={setCatNo} postes={postes} setPostes={setPostes} setOffset={setOffset} scrollX={scrollX} setscrollX={setscrollX}/>
            <Listpage listdata={headList}/>
            </>
            :
            <>
           
            <Searchpage listdata={listdata}/>
            </>
          }
   </>
  )
}

export default Listpost