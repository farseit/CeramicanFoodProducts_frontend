"use client";
import { useContext, useState } from "react";
import { BsCartDash } from "react-icons/bs";
import { BiGitCompare } from "react-icons/bi";
import { IoHeartDislike, IoHeartOutline } from "react-icons/io5";
import { HandlerContext } from "@/lib/providers/HandlerProvider";
import { useDispatch } from "react-redux";
import ProductAttributes from "./ProductAttributes";
import { addToCart } from "@/lib/features/cart/cartSlice";

const ProductActionButton = ({ product }) => {
  const { handleAddWishlist, wishProducts, handleRemoveWishListProduct } =
    useContext(HandlerContext);
  const [inputAttribute, setInputAttribute] = useState({});
  const dispatch = useDispatch();

  // json attributes
  // let attr = {};
  // attributes.forEach((attribute, idx) => {
  //   const properties = Object.keys(attribute);
  //   attr = { ...attr, [properties]: attribute[properties] };
  // });

  const handleAddToCart = (product) => {
    let count = 1;
    let totalPrice = product.price;

    if (product.count) {
      count++;
      totalPrice = totalPrice + product.price;
    }

    console.log(inputAttribute);

    const cartInfo = {
      name: product.name,
      image: product.image,
      productId: product.id,
      price: product.price,
      count,
      totalPrice,
      attributes: inputAttribute,
    };

    dispatch(addToCart(cartInfo));
  };

  //get added wish list product
  const addedWishProduct = wishProducts.find((pd) => pd.id === product.id);

  return (
    <div>
      {/* here attribute radio button */}
      <ProductAttributes
        inputAttribute={inputAttribute}
        setInputAttribute={setInputAttribute}
      />
      <div className="flex flex-wrap gap-2.5">
        {/* add to card button*/}
        <button
          onClick={() => handleAddToCart(product)}
          className="flex items-center gap-2 bg-[#192a56] px-4 py-2 text-white rounded-full active:scale-95 duration-200 font-medium hover:bg-[#273c75]"
        >
          <BsCartDash className="text-xl" /> <span>Add To Cart</span>
        </button>
        {/* Compare button */}
        {/* <button className="flex items-center gap-2 bg-[#192a5633] px-4 py-2  rounded-full active:scale-95 duration-200 font-medium hover:bg-[#192a56] hover:text-white">
          <BiGitCompare className="text-xl rotate-90" /> <span>Compare</span>
        </button> */}
        {/* {addedWishProduct?.id === product?.id ? (
          <button
            onClick={() => handleRemoveWishListProduct(product.id)}
            className="flex items-center gap-2 bg-[#192a5633] px-4 py-2  rounded-full active:scale-95 duration-200 font-medium hover:bg-[#192a56] hover:text-white"
          >
            <IoHeartDislike className="text-xl" /> <span>Remove Wishlist</span>
          </button>
        ) : (
          <button
            onClick={() => handleAddWishlist(product)}
            className="flex items-center gap-2 bg-[#192a5633] px-4 py-2  rounded-full active:scale-95 duration-200 font-medium hover:bg-[#192a56] hover:text-white"
          >
            <IoHeartOutline className="text-xl" /> <span>Add Wishlist</span>
          </button>
        )} */}
      </div>
    </div>
  );
};

export default ProductActionButton;
