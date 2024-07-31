import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { urlFor } from "../client";
import EmptyCart from "../components/EmptyCart";
import cartSlice, { removeFromCart } from "../redux/cartSlice";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { MdDelete } from "react-icons/md"
import { Loader } from 'rsuite';

const CartTesting = () => {
  const dispatch = useDispatch(cartSlice);
  const quantity = useSelector((state) => state.cart.quantity);
  const [isLoading, setIsLoading] = useState(false);
  const token = useSelector((state) => state.user.token);
  const { products } = useSelector((state) => state.cart);
  const [address, setAddress] = useState({ name: "", address1: "", address2: "", city: "", state: "", zip: "", country: "", phone: "", email: ""})

  const handleCheckout = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
        const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/create-checkout-session`, {
        items: products.map(product => {
            return {
                id: product.id,
                quantity: product.quantity,
                size: product.size,
            }
        })
    , address}, {headers: { authorization: "Bearer " + token }})
    setAddress({ name: '', address1: '', address2: '', city: '', state: '', zip: '', country: '', phone: '', email: ''})
    setIsLoading(false);
    const resData = response.data;
    console.log(resData);
    window.location = resData.url;
    } catch (error) {
        console.log("🥲 frontend error: " + error)
        setIsLoading(false);
    }
  }

  const handleForm = (e) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  return (
    <div className="w-11/12 mx-auto mt-10 flex flex-col md:flex-row justify-evenly">
      {quantity > 0 ? (
        <>
          <div
            id="reviewItem"
            className="space-y-6 border-[1px] h-fit pb-5 border-gray-300 w-full mb-10 md:mb-0 md:w-7/12 rounded-lg"
          >
            <h1 className="px-5 text-lg mt-10 mb-4 sm:text-xl md:text-2xl lg:mt-10 lg:mb-10 lg:text-3xl font-semibold">
              Review Item and Shipping
            </h1>
            {products.map((product, index) => (
              <div
                className="flex-row flex justify-between items-center mx-4 hover:shadow-lg duration-150 transition-all rounded-lg shadow-md"
                key={index}
              >
                <div className="flex flex-row items-center space-x-3 md:space-x-7 p-4">
                  <img
                    src={urlFor(product.thumbnail)}
                    alt="cartImg"
                    className="mx-auto h-28 w-20 md:h-40 md:w-32 rounded-lg object-cover"
                  />
                  <div className="md:space-y-4 space-y-1">
                    <h1 className="text-xs sm:text-base md:text-xl lg:text-2xl mt-3 md:mt-0 mb-0 md:mb-2 text-black/70 font-[500]">{product.title}</h1>
                    <p className="text-xs sm:text-sm md:text-base">Size: {typeof product.size === 'string' ? product.size.toUpperCase() : product.size}</p>
                    <h3 className="text-xs sm:text-sm md:text-base">{product.subtitle}</h3>
                  </div>
                </div>
                <div className="p-2 md:p-5 space-y-1 md:space-y-4">
                  <h1 className="text-xs sm:text-base md:text-lg lg:text-xl xl:text-2xl text-black/70 font-[500] flex justify-end">₹{product.price}</h1>
                  <h4 className="text-xs sm:text-base flex justify-end">Qty: {product.quantity}</h4>
                  <p
                    onClick={() => {dispatch(removeFromCart({ id: product.id })); toast.success("Removed from cart", {position: "bottom-center"})}}
                    className="cursor-pointer text-red-500 text-xs sm:text-base  flex justify-end"
                  >
                    <MdDelete className="h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6"/>
                  </p>
                </div>
              </div>
            ))}
          </div>
          <Toaster />
        
      

      <div className="w-full border-[1px] rounded-md md:w-4/12 relative p-1">
      <div>
      <form className="flex flex-col w-11/12 mx-auto my-5 font-[500]" onSubmit={handleCheckout}>
  <label>Full Name</label>
  <input type="text" name="name" placeholder="Enter your name" className="shippingInput" onChange={handleForm} required/>
  <label>Address Line 1</label>
  <input type="text" name="address1" placeholder="123 Main St." className="shippingInput" onChange={handleForm} required/>
  <label>Address Line 2</label>
  <input type="text" name="address2" placeholder="Apt. 4B (optional)" className="shippingInput" onChange={handleForm} />
  <div className="flex gap-x-2">
    <div className="flex flex-col w-1/2">
      <label>City</label>
      <input type="text" name="city" placeholder="Anytown" className="shippingInput" onChange={handleForm} required/>
    </div>
    <div className="flex flex-col w-1/2">
      <label>State</label>
      <input type="text" name="state" placeholder="California" className="shippingInput" onChange={handleForm} required/>
    </div>
  </div>
  <div className="flex gap-x-2">
    <div className="flex flex-col w-1/2">
      <label>Postal Code/ZIP Code</label>
      <input type="number" name="zip" maxLength={6} placeholder="123456" className="shippingInput" onChange={handleForm} required/>
    </div>
    <div className="flex flex-col w-1/2">
      <label>Country</label>
      <input type="text" name="country" placeholder="United States" className="shippingInput" onChange={handleForm} required/>
    </div>
  </div>
  <label>Phone Number</label>
  <input type="number" name="phone" maxLength={10} placeholder="1234567890" className="shippingInput" onChange={handleForm} required/>
  <label>Email Address</label>
  <input type="email" name="email" placeholder="johndoe@gmail.com" className="shippingInput" onChange={handleForm} required/>
  <button className="mt-5 bg-green-500 text-white rounded-md hover:bg-green-600 duration-150 py-3">
    {!isLoading ? "Checkout" : <Loader content="Loading..." />}
  </button>
</form>
      </div>
      </div>
      </>
      ) : (
        <EmptyCart message="Your cart is empty 😶‍🌫️"/>
      )}
    </div>
  );
};

export default CartTesting;
