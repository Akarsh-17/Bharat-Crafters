import React, { useState } from 'react'
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table"
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css"
import { PRODUCT_STATUS } from "../../../../utils/constants"
import { FaCheck } from "react-icons/fa"
import { FiEdit2 } from "react-icons/fi"
import { HiClock } from "react-icons/hi"
import { RiDeleteBin6Line } from "react-icons/ri"
import { formatDate } from '../../../../utils/formatDate'

import { useNavigate } from 'react-router-dom'
import { deleteProduct, fetchSellerProducts } from '../../../../services/operations/productApis'
import {FaEye} from 'react-icons/fa'
import ConfirmationModal from '../../../common/ConfirmationModal'
const BASE_URL=process.env.REACT_APP_BASE_URL;

const ProductTable = ({products,setProducts}) => {
    const TRUNCATE_LENGTH = 10
    const [confirmationModal, setConfirmationModal] = useState(null)
    const [loading, setLoading] = useState(false)
    const navigate=useNavigate()
   
    const handleProductDelete = async (productId) => {
      const url=BASE_URL+`/product/deleteProduct/${productId}`
      setLoading(true)
      await deleteProduct(productId,url)
      const result = await fetchSellerProducts()
      if (result) {
        setProducts(result)
      }
      setConfirmationModal(null)
      setLoading(false)
    }  
  return (
    <>
      <Table className="rounded-xl border border-richblack-800 ">
        <Thead>
            <Tr className="flex gap-x-16 rounded-t-md border-b border-b-richblack-800 px-6 py-2">
                <Th className="flex-1 text-left text-sm font-medium uppercase text-amber-600">
                    Product
                </Th>
                <Th className="text-left text-sm font-medium uppercase text-amber-600">
                    Product Id
                </Th>
                <Th className="text-left text-sm font-medium uppercase text-amber-600">
                    Preview
                </Th>
                <Th className="text-left text-sm font-medium uppercase text-amber-600">
                    Sold Out
                </Th>
                <Th className="text-left text-sm font-medium uppercase text-amber-600">
                    Action
                </Th>
            </Tr>
        </Thead>
        <Tbody>
            {
                products?.length ===0?(
                    <Tr>
                        <Td className="py-10 text-center text-2xl font-medium">
                          No Product found
                        </Td>
                  </Tr>
                ):(
                    products?.map((product)=>(
                        <Tr 
                         key={product._id}
                         className="flex gap-x-20 border-b border-richblack-800 px-6 py-8 "
                        >
                            <Td className="flex flex-1 gap-x-3">
                                <img
                                 src={product?.images[0]}
                                 alt={product?.name}
                                 className="h-36 w-56 rounded-lg object-cover"
                                />
                                <div className="flex flex-col justify-between">
                                    <p className="text-lg font-semibold text-amber-700">
                                      {product.name}
                                    </p>
                                    <p className="text-md font-semibold text-amber-400">
                                      Brand:{product.brand}
                                    </p>
                                    <p className="text-xs text-richblack-700">
                                      {product.description.split(" ").length >
                                      TRUNCATE_LENGTH
                                        ? product.description
                                            .split(" ")
                                            .slice(0, TRUNCATE_LENGTH)
                                            .join(" ") + "..."
                                        : product.description}
                                    </p>
                                    <p className="text-[12px] text-amber-400">
                                      Created: {formatDate(product.createdAt)}
                                    </p>
                                    {product.status === PRODUCT_STATUS.DRAFT ? (
                                      <p className="flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-pink-100">
                                        <HiClock size={14} />
                                        Drafted
                                      </p>
                                    ) : (
                                      <p className="flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-yellow-100">
                                        <div className="flex h-3 w-3 items-center justify-center rounded-full bg-yellow-100 text-richblack-700">
                                          <FaCheck size={8} />
                                        </div>
                                        Published
                                      </p>
                                    )}
                               </div>
                            </Td>
                            <Td className="text-sm font-medium">
                            {product?._id.substring(0, 13)}{product?._id.length > 8 && '...'}
                            </Td>
                            <Td className="text-sm font-medium text-richblack-100">
                              <button
                                onClick={() => navigate(`/dashboard/preview-product/${product._id}`)}
                                title="Preview"
                                className="text-[12px] font-medium text-amber-600 flex items-center"
                              >
                                <FaEye size={18} />
                              </button>
                            </Td>
                            <Td className="text-sm font-medium ">
                              {product.sold}
                            </Td>
                            <Td className="text-sm font-medium text-richblack-100 ">
                                <button
                                  disabled={loading}
                                  onClick={() => {
                                    navigate(`/dashboard/edit-product/${product._id}`)
                                  }}
                                  title="Edit"
                                  className="px-2 transition-all duration-200 hover:scale-110 hover:text-caribbeangreen-300"
                                >
                                  <FiEdit2 size={20} />
                                </button>
                                <button
                                  disabled={loading}
                                  onClick={() => {
                                    setConfirmationModal({
                                      text1: "Do you want to delete this Product?",
                                      text2:"All the data related to this Product will be deleted",
                                      btnText1: !loading ? "Delete" : "Loading...  ",
                                      btnText2: "Cancel",
                                      btn1Handler: !loading
                                        ? () => handleProductDelete(product._id)
                                        : () => {},
                                        btn2Handler: !loading
                                        ? () => setConfirmationModal(null)
                                        : () => {},
                                    })
                                  }}
                                  title="Delete"
                                  className="px-1 transition-all duration-200 hover:scale-110 hover:text-[#ff0000]"
                                >
                                  <RiDeleteBin6Line size={20} />
                                </button>
                            </Td>
                        </Tr>
                    ))
                )
            }
        </Tbody>
      </Table>
      {confirmationModal && <ConfirmationModal modal={confirmationModal}/>}
    </>
  )
}

