import toast from "react-hot-toast";
import { categoryEndPoints,  } from "../apis";
import { apiConnector } from "../apiConnector";





const {
    SHOW_CATEGORIES,
}=categoryEndPoints

// const {
//     SHOW_SUBCATEGORIES,
// }=subCategoryEndPoint

export async function showCategories(){
    const toastId=toast.loading("Loading...")
    let result=[]
    try{
        const response=await apiConnector("GET",SHOW_CATEGORIES)

        console.log("SHOW_CATEGORIES API RESPONSE............", response)

        // console.log(response.data.success)
        if (!response.data.success) {
          throw new Error(response.data.message)
        }
        result=response?.data?.allCategories
        toast.success("categories fetched Successfully")
    }
    catch(error){
        toast.error(error?.response?.data?.message)
        console.log("SHOW_CATEGORIES API ERROR............", error)
    }
    toast.dismiss(toastId)
    return result
}


export async function showSubCategories(categoryId,url){
    const toastId=toast.loading("Loading...")
    let result=[]
    try{
        const response=await apiConnector("GET",url,{},{},{categoryId})

        console.log("SHOW_SUBCATEGORIES API RESPONSE............", response)

        if (!response.data.success) {
          throw new Error(response.data.message)
        }
        result=response?.data?.selectedCategory?.[0]?.subCategory
        console.log(result)
        toast.success("SubCategories fetched Successfully")
    }
    catch(error){
        toast.error(error?.response?.data?.message)
        console.log("SHOW_SUBCATEGORIES API ERROR............", error)
    }
    toast.dismiss(toastId)
    return result
}