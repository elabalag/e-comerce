import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import EmptyCart from './EmptyCart';

const ProtectedRoute = () => {
  const user = useSelector(state => state.user.user);

  if(!user) {
    return (
        <div>
           <EmptyCart message={"Please Login to access the"}/>
        </div>
    )
  }

  return (
    <div>
      <Outlet />
    </div>
  )
}

export default ProtectedRoute
