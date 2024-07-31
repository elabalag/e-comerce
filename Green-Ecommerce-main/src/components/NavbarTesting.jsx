import logo from "../assets/logo.png";
import { VscAccount } from "react-icons/vsc";
import { BsSearch } from "react-icons/bs";
import { TbShoppingCartPlus } from "react-icons/tb";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import userSlice, { clearUser } from "../redux/userSlice";
import AuthUser from "./AuthUser";
import cartSlice, { resetCart } from "../redux/cartSlice";

const NavbarTesting = () => {
  const dispatch = useDispatch(userSlice);
  const dispatchCart = useDispatch(cartSlice);
  const navigate = useNavigate();
  const [Dropdown, setDropdown] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [search, setSearch] = useState("")
  const { user } = useSelector(state => state.user);
  const quantity = useSelector(state => state.cart.quantity);

  let dropdownContent = user ?
        <>
          <button onClick={() => {navigate("/"); setDropdown(false)}} className="dropdown">Home</button>
          <button onClick={() => {navigate("/wishlist"); setDropdown(false)}} className="dropdown">Favourite</button>
          <button onClick={() => {navigate("/orders"); setDropdown(false)}} className="dropdown">My Orders</button>
          <button onClick={() => {dispatch(clearUser()); dispatchCart(resetCart()); setDropdown(false)}} className="dropdown"> Logout </button>
        </>
    : 
        <>
          <button onClick={() => {setIsOpen(true); setDropdown(false); setIsLogin(true)}} className="dropdown"> Login </button>
          <button onClick={() => {setIsOpen(true); setDropdown(false); setIsLogin(false)}} className="dropdown"> Register </button>
        </>

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search/${search}`)
    setSearch("");
  }

  return (
    <>
    <nav className="sticky bg-white z-20  w-12/12 mx-auto top-0 shadow-sm">
    <div className="flex justify-between items-center">
      {/* <div id="left" className="pl-9 cursor-pointer h-20 w-20" onClick={() => navigate('/')}> */}
        <img src={logo} alt="logo" className="object-cover pl-9 h-12 w-19 md:h-18 md:w-24 cursor-pointer" onClick={() => navigate('/')}/>
      {/* </div> */}
      <form id="center" onSubmit={handleSearch} className="ml-20 relative flex w-80">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="rounded-full py-2 px-4 w-full bg-slate-100 outline-none hidden md:block"
          placeholder="Search Products"
        />
        <BsSearch size={20} className="absolute right-5 top-2 text-slate-400 cursor-pointer  hidden md:block" />
      </form>
      <div id="right" className="flex space-x-3 gap-0 md:gap-8">
        <div className="flex relative">
          {user && user.picture ? <img src={user.picture} alt="user" className="h-9 w-9 rounded-full hidden md:block"/> : <VscAccount className="text-slate-600 h-5 w-5 md:h-6 md:w-6 lg:h-7 lg:w-7"  onClick={() => setDropdown(!Dropdown)}/>}
          <button className="px-2 cursor-pointer hidden md:block" onClick={() => setDropdown(!Dropdown)}>{user ? `${user.name}` : "Account"}</button>
          {Dropdown && (
        <div className="absolute top-10 mx-auto"> 
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 backdrop-blur-lg bg-black/40 rounded-lg w-28 md:w-40">
          {dropdownContent}
        </div>
      </div>)}
        </div>
        <div className="flex pr-9 gap relative items-center">
          {quantity>0 && (<span className="absolute bg-red-500 text-white left-3 rounded-full top-[-4px]">
          <p className="flex items-center h-5 w-5 justify-center">{quantity}</p>
          </span>)}
          <TbShoppingCartPlus className="text-slate-600 h-5 w-5 md:h-6 md:w-6 lg:h-7 lg:w-7" />
          <p onClick={() => navigate("/cart")} className="cursor-pointer hover:text-black duration-150">Cart</p>
        </div>
      </div>
    </div>
      </nav>

    <AuthUser isOpen={isOpen} setIsOpen={setIsOpen} setDropdown={setDropdown} isLogin={isLogin} setIsLogin={setIsLogin} />
    </>
  );
};

export default NavbarTesting;
