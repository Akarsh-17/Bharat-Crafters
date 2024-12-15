import React, { useState } from 'react';
import logo from '../../Images/logo9.png';
import axios from 'axios';
import './Login.css'
import {useNavigate} from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux'
import { setCurrentUser } from '../store/slices/AuthSlice.js';
import toast from 'react-hot-toast';
import { setWishlist } from '../store/slices/WishlistSlice.js';
import {storeCart} from '../store/slices/cartSlice.js'



function Login() {

    const [loading, setLoading] = useState(false);
    const {Wishlist}=useSelector((state)=>state.Wishlist)
    // const  {cart}=useSelector((state)=>state.cart)

    //API ROUTE

    const navigate= useNavigate();
    const dispatch=useDispatch();

    const sendFormData = async (formData) => {
        const toastId = toast.loading('Loading...');
        setLoading(true);

        console.log(formData)
        await axios.post(`http://localhost:4000/api/v1/auth/loginBuyer`, formData,
        {
            withCredentials: true
        }
        )
        .then(response => {
            console.log(response);
            dispatch(setCurrentUser({...response.data.user}));
            toast.success('User logged in successfully!');
            const cartSummary=response.data?.user?.cartSummary
            const cartInfo = response.data.user?.cart?.productList.map((product) => {
                const { productInfo,
                    selectedOption,
                    selectedSize,
                    selectedColor,
                    selectedPrice,
                    selectedQuantity,
                    selectedOptionObject
                } =  product;
          
                const obj = {
                  selectedSize: selectedSize,
                  selectedColor: selectedColor,
                  selectedQuantity: selectedQuantity,
                  selectedPrice:selectedPrice,
                  selectedOption:selectedOptionObject,
                  ...productInfo,
                };
          
                return obj;
              });
            console.log("the  cart info is",cartInfo)

            dispatch(setWishlist(response.data?.user?.wishlist));
            dispatch(storeCart({cartInfo, cartSummary}))
            navigate('/');
            console.log("wihlist after login ",Wishlist)
            // console.log("cart fter login ",cart)
        })
        .catch(error => {
            console.log(error)
            toast.error('Error occured in login. Try again');
        })
        setLoading(false);
        toast.dismiss(toastId);
    };

    //USESTATE FOR INPUT FIELDS

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    //SUBMITING INPUT FIELD VALUES

    const handleSubmit = (e) => {
        sendFormData(formData);

    };


    return (
        <div class="outer-container-login">
            <header className="header-login">
                <img src={logo} alt="Company Logo" class="header-logo" />
            </header>
            <div className="form-container-login">
                <div className="form" >
                    <div class="heading-login">Login as a Buyer</div>
                

                    <input
                        type="email"
                        name="email"
                        className="input"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <input
                        type="password"
                        name="password"
                        className="input"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        maxLength={8}
                    />
                    <button type="submit" className="button-login"
                    onClick={()=>{handleSubmit()}}
                    >Login</button>
                                        <button className="paragraph-login" onClick={()=>{navigate('/signup')}}>or Signup if not a user</button>

                </div>
            </div>
        </div>
    );

}

export default Login;

