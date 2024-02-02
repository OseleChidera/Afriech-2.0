'use server'
 
import { onSnapshot, doc } from 'firebase/firestore';
import {database} from '../../firebaseConfig'; // Import the initialized Firebase instance


// export async function fetchUserServerFn(documentId) {
//     let userData = null;
//     const unsubscribe = onSnapshot(doc(database, 'Users', documentId), (snapshot) => {
//             if (snapshot.exists()) {
//                 userData = snapshot.data();
//                 console.log(userDataonSnapsh)

//                 // setData(snapshot.data());
//             } else {
//                 // Document does not exist
//                 // setData(null);
//                 console.log('Document does not exist')
//             }
//         });

//         return () => {
//             // Cleanup the listener when the component unmounts
//             unsubscribe();
//         };

//     return userData;
// }

export async function fetchUserServerFn(userID) {
    let userData ;
    try {
        const userDocRef = doc(database, 'Users', userID);

        // Fetch initial data
        const initialSnapshot = await getDoc(userDocRef);
        const initialUserData = initialSnapshot.data();

        // Set initial data
        let userData = initialUserData ? initialUserData.profilePicture || "" : ""
        
        // Set up real-time listener for changes
        const unsubscribe = onSnapshot(userDocRef, (snapshot) => {
            const fetchedUserData = snapshot.data();

            console.log("user id from dynamic: ", fetchedUserData)
            userData = fetchedUserData
            return userData;
        });

        // Cleanup the listener when the component unmounts or as needed
        return () => unsubscribe();
    } catch (error) {
        console.log('Error fetching data:', error, error.code, error.message);
    }
}