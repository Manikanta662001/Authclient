const setCookie = (token, hours) => {
  let d = new Date();
  d.setTime(d.getTime() + hours * 60 * 60000);
  //syntax to set cookie
  //document.cookie = `${cookieName}=${cookieValue};expires=${d.toUTCString()};path=/`
  document.cookie = `logincookie=${token};expires=${d.toUTCString()};path=/`;
};

const getTokenFromCookie = () => {
  const getCookie = (cname) => {
    let totalCookie = document.cookie.split(";");
    let cnamecompare = totalCookie.find((c) => c.includes(cname));
    if (cnamecompare) {
      let cv = cnamecompare.split("=")[1];
      return cv;
    }
    return null;
  };
  const checkCookie = () => {
    const user = getCookie("logincookie");
    if (user) {
      return user;
    } else {
      return "";
    }
  };
  return checkCookie();
};
export { setCookie, getTokenFromCookie };
