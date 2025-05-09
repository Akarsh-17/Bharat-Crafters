import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Header from "../Header/Header";
import CartProductCard from "./CartProductCard";
import CartSummary from "./CartSummary"
import { handlePayment } from "../../operations/handlePayment";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
const Cart = () => {
  const cart = useSelector((state) => state.Cart);
  const user = useSelector((state) => state.CurrentUser.CurrentUser);

  const dispatch =useDispatch();
  const navigate = useNavigate();

  const loginPayment = () => toast.error("Login to proceed for payment.");
  const orderSuccessful = () => toast.success("Order completed successfully.");
  const EmptyCart =
    "https://res.cloudinary.com/additya/image/upload/v1692355550/urban%20shoes/ojxpihqnktxexshwn3ts.png";

  useEffect(() => {
    console.log(cart);
  }, [cart]);

  const openPayment = () => {
    handlePayment(
      user,
      cart,
      dispatch,
      navigate,
      loginPayment,
      orderSuccessful
    );
  };
  return (
    <>
      <Header />
      <Wrapper>
        <Container>
          <LeftWrapper>
            <Heading>Your Cart</Heading>
            <ProductInfoWrapper>
              {!cart?.products?.length ? (
                <SVGContainer>
                  <SVG src={EmptyCart} />
                  <SVGText> Your Cart is Empty!</SVGText>
                </SVGContainer>
              ) : (
                <>
                  {cart?.products?.map((info, index) => (
                    <CartProductCard info={info} key={index} />
                  ))}
                </>
              )}
            </ProductInfoWrapper>
          </LeftWrapper>
          <RightWrapper>
            <CartSummary cart={cart} openPayment={openPayment} />
            {/* <CartSummary cart={cart}  /> */}
          </RightWrapper>
        </Container>
      </Wrapper>
    </>
  );
};

export default Cart;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  margin-top: 50px;
  align-items: center;
  justify-content: center;
`;

const Container=styled.div`
  gap: 50px;
  width: 80%;
  display: flex;
  justify-content: space-between;

`;

const Heading = styled.p`
  margin: 0px;
  font-size: 28px;
  font-weight: 500;
  margin-bottom: 10px;
  font-family: "Nunito", sans-serif;
`;

const LeftWrapper = styled.div`
  flex: 2.5;
`;

const ProductInfoWrapper = styled.div``;

const SVGContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const SVG = styled.img`
  width: 40%;
  aspect-ratio: 1;
`;

const SVGText = styled.p`
  margin: 0px;
  font-size: 24px;
  font-weight: 500;
  margin-bottom: 10px;
  font-family: "Nunito", sans-serif;
  text-align: center;
`;

const RightWrapper = styled.div`
  flex: 1.4;
  padding: 0px 20px;
`;
