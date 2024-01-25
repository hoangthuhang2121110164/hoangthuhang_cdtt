
import axios from "axios";
import { urlAPI } from "./config";

const httpAxios = axios.create({
    baseURL: urlAPI,
    timeout: 9000,
    headers: {'X-Custom-Header': 'foobar'}
  });
httpAxios.interceptors.response.use((response) => {
  return response.data;
})
  export default httpAxios;