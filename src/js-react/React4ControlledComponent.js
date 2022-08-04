// React controlled components 
import { useEffect, useState } from "react";

export default function React4Forms() {
  //  <input>, <textarea>, and <select> maintain their own function
  // An input form element whose value is controlled by React is called a controlled component.

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function onFormSubmit(event) {
    event.preventDefault();   // so that page don't refresh while submitting form
    console.log(`${username}, ${password}, ${department}`)
    setUsername("");
    setPassword("");
  }

  // Dropdown
  const [department, setDepartment] = useState("");
  function onSelectDepartment(e) {
    setDepartment(e.target.value);
  }

  // Textarea
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Checkbox
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  useEffect(() => {
    // Ensure that you write validate data function inside useEffect
    // else it will throw error
    function validateData() {
      setErrorMessage(null);
      if (message.includes("hi")) {
        setErrorMessage("Error: message has invalid data. ", message);
      }
    }

    validateData();
  }, [message]);

  return (
    <form onSubmit={onFormSubmit}>
      <div>
        <label htmlFor="username">Username</label>
        <input
          name="username" type="text"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        // Notice how you need to set value to make a component controlled otherwise state
        // update values won't be noticeable
        ></input>
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          name="password" type="text"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        ></input>
      </div>


      <div>
        <label htmlFor="department">Choose department </label>
        <select
          name="department" id="department"
          value={department}
          onChange={onSelectDepartment}>

          <option value="d1">d1</option>
          <option value="d2">d2</option>
          <option value="d3">d3</option>
        </select>
      </div>

      <div>
        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" rows="2" onChange={(e) => setMessage(e.target.value)}>
        </textarea>
        <p style={{ color: "red" }}>{errorMessage}</p>
        <br />

      </div>

      <div>
        <label htmlFor="agreeToTerms">Agree to T&E</label>
        <input
          name="agreeToTerms"
          type="checkbox"
          checked={agreedToTerms}
          onChange={(e) => setAgreedToTerms(e.target.checked)}>

        </input>
      </div>

      {username} <br />
      {password} <br />
      {department} <br />
      {message} <br />
      {agreedToTerms} <br />
      <button type="submit">Submit</button>
    </form >
  )
}