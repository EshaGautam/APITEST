let form = document.getElementById("form");
function handleFormSubmit(event) {
  event.preventDefault();

  let userName = document.getElementById("username").value;
  let userEmail = document.getElementById("email").value;
  let userPhone = document.getElementById("phone").value;

  let newUser = {
    Name: userName,
    Email: userEmail,
    Phone: userPhone,
  };

  axios
    .post(
      "https://crudcrud.com/api/2a774dbf007d40559a7d8182ef4c8a86/AppointmentData",
      newUser
    )
    .then((response) => {
      sendingData(response);
      console.log("Data added successfully");
    })
    .catch((error) => console.log(error));

  form.reset();
}

// handling data after page gets refresh

window.addEventListener("DOMContentLoaded", () => {
  axios
    .get(
      "https://crudcrud.com/api/2a774dbf007d40559a7d8182ef4c8a86/AppointmentData"
    )
    .then((response) => {
      {
        sendingData(response);
      }
    })
    .catch((error) => console.log(error));
});

//This function receive response and then call display data function accordingly
function sendingData(response) {
  // checking response if array or object and handling Accordingly
  if (response && response.data) {
    if (Array.isArray(response.data)) {
      response.data.forEach((userData) => {
        displayData(userData);
      });
    } else if (typeof response.data === "object") {
      displayData(response.data);
    }
  }
}

//used to display data on the screenn

function displayData(userData) {
  let userList = document.querySelector("ul");
  let user = document.createElement("li");

  // destructuring values in userData

  const { _id, Name, Email, Phone } = userData;
  user.textContent = `Name: ${Name}, Email: ${Email}, Phone: ${Phone}`;

  // Creating Delete button
  let DeleteButton = document.createElement("button");
  let DeleteButtonText = document.createTextNode("X");
  DeleteButton.appendChild(DeleteButtonText);
  DeleteButton.className = "del-btn";
  DeleteButton.addEventListener("click", function (event) {
    deleteUser(event,_id);
    
    deleteUserData(_id);
  });

  // Creating Edit button
  let editButton = document.createElement("button");
  let editButtonText = document.createTextNode("Edit");
  editButton.appendChild(editButtonText);
  editButton.className = "edit-btn";
  editButton.addEventListener("click", function (event) {
    editDetails(event, userData);
  });

  user.appendChild(DeleteButton);
  user.appendChild(editButton);
  userList.appendChild(user);
}

let userList = document.querySelector("ul");

// Adding delete functionality and deleting fron crudcrud
function deleteUser(event,_id) {
  if (event.target.classList.contains("del-btn")) {
    let userToDelete = event.target.parentElement;
    userList.removeChild(userToDelete);
  }
  
}

 // function to delete deleting data from crudcrud
function deleteUserData(_id) {
  axios
    .delete(
      `https://crudcrud.com/api/2a774dbf007d40559a7d8182ef4c8a86/AppointmentData/${_id}`
    )
    .then((response) => sendingData(response))
    .catch((error) => console.error(error));

  console.log("DELETE Request");
}

// Adding Edit functionality
function editDetails(event, userData) {
  if (event.target.classList.contains("edit-btn")) {
    let userToDelete = event.target.parentElement;
    userList.removeChild(userToDelete);
  }
  const { _id, Name, Email, Phone } = userData;

  // Populate the input fields with existing values
  document.getElementById("username").value = `${Name}`;
  document.getElementById("email").value = `${Email}`;
  document.getElementById("phone").value = `${Phone}`;

  deleteUserData(_id);
}
