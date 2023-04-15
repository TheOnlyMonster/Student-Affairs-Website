let AllStudents = JSON.parse(localStorage.getItem("students"));
let activeStudents = AllStudents.filter((ele) => ele.Status === "Active");
let tableBody = document.body.querySelector("table tbody");

activeStudents.forEach((element) => {
  let row = document.createElement("tr");
  let stdID = document.createElement("td");
  let stdName = document.createElement("td");
  let stdGPA = document.createElement("td");
  let stdModify = document.createElement("td");
  let btn1 = document.createElement("a");
  let btn2 = document.createElement("a");

  stdID.textContent = element.id;
  stdName.textContent = `${element.Fname} ${element.Lname}`;
  stdGPA.textContent = element.GPA;
  btn1.textContent = "Assign Department";
  btn1.href = `assign-dept.html?id=${element.id}`;
  btn2.textContent = "Student Details";
  btn2.href = `edit-std.html?id=${element.id}`;
  stdModify.appendChild(btn1);
  stdModify.appendChild(btn2);
  row.appendChild(stdID);
  row.appendChild(stdName);
  row.appendChild(stdGPA);
  row.appendChild(stdModify);
  tableBody.appendChild(row);
});
function filterSearch() {
    const searchInput = document.getElementById("search");
    const table = document.getElementsByTagName("table")[0];
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
  filterSearch();

{
  /* <table class="container table-container">
    <thead>
        <th>ID</th>
        <th>Name</th>
        <th>GPA</th>
        <th>Modify Student</th>
    </thead>
    <tbody>
        <tr>
            <td>1</td>
            <td>
                <a>Abdelrahman Adel</a>
            </td>
            <td>3.78</td>
            <td>
                    <a href="assign-dept.html">Assign Department</a>
                    <a href="edit-std.html">Edit Student Details</a>
            </td>
        </tr>
        
    </tbody>
</table> */
}
