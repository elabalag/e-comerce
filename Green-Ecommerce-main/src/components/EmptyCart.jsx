import React from "react";
import { useNavigate } from "react-router-dom";

const EmptyCart = ({ message, searchMessage }) => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center h-96 flex-col space-y-7">
      {searchMessage ? (
        <>
        <p className="text-3xl">{searchMessage[0]}</p>
        <h4 className="header">{searchMessage[1]}</h4>
        </>
      ) : (
        <p className="header">{message}</p>
      )}
      <button
        className="bg-gray-200 hover:bg-gray-300 transition duration-150 py-2 px-6 rounded-md"
        onClick={() => navigate("/")}
      >
        Home
      </button>
    </div>
  );
};

export default EmptyCart;
