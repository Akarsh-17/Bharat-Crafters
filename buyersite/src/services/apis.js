const BASE_URL=process.env.REACT_APP_BASE_URL;

export const authEndPoints={
    SEND_OTP:BASE_URL+'/auth/sendOTP',
    LOGIN_SELLER:BASE_URL+'/auth/loginSeller',
    SIGNUP_SELLER:BASE_URL+'/auth/signupSeller  ',
}


export const categoryEndPoints={
    SHOW_CATEGORIES:BASE_URL+'/category/showAllCategories'
}

// export const subCategoryEndPoint={
//    SHOW_SUBCATEGORIES:BASE_URL+`/category/showSubCategories/:id`
// }

export const productEndPoints={
    CREATE_PRODUCT:BASE_URL+'/product/addProduct',
    EDIT_PRODUCT:BASE_URL+'/product/editProduct',
    GET_ALL_SELLER_PRODUCTS_API:BASE_URL+'/product/getSellerProducts',
    DELETE_PRODUCT:BASE_URL+'/product/deleteProduct/:id',
    GET_FULL_PRODUCT_DETAILS:BASE_URL+'/product/getFullProductDetails/:id'
}