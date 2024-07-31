import React, { useEffect, useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Cards from './Cards';
import EmptyCart from './EmptyCart';
import axios from 'axios';
import wishlistSlice, { setToWishlist } from '../redux/wishlistSlice';

const Wishlist = () => {
const dispatch = useDispatch(wishlistSlice);
const wishlist = useSelector(state => state.wishlist.wishlist);
const token = useSelector(state => state.user.token);

useEffect(() => {
    axios.get(`${import.meta.env.VITE_SERVER_URL}/user/wishlist`, {method: "GET", headers: {"authorization": `Bearer ${token}`}})
    .then(({data}) => dispatch(setToWishlist(data)))
    .catch(err => console.log(err.message));
}, [])

  return (
    <div className='w-11/12 mx-auto mt-10'>
    <h2 className="header">Wishlisted Products</h2>
      {wishlist && wishlist.length > 0 ? (
        <div className="grid gap-1 mx-auto grid-cols-2 gap-y-5 gap-x-1 md:gap-x-5 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 justify-evenly">
            {wishlist.map((wishlistItem) => {
              return (
                <Cards product={wishlistItem} key={wishlistItem._id} isWishlistPage={true} token={token} />            
              )
            })}
        </div>
      ) : (
        <EmptyCart message="You haven't wishlisted any product 🥲🙄"/>
      )}
    </div>
  )
}

export default Wishlist
