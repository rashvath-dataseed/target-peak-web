import apiClient from "@/axios/axios";

// CREATE support email
export const createSupportEmail = (payload: { emailId: string }) => {
  return apiClient.post("/support/email/create", payload);
};

// UPDATE support email
export const updateSupportEmail = (
  id: number,
  payload: { emailId: string }
) => {
  return apiClient.put(`/support/email/update/${id}`, payload);
};

// GET ALL support emails
export const getAllSupportEmails = () => {
  return apiClient.get("/support/email/get-all");
};

// DELETE support email (if backend supports it)
export const deleteSupportEmail = (id: number) => {
  return apiClient.delete(`/support/email/delete/${id}`);
};
// Language
/* CREATE */
export const createLanguage = (payload: any) => {
  return apiClient.post("/support/language/create", payload);
};

/* UPDATE FIXED */
export const updateLanguage = (id: number, payload: any) => {
  return apiClient.put(`/support/language/update/${id}`, payload);
};

/* GET ALL */
export const getAllLanguages = (is_active = true) => {
  return apiClient.get("/support/language/get-all", {
    params: { is_active },
  });
};

/* DELETEFIXED */
export const deleteLanguage = (id: number) => {
  return apiClient.delete(`/support/language/delete/${id}`);
}
// Support Mail and whatsapp
/* CREATE */
export const createSupportNumber = (payload: {
  country_code: string;
  number: string;
  type: "whatsapp" | "mobile";
}) => {
  return apiClient.post("/support/mob-num/create", payload);
};

/* UPDATE */
export const updateSupportNumber = (
  id: number,
  payload: {
    country_code: string;
    number: string;
    type: "whatsapp" | "mobile";
  }
) => {
  return apiClient.put(`/support/mob-num/update/${id}`, payload);
};

/* GET ALL */
export const getAllSupportNumbers = (type: "whatsapp" | "mobile") => {
  return apiClient.get("/support/mob-num/get-all", {
    params: { type },
  });
};

/* DELETE */
export const deleteSupportNumber = (id: number) => {
  return apiClient.delete(`/support/mob-num/delete/${id}`);
};