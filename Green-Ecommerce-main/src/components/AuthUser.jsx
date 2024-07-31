// import { LoginSocialGoogle } from "reactjs-social-login";
// import { GoogleLoginButton } from "react-social-login-buttons";
import { Dialog } from "@headlessui/react";
import LoginImg from "../assets/login.jpg";
import userSlice, { setUser } from "../redux/userSlice";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import React, { useState } from "react";
import { Loader } from 'rsuite';
import axios from "axios";

const AuthUser = ({ isOpen, setIsOpen, isLogin, setIsLogin }) => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch(userSlice);

  async function handleForm(e) {
    e.preventDefault();

    if(!email.includes("@")) {
      toast.error("Please enter a valid email address.", {position: "bottom-center"})
      return;
    }
    if(password.length < 5) {
      toast.error("Please ensure that the password is atleast 5 characters in length", {position: "bottom-center"})
      return;
    }
    if(!isLogin && name.length < 5) {
      toast.error("Please ensure that the name is atleast 5 characters in length", {position: "bottom-center"})
      return;
    }
    
    setLoading(true);
    if (isLogin) {
      try {
        const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/auth/login`, {email, password});
        const { token, user } = res.data;
        console.log(user);
        toast.success("Login successfully", {position: "bottom-center"})
        dispatch(setUser({data: user, token: token}))
        setLoading(false);
        setInterval(() => {
          setIsOpen(false);
        }, 400)
      } catch (e) {
        toast.error(e.response.data.message, {position: "bottom-center"})
        setLoading(false);
      }
    } else {
      try {
      const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/auth/register`, {name, email, password});
      const { token, user } = res.data;
      dispatch(setUser({data: user, token: token}))
      toast.success("Account created successfully", {position: "bottom-center"})
      setLoading(false);
      setInterval(() => {
        setIsOpen(false);
      }, 400)
    } catch (e) {
      toast.error(e.message, {position: "bottom-center"})
      setLoading(false);
    }
    }
  }

  return (
    <Dialog
      className="relative z-50"
      open={isOpen}
      onClose={() => {
        setIsOpen(false);
      }}
    >
      <div className="fixed inset-0 bg-black/30" />
      <div className="fixed inset-0 flex items-center justify-center px-4 md:px-10 py-7">
        <Dialog.Panel className="bg-white p-4 md:p-9 h-full w-full md:w-3/4 lg:w-1/2">
          <p className="text-center text-xl md:text-2xl lg:text-3xl mb-8 font-semibold">
            {isLogin ? "Login" : "Register"}
          </p>
          <img src={LoginImg} alt="img" className="mx-auto mb-7 h-2/6 w-2/4 md:h-[200px] md:w-2/4" />

          <form className="flex flex-col space-y-2" onSubmit={handleForm}>
            {!isLogin && (
              <input
                type="text"
                name="name"
                className="textField"
                placeholder="Enter your username"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            )}
            <input
              type="text"
              name="email"
              className="textField"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              name="password"
              className="textField"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="button">{isLogin ? !loading ? "Login" : <Loader content="Loading..." /> : !loading ? "Register" : <Loader content="Loading..." />}</button>
          </form>

          {!isLogin ? (
            <div className="flex items-center space-x-2">
              <p className="text-center my-3">Already have an account?</p>
              <span onClick={() => setIsLogin(true)} className="text-green-500 cursor-pointer">Login</span>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <p className="text-center my-3">Don't have an account?</p>
              <span onClick={() => setIsLogin(false)} className="text-green-500 cursor-pointer">Register</span>
            </div>
          )}

          {/* <p className="text-center my-3">OR</p> */}

          {/* <LoginSocialGoogle
            client_id={
              "75079-sda7765.apps.googleusercontent.com replace key" ||
              ""
            }
            onResolve={({ provider, data }) => {
              dispatch(setUser({ data, provider }));
              setDropdown(false);
              setIsOpen(false);
              fetch("http://localhost:3000/login", { provider, data });
            }}
            onReject={(err) => {
              console.log(err);
              setDropdown(false);
              setIsOpen(false);
            }}
          >
            <GoogleLoginButton
              text={isLogin ? "Log in with Google" : "Sign up with Google"}
            />
          </LoginSocialGoogle> */}
        </Dialog.Panel>
      </div>
      <Toaster />
    </Dialog>
  );
};

export default AuthUser;
