import axios, { AxiosResponse } from "axios";
import { ForumThreadWithoutPosts } from "../types/types";

const BASE_URL = "http://localhost:8080/";

// export function getAuthenticatedAxiosInstance(jwt: string) {
//   return axios.create({
//     baseURL: BASE_URL,
//     timeout: 15000,
//     headers: { Authorization: "Bearer " + jwt },
//   });
// }

type RegisterRequest = {
  username: string;
  email: string;
  password: string;
};

export function loginHandler(
  email: string,
  password: string,
  contextLogin: (jwt: string) => void
) {
  try {
    axios
      .post(BASE_URL + "authenticate", { email, password })
      .then(function (response) {
        console.log("Login successful");
        const { jwt } = response.data;
        console.log("JWT returned from login: " + jwt);
        contextLogin(jwt);
      })
      .catch(function (error) {
        console.log(error);
      });
  } catch (error) {
    // Handle login failure or any other errors
    throw new Error("Login failed");
  }
}

export function registerHandler({
  username,
  email,
  password,
}: RegisterRequest) {
  axios
    .post(BASE_URL + "register", {
      name: username,
      email: email,
      password: password,
    })
    .then((response) => {
      console.log("Form submitted successfully:", response.data);
      // Optionally, you can perform actions after successful form submission
    })
    .catch((error) => {
      console.error("Error submitting form:", error);
      // Optionally, you can handle errors from the server
    });
}

export function testAuthentication(jwt: string) {
  const bearer_token = "Bearer " + jwt;
  const config = {
    headers: {
      Authorization: bearer_token,
    },
  };
  axios
    .get(BASE_URL + "api/hello", config)
    .then((response) => {
      console.log("Authenticaton test successful:" + response.data);
      // Optionally, you can perform actions after successful form submission
    })
    .catch((error) => {
      console.error("Authenticaton test failed:", error);
      // Optionally, you can handle errors from the server
    });
}

export async function postForumThread(
  jwt: string,
  title: string,
  content: string
) {
  const bearer_token = "Bearer " + jwt;
  const config = {
    headers: {
      Authorization: bearer_token,
    },
  };
  const response: AxiosResponse = await axios.post(
    BASE_URL + "threads",
    {
      title,
      content,
    },
    config
  );
  return response;
}

export async function postForumPost(
  jwt: string,
  forumId: string,
  content: string
) {
  const bearer_token = "Bearer " + jwt;
  const config = {
    headers: {
      Authorization: bearer_token,
    },
  };
  const response: AxiosResponse = await axios.post(
    BASE_URL + "threads/posts",
    {
      forumId,
      content,
    },
    config
  );
  return response;
}

export async function getForumThreads() {
  const response: AxiosResponse<ForumThreadWithoutPosts[]> = await axios.get(
    BASE_URL + "threads"
  );
  return response;
}
