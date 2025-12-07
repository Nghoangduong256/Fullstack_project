import api from "./axiosInstance";
import { Department } from "../types/entity";

const DEPARTMENTS_ENDPOINT = "departments";

export const departmentService = {
  getAllDepartments: async (): Promise<Department[]> => {
    const response = await api.get<Department[]>(DEPARTMENTS_ENDPOINT);
    return response.data;
  },

  getDepartmentById: async (id: number): Promise<Department> => {
    const response = await api.get<Department>(`${DEPARTMENTS_ENDPOINT}/${id}`);
    return response.data;
  },

  getDepartmentsByPage: async (page: number, limit: number) => {
    const response = await api.get(`/departments/page`, {
      params: {
        page: page - 1,
        limit: limit,
      },
    });

    const pageData = response.data;

    return {
      data: pageData.content,
      total: pageData.totalElements,
    };
  },

  createDepartment: async (
    department: Omit<Department, "id">
  ): Promise<Department> => {
    const response = await api.post<Department>(
      DEPARTMENTS_ENDPOINT,
      department
    );
    return response.data;
  },

  updateDepartment: async (
    id: number,
    department: Omit<Department, "id">
  ): Promise<Department> => {
    const response = await api.put<Department>(
      `${DEPARTMENTS_ENDPOINT}/${id}`,
      department
    );
    return response.data;
  },

  deleteDepartment: async (id: number): Promise<void> => {
    await api.delete(`${DEPARTMENTS_ENDPOINT}/${id}`);
  },
};

export default departmentService;
