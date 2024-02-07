"use client";
import Image from "next/image";
import React, { useState } from "react";
import phone from "../../../public/images/samsung-galaxy-s21-ultra-5g-4.jpg";
import addIcon from "../../../public/icons/add.svg";
import favourite from "../../../public/icons/favourite.svg";
import favouriteClicked from "../../../public/icons/favouriteChecked.svg";
import trashIcon from "../../../public/icons/trashIcon.svg";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  formatNumberWithCommas,
  addItemsToCart,
  removeItemFromCart,
  addItemsToFavourites,
  removeItemFromFavourites
} from "../../utils/helperFunctions";
import { useSelector } from "react-redux";
// import { toast } from "react-toastify";

const Product = ({ name, price, id }) => {
  const pathName = usePathname();
  const [isFavouriteClicked, setIsFavouriteClicked] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  const [isFavourited, setIsFavourited] = useState(false);
  const [productCartID, setProductCarTID] = useState("");
  const [productFavouriteID, setProductFavouriteID] = useState("");

  //When a product is added to the car, some properties are removed from the product object and some properties are added like isCkecked
  const [isPathNameActive, setIsPathNameActive] = useState(
    pathName.includes(`/main/favourite`)
  );
  const userID = useSelector((state) => state.user.userID);
  // function addtoFavourites(){
  //   setIsFavouriteClicked(!isClicked)
  // }

  function addItemToCartFromProduct() {
    setIsInCart(!isInCart);
    addItemsToCart(id, 1, userID, setProductCarTID);
    console.log("productCartIDDDDDDDDD" + productCartID);
  }

  function removeFromFavourites() {
    console.log("ProductFavouriteID" + setProductFavouriteID);
    removeItemFromFavourites(id, userID, productFavouriteID)
  }

  function addtoFavourites() {
    setIsFavourited(!isFavourited);
    addItemsToFavourites(id, userID, setProductFavouriteID);
    console.log("ProductFavouriteID" + setProductFavouriteID);
  }

  function removeProductFromCart(productCartID) {
    if (productCartID == "") {
      return;
    }
    removeItemFromCart(id, productCartID, userID);
    setIsInCart(!isInCart);
  }

  // console.log("productCartIDDDDDDDDD" + productCartID)

  return (
    <div className="product  relative rounded-xl  bg-white overflow-hidden ">
      <div className=" w-fit  max-h-fit rounded-xl  shadow-2xl bg-whie border border-black overflow-hidden">
        <Image src={phone} className="aspect-auto object-cover " width={180} />
      </div>
      <Link href="/product/[id]" as={`/product/${id}`}>
        <div className="info p-2">
          <h2 className="text-base font-semibold ">{name}</h2>
          <h3 className="text-sm">₦{formatNumberWithCommas(price)}</h3>
        </div>
      </Link>

      {!isPathNameActive ? (
        !isInCart && (
          <div
            className="absolute bg-[#695acde4] bottom-0 right-0 rounded-t-xl rounded-b-xl rounded-bl-none runded rounded-tr-none p-[0.3rem]"
            onClick={addItemToCartFromProduct}
          >
            <Image src={addIcon} width={20} />
          </div>
        )
      ) : (
        <div
          className="absolute bg-[#695acde4] bottom-0 right-0 rounded-t-xl rounded-b-xl rounded-bl-none runded rounded-tr-none p-[0.3rem]"
          onClick={() => removeProductFromCart(productCartID)}
        >
          <Image src={trashIcon} width={20} />
        </div>
      )}

      {!isPathNameActive && ( !isFavourited ? 
      (<div onClick={() => addtoFavourites()} className={`absolute bg-[#695acde4] top-0 right-0 rounded-t-nne rounded-br-none rounded-bl-xl runded rounded-tr-xl p-[0.3rem]`}>
          <Image src={favourite} width={20} className={``} />
        </div>) 
        : 
      (<div onClick={() => removeFromFavourites()} className={`absolute bg-[#695acde4] top-0 right-0 rounded-t-nne rounded-br-none rounded-bl-xl runded rounded-tr-xl p-[0.3rem]`}>
        <Image src={favouriteClicked} width={20} className={`scaleLikeIcon`}/>
      </div>)
        )
      }
    </div>
  );
};

export default Product;
