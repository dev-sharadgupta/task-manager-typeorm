import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import type { AxiosError, AxiosRequestConfig } from "axios";
import axiosInstance from "./axios";
import type { RootState } from "../_redux/store";
import { toast } from "sonner";
import { logout } from "@/pages/auth/slice";

export const axiosBaseQuery =
  (): BaseQueryFn<
    {
      url: string;
      method?: AxiosRequestConfig["method"];
      body?: AxiosRequestConfig["data"];
      params?: AxiosRequestConfig["params"];
    },
    unknown,
    unknown
  > =>
  async ({ url, method = "GET", body, params }, { getState, dispatch }) => {
    try {
      const token = (getState() as RootState).auth.token;

      const result = await axiosInstance({
        url,
        method,
        data: body,
        params,
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });
      toast.success(result.data.message);

      return { data: result.data };
    } catch (err) {
      const error = err as AxiosError<{ error: string }>;
      const status = error.response?.status;
      const message = error.response?.data?.error ?? "Something went wrong";

      if (status === 401) {
        dispatch(logout());
      }

      toast.error(message);

      return {
        error: {
          status,
          data: error.response?.data,
        },
      };
    }
  };
