import * as React from "react";
import Box from "@mui/material/Box";
import OrderSummeryCard from "./OrderSummeryCard";
import { RiFileList2Fill } from "react-icons/ri";
import { BsFillCartCheckFill } from "react-icons/bs";
import { FaBox } from "react-icons/fa";
import { BsFillBoxSeamFill } from "react-icons/bs";
const OrderSummery = () => {
  const orderSummery = [
    {
      title: "Today Order",
      icon: <RiFileList2Fill className="text-[60px] text-dash-primary" />,
      amount: 450,
    },
    {
      title: "This Weekly",
      icon: <BsFillCartCheckFill className="text-[60px] text-dash-primary" />,
      amount: 300,
    },
    {
      title: "This Month",
      icon: <BsFillBoxSeamFill className="text-[60px] text-dash-primary" />,
      amount: 450,
    },
    {
      title: "Total Order",
      icon: <FaBox className="text-[55px] text-dash-primary" />,
      amount: 500,
    },
  ];
  return (
    <section>
      <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {orderSummery.map((summery, idx) => (
          <OrderSummeryCard key={idx} summery={summery} />
        ))}
      </Box>
    </section>
  );
};

export default OrderSummery;
