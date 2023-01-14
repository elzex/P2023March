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
		console.log(docSnap.data());
		const data = docSnap.data();
		generateTable(data);
		//console.log(data);
		//console.log(btns);
	} else {
		console.log("No such document!");
	}
}

const table = document.getElementById('table');
function generateTable(data) {
	const num = data.ID.length;
	for (let i = 0; i < num; i++) {
		let tr = document.createElement('tr');
		let id = data.ID[i];
		let body = data[id];
		for (let i = 0; i < 2; i++) {
			let td = document.createElement('td');
			td.textContent = body[i];
			tr.appendChild(td);
		}

		let btd = document.createElement('td');
		let bdiv = document.createElement('div');
		bdiv.className = 'button-panel';
		let btn = document.createElement('button');
		btn.className = 'button';
		btn.innerHTML = "閲覧";
		btn.id = 'viewbtn';
		btn.value = id;
		btn.onclick = function () {
			viewAbstract(id);
		};
		bdiv.appendChild(btn);
		btd.appendChild(bdiv);
		tr.appendChild(btd);
		table.appendChild(tr);
	}
}

function viewAbstract(uid) {
	console.log(uid);
}