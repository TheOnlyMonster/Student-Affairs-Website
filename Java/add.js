let currID = parseInt(localStorage.getItem("currID")) || 20230000;
class Student {
  constructor(Fname, Lname, Nid, Email, Phone, Address, Birthday, Gender, Status, Level, GPA, Img, id,department) {
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
    this.department=department;
  }
}

function showMessage(message){
    const messageEl = document.getElementById("message");
    messageEl.textContent = message;
    messageEl.style.display = "block";
    messageEl.className = "message-container";
    setTimeout(() => {
        messageEl.textContent = " ";
        messageEl.style.display = "none";
    }, 3000);
}

function addStudent(e) {
  e.preventDefault();

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

  let student = new Student(Fname, Lname, Nid, Email, Phone, Address, Birthday, Gender, Status, Level, GPA, Img, id,department);

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



document.getElementById("submitted").addEventListener('submit', addStudent);
