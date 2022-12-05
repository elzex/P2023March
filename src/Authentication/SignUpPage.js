import "../css/Form.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, userSignUp, userSignIn } from "../firebaseModule/Authentication";
import { db } from "../firebaseModule/Firestore";
import {
    doc, setDoc, serverTimestamp
} from "firebase/firestore";
import { userCheck } from "../firebaseModule/Authentication";

window.onload = async function () {
    userCheck().then((user) => {
        console.log(user.uid);
        window.location.href = "./Portal/Home.html"
    }).catch(() => {
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
            AccountType: 0,
            Reviewer: false,
            NumOfPaper: 0,
        }).catch((e) => {
            const eCode = e.code;
            const eMessage = e.message;
            console.log(eCode, eMessage);
            alert(eCode, eMessage)
        });
        const ProfileRef = doc(docRef, "UserData", "Profile");
        await setDoc(ProfileRef, {
            eMail: signUpForm.eMail.value,
            FirstName: signUpForm.FirstName.value,
            //MiddleName: signUpForm.MiddleName.value,
            FamilyName: signUpForm.FamilyName.value,
            Affiliation: signUpForm.Aff.value,
            Title: signUpForm.Title.value,
            //Department: signUpForm.Department.value,
            Country: signUpForm.Country.value,
            PostCode: signUpForm.PostCode.value,
            City: signUpForm.City.value,
            State: signUpForm.State.value,
            AddressLine1: signUpForm.AddressLine1.value,
            AddressLine2: signUpForm.AddressLine2.value,
            Timezone: signUpForm.Timezone.value,
            PhoneNumber: signUpForm.PhoneNumber.value,
            //FaxNumber: signUpForm.FaxNumber.value,
            //sMail: signUpForm.sMail.value,
            //ccMail: signUpForm.ccMail.value,
            //HPURL: signUpForm.HPURL.value,
            //comment: signUpForm.comment.value,
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
