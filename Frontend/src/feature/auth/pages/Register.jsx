import { useState } from "react";
import "../styles/form.scss";
import { Link ,useNavigate} from "react-router";
import { useAuth } from "../hooks/useAuth";

const Register = () => {
  /**
   * two way binding use
   */
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

const navigate=useNavigate()
const {handleRegister}=useAuth()


  async function handleFormSubmit(e) {
    e.preventDefault();
    await handleRegister(username, email, password);
  }

  return (
    <main>
      <div className="form-container">
        <h1>Register</h1>
        <form onSubmit={handleFormSubmit}>
          <input
            onInput={(e) => {
              setUsername(e.target.value);
            }}
            type="text"
            name="username"
            placeholder="Enter username"
          />
          <input
            onInput={(e) => {
              setEmail(e.target.value);
            }}
            type="text"
            name="email"
            placeholder="Enter email"
          />
          <input
            onInput={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            
            name="password"
            placeholder="Enter password"
          />

          <button type="submit">Register</button>
        </form>
        <p>
          Already have an account?{" "}
          <Link className="toggleAuth" to="/login">
            Login
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Register;
