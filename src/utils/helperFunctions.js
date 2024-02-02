import { collection, addDoc, doc, setDoc, updateDoc, onSnapshot, getDoc, runTransaction } from 'firebase/firestore';
import { database } from '../../firebaseConfig'; // Import your Firebase configuration
import { toast } from "react-toastify";



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

                console.log('Document data:', data);
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




export async function generateRandomReviewId() {
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
    const reviewID = await generateRandomReviewId()
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