import axios, { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { history } from "../..";
import { Activity } from "../models/activity";
import { store } from "../stores/store";

axios.defaults.baseURL = "https://localhost:5001/api";

axios.interceptors.response.use(
  async (response) => {
      return response;
  },
  (error) => {
    const {data, status, config } = error.response!;
    switch (status) {
      case 400:
        if(typeof data === 'string') {
            toast.error(data);
        }
          if(config.method === 'get' && data.errors.hasOwnPropert('id')){

          } 
          if(data.errors) { const modelStaterrors = [];

            for(const key in data.errors) {
                if(data.errors[key]) {
                    modelStaterrors.push(data.errors[key])
                }
            }
            throw modelStaterrors.flat();
        }
    
        break;
      case 401:
        toast.error("Unauthorized");
        break;
      case 404:
        history.push('/notfound');
        toast.error("Not found");
        break;
        case 500:
            store.commonStore.setServerError(data);
            history.push('/server-error');
            break;
    }
  }
);
const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) =>
    axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const Activities = {
  list: () => requests.get<Activity[]>("/activities"),
  details: (id: string) => requests.get<Activity>(`/activities/${id}`),
  create: (activity: Activity) => requests.post<void>("/activities", activity),
  update: (activity: Activity) =>
    requests.put<void>(`/activities/${activity.id}`, activity),
  delete: (id: string) => requests.del<void>(`/activities/${id}`),
};

const agent = {
  Activities,
};

export default agent;
