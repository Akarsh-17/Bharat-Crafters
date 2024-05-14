import React from 'react'
import RenderSteps from './RenderSteps'

const AddProduct = () => {
  return (
    <>
      <div className="flex w-full items-start gap-x-6">
        <div className='flex flex-col flex-1'> 
          <h1 className="mb-14 text-3xl font-medium text-richblack-600">
            Add Product
          </h1>
          <div className="flex-1 max-w-2xl">
            <RenderSteps/>
          </div>
        </div>
        {/* <div className="sticky top-10 hidden max-w-[400px] flex-1 rounded-md border-[1px] border-richblack-700 bg-amber-100 p-6 xl:block"> */}
        <div className="fixed right-5 z-10 top-30 hidden max-w-[400px] flex-1 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6 xl:block">
          <p className="mb-8 text-lg text-richblack-5">⚡ Product Upload Tips</p>
          <ul className="ml-5 list-item list-disc space-y-4 text-xs text-richblack-5">
            <li>Name of the product should be easily understandble.</li>
            <li>Brand name should be authenticated.</li>
            <li>Select the category first then the field of the subcategory is editable.</li>
            <li>Cannot add more than  4 images.</li>
            <li>
              Standard size for the product image is 640*640.
            </li>
            <li>
            Edit the group field according to the size of products.
            </li>
            <li>Price is according to the product quality.</li>
            <li>Special features and Component section take one input at a time using Add button.</li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default AddProduct