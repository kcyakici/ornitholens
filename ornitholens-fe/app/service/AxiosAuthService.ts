import axios, { AxiosResponse } from "axios";
import {
  Bird,
  ForumPost,
  ForumThread,
  ForumThreadWithoutPosts,
  GameImageAndAnswers,
} from "../types/types";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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
  threadId: string,
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
      threadId,
      content,
    },
    config
  );
  // revalidatePath(`community/thread/${threadId}`); TODO may not be needed because of client side refresh
  return response;
}

export async function getForumThreads() {
  const response: AxiosResponse<ForumThreadWithoutPosts[]> = await axios.get(
    BASE_URL + "threads"
  );
  return response;
}

export async function getForumThread(id: string) {
  try {
    const response: AxiosResponse<ForumThread> = await axios.get(
      BASE_URL + `threads/${id}`
    );
    return response;
  } catch (error) {
    console.error("Error occurred while trying to get forum thread: " + error);
  }
}

export async function deleteForumPost(id: string, jwt: string) {
  console.log(`Received id inside deleteForumPost: ${id}`);
  const bearer_token = "Bearer " + jwt;
  const config = {
    headers: {
      Authorization: bearer_token,
    },
  };
  let response: AxiosResponse<ForumPost>;
  try {
    response = await axios.delete(BASE_URL + `posts/${id}`, config);
    // revalidatePath(`/community/thread/[slug]`, "page"); // needs server component I think check: https://www.reddit.com/r/nextjs/comments/13ilupe/nextjs_134_error_invariant_static_generation/
    return response;
  } catch (error) {
    console.error("Error occurred while trying to delete a post: " + error);
  }
}

export async function getImageAndAnswers() {
  try {
    const response: AxiosResponse<GameImageAndAnswers> = await axios.get(
      BASE_URL + "identify"
    );
    return response;
  } catch (error) {
    console.error(
      "Error occurred while trying to fetch image and answers for game: " +
        error
    );
  }
}

export async function uploadImage(file: File, jwt: string) {
  const formdata = new FormData();
  formdata.append("imageFile", file);
  const bearer_token = "Bearer " + jwt;
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: bearer_token,
    },
  };
  try {
    const response: AxiosResponse<GameImageAndAnswers> = await axios.post(
      BASE_URL + "upload",
      formdata,
      config
    );
    return response;
  } catch (error) {
    console.error("Error occurred while trying to upload image: " + error);
  }
}

export async function getAlbumImages(jwt: string) {
  const bearer_token = "Bearer " + jwt;
  const config = {
    headers: {
      Authorization: bearer_token,
    },
  };
  try {
    const response: AxiosResponse<Bird[]> = await axios.get(
      BASE_URL + "albums",
      config
    );
    return response;
  } catch (error) {
    console.error(
      "Error occurred while trying to retrieve the images in the album: " +
        error
    );
  }
}