export default ProductTable

// import React, { useState } from 'react'
// import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table"
// import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css"
// import { PRODUCT_STATUS } from "../../../../utils/constants"
// import { FaCheck, FaEye } from "react-icons/fa"
// import { FiEdit2 } from "react-icons/fi"
// import { HiClock } from "react-icons/hi"
// import { RiDeleteBin6Line } from "react-icons/ri"
// import { formatDate } from '../../../../utils/formatDate'
// import ConfirmationModal from '../../../common/ConfirmationModal'
// import { useNavigate } from 'react-router-dom'
// import { deleteProduct, fetchSellerProducts } from '../../../../services/operations/productApis'

// const ProductTable = ({products, setProducts}) => {
//     const TRUNCATE_LENGTH = 10
//     const [confirmationModal, setConfirmationModal] = useState(null)
//     const [loading, setLoading] = useState(false)
//     const navigate=useNavigate()
  
//     const handleProductDelete = async (productId) => {
//       setLoading(true)
//       await deleteProduct(productId)
//       const result = await fetchSellerProducts()
//       if (result) {
//         setProducts(result)
//       }
//       setConfirmationModal(null)
//       setLoading(false)
//     }  

//     return (
//         <>
//             <Table className="rounded-xl border border-richblack-800 ">
//                 <Thead>
//                     <Tr className="flex gap-x-16 rounded-t-md border-b border-b-richblack-800 px-6 py-2">
//                         <Th className="flex-1 text-left text-sm font-medium uppercase text-amber-600">
//                             Product
//                         </Th>
//                         <Th className="text-left text-sm font-medium uppercase text-amber-600">
//                             Product Id
//                         </Th>
//                         <Th className="text-left text-sm font-medium uppercase text-amber-600">
//                             Preview
//                         </Th>
//                         <Th className="text-left text-sm font-medium uppercase text-amber-600">
//                             Sold Out
//                         </Th>
//                         <Th className="text-left text-sm font-medium uppercase text-amber-600">
//                             Action
//                         </Th>
//                     </Tr>
//                 </Thead>
//                 <Tbody>
//                     {products?.length === 0 ? (
//                         <Tr>
//                             <Td className="py-10 text-center text-2xl font-medium" colSpan="5">
//                                 No Product found
//                             </Td>
//                         </Tr>
//                     ) : (
//                         products?.map((product)=>(
//                             <Tr 
//                                 key={product._id}
//                                 className="flex gap-x-14 border-b border-richblack-800 px-6 py-8"
//                             >
//                                 <Td className="flex flex-1 gap-x-3 items-center">
//                                     <img
//                                         src={product?.images[0]}
//                                         alt={product?.name}
//                                         className="h-[148px] w-[220px] rounded-lg object-cover"
//                                     />
//                                     <div>
//                                         <p className="text-lg font-semibold text-amber-700">
//                                             {product.name}
//                                         </p>
//                                         <p className="text-xs text-richblack-300">
//                                             {product.description.split(" ").length >
//                                             TRUNCATE_LENGTH
//                                             ? product.description
//                                                 .split(" ")
//                                                 .slice(0, TRUNCATE_LENGTH)
//                                                 .join(" ") + "..."
//                                             : product.description}
//                                         </p>
//                                         <p className="text-[12px] text-amber-400">
//                                             Created: {formatDate(product.createdAt)}
//                                         </p>
//                                         {product.status === PRODUCT_STATUS.DRAFT ? (
//                                             <p className="flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-pink-100">
//                                                 <HiClock size={14} />
//                                                 Drafted
//                                             </p>
//                                         ) : (
//                                             <p className="flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-yellow-100">
//                                                 <div className="flex h-3 w-3 items-center justify-center rounded-full bg-yellow-100 text-richblack-700">
//                                                     <FaCheck size={8} />
//                                                 </div>
//                                                 Published
//                                             </p>
//                                         )}
//                                     </div>
//                                 </Td>
//                                 <Td className="text-sm font-medium text-richblack-100 ">
//                                   {product?._id.substring(0, 12)}{product?._id.length > 8 && '...'}
//                                 </Td>
//                                 <Td className="text-sm font-medium text-richblack-100">
//                                     <button
//                                         onClick={() => navigate(`/dashboard/preview-product/${product._id}`)}
//                                         title="Preview"
//                                         className="text-[12px] font-medium text-amber-600 flex items-center"
//                                     >
//                                         <FaEye size={18} />
//                                     </button>
//                                 </Td>
//                                 <Td className="text-sm font-medium text-richblack-100">
//                                     0
//                                 </Td>
//                                 <Td className="text-sm font-medium text-richblack-100 space-x-2">
//                                     <button
//                                         disabled={loading}
//                                         onClick={() => navigate(`/dashboard/edit-product/${product._id}`)}
//                                         title="Edit"
//                                         className="text-[12px] font-medium text-amber-600 flex items-center"
//                                     >
//                                         <FiEdit2 size={18} />
//                                     </button>
//                                     <button
//                                         disabled={loading}
//                                         onClick={() => {
//                                             setConfirmationModal({
//                                                 text1: "Do you want to delete this Product?",
//                                                 text2: "All the data related to this Product will be deleted",
//                                                 btn1Text: !loading ? "Delete" : "Loading...  ",
//                                                 btn2Text: "Cancel",
//                                                 btn1Handler: !loading
//                                                     ? () => handleProductDelete(product._id)
//                                                     : () => {},
//                                                 btn2Handler: !loading
//                                                     ? () => setConfirmationModal(null)
//                                                     : () => {},
//                                             })
//                                         }}
//                                         title="Delete"
//                                         className="text-[12px] font-medium text-amber-600 flex items-center"
//                                     >
//                                         <RiDeleteBin6Line size={18} />
//                                     </button>
//                                 </Td>
//                             </Tr>
//                         ))
//                     )}
//                 </Tbody>
//             </Table>
//             {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
//         </>
//     )
// }

// export default ProductTable
