import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./axiosBaseQuery";

// Define your base API
export const rootAPI = createApi({
    reducerPath: "api",
    baseQuery: axiosBaseQuery(),
    tagTypes: ["USER"],
    endpoints: () => ({}), // Initially, no endpoints are defined here
});