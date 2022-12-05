import { doc, getDoc } from "firebase/firestore"
import { db } from "../../firebaseModule/Firestore";

const paperTable = document.getElementById("Paper");
const paperDefaultMessage = document.getElementById("paperDefaultMessage");
export async function setPaperData(id) {
    const papData = await getPaperData(id);
    console.log(papData);
    for (let i = 1; i <= papData[0]; i++) {
        paperTable.style.visibility = "visible";
        const pap = document.getElementById("Paper" + i);
        //console.log(pap);
        pap.style.visibility = "visible";
        const titleBox = document.getElementById("P" + i + "TitleBox")
        const fileBox = document.getElementById("P" + i + "FileBox")
        titleBox.innerHTML = papData[i].Title;
        fileBox.innerHTML = papData[i].FileName;
    }
}

const pExists = document.getElementById("paperExists");
async function getPaperData(id) {
    const docRef = doc(db, "Account", id);
    const docSnap = await getDoc(docRef);
    const NumOfPaper = docSnap.data().NumOfPaper;
    let arr = [];
    arr.push(NumOfPaper);
    if (NumOfPaper == 0) {
        pExists.style.display = "block";
        paperDefaultMessage.style.display = "none";
    } else {
        paperDefaultMessage.style.display = "none";
        for (let i = 1; i <= NumOfPaper; i++) {
            const papRef = doc(docRef, "Paper", String(i));
            const papSnap = await getDoc(papRef);
            arr.push(papSnap.data());
        }
    }
    return arr;
}