let currID = parseInt(localStorage.getItem("currID")) || 20230000;
let myStyle = document.getElementById("Nid").style.border;
class Student {
  constructor(
    Fname,
    Lname,
    Nid,
    Email,
    Phone,
    Address,
    Birthday,
    Gender,
    Status,
    Level,
    GPA,
    Img,
    id,
    department
  ) {
    this.Fname = Fname;
    this.Lname = Lname;
    this.Nid = Nid;
    this.Email = Email;
    this.Phone = Phone;
    this.Address = Address;
    this.Birthday = Birthday;
    this.Gender = Gender;
    this.Status = Status;
    this.Level = Level;
    this.GPA = GPA;
    this.Img = Img;
    this.id = id;
    this.department = department;
  }
}

function showMessage(message) {
  let myInput = document.body.querySelector(`input[type="submit"]`);
  const messageEl = document.createElement("div");
  messageEl.textContent = message;
  messageEl.style.display = "block";
  messageEl.className = "message-container";
  myInput.before(messageEl);
  setTimeout(() => {
    messageEl.remove();
  }, 3000);
}

function addStudent(e) {
  e.preventDefault();
  removeLastChild("Nid");
  removeLastChild("Phone");

  if (!isValidNumber(14, "Nid")) {
    return;
  }
  if (!isValidNumber(11, "Phone")) {
    return;
  }

  if (document.getElementById("Phone").value.length != 11) {
    let errorMsg = document.createElement("div");
    errorMsg.textContent = `Please enter 11 digits`;
    document.getElementById("Phone").style.border = `4px solid red`;
    document.getElementById("Phone").after(errorMsg);
    return;
  }
  let Fname = document.getElementById("Fname").value;
  let Lname = document.getElementById("Lname").value;
  let Nid = document.getElementById("Nid").value;
  let Email = document.getElementById("Email").value;
  let Phone = document.getElementById("Phone").value;
  let Address = document.getElementById("Address").value;
  let Birthday = document.getElementById("Birthday").value;
  let Gender = document.getElementById("Gender").value;
  let Status = document.getElementById("Status").value;
  let Level = document.getElementById("Level").value;
  let GPA = document.getElementById("GPA").value;
  let Img = document.getElementById("Img").value;
  let department = "General";
  let id = currID;
  currID++;

  let student = new Student(
    Fname,
    Lname,
    Nid,
    Email,
    Phone,
    Address,
    Birthday,
    Gender,
    Status,
    Level,
    GPA,
    Img,
    id,
    department
  );

  let students = JSON.parse(localStorage.getItem("students")) || [];
  for (let i = 0; i < students.length; i++) {
    if (students[i].Nid === student.Nid) {
      showMessage("Student Already Exists!");
      document.getElementById("submitted").reset();
      return;
    }
  }
  students.push(student);

  localStorage.setItem("students", JSON.stringify(students));
  showMessage("Student Added Successfully!");
  document.getElementById("submitted").reset();
  localStorage.setItem("currID", currID.toString());
}

document.getElementById("submitted").addEventListener("submit", addStudent);

function validName(e) {
  if (!e.key.match(`[a-z]|[A-Z]`)) {
    e.preventDefault();
  }
}

document.getElementById("Fname").onkeydown = validName;
document.getElementById("Lname").onkeydown = validName;

function removeLastChild(ele) {
  if (document.getElementById(`${ele}`).nextElementSibling != null) {
    document
      .getElementById(`${ele}`)
      .parentElement.removeChild(
        document.getElementById(`${ele}`).parentElement.lastChild
      );
    document.getElementById(`${ele}`).style.border = myStyle;
  }
}
function isValidNumber(value, ele) {
  if (document.getElementById(`${ele}`).value.length != value) {
    document.getElementById(`${ele}`).style.border = `4px solid red`;
    let errorMsg = document.createElement("div");
    errorMsg.textContent = `Please enter ${value} digits`;
    document.getElementById(`${ele}`).after(errorMsg);
    return false;
  }
  return true;
}
