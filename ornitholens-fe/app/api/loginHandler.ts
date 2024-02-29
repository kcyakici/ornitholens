// loginHandler.ts
import axios from "axios";

export default async function loginHandler(email: string, password: string, contextLogin: (jwt: string) => void) {
  try {
    // Make a request to your Spring Boot API to authenticate the user
    console.log("You are here")
    const response = await axios.post('http://localhost:8080/authenticate', { email, password });
    const { jwt } = response.data;
    // Call contextLogin to set the user as logged in
    contextLogin(jwt);

    // Return the user data or any other relevant information
    return response.data;
  } catch (error) {
    // Handle login failure or any other errors
    throw new Error('Login failed');
  }
}
