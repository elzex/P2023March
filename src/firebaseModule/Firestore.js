import { app } from "./config";
import { getFirestore, doc, getDoc, arrayUnion, updateDoc } from "firebase/firestore";

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
		let list;
		//console.log(list);
		if (docSnap.data().ID == undefined) {
			list = []
		} else {
			list = docSnap.data().ID;
		}
		return list;
	} else {
		console.log("No such document!");
		return 0;
	}
}

export async function setAbsList(ID, abs, abslist) {
	const docRef = doc(db, "Account", ID);
	const absRef = doc(db, "Abstract", "list");
	updateDoc(absRef, {
		ID: arrayUnion(ID),
		[ID]: abslist
	}).then(() => {
		updateDoc(docRef, {
			abs: abs
		}).then(() => {
			alert("投稿完了");
			window.location.reload();
		})
	}).catch((e) => {
		alert(e);
	});
}
