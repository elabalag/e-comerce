import { Route, Routes } from "react-router-dom";
import 'react-loading-skeleton/dist/skeleton.css'
import Home from "./pages/Home";
import ProductDetail from "./components/ProductDetail";
import NavbarTesting from "./components/NavbarTesting";
import Footer from "./components/Footer";
import SearchResult from "./pages/SearchResult";
import Wishlist from "./components/Wishlist";
import CartTesting from "./pages/CartTesting";
import SuccessPayment from "./components/SuccessPayment";
import Orders from "./components/Orders";
import ProductCollection from "./components/ProductCollection";
import AllProducts from "./components/AllProducts";
import EmptyCart from "./components/EmptyCart";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <>
      <NavbarTesting />
      <Routes>
      <Route element={<ProtectedRoute />}>
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/callback/failure" element={<EmptyCart message="Payment Unsuccessfull 😕"/>} />
        <Route path="/callbackurl/success" element={<SuccessPayment />} /> 
        <Route path="/cart" element={<CartTesting />} />
      </Route>

        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/collection/:search" element={<ProductCollection />} />
        <Route path="/all" element={<AllProducts />} />
        <Route path="/search/:result" element={<SearchResult />} />
        <Route path="*" element={<EmptyCart message="404 Page Not Found"/>} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
