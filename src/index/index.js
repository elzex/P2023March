import "../css/Form.css"
import { userCheck } from "../firebaseModule/Authentication";


window.onload = async function () {
    userCheck().then((user) => {
        console.log(user.uid);
        window.location.href = "./Portal/Home.html"
    }).catch(() => {
    });
}

const SIButton = document.getElementById("SignInButton");
SIButton.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("SignIn");
    window.location.href = "./Authentication/SignInPage.html";
});

const SUButton = document.getElementById("SignUpButton");
SUButton.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("SignUn");
    window.location.href = "./Authentication/SignUpPage.html";
});