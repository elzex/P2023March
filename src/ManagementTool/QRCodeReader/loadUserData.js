import { doc, getDoc } from "firebase/firestore"
import { db } from "../../firebaseModule/Firestore"

export const getUserData = async (uid) => {
    const docRef = doc(db, "Account", uid);
    const profileRef = doc(docRef, "UserData", "Profile");
    const docSnap = await getDoc(profileRef);
    if (docSnap.exists()) {
        //console.log(docSnap.data());
        console.log(docSnap.data());
    } else {
        console.log("No such document!");
    };
}