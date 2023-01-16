import "../css/Form.css";
import { userSignUp, userCheck } from "../firebaseModule/Authentication";
import { db } from "../firebaseModule/Firestore";
import {
    doc, setDoc, serverTimestamp
} from "firebase/firestore";
import { generateReference, uploadDataURL } from "../firebaseModule/Storage";
import QRCode from 'qrcode';

window.onload = async function () {
    userCheck().then((user) => {
        console.log(user.uid);
        window.location.href = "../Portal/Home.html"
    }).catch(() => {
        //console.log("test");
    });
}


const form = document.forms[0];
const perr = document.getElementById("participation-err");
const passerr = document.getElementById("pass-err");
form.addEventListener("submit", (e) => {
    e.preventDefault();
    passerr.textContent = "";
    perr.textContent = "";
    const mail = e.target.eMail.value;
    const part = e.target.Participate.value;
    //const title = e.target.Title.value;
    let flag = true;
    let pass1 = e.target.Password1;
    let pass2 = e.target.Password2;

    if (pass1.value != pass2.value) {
        pass1.value = "";
        pass2.value = "";
        passerr.textContent = "パスワードが一致しません";
        flag = false;
    }

    /*
    if (part == "Y" && title == "") {
        perr.textContent = "講演題目を入力してください"
        flag = false;
    }
    */

    if (flag) {
        SignUp(mail, pass1.value);
        //console.log("test");
        //console.log(pass1);
        //console.log(form.Name.value);
    }
});


const participate = document.getElementById("Participate");

/*
let tForm = document.getElementById("tForm");

participate.onchange = function () {
    let v = participate.value;
    if (v == "Y") {
        tForm.style.display = "block";
    } else {
        tForm.style.display = "none";
        tForm.value = "";
    }
}
*/

function SignUp(mail, pass) {
    const v = participate.value;
    let titlevalue;
    if (v == "Y") {
        titlevalue = 1;
    } else {
        titlevalue = 0;
    }

    userCheck().then((user) => {
        console.log(user.uid);
    }).catch(() => {
        //console.log("test");
    });

    userSignUp(mail, pass).then(async (user) => {
        console.log(user);
        const docRef = doc(db, "Account", user.uid);
        await setDoc(docRef, {
            Affiliation: form.Aff.value,
            Comment: form.Comment.value,
            Job: form.Job.value,
            Joint: form.Joint.value,
            Name: form.Name.value,
            PhoneNumber: form.PhoneNumber.value,
            PreferredTime: form.PreferredTime.value,
            Schedule: form.Schedule.value,
            Support: form.Support.value,
            Presen: titlevalue,
            UserID: user.uid,
            eMail: form.eMail.value,
            signUpTime: serverTimestamp()
        }).then(() => {
            genQR(user.uid).then((code) => {
                const ref = generateReference(user.uid + "/" + user.uid + ".png");
                uploadDataURL(ref, code).then(() => {
                    window.location.href = "../Portal/Home.html";
                });
            });
        }).catch((e) => {
            const eCode = e.code;
            const eMessage = e.message;
            console.log(eCode, eMessage);
            alert(eCode, eMessage)
        });
    }).catch((e) => {
        const eCode = e.code;
        const eMessage = e.message;
        console.log(eCode, eMessage);
        alert(eCode, eMessage)
    })
}

function genQR(uid) {
    return new Promise((resolve, reject) => {
        let code;
        QRCode.toDataURL(uid, function (err, url) {
            code = url;
        });
        console.log(code);
        console.log(typeof (code));
        resolve(code);
    });
}