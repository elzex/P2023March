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
    userSignIn(mail, pass).then((user) => {
        if (user) {
            window.location.href = "../Portal/Home.html";
        }
    }).catch((e) => {
        const eCode = e.code;
        const eMessage = e.message;
        console.log(eCode, eMessage);
        alert(eCode, eMessage);
    });
});
