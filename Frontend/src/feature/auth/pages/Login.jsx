import { useState } from "react"
import "../styles/form.scss"
import { Link } from 'react-router'
import axios from "axios"



const Login = () => {
const [username, setUsername] = useState("")
const [password, setPassword] = useState("")

async function handleFormSubmit(e) {
  e.preventDefault()



  axios.post("http://localhost:3000/api/auth/login",{
    username,
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
  .catch(err => {
  console.log(err.response?.data)
})
}


  return (
   <main>
    <div className="form-container">
      <h1>Login</h1>
        <form onSubmit={handleFormSubmit}>
          <input
          onInput={(e)=>{setUsername(e.target.value)}}
          type="text"
           placeholder='Enter username' />
          <input 
          onInput={(e)=>{setPassword(e.target.value)}}
          type="password"
           placeholder='Enter passwoord'/>
          <button type='submit'>Login</button>
        </form>
        <p>don't have an account  <Link className="toggleAuth"to="/register">Register</Link>  </p>
    </div>
   </main>
  )
}

export default Login