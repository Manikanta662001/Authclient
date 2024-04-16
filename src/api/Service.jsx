import { Token } from "../utils/Constatnts";
const post = async (url, data, name) => {
  let headers;
  let body;
  if (name === "file_upload") {
    headers = {};
    body = data;
  } else {
    headers = {
      "Content-Type": "application/json",
    };
    body = JSON.stringify(data);
  }
  headers = { ...headers, Authorization: Token() };
  try {
    const apiResponse = await fetch(url, {
      method: "POST",
      headers: headers,
      body: body,
    });
    const result = await apiResponse.json();
    if (!apiResponse.ok) {
      throw new Error(result.error);
    }
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

const get = async (url) => {
  try {
    const apiResponse = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: Token(),
      },
    });
    const result = await apiResponse.json();
    if (!apiResponse.ok) {
      throw new Error(result.error);
    }
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};
export const httpMethods = { post, get };
