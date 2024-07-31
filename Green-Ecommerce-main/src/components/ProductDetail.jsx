import React, { useEffect, useState } from 'react'
import { client, urlFor } from '../client'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import cartSlice, { addToCart } from '../redux/cartSlice'
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai"
import toast, { Toaster } from "react-hot-toast";
import Skeleton from 'react-loading-skeleton';

const ProductDetail = () => {
    const dispatch = useDispatch(cartSlice);
    const navigate = useNavigate();
    const {id} = useParams();
    const [productDetail, setProductDetail] = useState({})
    const [currentImage, setCurrentImage] = useState();
    const [size, setSize] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const user = useSelector(state => state.user.user);
    const isLoggedIn = user ? true : false;

    useEffect(() => {
      setIsLoading(true);
        client.getDocument(id).then((response) => {
            setProductDetail(response)
            setSize(response.size[0])
            setCurrentImage(response.image[0]);
            setIsLoading(false);
        })
      }, [])
    
    const finalData = {
        id: productDetail._id,
        title: productDetail.title,
        price: productDetail.price,
        subtitle: productDetail.subtitle,
        thumbnail: productDetail.thumbnail,
        size: size,
        quantity: quantity,
    }

  return (
    <div className='w-11/12 mx-auto mt-6 pb-10 flex flex-col lg:flex-row justify-between space-y-10'>
    <div className='lg:w-1/2 flex flex-col'>
    <h1 className=' text-2xl md:text-3xl font-semibold lg:hidden block mb-6'>{!isLoading ? productDetail.title : <Skeleton height={39}/>}</h1>

      <div className='block lg:hidden bigContainer'>
        {currentImage && !isLoading ? <img src={urlFor(currentImage)} alt="bigImage" className=' w-full object-cover'/> : <Skeleton height={300}/>}
      </div>

      {!isLoading ? (<div className='mx-auto lg:grid gap-1 hidden grid-cols-2'>
      {productDetail.image?.map((img, index) => (
        <div key={index}>
           <img src={urlFor(img)} alt="image" />
        </div>
      ))}
      </div>) : <div className='lg:grid grid-cols-2 gap-1 hidden'><Skeleton height={400} count={2}/><Skeleton height={400} count={2}/></div>}
    </div>

      <div className='w-full lg:w-1/2'>
      <div className="lg:w-11/12 mx-auto space-y-5 relative lg:sticky top-0 lg:top-20 h-auto lg:h-screen lg:mb-auto">
        <h1 className=' text-4xl font-semibold hidden lg:block'>{!isLoading ? productDetail.title : <Skeleton height={39}/>}</h1>
        <hr className='hidden lg:block'/>
        <p className='hidden lg:block'>{!isLoading ? productDetail.description : <Skeleton height={150}/>}</p>
        <hr className='hidden md:block'/>
        <p className='text-xl font-semibold'>MRP₹ {productDetail.price}</p>
        <span className='text-green-500 font-semibold'>inclusive of all taxes</span>
        <hr />
        <h1 className='text-xl font-semibold'>Select Size</h1>
        <div className=' space-x-3'>
            {productDetail?.size?.map(productSize => (
              <button className={`selectBtn ${productSize == size? "bg-slate-800 text-white":""}`} onClick={() => setSize(productSize)} key={productSize}>{productSize}</button>
            ))}
        </div>

        <hr />
        <div className='flex space-x-3 bg-slate-200 w-2/5 md:w-1/5 h-8 rounded-full items-center justify-center'>
           <AiOutlineMinus onClick={() => quantity>0 ? setQuantity(quantity-1) : setQuantity(0)} className='cursor-pointer bg-slate-300 p-2 h-full w-4/12 rounded-s-full'/>
           <p className='w-4/12 text-center text-2xl'>{quantity}</p>
           <AiOutlinePlus onClick={() => setQuantity(quantity+1)} className='cursor-pointer bg-slate-300 h-full p-2 w-4/12 rounded-e-full'/>
        </div>
        <hr />
        <div className='flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-5'>
        <button disabled={!isLoggedIn} className={`${isLoggedIn ? 'bg-slate-800 hover:bg-slate-900 border-slate-800 ' : 'bg-slate-500 border-slate-300 '} text-white py-3 px-20 rounded-full border-2`} onClick={() => {dispatch(addToCart(finalData)); navigate('/cart')}}>Buy Now</button>
        <button disabled={!isLoggedIn} className={`${isLoggedIn ? 'text-slate-800 hover:bg-slate-800 hover:text-white border-slate-800 ' : 'text-slate-500 border-slate-300 '} py-3 px-20 rounded-full border-2 `} onClick={() => {dispatch(addToCart(finalData)); toast.success("Added to cart", {position: "bottom-center"})}}>Add to Cart</button>
        </div>
        <p className='block lg:hidden text-lg font-semibold pt-5'>About the Product</p>
        <p className='block lg:hidden'>{!isLoading ? productDetail.description : <Skeleton height={150}/>}</p>
        <Toaster />
      </div>
      </div>
      <div className=''>
      {!isLoading ? (<div className='grid grid-cols-1 pt-3 md:grid-cols-2 lg:hidden w-full gap-1'>
      {productDetail.image?.map((img, index) => (
        <div onClick={() => setCurrentImage(img)} key={index}>
           <img src={urlFor(img)} alt="image" className='object-cover'/>
        </div>
      ))}
      </div>) : <div className='grid grid-cols-1 md:grid-cols-2 lg:hidden w-full gap-1'><Skeleton height={400} /><Skeleton height={400} /></div>}
      </div>
      
    </div>
  )
}

export default ProductDetail
