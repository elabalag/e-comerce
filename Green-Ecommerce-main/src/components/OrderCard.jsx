import React, { useEffect, useState } from "react";
import { client, urlFor } from "../client";
import Skeleton from "react-loading-skeleton";

const OrderCard = ({ product, quantity, size }) => {
  const [item, setItem] = useState(null);
  useEffect(() => {
    async function fetchData() {
      const data = await client.getDocument(product.id);
      setItem(data);
    }
      fetchData();
  }, [])

  if (item === null) {
    return (
      <div className="grid grid-cols-4 items-center gap-x-4">
        <Skeleton height={100} className="col-span-1"/>
        <Skeleton count={4} className="col-span-3"/>
      </div>
    );
  }

  return (
    <div className="p-3 rounded-md flex space-x-5 items-center">
      <div className="h-28 w-28 object-cover relative mb-5">
        <img
          src={urlFor(item.thumbnail)}
          alt={item.title}
          className="absolute"
        />
      </div>

      <div className="flex justify-between w-full">
        <div>
          <p>
            <span className="font-semibold pr-2">Title:</span> {item.title}
          </p>
          <p>
            <span className="font-semibold pr-2">Subtitle:</span>{" "}
            {item.subtitle}
          </p>
          <p>
            <span className="font-semibold pr-2">Price: ₹</span>
            {item.price}
          </p>
          <p>
            <span className="font-semibold pr-2">Size:</span> {size}
          </p>
        </div>

        <div>
          <p className="text-xl">x{quantity}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
