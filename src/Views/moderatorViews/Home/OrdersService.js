import axios from "axios";
import {serverUrl} from '../../../config';

export default class OrdersService {
    static getInfo(page) {
        return axios.get(`${serverUrl}api/AdminOrder/orders/`+page)
    };
    static changeStatus(model) {
        return axios.post(`${serverUrl}api/Order/change-order-status`,model)
    };
    static delete(id) {
        return axios.delete(`${serverUrl}api/AdminOrder/delete/`+id)
    };
}