'use client'
import React, { useEffect, useState } from 'react'
import Nav from '@/components/Nav'
import Product from '@/components/product/Product'
import SearchBar from '@/components/searchbar/SearchBar'
import { useSelector, useDispatch } from "react-redux";
import BrandOptions from '@/components/brandOptions/BrandOptions'
import ProductLoadingSleleton from '@/components/loading skeleton/ProductLoadingSleleton'
import { array } from 'yup'
import { getUserData } from '@/utils/helperFunctions'
import { setPopularProductsData, setCurrentfirebaseUserInfo, setuserFavouritesData, setuserCartData, setuserFinancingData } from '@/redux/user'
import UnauthorizedAccess from '@/components/UnauthorizedAccess/UnauthorizedAccess'


const page = () => {
    // const dispatch = useDispatch();
    const data = useSelector((state) => state.user.data);
    const productsData = useSelector((state) => state.user.productsData);
    const PopularProducts = useSelector((state) => state.user.PopularProducts);
    const firebaseUserInfo = useSelector((state) => state.user.firebaseUserInfo);
    const [productsArray, setProductsArray] = useState([])
    
    const userID = useSelector((state) => state.user.userID);


    function filterProducts(value) {
        const results = value === "all" ? productsArray : productsArray.filter((product) => {
            return product.name === value || product.brandID === value;
        });
        console.log("results: " + results);
        console.log("results: " + JSON.stringify(results));
        setProductsArray(results);
        console.log("productsArray: " + productsArray);
    }

    

    useEffect(()=>{
        const newProductsArray = data?.productsArray?.concat(data?.popularProductsArray)
        setProductsArray(newProductsArray)
    }, [])
    return (
        <>
            <div className='w-full relative min-h-screen max-h-fit border border-red-600 overflow-y-auto'>
                <div className="p-[20px] flex flex-col gap-4 pb-[120px]">
                    <SearchBar />
                    <BrandOptions filterProducts={filterProducts}/>
                    <div className="grid-container ">
                        {
                            data?.productsArray ?
                            (data?.productsArray?.concat(data?.popularProductsArray)?.map((product) => (<Product name={product.name} price={product.price} id={product.id} image={product?.imageGalleryImages[0].imageURL} collectionString={product.collectionString} productObj={product} />))) : 
                            ([...new Array(10)].map((product) => (<ProductLoadingSleleton />)))
                        }
                    </div>
                </div>
                <Nav />
            </div>
        </>
    )
}

export default page

