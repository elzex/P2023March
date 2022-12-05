import "./css/Menu.css";
import { userCheck, userSignOut } from "../firebaseModule/Authentication";
import { loadAccount } from "../module/onload";

const loadMsg = document.getElementById("loadMessage");
const loader = document.getElementById("loader");
window.onload = async function () {
    let flag = await loadAccount(loadMsg, loader);
    //console.log(flag);
    if (flag == 1) {
        window.location.href = "./Authentication.html";
    }
}

const moveReader = document.getElementById("moveReader");
moveReader.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("Reader");
    window.location.href = "./QRCodeReader.html";
});

const moveRegister = document.getElementById("moveRegister");
moveRegister.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("Register");
    window.location.href = "./QRCodeRegister.html";
});

const moveCSV = document.getElementById("moveCSV");
moveCSV.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("CSV");
    window.location.href = "./CSVRegistration.html";
});

const signOut = document.getElementById("signOut");
signOut.addEventListener("click", (e) => {
    e.preventDefault();
    userSignOut();
    window.location.href = "./Authentication.html";
});