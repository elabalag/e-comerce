import React, { useState } from 'react';
import {BsFacebook, BsInstagram, BsTwitter} from "react-icons/bs"

const Footer = () => {
  const [email, setEmail] = useState("")
  return (
    <div className='bg-slate-50 py-4 mt-12'>
    <div className='mx-auto w-11/12 grid grid-cols-3 md:grid-cols-5  mb-4'>
      <div>
        <h1 className='font-semibold'>Gallery</h1>
        <p>Community</p>
        <p>Trending</p>
        <p>Picks</p>
      </div>

      <div>
        <h1 className='font-semibold'>Marketplace</h1>
        <p>Trending</p>
        <p>Best selling</p>
        <p>Latest</p>
      </div>

      <div>
        <h1 className='font-semibold'>Magazine</h1>
        <p>Art Skills</p>
        <p>Career</p>
        <p>Inspiration</p>
        <p>News</p>
      </div>

      <div className='col-span-2'>
        <h1 className='font-semibold'>Newsletter</h1>
        <p>Subscribe to our newsletter to get your weekly dose of news, updates, tips and special offers</p>
        <form className='pt-3' onSubmit={(e) => {e.preventDefault(); setEmail("")}}>
            <input type="text" name="newsletter" value={email} onChange={(e) => setEmail(e.target.value)} className='w-full p-2 mb-2 rounded-md outline-none text-slate-700' placeholder="Enter your email address" /><br />
            <button type="submit" className='bg-green-500 w-full text-white py-2 rounded-md hover:bg-green-600 duration-150 transition-all'>Subscribe</button>
        </form>
      </div>
    </div>
    <hr className='py-3'/>
    <div className='mx-auto w-11/12'>
    <div className='flex justify-between mx-auto'>
        <p className='text-slate-700'>Privacy Policy  •  Terms and conditions</p>
        <div className='flex gap-4'>
            <BsFacebook className='text-blue-600' size={25}/>
            <BsTwitter className='text-blue-500' size={25}/>
            <BsInstagram size={25}/>
        </div>
    </div>
    </div>
    </div>
  )
}

export default Footer
