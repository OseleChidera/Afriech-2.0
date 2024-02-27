// Import necessary modules and set up your server (e.g., using Express)
const express = require('express');
const sgMail = require('@sendgrid/mail');
const app = express();
const port = 5000
require('dotenv').config();
const cors = require('cors');
app.use(cors({
    origin: 'http://localhost:3000',
}));
// Set up SendGrid API key
// sgMail.setApiKey(process.env.NEXT_PUBLIC_SENDGRID_API_KEY);

// Set the Referrer-Policy header to "no-referrer"
app.use((req, res, next) => {
  res.setHeader('Referrer-Policy', 'no-referrer');
  next();
});

app.use(express.json());

app.get('/',(req, res) => {
    res.send('get request is working')
})


// Endpoint to send email
app.post('/send-email', async (req, res) => {
    // console.log("logged in post request", req.body) 
    const { fullName, userEmail, orderID, orderObject, amountPaid, transactionNumber, reference, amountLeftToPay } = req.body;
    // console.log(fullName, userEmail, orderID, orderObject, amountPaid)
console.log("amountLeftToPay - amountPaid: " + eval(orderObject?.leftToPay - amountPaid))
    function splitName(fullName){
        // Split the full name by whitespace
        const nameParts = fullName.split(' ');

        // Check if there are multiple parts
        if (nameParts.length > 1) {
            // If there are multiple parts, return the last part (last name)
            return nameParts[nameParts.length - 1];
        } else {
            // If there's only one part, return the whole string (last name)
            return fullName;
        }
    }

     function formatNumberWithCommas(value) {
        // Check if value is defined and not null
        if (value !== undefined && value !== null) {
            // Convert the number to a string
            let numberString = value.toString();

            // Use a regular expression to add commas
            numberString = numberString.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

            return numberString;
        }

        // Return a default value or handle the case when value is undefined or null
        return "N/A";
    }

    console.log("an attempt was made to post a request ", req.body)
    try {
  
        const emailTemplateComplete = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>You just made a payment to Afritech for order <b>#${orderID}</b></title>
        </head>
        <body>
        <p class="email-p">     Hello ${splitName(fullName)}, you just completed your payment for order number <b>#${orderID}</b> totaling :  ₦${formatNumberWithCommas(orderObject.leftToPay)}  with transaction numbered: <b>#${transactionNumber}</b> with the transaction reference: <b>#${reference}</b></p>
        
        <h4>Here is your order breakdown:</h4>
        <div className="email-product-list">
            ${orderObject?.orderProducts?.map((item) => {
            return `
                    <div class="email-product">
                        <div class="email-product-image">
                            <img src="${item.imageGalleryImages[0].imageURL}" class="" width="70" height="70" />
                        </div>
                        <div class="email-product-title">
                            <h3 class="">${item.name} - ₦${formatNumberWithCommas(item.price)}</h3>
                        </div>
                    </div>
                `;
        }).join('')}
        </div>
        <h3>Outstanding balance : ₦${formatNumberWithCommas(orderObject.leftToPay - amountPaid)}</h3>
        <p>Regards,</p>
        <p>Afritech Team</p>
        </body>
        </html>
    `;
    const emailTemplate = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>You just made a payment to Afritech for order <b>#${orderID}</b></title>
        </head>
        <body>
        <p class="email-p">     Hello ${splitName(fullName)}, you just made a payment of <b>₦${formatNumberWithCommas(amountPaid)}</b> to Afritech for order <b>#${orderID}</b> with transaction numbered: <b>#${transactionNumber}</b> with the transaction reference: <b>#${reference}</b></p>
        
        <h4>Here is your order breakdown:</h4>
        <div className="email-product-list">
            ${orderObject?.orderProducts?.map((item) => {
            return `
                    <div class="email-product">
                        <div class="email-product-image">
                            <img src="${item.imageGalleryImages[0].imageURL}" class="" width="70" height="70" />
                        </div>
                        <div class="email-product-title">
                            <h3 class="">${item.name} - ₦${formatNumberWithCommas(item.price)}</h3>
                        </div>
                    </div>
                `;
        }).join('')}
        </div>
        <h3>Outstanding balance : ₦${formatNumberWithCommas(orderObject.leftToPay - amountPaid)}</h3>
        <p>Regards,</p>
        <p>Afritech Team</p>
        </body>
        </html>
    `;
     
        const msg = {
            to: userEmail,
            from: 'afritech19@gmail.com',
            subject: 'You just made payment on Afritech',
            text: 'and easy to do anywhere, even with Node.js',
            html: (eval(orderObject?.leftToPay - amountPaid == 0)) ? emailTemplateComplete : emailTemplate,
        };
     
        // Send email using SendGrid
        sgMail .send(msg)
            .then(() => {
                console.log('Email sent')
                console.log(msg)
            })
            .catch((error) => {
                console.error(error)
            })
        res.status(200).send('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
        console.error('Error sending email:', error.message, error);
        res.status(500).send('Error sending email');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`You are running on port ${port}`);
})