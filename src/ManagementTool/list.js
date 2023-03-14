import { userCheck } from "../firebaseModule/Authentication";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseModule/Firestore.js";

import "./css/QRReader.css";
import "./css/toggle.css";

let user;
let ID;
let Name = [];
const btn = document.getElementById("btn");
const loading = document.getElementById("loading");
window.onload = async function () {
	await userCheck().then((usr) => {
		console.log(usr.uid);
		user = usr;
	}).catch(() => {
		console.log("error account data is not find");
	});
	const listRef = doc(db, "Payment", "list");
	const docSnap = await getDoc(listRef);
	if (docSnap.exists()) {
		const data = docSnap.data();
		console.log(data);
		ID = data.ID;
		for (let i = 0; i < ID.length; i++) {
			const accRef = doc(db, "Account", ID[i]);
			const docSnap = await getDoc(accRef);
			if (docSnap.exists()) {
				const data = docSnap.data();
				Name.push(data.Name);
			}
		}
		btn.style.display = "block";
		loading.style.display = "none";
	} else {
		console.log("error");
	}
	console.log(Name);
}

const bl = document.getElementById("banqlist");
const bbtn = document.getElementById("banquet");
let bflag = false;
bbtn.addEventListener("click", async function () {
	console.log("b");
	bl.style.display = "block"
	pl.style.display = "none"
	tl.style.display = "none"
	if (!bflag) {
		const c = await getCheckData("Banquet");
		genTable("banqTable", c);
		bflag = true;
	}
});

const pl = document.getElementById("paylist");
const pbtn = document.getElementById("payment");
let pflag = false;
pbtn.addEventListener("click", async function () {
	console.log("p");
	bl.style.display = "none"
	pl.style.display = "block"
	tl.style.display = "none"
	if (!pflag) {
		const c = await getCheckData("Payment");
		genTable("payTable", c);
		pflag = true;
	}
});

const tl = document.getElementById("ticlist");
const tbtn = document.getElementById("ticket");
let tflag = false;
tbtn.addEventListener("click", async function () {
	console.log("t");
	bl.style.display = "none"
	pl.style.display = "none"
	tl.style.display = "block"
	if (!tflag) {
		const c = await getCheckData("checkData");
		genTable("ticTable", c);
		tflag = true;
	}
});

function genTable(tbl, data) {
	const table = document.getElementById(tbl);
	for (let i = 0; i < ID.length; i++) {
		let tr = document.createElement('tr');
		let td1 = document.createElement('td');
		let td2 = document.createElement('td');
		td1.textContent = Name[i];
		tr.appendChild(td1);
		let body;
		console.log(data[i]);
		if (data[i]) {
			body = "true";
		} else {
			body = "false";
			td2.style.color = "red";
		}
		td2.textContent = body;
		tr.appendChild(td2);
		table.appendChild(tr);
	}
}

async function getCheckData(col) {
	const ref = doc(db, col, "list");
	const docSnap = await getDoc(ref)
	if (docSnap.exists()) {
		const data = docSnap.data();
		console.log(data.check);
		return data.check;
	}
}