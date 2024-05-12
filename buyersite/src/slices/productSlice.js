import { createSlice } from "@reduxjs/toolkit";

const initialState={
    step:1,
    product:null,
    editProduct:false,
    // loading:false
    // paymentLoading:false
}

const productSlice = createSlice({
        name:"product",
        initialState,
        reducers:{
            setStep: (state, action) => {
                state.step = action.payload
            },
            setProduct: (state, action) => {
                state.product = action.payload
            },
            setEditProduct: (state, action) => {
              state.editProduct = action.payload
            },
            // setPaymentLoading: (state, action) => {
            //   state.paymentLoading = action.payload
            // },
            resetProductState: (state) => {
              state.step = 1
              state.product = null
              state.editProduct = false
            },
            // setLoading:(state,action)=>{
            //     state.loading=action.payload
            // }
        }
})

export const {
    setStep,
    setProduct,
    setEditProduct,
    resetProductState,
    // setLoading,
} = productSlice.actions

export default productSlice.reducer