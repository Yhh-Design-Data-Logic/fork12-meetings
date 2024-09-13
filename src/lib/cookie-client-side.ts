"use client";

function setCookie(name: string, value: string, options?: { expires: Date }) {
  let expires = "";
  if (options?.expires) {
    expires = "; expires=" + options.expires.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name: string) {
  if (typeof document === "undefined") return null;

  const nameEQ = name + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }

  return null;
}

function deleteCookie(name: string) {
  document.cookie = name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}

const clientSideCookieStorage = {
  setCookie,
  getCookie,
  deleteCookie,
};

export default clientSideCookieStorage;
