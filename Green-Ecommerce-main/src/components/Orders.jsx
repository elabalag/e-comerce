import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import OrderCard from './OrderCard';
import OrderSkeleton from '../utils/OrderSkeleton';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const token = useSelector(state => state.user.token);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios.get(`${import.meta.env.VITE_SERVER_URL}/user/orders`, { headers: { authorization: 'Bearer ' + token}})
    .then(response => {setOrders(response.data); setIsLoading(false)})
    .catch(error => {console.log(error); setIsLoading(false)})
  }, [])

  return (
    <div className='w-11/12 mx-auto'>
      <p className='text-4xl font-semibold mt-10'>My Orders</p>
      <div className='mt-10'>
      {!isLoading ? <div className=' gap-5 grid grid-cols-1 lg:grid-cols-2 items-baseline'>
        {orders.map((order) => (
            <div className="p-3 rounded-md bg-slate-50 border-[1px] duration-200 hover:shadow-lg" key={order._id}>
            <div className='flex flex-col lg:flex-row items-start lg:items-center justify-between'>
            <p><span className='font-semibold pr-2'>Order Id:</span> {order._id}</p>
            <p><span className='font-semibold pr-2'>Date:</span> {new Date(order.date).toLocaleDateString("en-GB")}</p>
            </div>
            <hr className='my-3'/>
            {order.product.map((product) => (
            <div className=''>
                <OrderCard product={product} quantity={product.quantity} size={product.size}/>
            </div>
        ))}
        <hr />
        <div className='flex justify-end items-center text-lg pt-2'>Total:<span className='font-semibold pl-2'>₹{order.amount}</span></div>
            </div>
        ))}
      </div>: <OrderSkeleton times={3}/>}
      </div>
    </div>
  )
}

export default Orders
