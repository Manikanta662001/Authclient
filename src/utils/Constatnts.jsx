import { getTokenFromCookie } from "./utils";

export const Token = (tokenName) => getTokenFromCookie(tokenName);
// export const BE_URL = 'https://authserver-1-ljz5.onrender.com';
export const BE_URL = "http://localhost:5000";
