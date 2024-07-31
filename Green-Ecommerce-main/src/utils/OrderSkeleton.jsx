import React from "react";
import Skeleton from "react-loading-skeleton";

const OrderSkeleton = ({ times }) => {
  const repetation = Array.from({ length: times });
  return (
    <div className=' gap-5 grid grid-cols-1 lg:grid-cols-2 items-baseline'>
      {repetation.map((_, index) => (
        <div key={index}>
          <Skeleton height={260} className="mb-1" />
          <Skeleton count={3} />
        </div>
      ))}
    </div>
  );
};

export default OrderSkeleton;
