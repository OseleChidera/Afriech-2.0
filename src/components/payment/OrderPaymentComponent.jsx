"use client";
import Nav from "@/components/Nav";
import React, { useState } from "react";
import { usePaystackPayment } from "react-paystack";
import { PaystackButton } from 'react-paystack';
import { useSelector, useDispatch } from "react-redux";
import PaymentProduct from "./PaymentProduct";
import { formatNumberWithCommas, updateFinancingItemPrice } from "@/utils/helperFunctions";

export default function OrderPaymentComponent({ orderID, productsArray, leftToPay, financingTotal }) {
    // console.log("products array: " + JSON.stringify(productsArray, null, 2));
  const firebaseUserInfo = useSelector((state) => state.user.firebaseUserInfo);
    const userID = useSelector((state) => state.user.userID);

    
  const [amount, setAmount] = useState("");

    // const totalPrice = productsArray?.reduce((accumulator, currentValue) => {
    //     // Add the price of the current object to the accumulator
    //     // console.log("total price ", accumulator + currentValue.price);
    //     return accumulator + currentValue.price;
    // }, 0);



  const config = {
    reference: new Date().getTime().toString(),
    email: "oselechidera590@example.com",
    amount: amount * 100, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
    publicKey: "pk_test_bbdb49fa16552c394bffa9784b6772dfe96bb01f",
    metadata: {
      custom_fields: [
        {
          display_name: "food",
          variable_name: "descr--------------iption",
          value: "Funding Wallet",
        },
        // To pass extra metadata, add an object with the same fields as above
      ],
    },
  };

 

  const initializePayment = usePaystackPayment(config);

  function configurePayment(orderNumber) {
    // config.amount = ammount;
    // config.reference = `${(new Date()).getTime().toString() }_#${orderNumber}`
    config.metadata.custom_fields[0].display_name = `${firebaseUserInfo.fullname}`;
    config.metadata.custom_fields[0].variable_name = `Part payment for order #${orderNumber}`;
    config.metadata.custom_fields[0].value = `Order #${orderNumber} payment`;
   
  }
    const handlePaystackSuccessAction = (reference) => {
        // Implementation for whatever you want to do with reference and after success call.
        console.log(reference);
        updateFinancingItemPrice(orderID, amount, userID, config.email)
        setAmount('')
    };

    // you can call this function anything
    const handlePaystackCloseAction = () => {
        // implementation for  whatever you want to do when the Paystack dialog closed.
        console.log('closed')
    }

    const componentProps = {
        ...config,
        onSuccess: (reference) => handlePaystackSuccessAction(reference),
        onClose: handlePaystackCloseAction,
    };

  return (
    <>
      <div>
        <details className="relative border border-black w-full p-2 rounded-lg  text-white bg-[#695acd] text-balance ">
          <summary className=" flex justify-between">
            <div className=" text-lg font-semibold capitalize">
              order #{orderID}
            </div>
            <div className="  text-white">
                          ₦{formatNumberWithCommas(leftToPay)}
            </div>
            <div className="  bg-[#695acd] text-white font-bold font-lg">
              {productsArray?.length}
            </div>
          </summary>
          <div className="flex flex-col gap-1 mb-2">
            {productsArray?.map((product) => (
              <PaymentProduct
                productID={product.id}
                productName={product.name}
                productPrice={product.price}
                productImageUrl={product?.imageGalleryImages[0]?.imageURL}
              />
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="indent-2 p-0  max-w-1/2 text-black"
              placeholder={`Total to pay ₦${formatNumberWithCommas(leftToPay )}`}
            />
            <div className="info p-2 text-black flex flex-col items-center">
            <PaystackButton {...componentProps} >
              <button
                className={`px-5 border border-black bg-white text-[#695acd] capitalize text-center py-1 rounded-md w-full ${
                  amount > leftToPay  ? "opacity-[0.5]" : ""
                }`}
                onClick={() => configurePayment( orderID)}
                disabled={amount > leftToPay  || !amount}
              >
                Make Payment
              </button>
                </PaystackButton>
                {(amount > leftToPay) && (
                <span className="text-xs text-red-700">Exceeds required</span>
              )}
            </div>
          </div>
        </details>
      </div>
    </>
  );
}
