// Wait until the DOM is fully loaded before running JavaScript
document.addEventListener("DOMContentLoaded", loadStudents);

// Handle form submission
document.getElementById("student-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent page reload

    // Get input values
    const firstName = document.getElementById("first-name").value.trim();
    const lastName = document.getElementById("last-name").value.trim();
    const gender = document.getElementById("gender").value; 
    const studentID = document.getElementById("student-id").value.trim();
    const email = document.getElementById("email-id").value.trim();
    const contact = document.getElementById("contact").value.trim();

    // Validate that all fields are filled
    if (!firstName || !lastName || !gender || !studentID || !email || !contact){
        alert("All fields are required!");
        return;
    }

    // Add student to table and save in localStorage
    addStudentToTable(firstName, lastName, gender, studentID, email, contact);
    saveStudent(firstName, lastName, gender, studentID, email, contact);

    // Reset the form after submission
    document.getElementById("student-form").reset();
});

// Function to add student data to the table
function addStudentToTable(firstName, lastName, gender, studentID, email, contact){
    const table = document.getElementById("students-table");
    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${firstName} ${lastName}</td>
        <td>${gender}</td>
        <td>${studentID}</td>
        <td>${email}</td>
        <td>${contact}</td>
        <td class="actions">
            <button onclick="editStudent(this)">Edit</button>
            <button onclick="deleteStudent(this)">Delete</button>
        </td>
    `;

    table.appendChild(row);
}

// Function to save student records in local storage
function saveStudent(firstName, lastName, gender, studentID, email, contact){
    let students = JSON.parse(localStorage.getItem("students")) || [];
    students.push({firstName, lastName, gender, studentID, email, contact });
    localStorage.setItem("students", JSON.stringify(students));
}

// Function to load saved students from local storage on page reload
function loadStudents() {
    let students = JSON.parse(localStorage.getItem("students")) || [];
    students.forEach(student => 
        addStudentToTable(student.firstName, student.lastName, student.gender, student.studentID, student.email, student.contact)
    );
}

// Function to edit student details
function editStudent(button) {
    const row = button.parentElement.parentElement;
    const cells = row.getElementsByTagName("td");
    
    let nameParts = cells[0].innerText.split(" ");
    document.getElementById("first-name").value = nameParts[0];
    document.getElementById("last-name").value = nameParts.slice(1).join(" ");
    document.getElementById("gender").value = cells[1].innerText;
    document.getElementById("student-id").value = cells[2].innerText;
    document.getElementById("email-id").value = cells[3].innerText;
    document.getElementById("contact").value = cells[4].innerText;

    deleteStudent(button); // Remove existing row before editing
}

// Function to delete student records
function deleteStudent(button) {
    const row = button.parentElement.parentElement;
    const id = row.cells[2].innerText; // Student ID is in column index 2
    row.remove();
    
    let students = JSON.parse(localStorage.getItem("students")) || [];
    students = students.filter(student => student.studentID !== id);
    
    localStorage.setItem("students", JSON.stringify(students));
}
