function showStudents() {
  fetch('/api/students/')
    .then(response => response.json())
    .then(data => {
      const activeStudents = data.filter(student => student.Status === true);
      const tableBody = document.querySelector("table tbody");
    
      activeStudents.forEach(element => {
        let row = document.createElement("tr");
        let stdID = document.createElement("td");
        let stdName = document.createElement("td");
        let stdGPA = document.createElement("td");
        let stdDept = document.createElement("td");
        let stdModify = document.createElement("td");
        let btn1 = document.createElement("a");
        let btn2 = document.createElement("a");
    
        stdID.textContent = element.id;
        stdName.textContent = `${element.Fname} ${element.Lname}`;
        stdGPA.textContent = element.GPA;
        stdDept.textContent = element.department;
        btn1.textContent = "Assign Department";
        btn1.href = `assign_dep/?id=${element.id}`;
        btn2.textContent = "Student Details";
        btn2.href = `edit_stu/?id=${element.id}`;
        stdModify.appendChild(btn1);
        stdModify.appendChild(btn2);
        row.appendChild(stdID);
        row.appendChild(stdName);
        row.appendChild(stdGPA);
        row.appendChild(stdDept);
        row.appendChild(stdModify);
        tableBody.appendChild(row);
      });
    })
    .catch(error => {
      console.error(error);
    });
}
  function filterSearch() {
    const searchInput = document.getElementById("search");
    const table = document.getElementById("table");
    searchInput.addEventListener("keyup", () => {
      const searchTerm = searchInput.value.toLowerCase();
      Array.from(table.querySelectorAll("tbody tr")).forEach((row) => {
        const name = row.cells[1].textContent.toLowerCase();
        if (name.includes(searchTerm)) {
          row.style.display = "";
        } else {
          row.style.display = "none";
        }
      });
    });
  }
  window.onload = function () {
    showStudents();
    filterSearch();
  };
