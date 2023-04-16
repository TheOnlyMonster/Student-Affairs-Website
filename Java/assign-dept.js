let myForm = document.querySelector("form");
let std;
let stdID = window.location.search
  .split("")
  .filter((ele) => !isNaN(ele))
  .join("");
let students = JSON.parse(localStorage.getItem("students"));
for (let i = 0; i < students.length; i++) {
  if (students[i].id == stdID) {
    std = students[i];
    break;
  }
}
document.getElementById("id").value = std.id;
document.getElementById("Phone").value = std.Phone;
document.getElementById("Address").value = std.Address;
document.getElementById("Fname").value = std.Fname;
document.getElementById("Lname").value = std.Lname;
document.getElementById("Nid").value = std.Nid;
document.getElementById("Email").value = std.Email;
document.getElementById("Level").value = std.Level;
document.getElementById("Gender").value = std.Gender;
document.getElementById("Status").value = std.Status;
let currDate = new Date();
let stdDate = new Date(std.Birthday);
let stdAge = currDate.getFullYear() - stdDate.getFullYear();
document.getElementById("Birthday").value = stdAge;
document.getElementById("GPA").value = std.GPA;
document.getElementById("department").value = std.department;
if (std.Status === "Active" && std.Level >= 3) {
  myForm.onsubmit = function (e) {
    e.preventDefault();
    let stdDept = document.querySelector("select").value;
    if (std.department != stdDept) {
      Swal.fire({
        title: `Do you want to change department for student ${std.id} from ${std.department} to ${stdDept}?`,
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Save",
        denyButtonText: `Don't save`,
      }).then((result) => {
        if (result.isConfirmed) {
          std.department = stdDept;
          localStorage.setItem("students", JSON.stringify(students));
          Swal.fire("Saved!", "", "success");
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
      });
    }
  };
} else {
  document.getElementById("department").setAttribute("disabled", true);
  if (std.Status === "Inactive") {
    showError("Status", "Student should be active.");
  }
  if (std.Level < 3) {
    showError("Level", "Student level must be greater than or equal to 3.");
  }
}
function showError(ele, msg) {
  document.getElementById(`${ele}`).style.border = `3px solid red`;
  let errorMsg = document.createElement("div");
  errorMsg.textContent = msg;
  errorMsg.id = `input-error`;
  document.getElementById(`${ele}`).after(errorMsg);
}
