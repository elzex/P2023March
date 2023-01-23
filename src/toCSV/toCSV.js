import { db } from "../firebaseModule/Firestore";

import { collection, getDocs } from "firebase/firestore";
import { } from "../firebaseModule/Authentication"


window.onload = async function () {
	const datas = await getAllData();
	let arr = obj2arr(datas);
	exportCSV(arr)
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
	const key = ["Name", "Affiliation", "Job", "eMail", "PhoneNumber", "Presen", "Joint", "PreferredTime", "Schedule", "Support", "Comment", "signUpTime", "UserID"];
	console.log(key);
	console.log(obj);
	console.log(obj[0][key[0]]);
	let data = []
	for (let i = 0; i < obj.length; i++) {
		let tempArr = []
		//console.log(obj[i][key[j]]);
		for (let j = 0; j < key.length; j++) {
			if (obj[i][key[j]] != undefined) {
				if (j == 11) {
					obj[i][key[j]] = obj[i][key[j]].toDate()
				}
				tempArr[j] = obj[i][key[j]];
			} else {
				tempArr[j] = "";
			}
		}
		if (tempArr[i] != "") {
			data.push(tempArr);
		}
	}
	data.unshift(key);
	console.log(data);
	return data
}

function exportCSV(records) {
	let data = records.map((record) => record.join(',')).join('\r\n');

	let bom = new Uint8Array([0xEF, 0xBB, 0xBF]);
	let blob = new Blob([bom, data], { type: 'text/csv' });
	let url = (window.URL || window.webkitURL).createObjectURL(blob);
	let link = document.createElement('a');
	link.download = 'result.csv';
	link.href = url;
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
};