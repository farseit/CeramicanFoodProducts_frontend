"use client";
import Cookies from "js-cookie";

export function middleware() {
  let accesstoken = Cookies.get("accessToken", null);
  let refresh = Cookies.get("refreshToken", null);
  // console.log("middleware", accesstoken);
}
