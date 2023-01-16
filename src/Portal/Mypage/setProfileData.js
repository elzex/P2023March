const msg = document.getElementById("profileDefaultMessage");
const tableDisplay = document.getElementById("Profile");
const Table = document.getElementsByClassName("tbInner");
const TabTitle = document.getElementById("Title");
export function setUserData(data) {
    if (data != 0) {
        let parValue;
        if (data.Presen == 0) {
            TabTitle.style.display = "none";
            parValue = "参加のみ";
        } else if (data.Presen == 1) {
            let titleCheck;
            parValue = "講演有り";
            if (data.abs != undefined) {
                titleCheck = data.abs[0];
            } else {
                titleCheck = "未投稿";
            }
            //console.log(titleCheck);
            Table.TitleBody.innerHTML = titleCheck;
        }

        Table.ParticipationBody.innerHTML = parValue;

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