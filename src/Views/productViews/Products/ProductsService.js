import axios from "axios";
import {serverUrl} from '../../../config';

export default class ProductsService {
    static getProducts(page) {
        return axios.get(`${serverUrl}api/AdminProduct/get-products/`+page)
    };
    static deleteProduct(id) {
        return axios.delete(`${serverUrl}api/AdminProduct/delete/`+id)
    };
}