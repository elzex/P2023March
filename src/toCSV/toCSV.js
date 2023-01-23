import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseModule/Firestore"

import { userCheck } from "../firebaseModule/Authentication";

import { collection, getDocs } from "firebase/firestore";

const querySnapshot = await getDocs(collection(db, "Account"));
querySnapshot.forEach((doc) => {
	// doc.data() is never undefined for query doc snapshots
	console.log(doc.id, " => ", doc.data());
});