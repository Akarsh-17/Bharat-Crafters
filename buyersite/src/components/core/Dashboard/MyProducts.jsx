import React, { useEffect, useState } from 'react'
import {VscAdd} from 'react-icons/vsc'
import IconBtn from '../../common/IconBtn'
import { useNavigate } from 'react-router-dom'
import { fetchSellerProducts } from '../../../services/operations/productApis'
import ProductTable from './Seller Products/ProductTable'
const MyProducts = () => {
  const navigate = useNavigate()
  const [products,setProducts]=useState([])

  useEffect(()=>{
   const fetchProducts=async()=>{
    const result=await fetchSellerProducts()
    console.log("result ",result)
    if(result){
     setProducts(result)
   }
  }
 fetchProducts()
  },[])
  return (
    <div>
      <div className="mb-14 flex items-center justify-between">
        <h1 className="text-3xl font-medium ">My Products</h1>
        <IconBtn
          text="Add Product"
          onclick={() => navigate("/dashboard/add-product")}
        >
          <VscAdd />
        </IconBtn>
      </div>
      {products && <ProductTable products={products} setProducts={setProducts} />}
    </div>
  )
}

export default MyProducts