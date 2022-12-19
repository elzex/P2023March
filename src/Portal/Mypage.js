import "../css/Form.css"
import "../css/Mypage.css";
import "../css/Tab.css";
import "../css/Table.css";

import { userCheck } from "../firebaseModule/Authentication";
import { setUserData } from "./Mypage/setProfileData";
import { getUserData } from "../firebaseModule/Firestore";
import { checkAbstract } from "./Mypage/abstract";

window.onload = function () {
    userCheck().then(async (user) => {
        //console.log(user.uid);
        const data = await getUserData(user.uid);
        setUserData(data);
        checkAbstract(data);
    }).catch(() => {
        window.location.href = "../index.html";
    });
}

const back = document.getElementById("back");
back.addEventListener("click", () => {
    window.location.href = "./Home.html";
})