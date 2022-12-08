import "../css/Form.css"
import "../css/Mypage.css";
import "../css/Tab.css";
import "../css/Table.css";

import { userCheck } from "../firebaseModule/Authentication";
import { setUserData } from "./Mypage/setProfileData";
//import { setPaperData } from "./Mypage/setPaperData"

window.onload = function () {
    userCheck().then((user) => {
        console.log(user.uid);
        setUserData(user.uid);
        //setPaperData(user.uid);
    }).catch(() => {
        window.location.href = "../index.html";
    });
}

const back = document.getElementById("back");
back.addEventListener("click", () => {
    window.location.href = "./Home.html";
})