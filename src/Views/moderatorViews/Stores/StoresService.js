import axios from "axios";
import {serverUrl} from '../../../config';

export default class StoresService {
    static getInfo() {
        console.log("hello");
        return axios.get(`${serverUrl}api/AdminOrder/stores`)
    };  
    static deleteStore(id) {
        return axios.delete(`${serverUrl}api/AdminStores/delete/`+id)
    };      
    static createStore(model) {
        return axios.post(`${serverUrl}api/AdminStores/create-store`,model)
    };  
}