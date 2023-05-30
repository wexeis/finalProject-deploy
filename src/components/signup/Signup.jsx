import React, { useState } from "react";
import "./signup.css";
import axios from "axios";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useJwt } from "react-jwt";

function Signup({ hello, handleButtonClick}) {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const[lastName, setLastName] = useState("")
  const [password, setPassword] = useState("");
  const [showPopUp, setShowPopUp] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(firstName + lastName + email +  password)
      const response = await axios.post("https://final-project-idzh.onrender.com/user", {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        
      });
      console.log(response.data);
      toast.success(' Account created succesfully!', {
        position: toast.POSITION.TOP_RIGHT
    });
      hello()

    } catch (error) {
      console.error(error);
      toast.error('Error!', {
        position: toast.POSITION.TOP_RIGHT
    });
    }
  };



  return (
    <>

      <form className="login-form" onSubmit={handleSubmit}>
        <h1>Register</h1>
        <input
          type="text"
          name="Name"
          value={firstName}
          placeholder="Your first name"
          onChange={(e) => setFirstName(e.target.value)}
        />

        <input
          type="text"
          name="Name"
          value={lastName}
          placeholder="Your last name"
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          type="text"
          name="email"
          value={email}
          placeholder="Your email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          value={password}
          placeholder="Your password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="signup-btn" value="SignUp" type="submit">
          Sign Up
        </button>
        <p className="p">
          <p onClick={hello}>Return to login?</p>
          <span>
            <p onClick={()=>{navigate(-1)}}>
              cancel
            </p>
          </span>
        </p>
      </form>
    </>
  );
}

export default Signup;
