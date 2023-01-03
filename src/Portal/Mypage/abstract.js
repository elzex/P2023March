const msg = document.getElementById("absDefault");
const postbtn = document.getElementById("postButton");
const body = document.getElementById("absBody");
export function checkAbstract(data) {
	msg.style.display = "none";
	if (data.abs == undefined) {
		//console.log("absナシ");
		postbtn.style.display = "block";
	} else {
		//console.log("absアリ");
		body.style.display = "block";
		setAbs(data.abs, "a");
	}
}

const title = document.getElementById("title");
const absMain = document.getElementById("absMain");
function setAbs(arr) {
	title.textContent = arr[0];
	absMain.textContent = arr[1];
}

const post = document.getElementById("post");
const test = document.getElementById("test");
post.addEventListener("click", () => {
	//bg.style.display = "block";
	test.style.display = "block";
});

const close = document.getElementById("close-popup");
close.addEventListener("click", () => {
	test.style.display = "none";
});