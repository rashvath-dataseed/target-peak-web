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

//support ai

/* CREATE */
export const createQuestionAnswer = (payload: {
  language_id: number;
  question: string;
  answer: string;
}) => {
  return apiClient.post("/support/ai/create-que-ans", payload);
};

/* UPDATE */
export const updateQuestionAnswer = (
  id: number,
  payload: {
    language_id: number;
    question: string;
    answer: string;
  }
) => {
  return apiClient.put(`/support/ai/update-que-ans/${id}`, payload);
};

/* GET ALL QUESTIONS */
export const getAllQuestions = (language_id: number) => {
  return apiClient.get("/support/ai/get-all-questions", {
    params: { language_id },
  });
};

/* GET QUESTION + ANSWER BY ID */
export const getQuestionAnswerById = (id: number) => {
  return apiClient.get(`/support/ai/get-que-ans-id/${id}`);
};

export const getSupportAiContent = (languageId: number) =>
  apiClient.get(`/support/ai/get-all-questions?language_id=${languageId}`);

export const getAnswerByQuestionId = (languageId: number, questionId: number) =>
  apiClient.get(
    `/support/ai/get-ans-que-id?language_id=${languageId}&question_id=${questionId}`
  );
