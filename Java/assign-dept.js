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
if (std.Gender === "Male") {
  document.querySelector("img").setAttribute("src", "imgs/male-student.png");
} else {
  document.querySelector("img").setAttribute("src", "imgs/female-student.png");
}
let allProp = Object.keys(std);
for (let i = 0; i < allProp.length; i++) {
  if (allProp[i] !== `department`) {
    if (allProp[i] == "Birthday") {
      let currDate = new Date();
      let stdDate = new Date(std.Birthday);
      let stdAge = currDate.getFullYear() - stdDate.getFullYear();
      document.getElementById(allProp[i]).value = stdAge;
    } else {
      document.getElementById(allProp[i]).value = std[allProp[i]];
    }
  }
}
if (std.Status === "Active" && std.Level >= 3) {
  myForm.onsubmit = function (e) {
    e.preventDefault();
    let stdDept = document.querySelector("select").value;
    if (std.department != stdDept) {
      Swal.fire({
        title: `Do you want to save changes?`,
        text: `Change department from ${std.department} to ${stdDept}?`,
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
