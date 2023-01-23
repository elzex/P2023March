import { db } from "../firebaseModule/Firestore"
import { userCheck } from "../firebaseModule/Authentication";

import { collection, getDocs } from "firebase/firestore"


window.onload = async function () {
	const datas = await getAllData();
	obj2arr(datas);
	let tempData = [];
}

async function getAllData() {
	let userData = [];
	let i = 0;
	const querySnapshot = await getDocs(collection(db, "Account"));
	querySnapshot.forEach((doc) => {
		// doc.data() is never undefined for query doc snapshots
		// console.log(doc.id, " => ", doc.data());
		userData[i] = doc.data();
		i += 1;
	});
	return userData;
}

function obj2arr(obj) {
	const key = ["Nmae", "Affiliation", "Job", "eMail", "PhoneNumber", "Presen", "Joint", "PreferredTime", "Schedule", "Support", "Comment", "signUpTime", "UserID"];
	console.log(key);
	console.log(obj);
	let data = []
	for (let i = 0; i < obj.length; i++) {
		if (obj[i].Name != undefined) {
			data[i] = [obj[i].Name, Object.values(obj[i])];
		}
	}
	console.log(data);
}
