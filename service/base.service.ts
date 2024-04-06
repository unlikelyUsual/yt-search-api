import type { AxiosInstance } from "axios";
import axios from "axios";
import Logger from "../util/Logger";

export class BaseService {
  protected readonly logger: Logger;
  protected api: AxiosInstance;

  constructor(namespace: string) {
    this.logger = new Logger(namespace);
    this.api = axios.create({
      baseURL: "https://www.googleapis.com",
      timeout: 5000,
    });

    this.api.interceptors.request.use((config) => {
      // this.logger.log(config.params ?? {});
      return config;
    });

    this.api.interceptors.response.use((response) => {
      // this.logger.log(response.data ?? {});
      return response;
    });
  }
}
