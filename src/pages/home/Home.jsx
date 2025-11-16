import React, { useContext } from 'react'
import Layout from '../../components/layout/Layout.jsx'
import myContext from '../../context/data/myContext.jsx'
import HeroSection from '../../components/heroSection/HeroSection.jsx'
import Filter from '../../components/filter/Filter.jsx'
import ProductCard from '../../components/productCard/ProductCard.jsx'
import Track from '../../components/track/Track.jsx'
import Testimonial from '../../components/testimonial/Testimonial.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, deleteFromCart } from '../../redux/cartSlice.jsx'


function Home() {
  const dispatch = useDispatch();
  const cartItem = useSelector((state)=> state.cart)

  console.log(cartItem)

  const addCart = () => {
    dispatch(addToCart("shirt"));
  }

  const deleteCart = () => {
    dispatch(deleteFromCart("shirt"));
  }
  return (
    <Layout>
      
      <HeroSection />
      <Filter />
      <ProductCard />
      <Track />
      <Testimonial />

    </Layout>
  )
}

export default Home