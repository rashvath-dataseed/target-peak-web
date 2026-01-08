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
