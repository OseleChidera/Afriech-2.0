"use client";
import Nav from "@/components/Nav";
import React, { useState } from "react";
import { usePaystackPayment } from "react-paystack";
import { PaystackButton } from 'react-paystack';
import { useSelector, useDispatch } from "react-redux";
import PaymentProduct from "./PaymentProduct";
import { formatNumberWithCommas, updateFinancingItemPrice, sendEmail } from "@/utils/helperFunctions";

export default function OrderPaymentComponent({ orderID, productsArray, leftToPay, financingTotal }) {
    // console.log("products array: " + JSON.stringify(productsArray, null, 2));
  const firebaseUserInfo = useSelector((state) => state.user.firebaseUserInfo);
  const data = useSelector((state) => state.user.data);
    const userID = useSelector((state) => state.user.userID);

    
  const [amount, setAmount] = useState("");
  const [amountLeftToPay, setAmountLeftToPay] = useState("");

 


  const config = {
    reference: new Date().getTime().toString(),
    email: firebaseUserInfo.email,
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

  function findOrder(orderID){
    // console.log("orderID: " + orderID);
    // console.log(firebaseUserInfo?.financing)
  let order = firebaseUserInfo?.financing?.find((order)=>order.orderId == orderID)
    // console.log("order: ", order)
  return order;
 }

  const initializePayment = usePaystackPayment(config);

  function configurePayment(orderNumber) {
    
    config.metadata.custom_fields[0].display_name = `${firebaseUserInfo.fullname}`;
    config.metadata.custom_fields[0].variable_name = `Part payment for order #${orderNumber}`;
    config.metadata.custom_fields[0].value = `Order #${orderNumber} payment`;
   
  }
    async function handlePaystackSuccessAction (reference){
        // Implementation for whatever you want to do with reference and after success call.
        console.log(reference);
      updateFinancingItemPrice(orderID, amount, userID, config.email, setAmountLeftToPay)
      console.log("send email  function: " + {
        fullName: data.userData.fullname,
        userEmail: data.userData.email,
        orderID: orderID,
        orderObject: findOrder(orderID),
        amountPaid: amount,
        transactionNumber: reference.transaction,
        reference: reference.trxref,
      })
       sendEmail({
        fullName: data.userData.fullname,
        userEmail: data.userData.email,
        orderID: orderID,
        orderObject: findOrder(orderID),
        amountPaid: amount,
        transactionNumber: reference.transaction,
        reference: reference.trxref,
      });
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
      <div className="">
        <details className="relative border border-black w-full p-2 rounded-lg  text-white bg-[#695acd] text-balance ">
          <summary className=" flex justify-between">
            <div className=" text-lg font-semibold capitalize">
              order #{orderID}
            </div>
            <div className="  text-white">
                          ₦{formatNumberWithCommas(leftToPay)}
            </div>
            <div className="  text-white font-bold font-lg">
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
            id="checkoutInput"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className=" text-black w-1/2"
              placeholder={`Total to pay ₦${formatNumberWithCommas(leftToPay )}`}
            />
            <div className="flex flex-row gap-3">
              
                <div id="percentageValues" className="flex flex-col gap-3 items">
                  <button
                    className={`px-5 border border-black bg-white text-[#695acd] capitalize text-center py-1 rounded-md w-full ${amount > leftToPay ? "opacity-[0.5]" : ""
                      }`}
                    onClick={() => setAmount(leftToPay / 2)}
                    // disabled={amount > leftToPay || !amount}
                  >
                    50%
                  </button>
                  <button
                    className={`px-5 border border-black bg-white text-[#695acd] capitalize text-center py-1 rounded-md w-full ${amount > leftToPay ? "opacity-[0.5]" : ""
                      }`}
                    onClick={() => setAmount(leftToPay)}
                    // disabled={amount > leftToPay || !amount}
                  >
                    100%
                  </button>
              
              </div>
              <div className="info p-2 text-black flex flex-col items-center border border-black justify-center">
                <PaystackButton {...componentProps} >
                  <button
                    className={`px-5 border border-black bg-white text-[#695acd] capitalize text-center py-1 rounded-md w-full ${amount > leftToPay ? "opacity-[0.5]" : ""
                      }`}
                    onClick={() => configurePayment(orderID)}
                    disabled={amount > leftToPay || !amount}
                  >
                    Pay
                  </button>

                </PaystackButton>
                {(amount > leftToPay) && (
                  <span className="text-xs text-red-700">Exceeds required</span>
                )}
              </div>
            </div>
            
          </div>
        </details>
      </div>
    </>
  );
}


