import axios from "axios";
import {serverUrl} from '../../../config';

export default class LoginService {
    static login(model) {
        return axios.post(`${serverUrl}api/Auth/login`, model)
    };
    static refresh(model) {
        console.log("refreshM",model)
        return axios.post(`${serverUrl}api/Auth/refresh`, model)
    };
}