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

const signUpForm = document.querySelector(".signUp");
signUpForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (signUpForm.Password1.value != signUpForm.Password2.value) {
        alert("Password does not match");
        signUpForm.Password1.value = "";
        signUpForm.Password2.value = "";
    } else {
        const mail = signUpForm.eMail.value;
        const pass = signUpForm.Password1.value;
        SignUp(mail, pass)
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
