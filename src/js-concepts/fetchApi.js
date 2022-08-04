// Fetch GET/POST APIs?
// Earlier it used to be using XMLHttpRequest

// Note: Node.js hasn't implemented the fetch() method. You can use node-fetch to do the fase

// ---------------------------
// GET
// ---------------------------
const GET_EMPLOYEES = "http://dummy.restapiexample.com/api/v1/employees"
const GET_EMPLOYEE_2 = "http://dummy.restapiexample.com/api/v1/employee/2"

function getRequestViaPromise(url = GET_EMPLOYEES) {
  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    response.json()
  });
}

async function getRequestViaAsync(url = GET_EMPLOYEES) {
  const response = await fetch(url);
  return response.json();
}

// getRequestViaPromise().then((data) => console.log(data))
// getRequestViaAsync(GET_EMPLOYEE_2).then(data => console.log(JSON.stringify(data, null, 2)))

// ---------------------------
// POST
// ---------------------------
const CREATE_EMPLOYEE = "http://dummy.restapiexample.com/api/v1/create";    // Post request

const newEmployee = {
  "name": "abc",
  "salary": 1,
  "age": 45
};

async function postData(url = CREATE_EMPLOYEE, data = newEmployee) {
  const response = await fetch(url, {
    method: 'PUT', // *GET, POST, PUT, DELETE
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),    // body data type must match "content-type" header
  })
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response not OK");
      }
      return response;
    })
    .catch(error => console.log("Error", error));

  return response.json();
}

// postData().then(data => console.log(JSON.stringify(data, null, 2)));