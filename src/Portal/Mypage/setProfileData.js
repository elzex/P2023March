import { doc, getDoc } from "firebase/firestore"
import { db } from "../../firebaseModule/Firestore";

async function getUserData(uid) {
    const docRef = doc(db, "Account", uid);
    const profileRef = doc(docRef, "UserData", "Profile");
    const docSnap = await getDoc(profileRef);
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
export async function setUserData(id) {
    const data = await getUserData(id);
    if (data != 0) {
        let userName;
        userName = data.FirstName + " " + data.FamilyName;

        displayControll(data);
        //console.log(userName);
        Table.Name.innerHTML = userName;
        Table.Aff.innerHTML = data.Affiliation;
        Table.Title.innerHTML = data.Title;
        //Table.DepBody.innerHTML = data.Department;
        Table.Country.innerHTML = data.Country;
        Table.Postcode.innerHTML = data.PostCode;
        Table.City.innerHTML = data.City;
        Table.State.innerHTML = data.State;
        Table.AddressLine.innerHTML = data.AddressLine1;
        Table.AL2Body.innerHTML = data.AddressLine2;
        Table.Timezone.innerHTML = data.Timezone;
        Table.PhoneBody.innerHTML = data.PhoneNumber;
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