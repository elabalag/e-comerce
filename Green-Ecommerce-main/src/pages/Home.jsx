import React, { useState, useEffect } from "react";
import Cards from "../components/Cards";
import { useDispatch, useSelector } from "react-redux";
import productSlice, { fetchAllProducts } from "../redux/productSlice";
import axios from "axios";
import { Button, Carousel } from "rsuite";
import {
  b1,
  b2,
  b3,
  b4,
  men,
  women1,
  bottom,
  shoeCover,
  watch,
} from "../assets/";
import { useNavigate } from "react-router-dom";
import SkeletonLoading from "../components/SkeletonLoading";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const Home = () => {
  const dispatch = useDispatch(productSlice);
  const [isDialogOpen, setIsDialogOpen] = useState(true);
  const { products, isLoading } = useSelector((state) => state.product);
  const user = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.user.token);
  const [wishlistedProducts, setWishlistedProducts] = useState([]);
  const navigate = useNavigate();

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

  function afterOpenModal() {
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsDialogOpen(false);
  }

  return (
    <>
      <Modal
        isOpen={isDialogOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="This is for Testing Purpose 😄"
      >
        <h1 className="text-center font-semibold text-xl py-4">
          This is for Testing Purpose 😄
        </h1>
       <div className="text-center leading-8"> <p className="text-center text-gray-600 max-w-lg min-w-fit ">
          You can't make real payment here to make payment use this testing card
          number
          
        </p>
        <span className="text-teal-500 font-semibold ">
            4242 4242 4242 4242
          </span></div>
        <Button
          onClick={closeModal}
          className="flex mx-auto mt-6 bg-teal-200 hover:bg-teal-300 duration-150"
        >
          Try it out
        </Button>
      </Modal>
      <Carousel
        autoplay
        className="custom-slider mt-10 w-full h-40 sm:h-52 md:h-72 lg:h-96 xl:h-1/3 bg-white"
      >
        <img
          src={b1}
          alt="banner 1"
          className="cursor-pointer object-cover"
          onClick={() => navigate("/collection/women")}
        />
        <img
          src={b2}
          alt="banner 2"
          className="cursor-pointer object-cover"
          onClick={() => navigate("/collection/women")}
        />
        <img
          src={b3}
          alt="banner 3"
          className="cursor-pointer object-cover"
          onClick={() => navigate("/collection/men")}
        />
        <img
          src={b4}
          alt="banner 4"
          className="cursor-pointer object-cover"
          onClick={() => navigate("/collection/shoe")}
        />
      </Carousel>
      <div className="w-11/12 mx-auto">
        <h2 className="header">Collections for you</h2>

        <div className="grid w-11/12 grid-cols-3 mx-auto min-w-full">
          <div className="relative" onClick={() => navigate("/collection/men")}>
            <img src={men} alt="Image" className="w-full h-auto" />
            <div className="absolute inset-0 transition-all hover:backdrop-blur-sm opacity-0 hover:opacity-100 duration-300">
              <div className="flex items-center justify-center h-full w-full hover:bg-black/20">
                <p className="text-md sm:text-lg md:text-xl lg:text-2xl text-white font-semibold">
                  Men's Wear
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <div
              className="relative"
              onClick={() => navigate("/collection/women")}
            >
              <img src={women1} alt="Image" className="w-full h-auto" />
              <div className="absolute inset-0 transition-all hover:backdrop-blur-sm opacity-0 hover:opacity-100 duration-300">
                <div className="flex items-center justify-center h-full w-full hover:bg-black/20">
                  <p className="text-md sm:text-lg md:text-xl lg:text-2xl text-white font-semibold">
                    Women's Wear
                  </p>
                </div>
              </div>
            </div>

            <div
              className="relative"
              onClick={() => navigate("/collection/watch")}
            >
              <img src={watch} alt="Image" className="w-full h-auto" />
              <div className="absolute inset-0 transition-all hover:backdrop-blur-sm opacity-0 hover:opacity-100 duration-300">
                <div className="flex items-center justify-center h-full w-full hover:bg-black/20">
                  <p className="text-md sm:text-lg md:text-xl lg:text-2xl text-white font-semibold">
                    Watch Collection
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div
            className="relative"
            onClick={() => navigate("/collection/shoe")}
          >
            <img src={shoeCover} alt="Image" className="w-full h-auto" />
            <div className="absolute inset-0 transition-all hover:backdrop-blur-sm opacity-0 hover:opacity-100 duration-300">
              <div className="flex items-center justify-center h-full w-full hover:bg-black/20">
                <p className="text-md sm:text-lg md:text-xl lg:text-2xl text-white font-semibold">
                  Shoe Collection
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="flex justify-between items-center mt-10 mb-4 sm:mt-15 md:mt-15 md:mb-8 lg:mt-20 lg:mb-10">
            <p className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold">
              Products
            </p>
            <p
              className="font-semibold text-xs md:text-md hover:bg-slate-50 py-1 px-2 md:py-2 md:px-4 border-[1px] rounded-full cursor-pointer"
              onClick={() => navigate("/all")}
            >
              View All
            </p>
          </div>
          {isLoading !== "loading" ? (
            <div className="grid gap-1 mx-auto grid-cols-2 gap-y-5 gap-x-1 md:gap-x-5 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 justify-evenly">
              {products.slice(0, 4).map((product) => {
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

        <img src={bottom} alt="bottom image" className="my-20 rounded-lg" />
      </div>
    </>
  );
};

export default Home;
