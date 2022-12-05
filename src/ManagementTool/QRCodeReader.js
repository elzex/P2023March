import "./css/QRCodeReader.css";
import { initCamera } from "./QRCodeReader/Reader"
import { userCheck } from "../firebaseModule/Authentication"

let user
window.onload = async function () {
    user = await userCheck();
    if (user) {
        console.log(user.uid);
    } else {
        //window.location.href = "../index.html";
        console.log("error");
    }
    initCamera();
}

const test = document.getElementById("test");
test.addEventListener("click", () => {
    console.log(user.uid);
});