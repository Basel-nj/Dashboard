"use client";
import axios from "axios";

const token = localStorage.getItem("token");
export const instance = axios.create({
   baseURL: "https://backend.watanyia.com",
   headers: {
      Authorization: `Bearer ${token}`,
   },
});
