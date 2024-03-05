import axios, { AxiosInstance } from "axios";

export const BACKEND_URL : AxiosInstance = axios.create({
    baseURL: " https://medium-backend.mohitthakur9901.workers.dev/api/v1"
})
