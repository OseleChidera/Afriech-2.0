// import { extractLastName } from '@/utils/helperFunctions';

// const sgMail = require('@sendgrid/mail');
// sgMail.setApiKey(process.env.NEXT_PUBLIC_SENDGRID_API_KEY);


// async function sendMailReciept(fullName, userEmail, orderID, orderObject, ammountPaid){
//     const username = extractLastName(fullName)

//     const template = `
//         <!DOCTYPE html>
//         <html lang="en">
//         <head>
//         <meta charset="UTF-8">
//         <meta name="viewport" content="width=device-width, initial-scale=1.0">
//         <title>You just made a payment to Afritech for order <b>#${orderID}</b></title>
//         </head>
//         <body>
//         <h1>Hello ${username}, you just made a payment of ₦${ammountPaid} to Afritech for order <b>#${orderID}</b></h1>
        
//         <p>Here is some information:</p>
//         <div className="email-product-list">
//             ${orderObject?.orderProducts?.map((item) => {
//         return (
//             <div class="email-product">
//                 <div class="email-product-image">
//                     <img src={cartItemData?.imageGalleryImages[0].imageURL} class="" width="70" height="70" />
//                 </div>
//                 <div class="email-product-title">
//                     <h2 class="">
//                         {item?.name}
//                     </h2>
//                     <h3 class="">₦{item.price}</h3>
//                 </div>
//             </div>

//         )
//     })}
//         </div>
//         <h1>Outstanding balance : ₦${orderObject.leftToPay}</h1>
//         <p>Regards,</p>
//         <p>Afritech Team</p>
//         </body>
//         </html>
// `;

//     const msg = {
//         to: userEmail,
//         from: 'test@example.com', // Use the email address or domain you verified above
//         subject: 'You just made payment on Afritech',
//         text: 'and easy to do anywhere, even with Node.js',
//         html: template,
//     };

//     try {
//         await sgMail.send(msg);
//     } catch (error) {
//         console.error(error);

//         if (error.response) {
//             console.error(error.response.body)
//         }
//     }
// }