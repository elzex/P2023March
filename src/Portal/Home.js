import "../css/Form.css";
import { userSignOut, userCheck, userDeleteAccount, auth } from "../firebaseModule/Authentication";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebaseModule/Firestore";

window.onload = async function () {
    let user = await userCheck();
    if (user) {
        console.log(user);
    } else {
        window.location.href = "../index.html";
    }
}

const moveMypage = document.getElementById("moveMyPage");
moveMypage.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = "./MyPage.html";
});

const movePostpage = document.getElementById("movePostPage");
movePostpage.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = "./PostPage.html";
});

const signOutButton = document.getElementById("signOut");
signOutButton.addEventListener("click", () => {
    userSignOut();
    userCheck();
    window.location.href = "../index.html";
});

const deleteAccount = document.getElementById("delAccount");
deleteAccount.addEventListener("click", async function (e) {
    e.preventDefault();
    await deleteUserData();
    userDeleteAccount();
    window.location.href = "../index.html";
});

async function deleteUserData() {
    const id = auth.currentUser.uid;
    const docRef = doc(db, "Account", id);
    const docSnap = await getDoc(docRef);
    const NumOfPaper = docSnap.data().NumOfPaper;
    console.log(NumOfPaper);
    for (let i = 1; i <= NumOfPaper; i++) {
        const papRef = doc(docRef, "Paper", String(i));
        await deleteDoc(papRef);
    }
    const profileRef = doc(docRef, "UserData", "Profile");
    await deleteDoc(profileRef);
    await deleteDoc(docRef);
    alert("アカウントの削除が完了しました");
}