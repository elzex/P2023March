import { getUserData } from "../firebaseModule/Firestore"
import { userCheck } from "../firebaseModule/Authentication";
import { startCamera, stopCamera, canvasUpdate, isSmartPhone } from "./module/videoControl";
import { addCheckData } from "./module/addCheck"
import { format } from "date-fns"

import "./css/QRReader.css";
import "./css/toggle.css";

const video = document.getElementById("video");

let cameraConfig;

window.onload = async function () {
	if (isSmartPhone()) {
		cameraConfig = {
			audio: false,
			video: {
				width: 300,
				height: 300,
				facingMode: {
					exact: 'environment'
				}
			}
		};
	} else {
		cameraConfig = {
			audio: false,
			video: {
				width: 300,
				height: 300,
				facingMode: "user"
			}
		};
	}

	await userCheck().then((user) => {
		console.log(user.uid);
	}).catch(() => {
		console.log("error account data is not find");
	});

	start();
}

let uid;
async function start() {
	QRarea.style.display = "block";
	dTable.style.display = "none";

	let tabLength = table.rows.length;
	if (tabLength != 1) {
		for (let i = 0; i < tabLength - 1; i++) {
			table.deleteRow(-1);
		}
	}
	console.log(tabLength);

	startCamera(video, cameraConfig);
	pic.style.display = "block";
	let flag = true;
	while (flag) {
		await canvasUpdate(video, pic).then((id) => {
			flag = false;
			uid = id;
			console.log(uid);
		}).catch(() => {
			//console.log("b");
		});
	}
	if (checkMode) {
		addCheckData(uid);
	} else {
		const data = await getUserData(uid);
		console.log(data);
		QRarea.style.display = "none";
		//testObj(data)
		genTable(data);
	}
}

const startBtn = document.getElementById("start");
const pic = document.getElementById("pic");
const QRarea = document.getElementById("QRarea");
startBtn.addEventListener("click", async function () {
	start();
	cbtn.style.display = "none";
});

const stopBtn = document.getElementById("stop");
stopBtn.addEventListener("click", () => {
	stopCamera(video);
	//pic.style.display = "none";
})

const dTable = document.getElementById("dataTable");
const table = document.getElementById("table");
function genTable(obj) {
	dTable.style.display = "block";

	var temp = Object.entries(obj);
	temp.sort(function (p1, p2) {
		var p1Key = p1[0], p2Key = p2[0];
		if (p1Key < p2Key) { return -1; }
		if (p1Key > p2Key) { return 1; }
		return 0;
	})
	obj = Object.fromEntries(temp);
	console.log(obj);

	if (!obj.Banquet) {
		cbtn.style.display = "inline";
	} else {
		cbtn.style.display = "none";
	}

	Object.keys(obj).forEach(function (key) {
		if (key != "abs") {
			console.log(key + ":" + obj[key]);
			let tr = document.createElement('tr');
			let td1 = document.createElement('td');
			let td2 = document.createElement('td');
			let body = obj[key];
			if (key == "BanquetTime" || key == "signUpTime" || key == "PresenDate") {
				body = format(new Date(body.seconds * 1000), 'yyyy/MM/dd HH:mm')
				console.log(body);
			}
			if (obj[key] == "") {
				body = "None"
			}
			td1.textContent = key;
			tr.appendChild(td1);
			td2.textContent = body;
			tr.appendChild(td2);
			table.appendChild(tr);
		}
	});
}

let checkMode = false;
const cm = document.getElementById("checkMode");
cm.addEventListener("click", function () {
	checkMode = cm.checked
	console.log(checkMode);
});

const cbtn = document.getElementById("check");
cbtn.addEventListener("click", function () {
	addCheckData(uid);
});