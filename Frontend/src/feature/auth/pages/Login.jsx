import { useState } from "react";
import "../styles/form.scss";
import { Link } from "react-router";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const {handleLogin}=useAuth()

  async function handleFormSubmit(e) {
    e.preventDefault();
    const res=handleLogin(username,password)
   
      console.log(res)
      
    
  }

  return (
    <main>
      <div className="form-container">
        <h1>Login</h1>
        <form onSubmit={handleFormSubmit}>
          <input
            onInput={(e) => {
              setUsername(e.target.value);
            }}
            type="text"
            placeholder="Enter username"
          />
          <input
            onInput={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            placeholder="Enter passwoord"
          />
          <button type="submit">Login</button>
        </form>
        <p>
          don't have an account{" "}
          <Link className="toggleAuth" to="/register">
            Register
          </Link>{" "}
        </p>
      </div>
    </main>
  );
};

export default Login;
