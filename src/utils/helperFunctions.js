import { collection, addDoc, doc, setDoc, updateDoc, onSnapshot, getDoc, runTransaction } from 'firebase/firestore';
import { database } from '../../firebaseConfig'; // Import your Firebase configuration
import { toast } from "react-toastify";


export async function getUserData(userID, setterFunction) {
    console.log("userID: ", userID)


    try {
        const userDocRef = doc(database, 'Users', userID);
        // Fetch initial data
        const initialSnapshot = await getDoc(userDocRef);
        const initialUserData = initialSnapshot.data();
        console.log("initialUserData ", initialUserData)
        // Set initial data
        setterFunction(initialUserData);
        // Set up real-time listener for changes
        const unsubscribe = onSnapshot(userDocRef, (snapshot) => {
            const fetchedUserData = snapshot.data();
            console.log("fetchedUserData ", fetchedUserData)
            setterFunction(fetchedUserData);
        });
        // Cleanup the listener when the component unmounts or as needed
        return () => unsubscribe();
    } catch (error) {
        console.log('Error fetching data:', error, error.code, error.message);
    }
}


export function formatNumberWithCommas(value) {
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






export async function fetchProductDataById(docId, setterFunction, setMainImage) {
    try {
        // Reference to the specific Firestore document using its ID
        const documentRef = doc(database, 'Products', docId); // Replace 'YourCollectionName' with the actual name of your collection
        // Initial value
        const initialSnapshot = await getDoc(documentRef);
        const initialUserData = initialSnapshot.data();
        setterFunction(initialUserData)
        setMainImage(initialUserData.imageGalleryImages[0].imageURL)
        // Using onSnapshot to listen for real-time updates for the specific document
        const unsubscribe = onSnapshot(documentRef, (docSnapshot) => {
            if (docSnapshot.exists()) {
                const data = docSnapshot.data();
                setterFunction(data)
                setMainImage(data.imageGalleryImages[0].imageURL)

                // console.log('Document data:', data);
                // Perform any actions with the data here
            } else {
                console.log('Document does not exist');
                // Handle the case where the document does not exist
            }
        });

        // Return the unsubscribe function for cleanup
        return unsubscribe;
    } catch (error) {
        console.error('Error fetching data by ID:', error);
    }
}




export  function generateRandomID() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const userIdLength = 20;
    let reviewID = '';

    for (let i = 0; i < userIdLength; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        reviewID += characters.charAt(randomIndex);
    }

    return reviewID;
}

export async function getCurrentDateTime() {
    const currentDate = new Date();

    const day = currentDate.getDate().toString().padStart(2, '0');
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based
    const year = currentDate.getFullYear().toString();

    const hours = currentDate.getHours().toString().padStart(2, '0');
    const minutes = currentDate.getMinutes().toString().padStart(2, '0');
    const seconds = currentDate.getSeconds().toString().padStart(2, '0');

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}

const dataCollectionReference = collection(database, 'Products');
export async function addReview(userID, productId, newReview, setReview) {
    const reviewID = await generateRandomID()
    const reviewUploadDate = await getCurrentDateTime()
    console.table(userID, productId, newReview)
    const productDocRef = doc(dataCollectionReference, productId);  // Replace 'yourFirestoreCollectionReference' with your actual reference
    try {
        // Get the current data of the document
        const productDocSnapshot = await getDoc(productDocRef);
        const productData = productDocSnapshot.data();

        // Update the reviews array
        const updatedReviews = [...productData.reviews, { userId: userID, reviewId: reviewID, review: newReview, date: reviewUploadDate  }];

        // Update the Firestore document with the new reviews array
        await updateDoc(productDocRef, { reviews: updatedReviews });

        console.log('Review added successfully!');
        toast.success(`Review added successfully`);
        setReview('')
    } catch (error) {
        console.log('Error adding review:', error, error.code , error.message);
        toast.error(error.message);
    }
}



export async function deleteReview(productID, reviewItemID) {
    console.log("productID ", productID)
    console.log("reviewItemID ", reviewItemID)
    try {
        const docRef = doc(database, 'Products', productID);
        const documentData = await getDoc(docRef);

        if (documentData.exists()) {
            const reviewsArray = documentData.data().reviews;
            console.log(reviewsArray)

            // Filter out the review with the given reviewID
            const updatedReviews = reviewsArray.filter((review) => review.reviewId !== reviewItemID);
            console.log(updatedReviews)


            // Update the document with the modified reviews array
            await updateDoc(docRef, { reviews: updatedReviews });
            toast.success(`Review deleted successfully`);
            console.log('Review deleted successfully.');
        } else {
            console.error(`Product with ID ${productID} not found.`);
        }
    } catch (error) {
        console.error('Error deleting review:', error);
    }
}





