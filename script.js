let employees = JSON.parse(localStorage.getItem("employees")) || [];
let editIndex = -1;

function renderEmployees() {
    const list = document.getElementById("employeeList");
    list.innerHTML = "";

    employees.forEach((emp, index) => {
        list.innerHTML += `
            <tr>
                <td>${emp.name}</td>
                <td>${emp.role}</td>
                <td>
                    <button class="edit" onclick="editEmployee(${index})">Edit</button>
                    <button class="delete" onclick="deleteEmployee(${index})">Delete</button>
                </td>
            </tr>
        `;
    });

    localStorage.setItem("employees", JSON.stringify(employees));
    document.getElementById("count").innerText = "Total Employees: " + employees.length;
}

function showMessage(text, isError = false) {
    const msg = document.getElementById("message");
    msg.innerText = text;
    msg.style.color = isError ? "red" : "green";

    setTimeout(() => {
        msg.innerText = "";
    }, 2000);
}

function addEmployee() {
    const name = document.getElementById("name").value.trim();
    const role = document.getElementById("role").value.trim();

    if (name === "" || role === "") {
        showMessage("Please fill all fields", true);
        return;
    }

    if (editIndex === -1) {
        employees.push({ name, role });
        showMessage("Employee added successfully");
    } else {
        employees[editIndex] = { name, role };
        editIndex = -1;
        showMessage("Employee updated successfully");
    }

    document.getElementById("name").value = "";
    document.getElementById("role").value = "";

    renderEmployees();
}

function editEmployee(index) {
    document.getElementById("name").value = employees[index].name;
    document.getElementById("role").value = employees[index].role;
    editIndex = index;
}

function deleteEmployee(index) {
    employees.splice(index, 1);
    showMessage("Employee deleted");
    renderEmployees();
}

renderEmployees();
