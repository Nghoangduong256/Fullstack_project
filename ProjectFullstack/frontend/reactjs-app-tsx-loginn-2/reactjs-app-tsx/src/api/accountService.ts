import api from "./axiosInstance";
import { Account } from "../types/entity";
import axiosInstance from "./axiosInstance";

const ACCOUNTS_ENDPOINT = "/accounts";

export const accountService = {
  getAllAccounts: async (): Promise<Account[]> => {
    const response = await api.get<Account[]>(ACCOUNTS_ENDPOINT);
    return response.data;
  },

  getAccountById: async (id: number): Promise<Account> => {
    const response = await api.get<Account>(`${ACCOUNTS_ENDPOINT}/${id}`);
    return response.data;
  },

  createAccount: async (account: Omit<Account, "id">): Promise<Account> => {
    const response = await api.post<Account>(ACCOUNTS_ENDPOINT, account);
    return response.data;
  },

  updateAccount: async (
    id: number,
    account: Omit<Account, "id">
  ): Promise<Account> => {
    const response = await api.put<Account>(
      `${ACCOUNTS_ENDPOINT}/${id}`,
      account
    );
    return response.data;
  },

  deleteAccount: async (id: number): Promise<void> => {
    await api.delete(`${ACCOUNTS_ENDPOINT}/${id}`);
  },

  getAccountsByPage: async (page: number, limit: number) => {
    const response = await api.get(`/accounts/page`, {
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

  /**
   * Attempt to "login" by fetching account(s) filtered by email and optionally validating password.
   * Assumption: backend supports querying accounts with `?email=`. If you have a real auth endpoint,
   * replace this implementation with a POST to `/auth/login` that returns a token/account.
   */
  async login(username: string, password: string) {
    const response = await axiosInstance.post("/auth/login", {
      username,
      password,
    });

    //backend trả về { token, username }
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("username", response.data.username);

    return response.data;
  },
};

export default accountService;
