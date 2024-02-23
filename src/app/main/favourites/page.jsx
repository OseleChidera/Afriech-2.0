'use client'
import Nav from '@/components/Nav'
import React, {useEffect , useState} from 'react'
import SearchBar from '@/components/searchbar/SearchBar'
import FavouriteProduct from '@/components/product/FavouriteProduct'
import { useSelector, useDispatch } from "react-redux";
import {getUserData} from '../../../utils/helperFunctions'
import FavouriteProductLoadingSleleton from '@/components/loading skeleton/FavouriteProductLoadingSleleton'


export default function page() {
  
  
  const firebaseUserInfo = useSelector((state) => state.user.firebaseUserInfo);
  const data = useSelector((state) => state.user.data);
  const [userData, setUserData] = useState(firebaseUserInfo ? firebaseUserInfo?.favourites : null);

useEffect(()=>{

},[])

  // console.log("userData from favourites ", userData.favouritedArray)
  // console.log("firebaseUserInfo from favourites ", firebaseUserInfo)
  return (
    <div className='w-full relative min-h-screen max-h-fit border border-red-600 overflow-y-auto'>
      <div className="p-[20px] flex flex-col gap-4 pb-[120px]">
        <div className="grid-container ">
          { data?.favouritesArray ?
            (data?.favouritesArray?.map((product) => (<FavouriteProduct name={product.name} price={product.price} id={product.productID} image={product?.imageGalleryImages[0].imageURL} collectionString={product.collectionString} productObj={product} />))) :
            [...new Array(8)].map(item => <FavouriteProductLoadingSleleton />)
          }
          
        </div>
      </div>
      <Nav />
    </div>
  )
}
