import "../css/Form.css";
import "../css/Button.css";
import { generateReference, uploadFiles } from "../firebaseModule/Storage.js"

let file = document.getElementById("file");
file.addEventListener("change", () => {
    console.log(file.value);
})

const post = document.querySelector(".post");
post.addEventListener("submit", function (e) {
    e.preventDefault();
    //console.log("test");
});

console.log("a");