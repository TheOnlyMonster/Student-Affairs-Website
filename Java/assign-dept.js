let myForm = document.querySelector("form");
let id = window.location.search
  .split("")
  .filter((ele) => !isNaN(ele))
  .join("");
document.getElementById("id").value = id;
let students = JSON.parse(localStorage.getItem("students"));
students.forEach((element) => {
  if (element.id == id) {
    document.getElementById("Phone").value = element.Phone;
    document.getElementById("Address").value = element.Address;
    document.getElementById("Fname").value = element.Fname;
    document.getElementById("Lname").value = element.Lname;
    document.getElementById("Nid").value = element.Nid;
    document.getElementById("Email").value = element.Email;
    document.getElementById("Level").value = element.Level;
    document.getElementById("Gender").value = element.Gender;
    document.getElementById("Status").value = element.Status;
    let stdAge = new Date();
    stdAge = stdAge.getFullYear() - element.Birthday.substr(0, 4);
    document.getElementById("Birthday").value = stdAge;
    document.getElementById("GPA").value = element.GPA;
    document.getElementById("department").value = element.department;
    myForm.onsubmit = function () {
      let stdDept = document.querySelector("select").value;
      element.department = stdDept;
      localStorage.setItem("students", JSON.stringify(students));
    };
  }
});
