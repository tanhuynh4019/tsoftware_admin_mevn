import axios from 'axios';
const url = process.env.VUE_APP_BACKEND_URL + '/api/admin/upload';

export default class Uploads {
    //get all uploads
    static async getAllUploads() {
        const res = await axios.get(`${url}`);
        return res.data;
    }

    //get by ID uploads
    static async getByIDUpload(id) {
        const res = await axios.get(`${url}/${id}`);
        return res.data;
    }

    //create a upload
    static async createUploads(file) {
        const res = await axios.post(url, file);
        return res.data;
    }
}