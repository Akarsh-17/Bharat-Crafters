import React from 'react'
import { FaCheck } from "react-icons/fa"
import { useSelector } from "react-redux"
import ProductInformation from './ProductInformation/ProductInformation'
import PublishProduct from './PublishProduct'

const RenderSteps = () => {
    const {step}=useSelector((state)=>state.product)
    const steps = [
        {
          id: 1,
          title: "Product Information",
        },
        {
          id: 2,
          title: "Publish",
        },
      ]
  return (
    <>
      <div className='relative mb-2 flex  w-full justify-center'>
       {steps.map((item)=>(
        <>
            <div key={item.id}
             className='flex flex-col items-center'
            >
               <button
                className={`grid cursor-default aspect-square w-9 place-items-center rounded-full border-[1px] 
                 ${
                   step===item.id ? "border-amber-800 bg-amber-400 text-orange-500"
                   : "border-richblack-700 bg-richblack-800 text-richblack-300"
                 }
                `}
               >
                   {
                       step>item.id ?(
                           <FaCheck className="font-bold text-orange-500" />
                       ):(
                           item.id  
                       )
                   }
               </button>
            </div>
            {item.id !== steps.length && (
                <>
                <div
                  className={`h-[calc(34px/2)] w-[70%]  border-dashed border-b-2 ${
                  step > item.id  ? "border-yellow-50" : "border-richblack-500"
                } `}
                ></div>
                </>
            )}
        </>
       ))
       }
       </div>

       <div className='relative flex mb-16 w-full select-none justify-between'>
        {
            steps.map((item)=>(
                <div key={item.id} className='flex min-w-[130px] flex-col items-center gap-y-2'>
                    <p className={`text-sm ${
                    step >= item.id ? "text-orange-500" : "text-richblack-500"
                    }`}>
                        { item.title}
                    </p>
                </div>
            ))
        }
       </div>
       {step===1 && <ProductInformation/>}
       {step===2 && <PublishProduct/>}
    </>
  )
}

export default RenderSteps