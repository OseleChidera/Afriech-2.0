"use client";
import Nav from "@/components/Nav";
import React, { useState } from "react";
import { usePaystackPayment } from "react-paystack";
import { PaystackButton } from 'react-paystack';
import { useSelector, useDispatch } from "react-redux";
import PaymentProduct from "./PaymentProduct";
import { formatNumberWithCommas, updateFinancingItemPrice } from "@/utils/helperFunctions";

export default function PaymentCompleteComponent({ orderID, productsArray, leftToPay, financingTotal }) {
    // console.log("products array: " + JSON.stringify(productsArray, null, 2));
    const firebaseUserInfo = useSelector((state) => state.user.firebaseUserInfo);
    const userID = useSelector((state) => state.user.userID);


    const [amount, setAmount] = useState("");



    return (
        <>
            <div className="">
                <details className="relative border border-black w-full p-2 rounded-lg  text-white bg-[#695acd9f]  text-balance ">
                    <summary className=" flex justify-between">
                        <div className=" text-lg font-semibold capitalize">
                            order #{orderID}
                        </div>
                        <div className="  text-white">
                            Payment Complete
                        </div>
                        <div className=" text-white font-bold font-lg">
                            {productsArray?.length}
                        </div>
                    </summary>
                    <div className="flex flex-col gap-1 mb-2">
                        {productsArray?.map((product , index) => (
                            <PaymentProduct
                                key={index}
                                productID={product.id}
                                productName={product.name}
                                productPrice={product.price}
                                productImageUrl={product?.imageGalleryImages[0]?.imageURL}
                            />
                        ))}
                    </div>
                </details>
            </div>
        </>
    );
}


