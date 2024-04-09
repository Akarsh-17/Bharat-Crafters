import React from 'react'
import SignUp from '../Signup/Signup.jsx'
import Login from '../Login/Login.jsx'
import Header from '../Header/Header.jsx'
import BottomHeader from '../BottomHeader/BottomHeader.jsx'
import Display from '../Display/Display.jsx'
import Footer from '../Footer/Footer.jsx'


const Home = () => {
  return (
    <>
      <Header />
      <BottomHeader/>
      <Display />
      <Footer />
    </>
  )
}

export default Home
