let currDate = new Date();
let myStyle = document.getElementById("Nid").style;
let students = JSON.parse(localStorage.getItem("students"));
let stdID = location.search
  .split("")
  .filter((ele) => !isNaN(ele))
  .join("");
students.forEach((element) => {
  if (element.id == stdID) {
    document.getElementById("Phone").value = element.Phone;
    document.getElementById("Address").value = element.Address;
    document.getElementById("Fname").value = element.Fname;
    document.getElementById("Lname").value = element.Lname;
    document.getElementById("Nid").value = element.Nid;
    document.getElementById("Email").value = element.Email;
    document.getElementById("Level").value = element.Level;
    document.getElementById("Gender").value = element.Gender;
    document.getElementById("Status").value = element.Status;
    document.getElementById("Birthday").value = element.Birthday;
    document.getElementById("GPA").value = element.GPA;
    document.getElementById("department").value = element.department;

    document.getElementById("Fname").onkeydown = validName;
    document.getElementById("Lname").onkeydown = validName;
    document.body.querySelector("form").onsubmit = function (e) {
      e.preventDefault();
      if (document.getElementById(`input-error`) != null) {
        document.getElementById(`input-error`).previousElementSibling.style =
          myStyle;
        document.getElementById(`input-error`).remove();
      }
      if (document.getElementById("Nid").value.length != 14) {
        showError("Nid", "Please enter 14 digits.");
        return;
      }
      if (document.getElementById("Phone").value.length != 11) {
        showError("Phone", "Please enter 11 digits.");
        return;
      }
      let stdDate = new Date(document.getElementById("Birthday").value);
      if (currDate.getFullYear() - stdDate.getFullYear() < 17) {
        showError("Birthday", "Your age must be greater than 17.");
        return;
      }

      for (let i = 0; i < students.length; i++) {
        if (
          students[i].Nid === document.getElementById("Nid").value &&
          students[i].id != element.id
        ) {
          showError("Nid", "National ID already taken.");
          return;
        }
      }
      element.Fname = document.getElementById("Fname").value;
      element.Lname = document.getElementById("Lname").value;
      element.Nid = document.getElementById("Nid").value;
      element.Email = document.getElementById("Email").value;
      element.Phone = document.getElementById("Phone").value;
      element.Address = document.getElementById("Address").value;
      element.Birthday = document.getElementById("Birthday").value;
      element.Gender = document.getElementById("Gender").value;
      element.Status = document.getElementById("Status").value;
      element.Level = document.getElementById("Level").value;
      element.GPA = document.getElementById("GPA").value;

      localStorage.setItem("students", JSON.stringify(students));
      let myDiv = document.createElement("div");
      myDiv.textContent = `Student info for ${element.id} has been changed.`;
      myDiv.style.fontSize = `13px`;
      document.querySelector(`input[type="submit"]`).before(myDiv);
      setTimeout(function () {
        myDiv.remove();
      }, 3000);
    };
  }
});

function validName(e) {
  if (!e.key.match(`[a-z]|[A-Z]`)) {
    e.preventDefault();
  }
}

function showError(ele, msg) {
  document.getElementById(`${ele}`).style.border = `3px solid red`;
  let errorMsg = document.createElement("div");
  errorMsg.textContent = msg;
  errorMsg.id = `input-error`;
  document.getElementById(`${ele}`).after(errorMsg);
}
