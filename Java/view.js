function activateButton() {
    const activeButton = document.getElementById('Active-button');
    const inactiveButton = document.getElementById('inactive-Button');
    activeButton.addEventListener('click', () => {
        activeButton.classList.add('active');
        inactiveButton.classList.remove('active');
    });
    inactiveButton.addEventListener('click', () => {
        inactiveButton.classList.add('active');
        activeButton.classList.remove('active');
    });
}
function filterSearch(){
    const searchInput = document.getElementById('search');
    const table = document.getElementById('table');
    searchInput.addEventListener('keyup', () => {
        const searchTerm = searchInput.value.toLowerCase();
        Array.from(table.querySelectorAll('tbody tr')).forEach(row => {
          const name = row.cells[1].textContent.toLowerCase();
          if (name.includes(searchTerm)) {
            row.style.display = '';
          } else {
            row.style.display = 'none';
          }
        });
      });
}
function showStudent(students) {
    let tableBody = document.getElementById("table-body");
     students.forEach((student) => {  
        let row = document.createElement("tr");
        let id = document.createElement("td");
        let FullName = document.createElement("td");
        let GPA = document.createElement("td");
        let department = document.createElement("td");
        let active = document.createElement("button");
        let inactive = document.createElement("button");
    
        id.innerText = student.id;
        FullName.innerHTML = `<a href="department.html">${student.Fname} ${student.Lname}</a>`;
        GPA.innerText = student.GPA;
        department.innerText=student.department
        active.innerText = "Active";
        active.classList.add('btn');
        inactive.innerText = "Inactive";
        inactive.classList.add('btn');
        if (student.Status === "Active"){
            active.classList.add('active');
        }
        else if(student.Status === "Inactive"){
            inactive.classList.add('active');
        }
        
        row.appendChild(id);
        row.appendChild(FullName);
        row.appendChild(GPA);
        row.appendChild(department);
        row.appendChild(active);
        row.appendChild(inactive);
        tableBody.appendChild(row)
    });
}
window.onload = function() {
    showStudent(JSON.parse(localStorage.getItem("students")));
 
};
filterSearch();





