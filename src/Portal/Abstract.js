import "../css/Form.css";
import { userCheck } from "../firebaseModule/Authentication";
import { doc, getDoc } from "firebase/firestore";
import { getUserData, db } from "../firebaseModule/Firestore";
let uid;
let data;
window.onload = function () {
	userCheck().then(async (user) => {
		//console.log(user.uid);
		uid = user.uid
		data = await getUserData(uid);
	}).catch((e) => {
		console.log(e);
		//window.location.href = "../index.html";
	}).then(() => {
		setTable()
	});
};

async function setTable() {
	const absRef = doc(db, "Abstract", "list");
	const docSnap = await getDoc(absRef);
	if (docSnap.exists()) {
		//console.log(docSnap.data());
		const data = docSnap.data();
		console.log(data);
	} else {
		console.log("No such document!");
	}
}