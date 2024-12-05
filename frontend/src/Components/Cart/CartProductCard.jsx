import React from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { FaCirclePlus } from "react-icons/fa6";
import { FaCircleMinus } from "react-icons/fa6";
import { PiTrashThin } from "react-icons/pi";
import { useDispatch } from "react-redux";
import { decreaseQuantity, increaseQuantity, removeFromCart } from "../store/slices/cartSlice";
import { setProductId } from "../store/slices/ProductIdSlice";

const CartProductCard = ({ info }) => {
  const dispatch=useDispatch()
  const navigate= useNavigate()
  const productQuantity=(type,_id,selectedOption,selectedSize,selectedColor,selectedPrice,selectedQuantity)=>{
    type==="increase"
    ?dispatch(increaseQuantity({_id,selectedOption,selectedSize,selectedColor,selectedPrice,selectedQuantity}))
    :dispatch(decreaseQuantity({_id,selectedOption,selectedSize,selectedColor,selectedPrice,selectedQuantity}))
  }

  const removeProductFromCart=(_id,selectedOption,selectedSize,selectedColor,selectedPrice,selectedQuantity)=>{
    dispatch(removeFromCart({_id,selectedOption,selectedSize,selectedColor,selectedPrice,selectedQuantity}))
  }
  return (
    <React.Fragment>
      <Product>
        <Image src={info?.images[0]} onClick={() => {
                              dispatch(setProductId(info._id));
                              navigate(`/products/${info._id}`);
                            }}/>
        <DetailWrapper>
          <Detail>
            <TopInfoWrapper>
              <Link
                // to={`/product/${info?._id}`}
                style={{
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <HeadingWrapper >
                  <ProductName>{info?.name}</ProductName>
                  {/* {width <= 660 ? null : ( */}
                  <ProductCost>MRP: {info?.selectedPrice}</ProductCost>
                  {/* )} */}
                </HeadingWrapper>
              </Link>
              <ProductTypeWrapper>
                {info?.specialFeatures.map((val, index) => (
                  <ProductType key={index}>{val}</ProductType>
                ))}
              </ProductTypeWrapper>
            </TopInfoWrapper>
            <InfoWrapper>
              Color:
              <ProductColor>{info?.selectedColor}</ProductColor>
            </InfoWrapper>

            <DropDownWrapper>
              <InfoWrapper>
                Size:
                <ProductSize>{info?.selectedSize}</ProductSize>
              </InfoWrapper>

              <InfoWrapper>
                Quantity:
                <ProductQuantity>{info?.selectedQuantity}</ProductQuantity>
              </InfoWrapper>
              <FaCirclePlus style={{cursor:"pointer",fontSize:"25px"}}
               onClick={(e)=>{
                // e.preventDefault()
                productQuantity(
                  "increase",
                  info?._id,
                  info?.selectedOption,
                  info?.selectedSize,
                  info?.selectedColor,
                  info?.selectedPrice,
                  info?.selectedQuantity
                )
               }}
              />
              <FaCircleMinus style={{cursor: "pointer" ,fontSize:"25px"}}
              onClick={()=>{
                productQuantity(
                  "decrease",
                  info?._id,
                  info?.selectedOption,
                  info?.selectedSize,
                  info?.selectedColor,
                  info?.selectedPrice,
                  info?.selectedQuantity
                )
               }}/>
            </DropDownWrapper>
          </Detail>
          <UtilityWrapper>
            <PiTrashThin style={{cursor:"pointer",fontSize:"25px"}}
              onClick={()=>{
                removeProductFromCart(
                  info?._id,
                  info?.selectedOption,
                  info?.selectedSize,
                  info?.selectedColor,
                  info?.selectedPrice,
                  info?.selectedQuantity
                )
              }}
            />            
          </UtilityWrapper>
        </DetailWrapper>
      </Product>
      <Hr />
    </React.Fragment>
  );
};

export default CartProductCard;

const Product = styled.div`
  display: flex;
  gap: 30px;
  align-items: flex-start;
`;

const Image = styled.img`
  height: 200px;
  object-fit: cover;
  aspect-ratio: 1;
`;

const DetailWrapper = styled.div`
  width: 100%;
  gap: 20px;
  height: 100%;
  display: flex;
  flex-direction: column;
`;
const Detail = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  gap: 10px;
  width: 100%;
`;

const TopInfoWrapper = styled.div``;

const UtilityWrapper = styled.div``;

const HeadingWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;
const ProductName = styled.p`
  margin: 0px;
  font-size: 19px;
  font-weight: 700;
  font-family: "Nunito", sans-serif;
`;
const ProductCost = styled.p`
  margin: 0px;
  font-size: 19px;
  font-weight: 700;
  font-family: "Nunito", sans-serif;
  display: flex;
  align-items: center;
`;
const ProductTypeWrapper = styled.div`
  gap: 10px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;
const ProductType = styled.p`
  margin: 0px;
  font-size: 14px;
  font-family: "Nunito", sans-serif;
  color: #4d4d4d;
  font-weight: 500;
  background-color: #f5f5f5;
  border-radius: 50px;
  padding: 2px 4px;
`;

const Hr = styled.hr`
  background-color: #898383;
  border: none;
  height: 1px;
  width: 100%;
  margin: 15px 0px;
`;

const InfoWrapper = styled.div`
  height: 100%;
  gap: 10px;
  display: flex;
`;

const ProductColor = styled.p`
  margin: 0px;
  font-size: 17px;
  font-family: "Nunito", sans-serif;
  font-size: 17px;
  color: #4d4d4d;
  font-weight: 600;
  font-family: "Nunito", sans-serif;
`;

const DropDownWrapper = styled.div`
  gap: 15px;
  display: flex;
  align-items: center;
  font-size: 17px;
`;

const ProductSize = styled.div`
  margin: 0px;
  font-size: 17px;
  font-family: "Nunito", sans-serif;
  font-weight: 600;
`;

const ProductQuantity=styled.p`
 margin: 0px;
 display: flex;
 align-items: center;
 font-size: 17px;
 font-family: "Nunito", sans-serif;
`;
