import axios from 'axios';
const url = process.env.VUE_APP_BACKEND_URL + '/api/admin/post';

export default class Post {
    //get all post
    static async getAllPost(post_status) {
        const res = await axios.get(`${url}?post_status=${post_status}`);
        return res.data;
    }
}