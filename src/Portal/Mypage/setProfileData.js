import { doc, getDoc } from "firebase/firestore"
import { db } from "../../firebaseModule/Firestore";

async function getUserData(uid) {
    const docRef = doc(db, "Account", uid);
    const profileRef = doc(docRef, "UserData", "Profile");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        //console.log(docSnap.data());
        return docSnap.data();
    } else {
        console.log("No such document!");
        return 0;
    }
}

const msg = document.getElementById("profileDefaultMessage");
const tableDisplay = document.getElementById("Profile");
const Table = document.getElementsByClassName("tbInner");
const TabTitle = document.getElementById("Title");
export async function setUserData(id) {
    const data = await getUserData(id);
    if (data != 0) {
        let parValue;
        if (data.Title == "Participation only") {
            TabTitle.style.display = "none";
            parValue = "参加のみ";
        } else {
            parValue = "講演有り";
            Table.TitleBody.innerHTML = data.Title;
        }
        Table.ParticipationBody.innerHTML = parValue;

        displayControll(data);
        //console.log(userName);
        Table.Aff.innerHTML = data.Affiliation;
        Table.Comment.innerHTML = data.Comment;
        Table.Job.innerHTML = data.Job;
        Table.Joint.innerHTML = data.Joint;
        Table.Mail.innerHTML = data.eMail;
        Table.Name.innerHTML = data.Name;
        Table.PhoneBody.innerHTML = data.PhoneNumber;
        Table.Preferred.innerHTML = data.PreferredTime;
        Table.Schedule.innerHTML = data.Schedule;
        Table.Support.innerHTML = data.Support;
        msg.style.display = "none";
        tableDisplay.style.visibility = "visible";
    }
}

const Department = document.getElementById("Department");
const AddressLine2 = document.getElementById("AL2");
const Phone = document.getElementById("PhoneNumber");
function displayControll(data) {

    if (data.AddressLine2 == "") {
        AddressLine2.style.display = "none";
    }
    if (data.PhoneNumber == "") {
        Phone.style.display = "none";
    }
}