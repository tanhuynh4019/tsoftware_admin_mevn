import axios from 'axios';
const url = process.env.VUE_APP_BACKEND_URL + '/api/admin/post';

export default class Post {
    //get all post
    static async getAllPost(post_status) {
        const res = await axios.get(`${url}?post_status=${post_status}`);
        return res.data;
    }

    //get by ID post
    static async getByIDPost(id) {
        const res = await axios.get(`${url}/${id}`);
        return res.data;
    }

    //create a post
    static async createPost(post) {
        const res = await axios.post(url, post);
        return res.data;
    }

    //edit a post
    static async editPost(id, post) {
        const res = await axios.patch(`${url}/${id}`, post);
        return res.data;
    }

    //isActive a post
    static async isActivePost(id) {
        const res = await axios.patch(`${url}/is_active/${id}`);
        return res.data;
    }

    //isComment a post
    static async isCommentPost(id) {
        const res = await axios.patch(`${url}/is_comment/${id}`);
        return res.data;
    }

    //isBin a post
    static async isBinPost(id) {
        const res = await axios.patch(`${url}/is_bin/${id}`);
        return res.data;
    }

    //Delete a post
    static async deletePost(id) {
        const res = await axios.delete(`${url}/${id}`);
        return res.data;
    }

    //Actions post
    static async actionsPost(arrID, actionName) {
        const res = await axios.patch(`${url}/actions`, {
            arrID,
            actionName
        });
        return res.data;
    }
}