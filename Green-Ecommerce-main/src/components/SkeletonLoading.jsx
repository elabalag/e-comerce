import React from "react";
import Skeleton from "react-loading-skeleton";

const SkeletonLoading = ({ times }) => {
  const repetation = Array.from({ length: times });
  return (
    <div className="w-full grid gap-1 mx-auto grid-cols-2 gap-y-5 gap-x-1 md:gap-x-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 justify-evenly">
      {repetation.map((_, index) => (
        <div key={index}>
          <Skeleton height={400} className="mb-1" />
          <Skeleton count={3} />
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoading;
