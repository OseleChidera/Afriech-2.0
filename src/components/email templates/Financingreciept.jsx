import React from 'react'

export default function Financingreciept(fullName , orderID, orderObject , ammountPaid) {
    

    const template = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email Template</title>
        </head>
        <body>
        <h1>Hello ${username}, you just made a payment of ₦${ammountPaid} to Afritech for order <b>#${orderID}</b></h1>
        
        <p>Here is some information:</p>
        <div className="email-product-list">
            ${orderObject?.orderProducts?.map((item , index) => {
                return (
                    <div class="email-product" key={index}>
                        <div class="email-product-image">
                            <img src={cartItemData?.imageGalleryImages[0].imageURL} class="" width="70" height="70" />
                        </div>
                        <div class="email-product-title">
                            <h2 class="">
                                {item?.name}
                            </h2>
                            <h3 class="">₦{item.price}</h3>
                        </div>
                    </div>

                )
            })}
        </div>
        <h1>Outstanding balance : ₦${orderObject.leftToPay}</h1>
        <p>Regards,</p>
        <p>Afritech Team</p>
        </body>
        </html>
`;

  return (
    <div>Financingreciept</div>
  )
}
