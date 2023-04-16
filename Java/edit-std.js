let currDate = new Date();
let myStyle = document.getElementById("Nid").style;
let students = JSON.parse(localStorage.getItem("students"));
let std;
let stdID = location.search
  .split("")
  .filter((ele) => !isNaN(ele))
  .join("");
for (let i = 0; i < students.length; i++) {
  if (students[i].id == stdID) {
    std = students[i];
    break;
  }
}
document.getElementById("Phone").value = std.Phone;
document.getElementById("Address").value = std.Address;
document.getElementById("Fname").value = std.Fname;
document.getElementById("Lname").value = std.Lname;
document.getElementById("Nid").value = std.Nid;
document.getElementById("Email").value = std.Email;
document.getElementById("Level").value = std.Level;
document.getElementById("Gender").value = std.Gender;
document.getElementById("Status").value = std.Status;
document.getElementById("Birthday").value = std.Birthday;
document.getElementById("GPA").value = std.GPA;
document.getElementById("department").value = std.department;

document.getElementById("Fname").onkeydown = validName;
document.getElementById("Lname").onkeydown = validName;

document.getElementById("delete").addEventListener("click", deleteStd);

function deleteStd(e) {
  e.preventDefault();
  Swal.fire({
    title: `Are you sure you want to delete student ${std.id}?`,
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#002a56",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      students.splice(students.indexOf(std), 1);
      localStorage.setItem("students", JSON.stringify(students));
      Swal.fire("Deleted!", `Student ${std.id} has been deleted.`, "success");
      setTimeout(function () {
        window.location.pathname = "view.html";
      }, 2000);
    }
  });
}
document.getElementById("change").onclick = function (e) {
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
      students[i].id != std.id
    ) {
      showError("Nid", "National ID already taken.");
      return;
    }
  }
  Swal.fire({
    title: "Do you want to save the changes?",
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: "Save",
    denyButtonText: `Don't save`,
  }).then((result) => {
    if (result.isConfirmed) {
      std.Fname = document.getElementById("Fname").value;
      std.Lname = document.getElementById("Lname").value;
      std.Nid = document.getElementById("Nid").value;
      std.Email = document.getElementById("Email").value;
      std.Phone = document.getElementById("Phone").value;
      std.Address = document.getElementById("Address").value;
      std.Birthday = document.getElementById("Birthday").value;
      std.Gender = document.getElementById("Gender").value;
      std.Status = document.getElementById("Status").value;
      std.Level = document.getElementById("Level").value;
      std.GPA = document.getElementById("GPA").value;
      localStorage.setItem("students", JSON.stringify(students));
      Swal.fire("Saved!", "", "success");
    } else if (result.isDenied) {
      Swal.fire("Changes are not saved", "", "info");
    }
  });
};

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
