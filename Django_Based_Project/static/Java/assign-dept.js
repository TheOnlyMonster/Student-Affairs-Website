let urlParams = new URLSearchParams(window.location.search);
let stdID = urlParams.get('id');
fetch(`/api/students/`)
  .then(response => response.json())
  .then(students => {
    let targetStudent = students.find(student => student.id == stdID);
    
    if (targetStudent) {
      let formElements = document.querySelectorAll("form input,form select,form img");
      formElements.forEach(element => {
        let propName = element.id;
        if (propName !== 'department'&&propName != 'Submit') {
          if (propName === 'Birthday') {
            let currDate = new Date();
            let stdDate = new Date(targetStudent.Birthday);
            let stdAge = currDate.getFullYear() - stdDate.getFullYear();
            element.value = stdAge;
          }else if (propName === "image") {

            imgSrc = `/media/${targetStudent.image}`;
            document.querySelector("img").setAttribute("src", imgSrc);
          }else {
           element.value = targetStudent[propName];
           
          }
        }

        if (propName === 'department') {
          
          element.value = targetStudent.department;
        }
      });
  
      let myForm = document.querySelector("form");
      if (targetStudent.Level == 'Third Level') {
        myForm.onsubmit = function(e) {
          e.preventDefault();
          let stdDept = document.querySelector("select").value;
          if (targetStudent.department != stdDept) {
            Swal.fire({
              title: `Do you want to save changes?`,
              text: `Change department from ${targetStudent.department} to ${stdDept}?`,
              showDenyButton: true,
              showCancelButton: true,
              confirmButtonText: "Save",
              denyButtonText: `Don't save`,
            }).then((result) => {
              if (result.isConfirmed) {
                targetStudent.department=stdDept;
                fetch(`/api/students/${stdID}/`, {
                  method: 'PUT',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(targetStudent),
                })
                .then(response => response.json())
                .then(updatedStudent => {
                  console.log("Student department updated:", updatedStudent);
                  Swal.fire("Saved!", "", "success");
                })
                .catch(error => {
                  console.error('Error:', error);
                });
              } else if (result.isDenied) {
                Swal.fire("Changes are not saved", "", "info");
              }
            });
          }
        };
      }else {
        showError("Level", "Student level must be greater than or equal to 3.");
        myForm.onsubmit = function(e) {
          e.preventDefault();
        };
      }
    } else {
      console.log(`Student with ID ${stdID} not found.`);
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });


function showError(elementId, message) {
  let element = document.getElementById(elementId);
  element.style.border = "3px solid red";
  let errorMsg = document.createElement("div");
  errorMsg.textContent = message;
  errorMsg.id = "input-error";
  element.after(errorMsg);
}


