import "../css/Form.css";
import { userSignIn, userCheck } from "../firebaseModule/Authentication";

window.onload = async function () {
    userCheck().then((user) => {
        console.log(user.uid);
        window.location.href = "./Portal/Home.html"
    }).catch(() => {
    });
}

const signInForm = document.querySelector(".signIn");
signInForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    let mail = signInForm.email.value;
    let pass = signInForm.password.value;
    //console.log(mail, pass);
    let user = await userSignIn(mail, pass);
    //let user = await userCheck();
    if (user) {
        window.location.href = "../Portal/Home.html";
    }
});
