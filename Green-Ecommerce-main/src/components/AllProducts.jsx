import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cards from "./Cards";
import axios from "axios";
import productSlice, { fetchAllProducts } from "../redux/productSlice";
import SkeletonLoading from "./SkeletonLoading";

const AllProducts = () => {
  const [wishlistedProducts, setWishlistedProducts] = useState([]);
  const user = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.user.token);
  const { products, isLoading } = useSelector((state) => state.product);
  const dispatch = useDispatch(productSlice);

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
    <div className="w-11/12 mx-auto mt-10">
      <p className="my-10 font-semibold text-lg sm:text-2xl md:text-3xl lg:text-4xl">
        All Products
      </p>

      {products?.length > 0 && isLoading !== "loading" ? (
        <div className="grid gap-1 mx-auto grid-cols-2 gap-y-5 gap-x-1 md:gap-x-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 justify-evenly">
          {products.map((product) => {
            const isProductLiked = wishlistedProducts.some(
              (wishlistedProduct) => wishlistedProduct._id === product._id
            );
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
        </div>
      ) : (
        <SkeletonLoading times={4} />
      )}
    </div>
  );
};

export default AllProducts;
