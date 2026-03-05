import api from "./api";
import { Resume } from "../types";

export const resumeService = {
  getAll: async (): Promise<Resume[]> => {
    const response = await api.get("/resumes");
    return response.data.data;
  },

  getById: async (id: string): Promise<Resume> => {
    const response = await api.get(`/resumes/${id}`);
    return response.data.data;
  },

  create: async (resume: Partial<Resume>): Promise<Resume> => {
    const response = await api.post("/resumes", resume);
    return response.data.data;
  },

  update: async (id: string, resume: Partial<Resume>): Promise<Resume> => {
    const response = await api.put(`/resumes/${id}`, resume);
    return response.data.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/resumes/${id}`);
  },

  duplicate: async (id: string): Promise<Resume> => {
    const response = await api.post(`/resumes/${id}/duplicate`);
    return response.data.data;
  },
};