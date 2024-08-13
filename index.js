document.addEventListener("DOMContentLoaded", function () {
  let students = [];
  let referenceNumberCounter = 1; 

  function updateDateTime() {
    const now = new Date();
    const dateTimeString = now.toLocaleString();
    document.getElementById("datetime").textContent = dateTimeString;
  }

  updateDateTime();

  setInterval(updateDateTime, 1000);


  // function generateReferenceNumber() {
  //   return Math.floor(Math.random() * 1000);
  // }


  function generateReferenceNumber() {
    return referenceNumberCounter++; 
  }

  document.getElementById("userForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const studentid = document.getElementById("studentid").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const age = document.getElementById("age").value;
    const department = document.getElementById("department").value;

    if (age < 18) {
      alert("Age must be 18 or above to submit the form.");
      return;
    }

    const referenceNo = generateReferenceNumber();
    const student = { name, studentid, email, phone, age, department, referenceNo };
    students.push(student);

    const tableContainer = document.getElementById("tableContainer");
    tableContainer.style.display = "block";

    const table = document.getElementById("userTable");
    const newRow = table.insertRow(-1);

    const nameCell = newRow.insertCell(0);
    const studentidCell = newRow.insertCell(1);
    const emailCell = newRow.insertCell(2);
    const phoneCell = newRow.insertCell(3);
    const ageCell = newRow.insertCell(4);
    const departmentCell = newRow.insertCell(5);
    const referenceNoCell = newRow.insertCell(6); 

    nameCell.textContent = name;
    studentidCell.textContent = studentid;
    emailCell.textContent = email;
    phoneCell.textContent = phone;
    ageCell.textContent = age;
    departmentCell.textContent = department;
    referenceNoCell.textContent = referenceNo; 

    alert("Form Submitted");

    document.getElementById("userForm").reset();

    console.log(students);
  });

  document.getElementById("searchBtn").addEventListener("click", function () {
    const searchStudentId = document.getElementById("searchStudentId").value;
    const searchResult = document.getElementById("searchResult");

    searchResult.innerHTML = "";

    const student = students.find(student => student.studentid === searchStudentId);

    if (student) {
      searchResult.innerHTML = `
        <h2>Student Found:</h2>
        <p><strong>Name:</strong> ${student.name}</p>
        <p><strong>Student ID:</strong> ${student.studentid}</p>
        <p><strong>Email:</strong> ${student.email}</p>
        <p><strong>Phone:</strong> ${student.phone}</p>
        <p><strong>Age:</strong> ${student.age}</p>
        <p><strong>Department:</strong> ${student.department}</p>
        <p><strong>Reference No:</strong> ${student.referenceNo}</p>
      `;
    } else {
      searchResult.innerHTML = "<p>No student found with this ID.</p>";
    }
  });
});
