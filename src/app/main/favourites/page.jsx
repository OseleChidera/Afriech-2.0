"use client";
import Nav from '@/components/Nav'
import React, { useEffect, useState } from 'react'
import SearchBar from '@/components/searchbar/SearchBar'
import FavouriteProduct from '@/components/product/FavouriteProduct'
import { useSelector, useDispatch } from "react-redux";
import { getUserData } from '../../../utils/helperFunctions'
import FavouriteProductLoadingSleleton from '@/components/loading skeleton/FavouriteProductLoadingSleleton'

export default function page() {

  const firebaseUserInfo = useSelector((state) => state.user.firebaseUserInfo);
  const favouritesArray = useSelector((state) => state.user.data?.favouritesArray);
  const [arrayWithoutEmptyStrings, setArrayWithoutEmptyStrings] = useState([]);

  useEffect(() => {
    // Fetch data or perform any side effects
    setArrayWithoutEmptyStrings(favouritesArray?.filter(arrayItem => typeof arrayItem === "object" && arrayItem !== null) || []);
  }, [favouritesArray]);

  return (
    <div className="w-full relative min-h-screen max-h-fit border border-red-600 overflow-y-auto">
      <div className="p-[20px] flex flex-col gap-4 pb-[120px]">
        <div className="grid-container">
          {!favouritesArray ? (
            // Display loading skeleton while favouritesArray is being fetched
            [...new Array(8)].map((item, index) => <FavouriteProductLoadingSleleton key={index} />)
          ) : (
            // Check if arrayWithoutEmptyStrings is empty
            arrayWithoutEmptyStrings.length > 0 ? (
              // Map through arrayWithoutEmptyStrings if it's not empty
              arrayWithoutEmptyStrings.map((product) => (
                <FavouriteProduct
                  key={product.productID}
                  name={product.name}
                  price={product.price}
                  id={product.productID}
                  image={product?.imageGalleryImages[0].imageURL}
                  collectionString={product.collectionString}
                  productObj={product}
                />
              ))
            ) : (
              // Display "No Items To Display" text if arrayWithoutEmptyStrings is empty
              <div className="border border-black h-[50vh] w-[90vw] mx-auto text-xl text-[#695acd] flex items-center justify-center">
                <div className="h1">No Items To Display</div>
              </div>
            )
          )}
        </div>
      </div>
      <Nav />
    </div>
  );
}


