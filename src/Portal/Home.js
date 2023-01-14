import "../css/Form.css";
import { userSignOut, userCheck, userDeleteAccount, auth } from "../firebaseModule/Authentication";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebaseModule/Firestore";
import { genRefList, delFolder } from "../firebaseModule/Storage";

window.onload = async function () {
    let user = await userCheck();
    if (user) {
        //console.log(user);
    } else {
        window.location.href = "../index.html";
    }
}

const moveMypage = document.getElementById("moveMyPage");
moveMypage.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = "./MyPage.html";
});

const moveAbsPage = document.getElementById("moveAbsPage");
moveAbsPage.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = "./Abstract.html";
});

const signOutButton = document.getElementById("signOut");
signOutButton.addEventListener("click", () => {
    userSignOut();
    userCheck();
    window.location.href = "../index.html";
});

/*
const deleteAccount = document.getElementById("delAccount");
deleteAccount.addEventListener("click", function (e) {
    e.preventDefault();

    deleteUserData().then(() => {
        //await userDeleteAccount();
        //alert("");
        window.location.href = "../index.html";
    }).catch((e) => {
        const eCode = e.code;
        const eMessage = e.message;
        console.log(eCode, eMessage);
    })
});
*/

function deleteUserData() {
    return new Promise(async (resolve) => {
        const id = auth.currentUser.uid;
        const docRef = doc(db, "Account", id);
        const fileRefList = genRefList(id);
        await deleteDoc(docRef).then(delFolder(fileRefList));
        //await delFolder(fileRefList);
        await userDeleteAccount();
        resolve();
    });
}