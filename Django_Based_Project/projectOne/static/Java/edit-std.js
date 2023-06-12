let urlParams = new URLSearchParams(window.location.search);
let stdID = urlParams.get('id');
let myStyle = document.getElementById("Nid").style;
let currDate = new Date();
let allProp;
let targetStudent;
let imgSrc;
fetch(`/api/students/`)
  .then(response => response.json())
  .then(students => {
    targetStudent = students.find(student => student.id == stdID);
    if (targetStudent) {
      allProp = Object.keys(targetStudent);
      for (let i = 0; i < allProp.length; i++) {
        if(allProp[i] === 'Status'){
          if(targetStudent[allProp[i]]){
            document.getElementById(allProp[i]).value ='Active' ;
          }else{
            document.getElementById(allProp[i]).value ='Inactive' ;
          }
        }else if (allProp[i] === "image") {
          imgSrc = `/media/${targetStudent.image}`;
          document.querySelector("img").setAttribute("src", imgSrc);
        }
        else if (allProp[i] !== `id`) {
          document.getElementById(allProp[i]).value =targetStudent[allProp[i]] ;
        } 
      }
    } else {
    console.log(`Student with ID ${stdID} not found.`);
    }
  }).catch(error => {
  console.error('Error:', error);
});

document.getElementById("Fname").onkeydown = validName;
document.getElementById("Lname").onkeydown = validName;

document.getElementById("change").onclick = function(e) {      
  e.preventDefault();
  if (document.getElementById(`input-error`) != null) {
    document.getElementById(`input-error`).previousElementSibling.style =
      myStyle;
    document.getElementById(`input-error`).remove();
  }
  if (document.getElementById("Nid").value.length != 14) {
    showError("Nid", "Please enter 14 digits.");
    return;
  }
  if (document.getElementById("Phone").value.length != 11) {
    showError("Phone", "Please enter 11 digits.");
    return;
  }
  let stdDate = new Date(document.getElementById("Birthday").value);
  if (currDate.getFullYear() - stdDate.getFullYear() < 17) {
    showError("Birthday", "Your age must be greater than 17.");
    return;
  }
  let listOfChanges = [];
  for (let i = 0; i < allProp.length; i++) {
    if (allProp[i] !== `department` && allProp[i] !== `id` && allProp[i] !== `image`) {
      if (document.getElementById(`${allProp[i]}`).value != targetStudent[allProp[i]]) {
        listOfChanges.push(
          `Change ${allProp[i]} from ${targetStudent[allProp[i]]} to ${
            document.getElementById(`${allProp[i]}`).value
          }? <br>`
        );
      }
    }
  }
  
  if (listOfChanges.length != 0) {
    listOfChanges = listOfChanges.join("");
    Swal.fire({
      title: `Do you want to save the changes?`,
      html: `${listOfChanges}`,
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
    }).then((result) => {
      if (result.isConfirmed) {
        for (let i = 0; i < allProp.length; i++) {
          if (allProp[i] !== `department` && allProp[i] !== `id` && allProp[i] !== `image`) {
            if (allProp[i] == "Status") {
              if (document.getElementById(allProp[i]).value == "Active") {
                console.log("hereTrue");
                targetStudent.status = true;
              }
              else {
                console.log("hereFalse");
                targetStudent.status = false;
                console.log( targetStudent.status);
              }
            }
            else {
                targetStudent[allProp[i]] = document.getElementById(allProp[i]).value;
            }
          }
        }
        console.log(targetStudent);
        fetch(`/api/students/${stdID}/`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(targetStudent),
        })
        .then(response => response.json())
        .then( ()=> {
        Swal.fire("Saved!", "", "success");
        setTimeout(()=>location.reload(),3000)
        });
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  }
};

document.getElementById("delete").addEventListener("click", deleteStd);
function deleteStd(e) {
   e.preventDefault();
  Swal.fire({
    title: `Are you sure you want to delete student ${stdID}?`,
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#002a56",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      fetch(`/api/students/${stdID}/`, {
        method: 'DELETE',
      })
        .then(response => {
          if (response.ok) {
            Swal.fire("Deleted!", `Student ${stdID} has been deleted.`, "success");
            setTimeout(function () {
              window.location.href = "/viewActive";
            }, 2000);
          } else {
            console.error('Error:', response.status);
          }
        })
        .catch(error => {
          console.error('Error:', error);
        });
        
    }
    
  });
}


function validName(e) {
if (!e.key.match(`[a-z]|[A-Z]`)) {
  e.preventDefault();
}
}

function showError(ele, msg) {
document.getElementById(`${ele}`).style.border = `3px solid red`;
let errorMsg = document.createElement("div");
errorMsg.textContent = msg;
errorMsg.id = `input-error`;
document.getElementById(`${ele}`).after(errorMsg);
}
