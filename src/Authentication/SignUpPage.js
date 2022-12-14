import "../css/Form.css";
import { userSignUp, userCheck } from "../firebaseModule/Authentication";
import { db } from "../firebaseModule/Firestore";
import {
    doc, setDoc, serverTimestamp
} from "firebase/firestore";

window.onload = async function () {
    userCheck().then((user) => {
        console.log(user.uid);
        window.location.href = "../Portal/Home.html"
    }).catch(() => {
        //console.log("test");
    });
}

//const signUpForm = document.querySelector(".signUp");
const err = document.querySelector(".error");
const form = document.forms[0];
const perr = document.getElementById("participation-err");
const passerr = document.getElementById("pass-err");
form.addEventListener("submit", (e) => {
    e.preventDefault();
    let flag = false;
    let pass1 = e.target.Password1;
    let pass2 = e.target.Password2;
    const mail = e.target.eMail.value;
    const ponly = document.getElementById("ponly");
    const title = e.target.Title.value;
    if (pass1.value != pass2.value) {
        pass1.value = "";
        pass2.value = "";
        passerr.textContent = "パスワードが一致しません";
    }

    if (ponly.checked) {
        if (title != "") {
            perr.textContent = "どちらかを片方のみを入力してください";
        } else {
            flag = true;
        }
    } else {
        if (title == "") {
            perr.textContent = "どちらかを片方のみを入力してください"
        } else {
            flag = true;
        }
    }

    if (flag) {
        SignUp(mail, pass1);
    }
});

function SignUp(mail, pass) {
    userSignUp(mail, pass).then(async (user) => {
        console.log(user);
        const docRef = doc(db, "Account", user.uid);
        await setDoc(docRef, {
            UserID: user.uid,
            Name: signUpForm.Name.value,
            Affiliation: signUpForm.Aff.value,
            Job: signUpForm.Job.value,
            eMail: signUpForm.eMail.value,
            PhoneNumber: signUpForm.PhoneNumber.value,
            Title: signUpForm.Title.value,
            Joint: signUpForm.Joint.value,
            //PreferredTime: signUpForm.PreferredTime.value,
            //Schedule: signUpForm.Schedule.value,
            //Support: signUpForm.Support.value,
            Comment: signUpForm.Comment.value,
            signUpTime: serverTimestamp()
        }).catch((e) => {
            const eCode = e.code;
            const eMessage = e.message;
            console.log(eCode, eMessage);
            alert(eCode, eMessage)
        });
        window.location.href = "../Portal/Home.html"
    })
}
