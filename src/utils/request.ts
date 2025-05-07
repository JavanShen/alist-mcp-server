import axios, { AxiosRequestConfig } from "axios";

const service = axios.create({
  baseURL: process.env.ALIST_HOST,
});

let token = process.env.ALIST_TOKEN || "";

service.interceptors.request.use((config) => {
  if (!config.baseURL) {
    throw Error("The environment variable ALIST_HOST is required");
  }

  config.headers.Authorization = token;

  return config;
});

const unauthorizedTip = "登录失效，需要更新ALIST_TOKEN环境变量";
service.interceptors.response.use(
  (res) => {
    const data = res.data;

    if (data.code && data.code !== 200) {
      if (data.code === 401) {
        return Promise.reject(unauthorizedTip);
      }
      return Promise.reject(data.message);
    }

    return data;
  },
  (err) => {
    if (err.response?.status === 401) {
      return Promise.reject(unauthorizedTip);
    }

    return Promise.reject(err);
  },
);

export const request = async (config: AxiosRequestConfig) => {
  return await service.request(config);
};

export default service;