export async function addItemsToCart(productId, productQuantity = 1, userID, setProductCartID = undefined) {
    console.log(productId, productQuantity, userID);
    let cartItemID;

    try {
        const productDocRef = doc(database, 'Products', productId);
        const currentUserRef = doc(database, 'Users', userID);

        await runTransaction(database, async (transaction) => {
            const currentUserSnapshot = await getDoc(currentUserRef);
            const productDocSnapshot = await getDoc(productDocRef);

            if (currentUserSnapshot.exists() && productDocSnapshot.exists()) {
                const productData = { ...productDocSnapshot.data(), qty: productDocSnapshot.data().qty - productQuantity };

                
                    // Update the product quantity in stock
                    transaction.update(productDocRef, productData);

                    // Get the existing array from the document
                    let existingArray = currentUserSnapshot.data().cart || [];

                    // Add the object to the array based on the productQuantity
                    for (let i = 0; i < productQuantity; i++) {
                        cartItemID = generateRandomID();
                        const productID = productId
                        const cartItem = { ...productData, cartItemID, productID };
                        delete cartItem.qty;
                        delete cartItem.link;
                        delete cartItem.reviews;
                        delete cartItem.description;
                        existingArray.push(cartItem);


                        if (setProductCartID) {
                            setProductCartID(cartItemID) // or pass the cartitemId
                        }
                    }

                    // Update the document with the modified array
                    await updateDoc(currentUserRef, { cart: existingArray });
                    //check if the setter function was passed
                
                
                    toast.success(`${productQuantity} item(s) added to cart`);
                 if (productData.qty == 0) {
                    toast.info(`Current stock has been depleted come back later`);
                }
            } else {
                console.log("Document not found");
                toast.error(`Document not found`);
            }
        });
    } catch (error) {
        console.error('Error updating product data:', error);
        console.log(error.message);
        toast.error(`Failed to add Item to Cart ${error.message}`);
    }
}



export async function removeItemFromCart(productID, cartItemID, userID) {
    console.log("productID ", productID)
    console.log("cartItemID ", cartItemID)
    console.log("userID ", userID)
    try {
        const userRef = doc(database, 'Users', userID);
        const productRef = doc(database, 'Products', productID);
        const userDocumentData = await getDoc(userRef);
        const productDocumentData = await getDoc(productRef);
        console.log("productDocumentData ", productDocumentData)

        if (userDocumentData.exists() && productDocumentData.exists()) {
            const cartArray = userDocumentData.data().cart;
            console.table("cartArray ", cartArray)

            // Filter out the review with the given reviewID
            const updatedCart = cartArray.filter((cartItem) => cartItem.cartItemID !== cartItemID);
            console.table("updatedReviews ", updatedCart)

            // Update the document with the modified reviews array
            await updateDoc(userRef, { cart: updatedCart });
            await updateDoc(productRef, { qty: productDocumentData.data().qty + 1 })

            toast.success(`Item removed from cart successfully`);
            console.log('Item removed from cart successfully.');
        } else {
            console.error(`Product with ID ${productID} not found.`);
        }
    } catch (error) {
        console.error('Error deleting cart item :', error);
    }
}



export async function addItemsToFavourites(productId, userID, setProductFavouriteID) {
    console.log(productId, userID);

    try {
        const productDocRef = doc(database, 'Products', productId);
        const currentUserRef = doc(database, 'Users', userID);

        await runTransaction(database, async (transaction) => {
            const currentUserSnapshot = await getDoc(currentUserRef);
            const productDocSnapshot = await getDoc(productDocRef);

            if (currentUserSnapshot.exists() && productDocSnapshot.exists()) {
                    // Get the existing array from the document
                    let existingArray = currentUserSnapshot.data().favourites || [];
        
                        const favouriteItemID = generateRandomID();
                        const productID = productId
                const favouriteItem = { ...productDocSnapshot.data() , favouriteItemID, productID };
                        delete favouriteItem.qty;
                        delete favouriteItem.link;
                        delete favouriteItem.reviews;
                        delete favouriteItem.description;
                        existingArray.push(favouriteItem);

                        if (setProductFavouriteID) {
                            setProductFavouriteID(favouriteItemID) // or pass the cartitemId
                        }setProductFavouriteID
                    

                    // Update the document with the modified array
                    await updateDoc(currentUserRef, { favourites: existingArray });
                    //check if the setter function was passed
                
                
                    toast.success(`Item added to favourites`);
                 
            } else {
                console.log("Document not found");
                toast.error(`Document not found`);
            }
        });
    } catch (error) {
        console.error('Error updating product data:', error);
        console.log(error.message);
        toast.error(`Failed to add Item to Cart ${error.message}`);
    }
}


export async function removeItemFromFavourites(productID, favouriteItemID, userID) {
    console.log("productID ", productID)
    console.log("cartItemID ", favouriteItemID)
    console.log("userID ", userID)
    try {
        const userRef = doc(database, 'Users', userID);
        const productRef = doc(database, 'Products', productID);
        const userDocumentData = await getDoc(userRef);
        const productDocumentData = await getDoc(productRef);
        console.log("productDocumentData ", productDocumentData)

        if (userDocumentData.exists() && productDocumentData.exists()) {
            const favouritesArray = userDocumentData.data().cart;
            console.table("favouritesArray ", favouritesArray)

            // Filter out the review with the given reviewID
            const updatedFavourites = favouritesArray.filter((favouriteItem) => favouriteItem.favouriteItemID !== favouriteItemID);
            console.table("updatedReviews ", updatedFavourites)

            // Update the document with the modified reviews array
            await updateDoc(userRef, { favourites: updatedFavourites });

            toast.success(`Item removed from cart successfully`);
            console.log('Item removed from cart successfully.');
        } else {
            console.error(`Product with ID ${productID} not found.`);
        }
    } catch (error) {
        console.error('Error deleting cart item :', error);
    }
}