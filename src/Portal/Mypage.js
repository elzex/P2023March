import "../css/Form.css";
import "../css/Mypage.css";
import "../css/Tab.css";
import "../css/Table.css";
import "../css/popup.css";

import { doc, updateDoc } from "firebase/firestore";

import { userCheck } from "../firebaseModule/Authentication";
import { setUserData } from "./Mypage/setProfileData";
import { getUserData, db, getAbsIDList } from "../firebaseModule/Firestore";
import { checkAbstract } from "./Mypage/abstract";

let uid;
let data;
window.onload = function () {
    userCheck().then(async (user) => {
        uid = user.uid
        data = await getUserData(uid);
        setUserData(data);
        checkAbstract(data);
        checkParticipate();
    }).catch((e) => {
        console.log(e);
        window.location.href = "../index.html";
    });
}

const p = document.getElementsByClassName('tab_item');
function checkParticipate() {
    if (data.Presen == 0) {
        p[0].style.display = "block";
        p[0].style.width = "100%";

    } else {
        for (let i = 0; i < p.length; i++) {
            p[i].style.display = "block";
        }
    }
}

const back = document.getElementById("back");
back.addEventListener("click", () => {
    window.location.href = "./Home.html";
})

const form = document.forms[0];
form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const abs = [e.target.absTitle.value, e.target.absInput.value];
    const abslist = [data.Name, e.target.absTitle.value, e.target.absInput.value]

    const docRef = doc(db, "Account", uid);
    const absRef = doc(db, "Abstract", "list");
    let uids = await getAbsIDList();
    uids.push(uid);
    updateDoc(docRef, {
        abs: abs
    }).catch((e) => {
        console.log(e);
    }).then(async () => {
        updateDoc(absRef, {
            [uid]: abslist,
            ID: uids
        }).then(() => {
            alert("投稿完了");
            window.location.reload();
        });
    });
});