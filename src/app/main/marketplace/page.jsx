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
    const [productsArrays, setProductsArrays] = useState()
    
    const userID = useSelector((state) => state.user.userID);


    function filterProducts(value) {
        const results = value === "all" ? 
        data?.productsArray?.concat(data?.popularProductsArray) 
        : 
        data?.productsArray?.concat(data?.popularProductsArray).filter((product) => {
            return product.name === value || product.brandID == value;
        });
        console.log(`results: ${value} ` + results);
        // console.log("results: " + JSON.stringify(results));
        setProductsArrays(results);
        // console.log(value)
    }


    function search(searchQuery){
        console.log(searchQuery)
        const results = (searchQuery == "" ) ?
            data?.productsArray?.concat(data?.popularProductsArray)
            :
            data?.productsArray?.concat(data?.popularProductsArray).filter((product) => {
                return product?.name?.includes(searchQuery.trim().toLowerCase()) || product?.brandID?.includes(searchQuery.trim().toLowerCase());
            });
        console.log(`results: ${searchQuery} ` + data?.productsArray?.concat(data?.popularProductsArray));
        console.log("results: " + JSON.stringify(results));
        // setProductsArrays(results.length == 0 ? data?.productsArray?.concat(data?.popularProductsArray) : results);
        setProductsArrays(results.length == 0 ? data?.productsArray?.concat(data?.popularProductsArray) : results);
    }
    

    // const [productsArrays, setProductsArrays] = useState()

    useEffect(() => {
        const products = (data.productsArray && data.popularProductsArray) ? data.productsArray.concat(data.popularProductsArray) : []
        setProductsArrays(products)
    }, [data.productsArray, data.popularProductsArray])

    // console.log("productsArray ", data.productsArray)
    // console.log("popularProductsArray ", data.popularProductsArray)
    // console.log("combination of two collections: " + JSON.stringify(data?.productsArray?.concat(data?.popularProductsArray) , null , 2))
    return (
        <>
            <div className='w-full relative min-h-screen max-h-fit border border-red-600 overflow-y-auto'>
                <div className="p-[20px] flex flex-col gap-4 pb-[120px]">
                    <SearchBar search={search}/>
                    <BrandOptions filterProducts={filterProducts}/>
                    <div className="grid-container ">
                        {
                            data?.productsArray ?
                                (productsArrays?.map((product) => (<Product name={product.name} price={product.price} id={product.id} image={product?.imageGalleryImages[0].imageURL} collectionString={product.collectionString} productObj={product} />))) : 
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

