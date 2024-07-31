import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import {fetchAllProducts} from "../redux/productSlice"
import { useDispatch, useSelector } from 'react-redux';
import Cards from '../components/Cards';
import EmptyCart from '../components/EmptyCart';

const SearchResult = () => {
  const {result} = useParams();
  const dispatch = useDispatch();
  const products = useSelector(state => state.product.products)
  const filteredProducts = products.filter(product => product.search?.includes(result.toLocaleLowerCase()));

  useEffect(() => {
    dispatch(fetchAllProducts())
  }, [])

  return (
    <div className='w-11/12 mx-auto mt-10 '>
    {filteredProducts.length > 0 && <h1 className='font-semibold text-4xl mb-10'>Result for {result}</h1>}
    {filteredProducts.length === 0 ? <EmptyCart searchMessage={["Sorry! We couldn't find any matching items for", result]}/> :
    <div className="grid gap-10 mx-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-evenly">
      {filteredProducts.map((product) => (
      <Cards product={product} />
      ))}   
    </div>}
    </div>
  )
}

export default SearchResult
