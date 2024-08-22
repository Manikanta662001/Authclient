import { BE_URL, Token } from "../utils/Constatnts";
import { jwtDecode } from "jwt-decode";
import { setCookie } from "../utils/utils";

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
  headers = { ...headers, Authorization: Token("accessToken") };
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
        Authorization: Token("accessToken"),
        "content-type": "application/json",
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

export const fetchWithAccessToken = async (method, url, data, name) => {
  try {
    const accessToken = Token("accessToken");
    const decoded = jwtDecode(accessToken);
    if (decoded?.exp && decoded.exp * 1000 < Date.now()) {
      const response = await fetch(BE_URL + "/token/refresh", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${Token("refreshToken")}`,
        },
      });
      const res = await response.json();
      console.log("TOKEN EXPIRED::::", res.accessToken);
      setCookie("accessToken", res.accessToken);
    }
    switch (method) {
      case "get":
        return get(url);
      case "post":
        return post(url, data, name);
    }
  } catch (error) {
    throw new Error(error.message);
  }
};
export const httpMethods = { post, get };
