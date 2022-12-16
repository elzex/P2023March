import { app } from "./config";
import {
    getAuth, createUserWithEmailAndPassword,
    signInWithEmailAndPassword, signOut,
    onAuthStateChanged, deleteUser
} from "firebase/auth"

export const auth = getAuth(app);

//SignUp
export const userSignUp = (mail, pass) => {
    return new Promise((resolve) => {
        createUserWithEmailAndPassword(auth, mail, pass).then((userCredential) => {
            const user = userCredential.user;
            console.log("SignUp complete");
            console.log(user);
            resolve(user)
            //window.location.href = "../Portal/Home.html";
        }).catch((e) => {
            const eCode = e.code;
            const eMessage = e.message;
            console.log(eCode, eMessage);
        });
    });
}

//SignIn
export var userSignIn = (mail, pass) => {
    return new Promise((resolve) => {
        signInWithEmailAndPassword(auth, mail, pass).then(function (userCredential) {
            const user = userCredential.user;
            console.log("SignIn complete");
            console.log(user);
            resolve(user);
        }).catch((e) => {
            const eCode = e.code;
            const eMessage = e.message;
            console.log(eCode, eMessage);
            alert(eCode, eMessage);
        });
    });
}

//SignOut
export function userSignOut() {
    signOut(auth).catch((e) => {
        const eCode = e.code;
        const eMessage = e.message;
        console.log(eCode, eMessage);
    });
}

export var userCheck = () => {
    return new Promise((resolve) => {
        var unsubscribe = onAuthStateChanged(auth, (user) => {
            // user オブジェクトを resolve
            resolve(user);
            // 登録解除
            unsubscribe();
        });
    });
};

//DeleteUserAccount
export async function userDeleteAccount() {
    const user = auth.currentUser;
    deleteUser(user).then(() => {
        console.log("Account delete complete");
    }).catch((e) => {
        const eCode = e.code;
        const eMessage = e.message;
        console.log(eCode, eMessage);
    })
}