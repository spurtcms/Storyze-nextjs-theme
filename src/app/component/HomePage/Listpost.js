"use client"
import React,{useCallback} from 'react'
import Header from '@/app/component/Header'
import Listpage from '@/app/component/HomePage/Listpage'
import Navbar from '@/app/component/Navbar'

import { useEffect, useState } from "react";
import { useSearchParams, usePathname } from "next/navigation";
import { fetchGraphQl, fetchGraphQll } from "../../api/graphicql";
import { GET_POSTS_CHANNELLIST_QUERY, GET_POSTS_LIST_QUERY } from '../../api/query'
import ViewAllSkeleton from '../../utilites/Skeleton/ViewAllSkeleton'
import BannerSkeleton from '../../utilites/Skeleton/BannerSkeleton'
import Searchpage from '../Searchpage'

const Listpost = () => {


  const [postes, setPostes] = useState({})
  const [categories, setCategories] = useState([])
  const [catNo, setCatNo] = useState(null)
  const [catLoader, setCatLoader] = useState(true)
  const [offset, setOffset] = useState(0)
  const [scrollX, setscrollX] = useState(0);
  const searchParams = useSearchParams()
  // const catgoId=searchParams.get("catgoId")

  console.log(categories, 'ccc');
  const [search, setSearch] = useState("")
  const popstate = usePathname()

  const [listdata, setHeadList] = useState({})
  const [triger, setTriger] = useState(0)

  const [channelid, setChannelid] = useState(null)



   const fetchChannel = async()=>{
    let variable_category = {
      "filter": {
          "limit": 10,
          "offset": 0
      }
  }
  const PostChannel = await fetchGraphQl(GET_POSTS_CHANNELLIST_QUERY, variable_category)
  setPostes(PostChannel);
  console.log(PostChannel, 'chh');
   }


   const fetchList = useCallback(async () => {
    setCatLoader(true);
    const variable_list = {
      commonFilter: { keyword: search },
      entryFilter: { Status: "Publish" },
      AdditionalData: { categories: true, authorDetails: true }
    };
    const ListData = await fetchGraphQl(GET_POSTS_LIST_QUERY, variable_list);
    setHeadList(ListData);
    setCatLoader(false);
  }, [search]);
  



  const searchList = async () => {

      // let variable_list = { limit: 30, offset: 0,title:search,channelId:channelid,AdditionalData:{authorDetails:true,categories:true}};

      let variable_list = {
        "commonFilter": {
          "limit": 10,
          "offset": 0,
          "keyword": search
        },
        "entryFilter": {
          "Status": "Publish"
        },
        "AdditionalData": {
          "categories": true,
          "authorDetails": true
        }
      }

      let entries = await fetchGraphQl(GET_POSTS_LIST_QUERY, variable_list)
      setCatLoader(false)
      setHeadList(entries)
     console.log(entries, 'entriess');
     

  }
  console.log(listdata, 'AAA');

  useEffect(() => {
    if (search) {
      searchList();
    } else {
      fetchChannel();
      fetchList();
    }
  }, [triger]);
  

  console.log(triger,'erterterter')
  


  // useEffect(() => {
  //   setCatLoader(false)
  // }, [])

  


  const handleScroll = (e) => {

    const scrollHeight = e.target.documentElement.scrollHeight;
    const currentHeight = Math.ceil(
      e.target.documentElement.scrollTop + window.innerHeight
    );
    if (currentHeight + 1 >= scrollHeight) {
      setOffset(offset + 5)
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    window.addEventListener('popstate', (e) => {
      if (e) {
        if (popstate === '/') {
          window.location.reload()
        }
      }
    })
  }, [popstate])

  console.log(listdata,'listdata');

  return (
    <>
      <Header search={search} setSearch={setSearch} triger={triger} setTriger={setTriger} />
      {catLoader == true ?
        <>
          <ViewAllSkeleton />
          <BannerSkeleton />
        </>
        :
          search == "" ?
          <>
              <Navbar categories={categories} catNo={catNo} setCatNo={setCatNo} postes={postes}  setOffset={setOffset} scrollX={scrollX} setscrollX={setscrollX} />
              <Listpage listdata={listdata}  />
         
          </>
          :
          <>
            <Searchpage listdata={listdata} />
          </>
      }
    </>
  )
}

export default Listpost