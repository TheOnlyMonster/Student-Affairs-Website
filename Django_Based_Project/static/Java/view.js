
function showStudents() {
  let tableBody = document.getElementById("table-body");

  fetch("api/students/")
    .then(response => response.json())
    .then(students => {
      students.forEach(student => {
        let row = document.createElement("tr");
        let id = document.createElement("td");
        let fullName = document.createElement("td");
        let gpa = document.createElement("td");
        let department = document.createElement("td");
        let activity = document.createElement("td");
        let active = document.createElement("button");
        let inactive = document.createElement("button");

        id.innerText = student.id;
        fullName.innerHTML =student.Fname+' '+student.Lname;
        gpa.innerText = student.GPA;
        department.innerText = student.department;
        active.innerText = "Active";
        active.classList.add("btn");
        inactive.innerText = "Inactive";
        inactive.classList.add("btn");

        if (student.Status) {
          active.classList.add("active");
        } else {
          inactive.classList.add("active");
        }

        active.addEventListener("click", () => {
          if (!active.classList.contains("active")) {
            active.classList.add("active");
            inactive.classList.remove("active");
            student.Status = true;
            updateStudentStatus(student);
          }
        });

        inactive.addEventListener("click", () => {
          if (!inactive.classList.contains("active")) {
            inactive.classList.add("active");
            active.classList.remove("active");
            student.Status = false;
            updateStudentStatus(student);
          }
        });

        activity.appendChild(active);
        activity.appendChild(inactive);

        row.appendChild(id);
        row.appendChild(fullName);
        row.appendChild(gpa);
        row.appendChild(department);
        row.appendChild(activity);

        tableBody.appendChild(row);
      });
    })
    .catch(error => {
      console.error("Error:", error);
    });
}

function updateStudentStatus(student) {
  fetch(`api/students/${student.id}/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(student),
  })
    .then(response => response.json())
    .then(updatedStudent => {
      console.log("Student status updated:", updatedStudent);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Changed student status",
        showConfirmButton: false,
        timer: 1500,
      });
    })
    .catch(error => {
      console.error("Error updating student status:", error);
    });
} 
function filterSearch() {
  const searchInput = document.getElementById("search");
  const table = document.getElementById("table");

  if (!searchInput || !table) {
    console.error("Required elements not found.");
    return;
  }

  searchInput.addEventListener("keyup", () => {
    const searchTerm = searchInput.value.toLowerCase();
    Array.from(table.getElementsByTagName("tr")).forEach((row, index) => {
      if (index === 0) {
        // Skip the table header row
        return;
      }
      const name = row.cells[1].textContent.toLowerCase();
      const id = row.cells[0].textContent.toLowerCase();
      if (name.includes(searchTerm) || id.includes(searchTerm)) {
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

