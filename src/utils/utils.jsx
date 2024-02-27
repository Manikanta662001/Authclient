const setCookie = (token, hours) => {
  let d = new Date();
  d.setTime(d.getTime() + hours * 60 * 60000);
  //syntax to set cookie
  //document.cookie = `${cookieName}=${cookieValue};expires=${d.toUTCString()};path=/`
  document.cookie = `logincookie=${token};expires=${d.toUTCString()};path=/`;
};
export { setCookie };
