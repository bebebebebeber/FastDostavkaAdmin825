import axios from "axios";
import {serverUrl} from '../../../config';

export default class AddProductService {
    static addProduct(model){
        return axios.post(`${serverUrl}api/AdminProduct/add-product`,model)
    };
    static getStores() {
        return axios.get(`${serverUrl}api/AdminGeneral/stores`)
    };
    static sendCroppedImage(model){
        return axios.post(`${serverUrl}api/AdminGeneral/cropped`,model);
    };
}