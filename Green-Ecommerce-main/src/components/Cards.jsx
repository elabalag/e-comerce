import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { Animation } from 'rsuite';
import { useDispatch } from "react-redux";
import wishlistSlice, { addToWishlist, removeFromWishlist, removeProductFromWishlist } from "../redux/wishlistSlice";

const Cards = ({ product, isProductLiked, token, user, isWishlistPage }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch(wishlistSlice);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    setIsWishlisted(isProductLiked);
  }, [isProductLiked]);

  const handleMouseEnter = () => {
    setShow(true);
  };
  const handleMouseLeave = () => {
    setShow(false);
  };

  return (
    <div className="flex flex-col rounded-lg overflow-hidden hover:-translate-y-1 duration-150" key={product._id}>
      <div className="cursor-pointer relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <img src={product.imageUrl} className="mx-auto h-auto" alt="logo" onClick={() => navigate(`/product/${product._id}`)}/>
        {isWishlistPage ? (
          <Animation.Fade in={show} placement="bottom">
          <div onClick={() => {dispatch(removeFromWishlist({productId:product._id, token})); dispatch(removeProductFromWishlist(product._id))}} className="hover:text-slate-200 absolute text-lg font-[500] text-slate-100 bottom-0 backdrop-blur-md h-20 bg-gradient-to-b from-transparent to-black/60 w-full flex items-center justify-center p-2 ">
           Remove from wishlist
           </div>
          </Animation.Fade>
           ) : (
          <>
        {user &&
          (!isWishlisted ? (
            <AiOutlineHeart className="likeButton" onClick={() => { dispatch(addToWishlist({product, token})); setIsWishlisted(true); }} />
          ) : (
            <AiFillHeart className="likeButton text-red-500" onClick={() => { dispatch(removeFromWishlist({productId:product._id, token})); setIsWishlisted(false); }} />
          ))}
          </>
        )}
      </div>
      <div
        className="flex pt-2 flex-col items-start cursor-pointer"
        onClick={() => navigate(`/product/${product._id}`)}
      >
        <p
          className=" lg:text-lg text-sm m-0"
          onClick={() => navigate(`/product/${product._id}`)}
        >
          {product.title}
        </p>
        <p className="lg:text-sm text-xs font-light text-slate-500 m-0">
          {product.subtitle}
        </p>
        <p className=" lg:text-lg text-sm m-0 mt-[3px]">
          MRP: ₹{product.price}
        </p>
      </div>
    </div>
  );
};

export default Cards;
