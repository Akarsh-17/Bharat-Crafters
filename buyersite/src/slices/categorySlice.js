import { createSlice } from "@reduxjs/toolkit";

const initialState={
    category:null,
}

const categorySlice = createSlice({
    name: "category",
    initialState: initialState,
    reducers: {
      setCategory(state, value) {
        state.category = value.payload
      },
    },
  })
  
  export const { setCategory } = categorySlice.actions
  
  export default categorySlice.reducer


// const url=BASE_URL+`/category/showSubCategories/${categoryId}`
// const subCategories=await showSubCategories(categoryId,url)
