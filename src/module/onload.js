import { userCheck } from "../firebaseModule/Authentication"

export async function loadAccount(id1, id2) {
    let user = await userCheck();
    if (user) {
        console.log(user.uid);
        id1.style.display = "none";
        id2.style.display = "block";
        return 0;
    } else {
        console.log("User is undefined!");
        //window.location.href = "./Authentication.html"
        return 1;
    }
}