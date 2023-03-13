import { db } from '../../firebaseModule/Firestore';
import { getDoc, doc, arrayUnion, updateDoc, serverTimestamp } from "firebase/firestore";

export async function addCheckData(uid) {
	const checkRef = doc(db, "checkData", "list");
	const userRef = doc(db, "Account", uid);

	const docSnap = await getDoc(userRef);
	if (docSnap.exists()) {
		const data = docSnap.data();
		if (data.Banquet == undefined) {
			await updateDoc(userRef, {
				Banquet: true,
				BanquetTime: serverTimestamp()
			}).then(async function () {
				await updateDoc(checkRef, {
					[uid]: true,
					ID: arrayUnion(uid)
				}).then(function () {
					console.log("complete");
				});
			}).catch((e) => {
				const eCode = e.code;
				const eMessage = e.message;
				console.log(eCode, eMessage);
				alert(eCode, eMessage)
			});
		} else {
			alert("チェック済")
		}
	} else {
		console.log("error");
	}
}