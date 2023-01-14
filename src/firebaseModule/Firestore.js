import { async } from "@firebase/util";
import { app } from "./config";
import { getFirestore, doc, getDoc } from "firebase/firestore";

export const db = getFirestore(app);

export async function getUserData(uid) {
	const docRef = doc(db, "Account", uid);
	const docSnap = await getDoc(docRef);
	if (docSnap.exists()) {
		//console.log(docSnap.data());
		return docSnap.data();
	} else {
		console.log("No such document!");
		return 0;
	}
}


export async function getAbsIDList() {
	const docRef = doc(db, "Abstract", "list");
	const docSnap = await getDoc(docRef);
	if (docSnap.exists()) {
		//console.log(docSnap.data());
		const list = docSnap.data().ID;
		console.log(list);
		return list;
	} else {
		console.log("No such document!");
		return 0;
	}
}
