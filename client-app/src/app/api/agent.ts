import axios, { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { history } from "../..";
import { Activity, ActivityFormValues } from "../models/activity";
import { Photo, Profile } from "../models/profile";
import { User, UserFormValues } from "../models/user";
import { store } from "../stores/store";

axios.defaults.baseURL = "https://localhost:5001/api";

axios.interceptors.request.use((config:any) => {
  const token = store.commonStore.token;

  if(token) config.headers.Authorization = `Bearer ${token}`

  return config;
})
axios.interceptors.response.use(
  async (response) => {
      return response;
  },
  (error) => {
    const {data, status, config } = error.response!;
    switch (status) {
      case 400:
          if(config.method === 'get' && data.errors.hasOwnPropert('id')){
            history.push('/not-found')
          } 
          if(data.errors) { const modelStaterrors = [];

            for(const key in data.errors) {
                if(data.errors[key]) {
                    modelStaterrors.push(data.errors[key])
                }
            }
            throw modelStaterrors.flat();
        } else {
          toast.error(data);
        }
    
        break;
      case 401:
        toast.error("Unauthorized");
        break;
      case 404:
        history.push('/notfound');
        break;
        case 500:
            store.commonStore.setServerError(data);
            history.push('/server-error');
            break;
    }
    return Promise.reject(error);
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
  create: (activity: ActivityFormValues) => requests.post<void>("/activities", activity),
  update: (activity: ActivityFormValues) =>
    requests.put<void>(`/activities/${activity.id}`, activity),
  delete: (id: string) => requests.del<void>(`/activities/${id}`),
  attend:(id:string) => requests.post<void>(`/activities/${id}/attend`, {})
};

const Account = {
  current: () => requests.get<User>('/account'),
  login: (user: UserFormValues) => requests.post<User>('/account/login', user),
  register: (user: UserFormValues) => requests.post<User>('/account/register', user),
}

const Profiles = {
  get: (username: string) => requests.get<Profile>(`/profiles/${username}`),
  editProfile: (profile:Partial<Profile>) => requests.put<void>('profiles', profile),
  uploadPhoto: (file: Blob) => {
    let formData = new FormData();
    formData.append('File', file);

    return axios.post<Photo>('photos', formData, {
      headers:{'Content-Type':'multipart/form-data'}
    })
  },
  setMainPhoto: (id:string) => requests.post(`/photos/${id}/setMain`, {}),
  deletePhoto: (id:string) => requests.del(`/photos/${id}`)
}

const agent = {
  Activities,
  Account,
  Profiles
};

export default agent;
