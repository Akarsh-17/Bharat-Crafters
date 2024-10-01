import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { MdNavigateNext } from "react-icons/md";
import {
  resetProductState,
  setProduct,
  setStep,
} from "../../../../../slices/productSlice";
import StringField from "./StringField";
import { showCategories } from "../../../../../services/operations/categoryApis";
import Upload from "./Upload";
import ProductOptions from "./ProductOptions";
import IconBtn from "../../../../common/IconBtn";
import { PRODUCT_STATUS } from "../../../../../utils/constants";
import toast from "react-hot-toast";
import {
  createProductDetails,
  editProductDetails,
} from "../../../../../services/operations/productApis";
import { useNavigate } from "react-router-dom";

const ProductInformation = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const user = useSelector((state) => state.auth.currentUser);
  const { product, editProduct } = useSelector((state) => state.product);

  useEffect(() => {
    const getCategories = async () => {
      setLoading(true);
      const categories = await showCategories();
      if (categories?.length > 0) {
        setCategories(categories);
      }
      setLoading(false);
    };

    getCategories();
  }, []);

  useEffect(() => {
    if (editProduct && product) {
      setValue("name", product.name);
      setValue("brand", product.brand);
      setValue("description", product.description);
      setValue("weight", product.weight);
      setValue("material", product.material);
      setValue("shape", product.shape);
      setValue("height", product.height);
      setValue("width", product.width);
      setValue("length", product.length);
      setValue("pattern", product.pattern);
      setValue("style", product.style);
      setValue("specialFeatures", product.specialFeatures);
      setValue("components", product.components);
      setValue("images", product.images);
      setValue("specialFeatures", product.specialFeatures);
      setValue("category", product.category?._id);
      setSubCategories(product?.category?.subCategory);
      setValue("subCategory", product.subCategory._id);
      console.log(product.subCategory);
      console.log(getValues("subCategory"));
    }
    console.log("editProduct:", editProduct);
    console.log("product:", product);
  }, [editProduct, product, categories, setValue]);

  const isFormUpdated = () => {
    const currentValues = getValues();
    if (
      currentValues.name !== product.name ||
      currentValues.brand !== product.brand ||
      currentValues.description !== product.description ||
      currentValues.subCategory._id !== product.subCategory._id ||
      currentValues.category._id !== product.category._id ||
      currentValues.weight !== product.weight ||
      currentValues.material !== product.material ||
      currentValues.shape !== product.shape ||
      currentValues.height !== product.height ||
      currentValues.width !== product.width ||
      currentValues.length !== product.length ||
      currentValues.pattern !== product.pattern ||
      currentValues.style !== product.style ||
      currentValues.length !== product.length ||
      currentValues.specialFeatures.toString() !==
        product.specialFeatures.toString() ||
      currentValues.components.toString() !== product.components.toString() ||
      currentValues.options.toString() !== product.options.toString() ||
      currentValues.images.toString() !== product.images.toString()
    ) {
      return true;
    }
    return false;
  };

  const handleCategoryChange = async (e) => {
    setSubCategories();

    setValue("subCategory", "");

    setValue("category", e.target.value);
    console.log("skldfjdslkjfdskjf: ", e.target.value);
    const categoryId = getValues("category");

    setLoading(true);
    const selectedCategory = categories.find(
      (category) => category._id === e.target.value
    );
    const subCategories = selectedCategory.subCategory;

    setSubCategories(subCategories);

    setLoading(false);
  };

  const onSubmit = async (data) => {
    console.log(data);

    if (editProduct) {
      if (isFormUpdated()) {
        const currentValues = getValues();
        const formData = new FormData();

        formData.append("productId", product._id);
        if (currentValues.name !== product.name) {
          formData.append("name", data.name);
        }
        if (currentValues.brand !== product.brand) {
          formData.append("brand", data.brand);
        }
        if (currentValues.description !== product.description) {
          formData.append("description", data.description);
        }
        if (currentValues.weight !== product.weight) {
          formData.append("weight", data.weight);
        }
        if (currentValues.material !== product.material) {
          formData.append("material", data.material);
        }
        if (currentValues.shape !== product.shape) {
          formData.append("shape", data.shape);
        }
        if (currentValues.height !== product.height) {
          formData.append("height", data.height);
        }
        if (currentValues.width !== product.width) {
          formData.append("width", data.width);
        }
        if (currentValues.length !== product.length) {
          formData.append("length", data.length);
        }
        if (currentValues.pattern !== product.pattern) {
          formData.append("pattern", data.pattern);
        }
        if (currentValues.style !== product.style) {
          formData.append("style", data.style);
        }
        if (
          currentValues.specialFeatures.toString() !==
          product.specialFeatures.toString()
        ) {
          formData.append(
            "specialFeatures",
            JSON.stringify(data.specialFeatures)
          );
        }
        if (
          currentValues.components.toString() !== product.components.toString()
        ) {
          formData.append("components", JSON.stringify(data.components));
        }
        if (currentValues.options.toString() !== product.options.toString()) {
          formData.append("options", JSON.stringify(data.options));
        }
        if (currentValues.images.toString() !== product.images.toString()) {
          data.images.forEach((image) => {
            formData.append("images", image);
          });
        }
        if (currentValues.subCategory._id !== product.subCategory._id) {
          formData.append("subCategory", data.subCategory);
        }
        if (currentValues.category._id !== product.category._id) {
          formData.append("category", data.category);
        }
        // console.log("Edit Form data: ", formData)
        setLoading(true);
        const result = await editProductDetails(formData);
        setLoading(false);
        if (result) {
          dispatch(setStep(2));
          dispatch(setProduct(result));
        }
      } else {
        toast.error("No changes Made");
      }
      return;
    }

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("brand", data.brand);
    formData.append("description", data.description);
    formData.append("weight", data.weight);
    formData.append("material", data.material);
    formData.append("shape", data.shape);
    formData.append("height", data.height);
    formData.append("width", data.width);
    formData.append("length", data.length);
    formData.append("pattern", data.pattern);
    formData.append("style", data.style);
    formData.append("specialFeatures", JSON.stringify(data.specialFeatures));
    formData.append("components", JSON.stringify(data.components));
    formData.append("options", JSON.stringify(data.options));
    data.images.forEach((image) => {
      formData.append("images", image);
    });
    formData.append("status", PRODUCT_STATUS.DRAFT);
    formData.append("subCategory", data.subCategory);
    formData.append("category", data.category);
    setLoading(true);
    const result = await createProductDetails(formData);
    if (result) {
      dispatch(setStep(2));
      dispatch(setProduct(result));
    }
    setLoading(false);
    // console.log(formData)
    // console.log(formData.get("name"));
  };
  const navigate = useNavigate();
  const goToProduct = () => {
    dispatch(resetProductState());
    navigate("/dashboard/my-products");
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8 rounded-md border-[1px] border-richblack-100 bg-richblack-100 p-6"
    >
      <div className="flex flex-col space-y-2">
        <label htmlFor="name" className="text-sm">
          Product Name <sup className="text-pink-200">*</sup>
        </label>
        <input
          id="name"
          placeholder="Enter Product Title"
          {...register("name", { required: true })}
        />
        {errors.name && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Product name is required
          </span>
        )}
      </div>

      <div className="flex flex-col space-y-2">
        <label htmlFor="brand" className="text-sm">
          Product Brand <sup className="text-pink-200">*</sup>
        </label>
        <input
          id="brand"
          placeholder="Enter Product Brand"
          {...register("brand", { required: true })}
          className="form-style w-full"
        />
        {errors.brand && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Product brand is required
          </span>
        )}
      </div>

      <div className="flex flex-col space-y-2">
        <label className="text-sm" htmlFor="description">
          Product Description <sup className="text-pink-200">*</sup>
        </label>
        <textarea
          id="description"
          placeholder="Enter Description"
          {...register("description", { required: true })}
          className="form-style resize-x-none min-h-[130px] w-full"
        />
        {errors.description && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Product Description is required
          </span>
        )}
      </div>
      {console.log("1 ", getValues("category"))}
      {console.log("2 ", getValues("subCategory"))}
      {/* category not to included in form just for fetching category */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm" htmlFor="category">
          Product Category <sup className="text-pink-200">*</sup>
        </label>
        <select
          {...register("category", { required: true })}
          // defaultValue={editProduct && product ? product?.category._id : ""}
          id="category"
          className="form-style w-full"
          onChange={handleCategoryChange}
        >
          <option value="" disabled>
            Choose category
          </option>
          {/* {
                  editProduct && product && (!loading && (
                    
                    categories?.map((category,index)=>(
                        <option key={index} value={product?.category._id} selected={product?.category._id === category._id}>
                            {category.name} 
                        </option>
                    ))
                ))
                }
                {
                    !loading && (
                        categories?.map((category,index)=>(
                            <option key={index} value={category._id}>
                                {category.name} 
                            </option>
                        ))
                    )
                } */}
          {/* {editProduct && product && !loading
            ? categories?.map((category, index) => (
                <option
                  key={index}
                  value={category._id}
                  selected={product?.category._id === category._id}
                >
                  {category.name}
                </option>
              ))
            : categories?.map((category, index) => (
                <option key={index} value={category._id}>
                  {category.name}
                </option>
              ))} */}
          {!loading &&
            categories?.map((category, index) => (
              <option key={index} value={category._id}>
                {category.name}
              </option>
            ))}
        </select>
        {errors.category && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Please select a category
          </span>
        )}
      </div>
      {console.log("3 ", getValues("category"))}
      {console.log("4 ", getValues("subCategory"))}
      {/* subCategories */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm" htmlFor="subCategory">
          Product Sub Category <sup className="text-pink-200">*</sup>
        </label>
        <select
          {...register("subCategory", { required: true })}
          defaultValue=""
          id="subCategory"
          className="form-style w-full"
          disabled={!getValues("category")}
        >
          {console.log("5 ", getValues("category"))}
          {console.log("6 ", getValues("subCategory"))}
          <option value="" disabled>
            Choose Sub Category
          </option>

          {!loading && subCategories?.length > 0 ? (
            subCategories?.map((subcategory) => (
              <option key={subcategory._id} value={subcategory._id}>
                {subcategory.name}
              </option>
            ))
          ) : (
            <option disabled>no sub category found</option>
          )}
        </select>
        {errors.subCategory && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Please select a category first
          </span>
        )}
      </div>

      {/* special features */}
      <StringField
        name="specialFeatures"
        label="Special Features"
        register={register}
        setValue={setValue}
        errors={errors}
        getValues={getValues}
        placeholder="Key attraction Points"
      />

      {/* components */}
      <StringField
        name="components"
        label="Components"
        register={register}
        setValue={setValue}
        errors={errors}
        getValues={getValues}
        placeholder="enter quantity also"
      />

      {/* photos size 640*640 and less than 300kb */}
      <Upload
        name="images"
        label="Product Images"
        register={register}
        setValue={setValue}
        errors={errors}
        editData={editProduct ? product?.images : null}
      />

      {/* material */}
      <div className="flex flex-col space-y-2">
        <label htmlFor="material" className="text-sm">
          Product Material
        </label>
        <input
          id="material"
          placeholder="Enter Product Material"
          {...register("material")}
          className="form-style w-full"
        />
      </div>

      {/* weight */}
      <div className="flex flex-col space-y-2">
        <label htmlFor="weight" className="text-sm">
          Product Weight <sup className="text-pink-200">*</sup>
        </label>
        <input
          id="weight"
          type="number"
          step="any"
          placeholder="Enter Product Weight in Kgs"
          {...register("weight", { required: true, valueAsNumber: true })}
          className="form-style w-full"
        />
        {errors.weight && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Product Weight is required
          </span>
        )}
      </div>

      {/* shape */}
      <div className="flex flex-col space-y-2">
        <label htmlFor="shape" className="text-sm">
          Product Shape
        </label>
        <input
          id="shape"
          type="text"
          placeholder="Enter Product Shape"
          {...register("shape")}
          className="form-style w-full"
        />
      </div>

      {/* style */}
      <div className="flex flex-col space-y-2">
        <label htmlFor="style" className="text-sm">
          Product Style
        </label>
        <input
          id="style"
          type="text"
          placeholder="Enter Product Style"
          {...register("style")}
          className="form-style w-full"
        />
      </div>

      {/* height */}
      <div className="flex flex-col space-y-2">
        <label htmlFor="height" className="text-sm">
          Product Height
        </label>
        <input
          id="height"
          type="number"
          step="any"
          placeholder="Enter Product Height in cm(s)"
          {...register("height", { valueAsNumber: true })}
          className="form-style w-full"
        />
      </div>

      {/* width */}
      <div className="flex flex-col space-y-2">
        <label htmlFor="width" className="text-sm">
          Product Width
        </label>
        <input
          id="width"
          type="number"
          step="any"
          placeholder="Enter Product Width in cm(s)"
          {...register("width", { valueAsNumber: true })}
          className="form-style w-full"
        />
      </div>

      {/* length */}
      <div className="flex flex-col space-y-2">
        <label htmlFor="length" className="text-sm">
          Product Length
        </label>
        <input
          id="length"
          type="number"
          step="any"
          placeholder="Enter Product Length in cm(s)"
          {...register("length", { valueAsNumber: true })}
          className="form-style w-full"
        />
      </div>

      {/* pattern */}
      <div className="flex flex-col space-y-2">
        <label htmlFor="pattern" className="text-sm">
          Product Pattern
        </label>
        <input
          id="pattern"
          placeholder="Enter Product Pattern"
          {...register("pattern")}
          className="form-style w-full"
        />
      </div>

      <ProductOptions
        register={register}
        setValue={setValue}
        errors={errors}
        getValues={getValues}
      />

      {/* Next Button */}
      <div className="flex justify-end gap-x-2">
        {editProduct && (
          <div className="flex gap-x-1">
            <button
              onClick={() => dispatch(setStep(2))}
              disabled={loading}
              className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
            >
              Continue Wihout Saving
            </button>
            <button
              disabled={loading}
              onClick={() => goToProduct()}
              className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
            >
              Cancel Edit
            </button>
          </div>
        )}
        <IconBtn
          disabled={loading}
          text={!editProduct ? "Next" : "Save Changes"}
        >
          <MdNavigateNext />
        </IconBtn>
      </div>
    </form>
  );
};

export default ProductInformation;
