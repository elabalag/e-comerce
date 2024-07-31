import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom'
import Cards from './Cards';
import axios from 'axios';
import EmptyCart from './EmptyCart';
import SkeletonLoading from './SkeletonLoading';
import productSlice, { fetchAllProducts } from '../redux/productSlice';

const ProductCollection = () => {
  const dispatch = useDispatch(productSlice)
    const { search } = useParams();
    const [ wishlistedProducts, setWishlistedProducts] = useState([]);
    const user = useSelector(state => state.user.user);
    const token = useSelector(state => state.user.token);
    const isLoading = useSelector(state => state.product.isLoading);
    const products = useSelector(state => state.product.products.filter(product => product?.category?.toLocaleLowerCase() == search));

    useEffect(() => {
        dispatch(fetchAllProducts());
        if (user) {
          axios
            .get(`${import.meta.env.VITE_SERVER_URL}/user/wishlist`, {
              headers: { authorization: `Bearer ${token}` },
            })
            .then(({ data }) => setWishlistedProducts(data))
            .catch((err) => console.log(err.message));
        }
      }, [user]);

  return (
    <div className='w-11/12 mx-auto mt-3'>
      <p className='header'>{search.charAt(0).toLocaleUpperCase()}{search.slice(1)}'s Collection</p>

        {isLoading !== 'loading' ?  (<div className="grid gap-1 mx-auto grid-cols-2 gap-y-5 gap-x-1 md:gap-x-5 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 justify-evenly">
        {products.map((product) => {
          const isProductLiked = wishlistedProducts.some((wishlistedProduct) => wishlistedProduct._id === product._id);
          return (
            <Cards
             user={user} 
             token={token}
              product={product}
              key={product._id}
              isProductLiked={isProductLiked}
            />
          );
        })}
      </div>) : <SkeletonLoading times={4}/>}
      {products.length > 0 ? <></> : <EmptyCart message="Items will be restocked again"/>}
    </div>
  )
}

export default ProductCollection
