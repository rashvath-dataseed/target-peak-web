import apiClient from "../axios/axios";


export const sendOtp = (payload: any) => {
  return apiClient.post("/auth/send-otp", payload);
};


export const verifyOtp = (payload: any) => {
  return apiClient.post("/auth/verify-otp", payload);
};
