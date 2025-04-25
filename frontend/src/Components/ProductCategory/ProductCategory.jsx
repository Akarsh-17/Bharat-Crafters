import "./ProductCategory.css";
import React, { useEffect, useState } from "react";
import add_to_wishlist from "../../Images/heart.png";
import added_to_wishlist from "../../Images/heart (1).png";
import close_button from "../../Images/close.png";
import category_search_icon from "../../Images/icons8-search-30.png";
import PriceSlider from "../Sliders/PriceSlider.jsx";
import Header from "../Header/Header.jsx";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setProductId } from "../store/slices/ProductIdSlice.js";
import {
  setWishlistProduct,
  removeWishlistProduct,
} from "../store/slices/WishlistSlice.js";
import { useParams } from "react-router-dom";
import { setCategoryId } from "../store/slices/CategoryIdSlice.js";
import toast from "react-hot-toast";
import { ShoppingCartOutlined } from "@mui/icons-material";
import { addToCart } from "../store/slices/cartSlice.js";

const ProductCategory = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { categoryId } = useParams();
  // const [Wishlist, setWishlist] = useState([]);
  const [CategoryIdForAPI, setCategoryIdForAPI] = useState(0);
  const [CategoryDetailsArray, setCategoryDetailsArray] = useState([]);
  const [SubCategoryDetailsArray, setSubCategoryDetailsArray] = useState([]);
  const [SubCategoryData, setSubCategoryData] = useState([]);
  const [SubCategoryDataExists, setSubCategoryDataExists] = useState(false);
  const [Filter, setFilter] = useState(false);
  const [isLoading, setisLoading] = useState(true);

  const CategoryId = useSelector((state) => state.CategoryId.CategoryId);
  const buyerWishlist = useSelector((state) => state.Wishlist.Wishlist);
  const CurrentUser = useSelector((state) => state.CurrentUser.CurrentUser);
  const loginCart = () => toast("Login to add product to Cart.");
  const buyer = useSelector((state) => state.CurrentUser.CurrentUser)
  const BASE_URL = process.env.REACT_APP_API_URL
  // changes
  useEffect(() => {
    dispatch(setCategoryId(categoryId));
    //   check if required Akarsh has doubt
    //   dispatch(setProductId(null))
  }, []);

  useEffect(() => {
    console.log("updating redux in effect ", buyerWishlist);
    const backendupdate = async () => {
      await axios
        .post(
          `${BASE_URL}/auth/buyerWishList`,
          { buyerWishlist },
          { withCredentials: true }
        )
        .then((res) => {
          console.log("wishilist for user ", res);
        })
        .catch((error) => {
          console.log("error for buyer wishlist", error);
        });
    };
    backendupdate();
  }, [buyerWishlist]);

  const handle_add_Towishlist = async (product) => {
    if (CurrentUser === null) {
      return toast.error("user not logged in");
    }
    dispatch(setWishlistProduct(product));

    // console.log("upating redux",buyerWishlist)
  };

  const addProductToCart = (product, selectedOption, selectedColor, selectedPrice, selectedSize) => {
    if (!buyer) {
      loginCart();
      return;
    }
    dispatch(
      addToCart({
        ...product,
        selectedOption,
        selectedColor,
        selectedPrice,
        selectedSize,
        selectedQuantity: 1,
      })
    )
  }


  const isWishlisted = (productId) => {
    return buyerWishlist.some((product) => product._id === productId);
  };
  const [Price, setPrice] = useState(2000);
  const handlePrice = (event, newPrice) => {
    console.log("hello");
    setPrice(newPrice);

  };

  const filterPrice = async () => {
    try {
      console.log("Price to filter:", Price);
      const response = await axios.get(
        `${BASE_URL}/category/filterPriceCategory/${categoryId}`,
        {
          params: { maxPrice: Price },
          withCredentials: true,
        }
      );

      const formattedData =
      {
        name: `Products under Rs. ${Price}`,
        product: response.data,
      };


      console.log("Formatted subcategory data:", formattedData);

      setSubCategoryData(formattedData);
      setSubCategoryDataExists(true);
      setFilter(true);
    } catch (error) {
      console.error("Error filtering categories:", error);
    }
  };



  // const filterPriceForSubcategory = async () => {
  //   try {
  //     console.log("Price to filter:", Price);
  //     setShowSubmit(false);
  //     setIsEditable(false);
  //     const response = await axios.get(
  //       `${BASE_URL}/category/filterPriceSubCategory/${subcategoryId}`,
  //       {
  //         params: { maxPrice: Price },
  //         withCredentials: true,
  //       }
  //     );

  //     const formattedData = 
  //       {
  //         name: `Products under Rs. ${Price}`,
  //         product: response.data, 
  //       };


  //     console.log("Formatted subcategory data:", formattedData);

  //     setSubCategoryData(formattedData);
  //     setSubCategoryDataExists(true);
  //     setFilter(true);
  //   } catch (error) {
  //     console.error("Error filtering categories:", error);
  //   }
  // };


  const [hoveredImageIndex, setHoveredImageIndex] = useState({});

  const handleMouseEnter = (productIndex, imageIndex) => {
    setHoveredImageIndex((prevIndex) => ({
      ...prevIndex,
      [productIndex]: imageIndex,
    }));
  };

  const handleMouseLeave = (productIndex, imageIndex) => {
    setHoveredImageIndex((prevIndex) => ({
      ...prevIndex,
      [productIndex]: imageIndex,
    }));
  };



  const getCategoryData = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/category/categoryPageDetails/${CategoryIdForAPI}`,
        {
          withCredentials: true,
        }
      );
      const subCategoryDetails =
        response.data.data.selectedCategory.subCategory;
      setSubCategoryDetailsArray(subCategoryDetails);

      const categoryDetails = response.data.data.selectedCategory;

      console.log(categoryDetails);

      setCategoryDetailsArray(categoryDetails);
      setisLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const getSubcategory = async (SubCategoryIdForAPI) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/category/subCategoryPageDetails/${SubCategoryIdForAPI}`,
        {
          withCredentials: true,
        }
      );
      const subCategoryDetails = response.data.data;

      setSubCategoryData(subCategoryDetails);

      console.log(subCategoryDetails);

      setSubCategoryDataExists(true);
      setFilter(true);
    } catch (error) {
      console.error(error);
    }
  };


  const handleRemoveFilter = () => {
    setFilter(false);
    setSubCategoryDataExists(false);
    setPrice(2000);
  };

  useEffect(() => {
    if (CategoryId !== undefined) {
      setCategoryIdForAPI(CategoryId);
    }
  }, [CategoryId]);

  useEffect(() => {
    getCategoryData();
  }, [CategoryIdForAPI]);

  function renderSkeletons(count) {
    const skeletons = [];
    for (let i = 0; i < count; i++) {
      skeletons.push(<div key={i} className="product-card-empty"></div>);
    }

    return skeletons;
  }

  return (
    <>
      <Header />

      {/* For loading */}
      {isLoading ? (
        <>
          <div className="product-category-container">
            <div className="product-filter-empty-container"></div>
            <div className="product-display-container">
              <div className="product-category-empty-heading"></div>

              <div className="product-empty-container">
                {renderSkeletons(8)}
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* When loading finishes */}
          <div className="product-category-container">
            <div className="product-filter-container">
              <div className="filter-heading-container">
                <div className="filter-heading">FILTERS</div>
                <div className="clear-all-filters" onClick={() => {
                          handleRemoveFilter();
                        }}>CLEAR ALL</div>
              </div>
              <hr></hr>
              <div className="sub-category-container">
                <div className="sub-category-heading-container">
                  <div className="sub-category-heading">SUBCATEGORIES</div>
                </div>
                <ul className="sub-category-name">
                  {SubCategoryDetailsArray.length > 0 &&
                    SubCategoryDetailsArray.map((subcategory, key) => (
                      <li key={key}
                        onClick={() => {
                          getSubcategory(subcategory._id);
                        }}
                      >
                        {subcategory.name}
                      </li>
                    ))}
                </ul>
              </div>
              <hr></hr>
              <div className="price-range-container">
                <div className="price-range-heading">PRICE</div>

                {/* Slider */}
                <PriceSlider
                  value={Price}
                  onChange={handlePrice}
                />
                <button className="submit-button" onClick={filterPrice}>
                  Set Price
                </button>
              </div>
            </div>


            <div className="product-display-container">
              {/* if subcategory filter is applied, only then this code will work */}

              {SubCategoryDataExists ? (
                <>
                  <div className="product-category-heading">
                    {CategoryDetailsArray.name}
                  </div>
                  {Filter ? (
                    <div className="filter-applied-container">
                      <div className="filter-name">{SubCategoryData.name}</div>
                      <img
                        className="filter-remove-icon"
                        src={close_button}
                        onClick={() => {
                          handleRemoveFilter();
                        }}
                      ></img>
                    </div>
                  ) : (
                    ""
                  )}
                  <div className="product-container">
                    {SubCategoryData.product.length > 0 &&
                      SubCategoryData.product.map((product, productIndex) => (
                        <div className="product-card" key={product._id}>
                          <div className="product-image-container">
                            {product.images.map((image, imageIndex) => (
                              <img
                                onClick={() => {
                                  dispatch(setProductId(product._id));
                                  navigate(`/products/${product._id}`);
                                }}
                                key={imageIndex}
                                className={`product-image ${imageIndex === hoveredImageIndex[product._id]
                                    ? "product-image-hidden"
                                    : ""
                                  }`}
                                src={
                                  imageIndex === hoveredImageIndex[product._id]
                                    ? product.images[
                                    (imageIndex + 1) % product.images.length
                                    ]
                                    : image
                                }
                                onMouseEnter={() => {
                                  handleMouseEnter(product._id, imageIndex);
                                }}
                                onMouseLeave={() => {
                                  handleMouseLeave(product._id);
                                }}
                              />
                            ))}
                            <button
                              className="add-to-wishlist-icon"
                              onClick={() => {
                                handle_add_Towishlist(product);
                              }}
                            >
                              <img
                                src={
                                  isWishlisted(product._id)
                                    ? added_to_wishlist
                                    : add_to_wishlist
                                }
                                alt="wishlist"
                              ></img>
                            </button>
                          </div>
                          <div className="product-name-container">
                            <div className="product-name-and-price">
                              <div
                                className="product-name-detail"
                                key={product._id}
                                onClick={() => {
                                  dispatch(setProductId(product._id));
                                  navigate(`/products/${product._id}`);
                                }}
                              >
                                {product.name}
                              </div>

                              <div className="product-price">
                                <span>Starts at </span> Rs.{" "}
                                {product.options[0].price}
                              </div>
                            </div>
                            <button className="add-to-cart-icon" onClick={() => addProductToCart(product, product.options[0]._id, product.options[0].color, product.options[0].price, product.options[0].size)}>Add <ShoppingCartOutlined
                              className="cart-icon" /> </button>
                          </div>
                        </div>
                      ))}
                  </div>
                </>
              ) : (
                <>
                  {/* this is the code for category data */}

                  <div className="product-category-heading">
                    {CategoryDetailsArray.name}
                  </div>
                  <div className="product-container">
                    {SubCategoryDetailsArray.length > 0 &&
                      SubCategoryDetailsArray.map((subcategory, key) =>
                        subcategory.product.map((product) => (
                          <div className="product-card" key={product._id}>
                            <div className="product-image-container">
                              {product.images.map((image, imageIndex) => (
                                <img
                                  onClick={() => {
                                    dispatch(setProductId(product._id));
                                    navigate(`/products/${product._id}`);
                                  }}
                                  key={imageIndex}
                                  className={`product-image ${imageIndex ===
                                      hoveredImageIndex[product._id]
                                      ? "product-image-hidden"
                                      : ""
                                    }`}
                                  src={
                                    imageIndex ===
                                      hoveredImageIndex[product._id]
                                      ? product.images[
                                      (imageIndex + 1) %
                                      product.images.length
                                      ]
                                      : image
                                  }
                                  onMouseEnter={() => {
                                    handleMouseEnter(product._id, imageIndex);
                                  }}
                                  onMouseLeave={() => {
                                    handleMouseLeave(product._id);
                                  }}
                                />
                              ))}
                              <button
                                className="add-to-wishlist-icon"
                                onClick={() => {
                                  handle_add_Towishlist(product);
                                }}
                              >
                                <img
                                  src={
                                    isWishlisted(product._id)
                                      ? added_to_wishlist
                                      : add_to_wishlist
                                  }
                                  alt="wishlist"
                                ></img>
                              </button>
                            </div>
                            <div className="product-name-container">
                              <div className="product-name-and-price">
                                <div
                                  className="product-name-detail"
                                  key={product._id}
                                  onClick={() => {
                                    dispatch(setProductId(product._id));
                                    navigate(`/products/${product._id}`);
                                  }}
                                >
                                  {product.name}
                                </div>

                                <div className="product-price">
                                  <span>Starts at </span> Rs.{" "}
                                  {product.options[0].price}
                                </div>
                              </div>
                              <button className="add-to-cart-icon" onClick={() => addProductToCart(product, product.options[0], product.options[0].color[0], product.options[0].price, product.options[0].size)}>Add <ShoppingCartOutlined
                                className="cart-icon" /> </button>
                            </div>
                          </div>
                        ))
                      )}
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProductCategory;

