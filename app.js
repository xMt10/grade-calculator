// an empty student array
let students = [];

//getting students info if there is in local storage
let isItInLocal = localStorage.getItem("students");

if (isItInLocal) {
  //if it is registered

  students = JSON.parse(localStorage.getItem("students"));
} else {
  students = [];
}

const studentForm = document.querySelector("#student-form");
const studentList = document.querySelector("#student-list");
const addButton = document.querySelector(".add");

studentForm.addEventListener("submit", (e) => {
  // When it is submitted with the form, it cancels the refresh because the page is refreshed.
  e.preventDefault();

  const name = document.querySelector("#name").value;
  const surname = document.querySelector("#surname").value;
  const number = document.querySelector("#number").value;
  const midterm = document.querySelector("#midterm").value;
  const final = document.querySelector("#final").value;

  const newStudent = {
    name: name,
    surname: surname,
    number: number,
    midterm: Number(midterm),
    final: Number(final),
  };
  students.push(newStudent);

  console.log(newStudent);

  studentForm.reset();

  // saving and updating student to localstorage
  saveToLocalStorage();
});
viewStudentList();
function viewStudentList() {
  // Clear existing student cards
  studentList.innerHTML = "";

  // when the list is empty partition to show
  const emptyList = document.querySelector(".empty");

  if (students.length) {
    if (emptyList) {
      emptyList.style.display = "none";
    }

    students.forEach((st, index) => {
      const average =
        st.midterm * (0.4).toFixed(2) + st.final * (0.6).toFixed(2);
      const studentCard = `
       <div class="student-item-info">
        <h3>${st.name} ${st.surname} - ${st.number} </h3>
        <span>Midterm:${st.midterm} Final:${st.final}</span>
        <p>Ortalama: ${average})
      } }</p>
       </div>
       <div class="student-item-process">
        <i class="fa-solid fa-pen-to-square edit-button"></i>
        <i class="fa-solid fa-trash delete-button"onclick='deleteStudent(${index})'></i>
       </div>
     `;
      const studentItem = document.createElement("div");
      studentItem.classList.add("student-item");
      studentItem.innerHTML = studentCard;

      if (average > 80) {
        studentItem.style.background = "#15aefe";
      } else if (average > 60) {
        studentItem.style.background = "#f47121";
      } else if (average > 45) {
        studentItem.style.background = "#630eff";
      } else {
        studentItem.style.background = "#ff0fe4";
      }
      studentList.appendChild(studentItem);
    });
  } else {
    const forEmpty =
      '<p class="empty">There is no any student in the list.</p>';
    studentList.innerHTML = forEmpty;
  }
}

// operations of deleting student
function deleteStudent(i) {
  students = students.filter((st, index) => {
    if (index === i) {
      Toastify({
        text: `${st.name} was deleted form student list`,
        duration: 1300,
      }).showToast();
    }
    return index !== i;
  });
  saveToLocalStorage();
  viewStudentList();
}

//storing students info in the localstorage
function saveToLocalStorage() {
  localStorage.setItem("students", JSON.stringify(students));
  viewStudentList();
}
