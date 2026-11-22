import axios from "axios";

/**
 * hum ek "api" name ek instances banate hasin jisme kuchcode repeat
 * ho rah ho usme likh leta te hain yahn jaise base Url,
 * witcredential True
 */
const api = axios.create({
  baseURL: "http://localhost:3000/api/auth",

  /**
   * jab hum api axios ke sath use karte hain to axios cookies
   * nahi se karta hain ihumein withcredentials true likhna pdta hain
   */
  withCredentials: true,
});

export async function register(username, email, password) {
  try {
    const respone = await api.post("/register", {
      username,
      password,
      email,
    });
    return respone.data;
  } catch (error) {
    throw error;
  }
}

export async function login(username, password) {
  try {
    const response = await api.post("/login", {
      username,
      password,
    });
    return response.data;

  } catch (error) {
    throw error;
  }
}
