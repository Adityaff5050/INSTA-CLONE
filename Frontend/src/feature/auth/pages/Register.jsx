import { useState } from "react"
import "../styles/form.scss"
import { Link } from 'react-router'
import axios from 'axios'



const Register = () => {
/**
 * two way binding use
 */
const [username, setUsername] = useState("")
const [email, setEmail] = useState("")
const [password, setPassword] = useState("")
async function handleFormSubmit(e){
  e.preventDefault()


  axios.post("http://localhost:3000/api/auth/register",{
    username,
    email,
    password
  },{
    /**
     * jab hum pai axios ke sath use karte hain to axios cookies
     * nahi se karta hain ihumein withcredentials true likhna pdta hain
     */
  withCredentials:true
  })
  .then(res=>{
    console.log(res.data);
    
  })
}

  return (
   <main>
    <div className="form-container">
      <h1>Register</h1>
      <form onSubmit={handleFormSubmit}>
        <input
        onInput={(e)=>{setUsername(e.target.value)}}
         type="text"
          name='username'
           placeholder='Enter username' />
         <input 
         onInput={(e)=>{setEmail(e.target.value)}}
         type="text" 
         name='email' 
         placeholder='Enter email' />
        <input 
        onInput={(e)=>{setPassword(e.target.value)}}
        type="password"ss
        name='password'
        placeholder='Enter password' />

        <button type="submit">Register</button>
      </form>
      <p>Already have an account? <Link className="toggleAuth"to="/login">Login</Link>
      </p>
    </div>
   </main>
  )
}

export default Register