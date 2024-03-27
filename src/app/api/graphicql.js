
import axiosInstance from "./axios";


async function fetchGraphQLData(GET_POSTS_QUERY,varia) {
  let obj=varia
  try {
    const response = await axiosInstance.post('', {
      query: GET_POSTS_QUERY,
      variables: obj
    });
    return response.data; 
  } catch (error) {
    throw error;
  }
}






export const fetchGraphQl = async (GET_POSTS_QUERY,varia,setListdata,setCatLoader) => {

  try {
    const entries = await fetchGraphQLData(GET_POSTS_QUERY,varia);
    
    setListdata(entries.data)
    setCatLoader(false)
    console.log(entries.data,'8098777');

  }
   catch (error) {
    throw error;
  }
};



export const fetchGraphQll = async (GET_POSTS_QUERY,varia) => {

  try {
    const entries = await fetchGraphQLData(GET_POSTS_QUERY,varia);
    return entries.data

  }
   catch (error) {
    throw error;
  }
};