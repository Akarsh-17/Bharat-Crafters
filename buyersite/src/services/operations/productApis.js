import {toast} from 'react-hot-toast'
import { productEndPoints } from '../apis'
import { apiConnector } from '../apiConnector'


const {
    CREATE_PRODUCT,
    EDIT_PRODUCT,
    GET_ALL_SELLER_PRODUCTS_API,
    DELETE_PRODUCT,
    GET_FULL_PRODUCT_DETAILS,

}=productEndPoints


export const createProductDetails=async(data)=>{
    let result=null
    console.log(data)
    const toastId = toast.loading("Loading...")
    try{
         const response=await apiConnector("POST",CREATE_PRODUCT,data,{
            "Content-Type": "multipart/form-data",
        })

        console.log("CREATE PRODUCT API RESPONSE..........",response)
        if (!response?.data?.success) {
            throw new Error(response.data.message)
        }
        toast.success("Product Details Added Successfully")
        result = response?.data?.data
    }
    catch(error)
    {   
        toast.error(error?.response?.data?.message)
        console.log("CREATE PRODUCT API ERROR............", error)
    }
    toast.dismiss(toastId)
    return result
}


export const editProductDetails = async (data) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector("POST", EDIT_PRODUCT, data, {
        "Content-Type": "multipart/form-data",
      })

      console.log("EDIT PRODUCT API RESPONSE............", response)
      if (!response?.data?.success) {
        throw new Error(response.data.message)
      }
      toast.success("Product Details Updated Successfully")
      result = response?.data?.data
    } catch (error) {
      toast.error(error?.response?.data?.message)
      console.log("EDIT PRODUCT API ERROR............", error)
    }
    toast.dismiss(toastId)
    return result
  }

 export const fetchSellerProducts= async()=>{
  let result=[]
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector(
      "GET",
      GET_ALL_SELLER_PRODUCTS_API,
    )
    console.log("SELLER PRODUCT API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error(response.data.message)
    }
    result = response?.data?.data
  } 
  catch (error) {
    console.log("INSTRUCTOR COURSES API ERROR............", error)
    toast.error(error?.response?.data?.message)
  }
  toast.dismiss(toastId)
  return result
}

export const getFullDetailsOfProduct= async(productId,url)=>
{
  const toastId = toast.loading("Loading...")
  let result = null

  try {
    const response = await apiConnector(
      "GET",
      url,
      {},{},{productId}
    )
    console.log("PRODUCT_FULL_DETAILS_API API RESPONSE............", response)

    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    result = response?.data?.data?.productDetails
  } catch (error) {
    console.log("COURSE_FULL_DETAILS_API API ERROR............", error)
    result = error.response.data
    toast.error(error.response.data.message);
  }
  toast.dismiss(toastId)
  return result
}


export const deleteProduct= async(productId,url)=>{
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("DELETE", url, {}, {},{productId})
    console.log("DELETE PRODUCT API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Delete Product")
    }
    toast.success("Product Deleted")
  } catch (error) {
    console.log("DELETE PRODUCT API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
}