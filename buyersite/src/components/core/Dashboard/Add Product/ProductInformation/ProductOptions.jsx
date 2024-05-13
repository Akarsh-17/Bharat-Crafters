import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast'
const ProductOptions = ({
  register,
  errors,
  setValue,
  getValues,
}) => {
  const {editProduct,product}=useSelector((state)=>state.product)
  const [options,setOptions] =useState([])
  const [option,setOption]=useState({
    size:"",
    price:0,
    noOfPieces:0,
    color:[]
  })
  
  useEffect(()=>{
    if(editProduct){
      setOptions(product?.options)
    }
    register("options",{required:true})

    
  },[])

  useEffect(()=>{
    setValue("options",options)
  },[options])

  // console.log("register ",getValues("options"))

  const handleAdd=()=>{
    if (!option.size || !option.price || !option.noOfPieces || option.color.length === 0) {
      toast.error("All fields are required");
      return;
    }
    const price = parseInt(option.price);
    if (price <= 0) {
      toast.error("Price can not be less than 0");
      return;
    }

    const oty = parseInt(option.noOfPieces);
    if (oty <= 0) {
      toast.error("No, Of Pieces can not be less than 0");
      return;
    }
    

  
    setOptions(prev => [...prev, option]);
    setOption({
      size: "",
      price: 0,
      noOfPieces: 0,
      color: [],
    })

  }
  
  const handleRemoveOption=(index)=>{
    const updatedOptions=[...options]
    updatedOptions.splice(index,1)
    setOptions(updatedOptions)
  }
  return (
    <div className='flex flex-col gap-y-2'>
      <div className='flex gap-x-2 items-start'>
      <button
          type="button"
          className=" text-lg mt-5"
          onClick={handleAdd}
          style={{background:"#0ead69",color: "white",borderRadius:"5px",padding:"4px",fontFamily:"sans-serif"}}
        >
          Add Group
      </button>

      {/* size */}
      <div className='flex flex-col space-y-2 w-1/4'>
       <label className="text-sm " htmlFor="size">
         Size <sup className="text-pink-200">*</sup>
       </label>
       <input
        id='size'
        type='text'
        pattern='^[A-Za-z\s]+$'
        value={option.size}
        onChange={(e) => setOption({ ...option, size: e.target.value })}
        className='form-style w-full'
        />
       {
         errors.options && errors.options.size && (
           <span className="ml-2 text-xs tracking-wide text-pink-200">
                 Product size is required
             </span>
         )
        }
      </div>

      {/* price */}
      <div className='flex flex-col space-y-2 w-1/4'>
       <label className="text-sm " htmlFor="price">
         Price <sup className="text-pink-200">*</sup>
       </label>
       <input
        id='price'
        type='number'
        value={option.price}
        onChange={(e) => setOption({ ...option, price: e.target.value })}
        className='form-style w-full'
        />
       {
         errors.options && errors.options.price && (
           <span className="ml-2 text-xs tracking-wide text-pink-200">
                 Product price is required
             </span>
         )
        }
      </div>


      {/* noOfPieces */}
      <div className='flex flex-col space-y-2 w-1/4'>
       <label className="text-sm " htmlFor="noOfPieces">
         Qty. <sup className="text-pink-200">*</sup>
       </label>
       <input
        id='noOfPieces'
        type='number'
        value={option.noOfPieces}
        onChange={(e) => setOption({ ...option, noOfPieces: e.target.value })}
        className='form-style w-full'
        />
       {
         errors.options && errors.options.noOfPieces && (
           <span className="ml-2 text-xs tracking-wide text-pink-200">
                 Product Quantity is required
             </span>
         )
        }
      </div> 
      
      <div className='flex flex-col space-y-2 w-1/4'>
       <label className="text-sm " htmlFor="color">
         Color <sup className="text-pink-200">*</sup>
       </label>
       <input
         id='color'
         type='text'
         pattern='^[A-Za-z\s\,]+$'
         value={option.color.join(',')}
         onChange={(e) => setOption({ ...option, color: e.target.value.split(',') })}
         className='form-style w-full'
        />
       {
         errors.options && errors.options.color && (
           <span className="ml-2 text-xs tracking-wide text-pink-200">
                 Product Colour is required
             </span>
         )
        }
      </div> 
      </div>
      <div>
        {options?.length > 0 && (
          <ul className="flex flex-col gap-y-4 mt-2 list-inside list-disc">
            {options.map((option, index) => (
              <li key={index} className="flex items-start text-richblack-700">
                <div>
                  <div>Size: {option.size}</div>
                  <div>Price: {option.price}</div>
                  <div>Color: {option.color.join(', ')}</div>
                  <div>Number of Pieces: {option.noOfPieces}</div>
                </div>
                <button
                  type="button"
                  className="ml-2 text-lg text-orange-500 "
                  onClick={() => handleRemoveOption(index)}
                >
                  clear
                </button>
              </li>
            ))}
          </ul>
        )
        }
      </div>
    </div>
  )
}

export default ProductOptions


{/* <ColorField
       name="options.color"
       label="Color"
       register={register}
       setValue={setValue}
       errors={errors}
       getValues={getValues}
       placeholder="can be multiple"
       id="color"
      /> */}


      // register("options.size",{required:true,})
    // register("options.price",{required:true,valueAsNumber:true,min:1,})
    // register("options.noOfPieces",{required:true,valueAsNumber:true,min:1,})
    // register("options.color", { required: true, validate: (value) => value.length > 0 })