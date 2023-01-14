import "../css/Form.css";
import "../css/popup.css";
import "../css/Mypage.css";
import "../css/Table.css";
import "../css/Button.css";
import { userCheck } from "../firebaseModule/Authentication";
import { doc, getDoc } from "firebase/firestore";
import { getUserData, db } from "../firebaseModule/Firestore";

window.onload = function () {
	userCheck().then(async (user) => {
		//console.log(user.uid);
		let uid = user.uid
		let data = await getUserData(uid);
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
		generateTable(data);
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
			td.className = 'abstd'
			td.textContent = body[i];
			tr.appendChild(td);
		}

		let btd = document.createElement('td');
		let bdiv = document.createElement('div');
		bdiv.className = 'button-panel button-center';
		let btn = document.createElement('button');
		btn.className = 'button button-center';
		btn.innerHTML = "閲覧";
		btn.onclick = function () {
			viewAbstract(body);
		};
		bdiv.appendChild(btn);
		btd.appendChild(bdiv);
		tr.appendChild(btd);
		table.appendChild(tr);
	}
}

const popup = document.getElementById('popup')
function viewAbstract(data) {
	//console.log(data);
	popup.style.display = 'block';
	setAbs(data);
}

const close = document.getElementById("close-popup");
close.addEventListener("click", () => {
	popup.style.display = "none";
});

const title = document.getElementById("title");
const absMain = document.getElementById("absMain");
function setAbs(arr) {
	title.textContent = arr[1];
	absMain.textContent = arr[2];
}

const back = document.getElementById('back');
back.addEventListener('click', () => {
	window.location.href = "./Home.html";
});