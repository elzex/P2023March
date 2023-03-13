import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseModule/Firestore.js";
import { userCheck } from "../firebaseModule/Authentication.js";

import "./css/QRReader.css";
import "./css/toggle.css"

let user;

window.onload = async function () {
	user = await userCheck()
	console.log(user);
}

const rp = document.getElementById("readpayment");
const wp = document.getElementById("writepayment");
const wc = document.getElementById("writecheck");
const bc = document.getElementById("writebanq")
let ID;
rp.addEventListener("click", async function () {
	console.log("read");
	const listRef = doc(db, "Payment", "list");
	const docSnap = await getDoc(listRef);
	if (docSnap.exists()) {
		const data = docSnap.data();
		console.log(data);
		ID = data.ID;
		console.log(ID);
	} else {
		console.log("error");
	}
})

wp.addEventListener("click", async function () {
	let mp = [];
	for (let i = 0; i < ID.length; i++) {
		console.log(i);
		mp[i] = true;
	}
	console.log(mp);
	const ref = doc(db, "Payment", "list");
	await updateDoc(ref, {
		check: mp
	});
	for (let i = 0; i < ID.length; i++) {
		const ref = doc(db, "Account", ID[i]);
		await updateDoc(ref, {
			Payment: true
		});
	}
});

wc.addEventListener("click", async function () {
	let mp = [];
	for (let i = 0; i < ID.length; i++) {
		console.log(i);
		mp[i] = false;
	}
	console.log(mp);
	const ref = doc(db, "checkData", "list");
	await updateDoc(ref, {
		ID: ID,
		check: mp
	});
	for (let i = 0; i < ID.length; i++) {
		const ref = doc(db, "Account", ID[i]);
		await updateDoc(ref, {
			Ticket: false
		});
	}
})

bc.addEventListener("click", async function () {
	let mp = [];
	for (let i = 0; i < ID.length; i++) {
		console.log(i);
		mp[i] = true;
	}
	console.log(mp);
	const ref = doc(db, "Banquet", "list");
	await updateDoc(ref, {
		ID: ID,
		check: mp
	});
	for (let i = 0; i < ID.length; i++) {
		const ref = doc(db, "Account", ID[i]);
		await updateDoc(ref, {
			Banquet: true
		});
	}
})