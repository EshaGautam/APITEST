let form = document.getElementById('form')
function handleFormSubmit(event){
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
      "https://crudcrud.com/api/c4f1ed7f8cea426b8921fdab2d76f9da/AppointmentData",
      newUser
    )
    .then((response) => {
      showOutput(response);
      console.log("Data added successfully");
    })
    .catch((error) => console.log(error));

      form.reset();
}

// handling data after page gets refresh

window.addEventListener("DOMContentLoaded", () => {
  axios
    .get(
      "https://crudcrud.com/api/c4f1ed7f8cea426b8921fdab2d76f9da/AppointmentData"
    )
    .then((response) => {{
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
    } 

    else if (typeof response.data === "object") {
     displayData(response.data);
    }
  }
}

//used to display data on the screenn

function displayData(userData) {
  let userList = document.querySelector("ul");
  let user = document.createElement("li");
  const { _id, Name, Email, Phone } = userData;
  user.textContent = `Name: ${Name}, Email: ${Email}, Phone: ${Phone}`;

  // Creating Delete button
  let DeleteButton = document.createElement("button");
  let DeleteButtonText = document.createTextNode("X");
  DeleteButton.appendChild(DeleteButtonText);
  DeleteButton.className = "del-btn";

  // Creating Edit button
  let editButton = document.createElement("button");
  let editButtonText = document.createTextNode("Edit");
  editButton.appendChild(editButtonText);
  editButton.className = "edit-btn";

  user.appendChild(DeleteButton);
  user.appendChild(editButton);
  userList.appendChild(user);
}