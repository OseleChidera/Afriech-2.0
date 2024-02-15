'use client'
import React, { useEffect, useState } from 'react'
import Nav from '@/components/Nav'
import Product from '@/components/product/Product'
import SearchBar from '@/components/searchbar/SearchBar'
import { useSelector, useDispatch } from "react-redux";
import BrandOptions from '@/components/brandOptions/BrandOptions'
import { array } from 'yup'
import { getUserData } from '@/utils/helperFunctions'
import { setPopularProductsData, setCurrentfirebaseUserInfo, setuserFavouritesData, setuserCartData, setuserFinancingData } from '@/redux/user'
import UnauthorizedAccess from '@/components/UnauthorizedAccess/UnauthorizedAccess'


const page = () => {
    // const dispatch = useDispatch();
    const productsData = useSelector((state) => state.user.productsData);
    const PopularProducts = useSelector((state) => state.user.PopularProducts);
    const firebaseUserInfo = useSelector((state) => state.user.firebaseUserInfo);
    const [productsArray, setProductsArray] = useState([])
    // const [userData, setUserData] = useState(null);
    // const [cart, setCart] = useState(null);
    // const [favourites, setFavourites] = useState(null);
    // const [financingData, setFinancingData] = useState(null);
    // const [popularProducts, setPopularProducts] = useState([])
    // console.table(productsData)
    const userID = useSelector((state) => state.user.userID);




    // dispatch(setPopularProductsData(popularProducts));
    // dispatch(setCurrentfirebaseUserInfo(userData));
    // dispatch(setuserFavouritesData(favourites));
    // dispatch(setuserCartData(cart));
    // dispatch(setuserFinancingData(financingData));

    useEffect(()=>{
        // getUserData(userID, setUserData, setCart, setFavourites, setFinancingData)
        const newProductsArray = productsData?.concat(PopularProducts)
        setProductsArray(newProductsArray)
    }, [])
    return (
        <>
            <div className='w-full relative min-h-screen max-h-fit border border-red-600 overflow-y-auto'>
                <div className="p-[20px] flex flex-col gap-4 pb-[120px]">
                    <SearchBar />
                    <BrandOptions />
                    <div className="grid-container ">
                        {
                            productsArray?.map((product) => (<Product name={product.name} price={product.price} id={product.id} image={product?.imageGalleryImages[0].imageURL} collectionString={product.collectionString} productObj={product} />))
                        }
                    </div>
                </div>
                <Nav />
            </div>
        </>
    )
}

export default page

