import React from 'react'
import{styled} from "styled-components"
import { LiaRupeeSignSolid } from "react-icons/lia";
const CartSummary = ({cart, openPayment}) => {
  return (
    <>
      <Heading> Summary </Heading>
      <PaymentWrapper>
        <Payment>
          <PaymentText>Subtotal</PaymentText>
          <PaymentText>
            <LiaRupeeSignSolid />{" "}
            {cart?.cartSummary}
          </PaymentText>
        </Payment>
        <Payment>
          <PaymentText>Estimated Shipping & Handling</PaymentText>
          <PaymentText>
            <LiaRupeeSignSolid />{" "}
            {cart?.cartSummary !== 0 ? 99 : 0}
          </PaymentText>
        </Payment>
        <Hr/>
        <Payment >
          <PaymentText type="total">Total</PaymentText>
          <PaymentText type="total">
            <LiaRupeeSignSolid />{" "}
            {cart?.cartSummary + (cart?.cartSummary !== 0 ? 99 : 0)}
          </PaymentText>
        </Payment>
        <Hr />
      </PaymentWrapper>
      <Button onClick={openPayment}>Checkout</Button>
    </>
  )
}

const Heading=styled.p`
  margin: 0px;
  font-size: 28px;
  font-weight: 500;
  margin-bottom: 10px;
  font-family: "Nunito", sans-serif;
`;
const PaymentWrapper=styled.div`
  display: flex;
  gap: 12px;
  flex-direction: column;
`;
const Payment=styled.div`
  display: flex;
  justify-content: space-between;
  

`
const  PaymentText=styled.p`
  margin: 0px;
  display: flex;
  font-size: 18px;
  font-weight: 500;
  align-items: center;
  font-family: "Nunito", sans-serif;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const Hr=styled.hr`
  background-color: #d2d2d2;
  border: none;
  height: 1px;
  width: 100%;
  margin: 10px 0px; 
`;

const Button = styled.button`
  width: 100%;
  padding: 15px;
  font-size: 18px;
  color: white;
  cursor: pointer;
  margin: 20px 0px;
  font-weight: 600;
  border-radius: 50px;
  background-color: black;
  font-family: "Nunito", sans-serif;

  &:hover {
    opacity: 0.8;
  }
`;
export default CartSummary