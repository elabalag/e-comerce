import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import cartSlice, { resetCart } from "../redux/cartSlice";

const SuccessPayment = () => {
  const dispatch = useDispatch(cartSlice);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const sessionId = urlParams.get("session_id");
    if (sessionId) {
      dispatch(resetCart());
    }
  }, [dispatch, location.search]);

  return (
    <div className="w-full h-96 flex flex-col items-center justify-center">
      <h1 className="text-slate-700 header">Payment successful 🎉</h1>
      <p className="text-slate-500 text-base md:text-lg">Thank you for your order.</p>
      <button className="bg-gray-200 hover:bg-gray-300 transition duration-150 py-2 px-6 rounded-md mt-9" onClick={() => navigate("/")}>
        Home
      </button>
    </div>
  );
};

export default SuccessPayment;
