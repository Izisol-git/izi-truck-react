import axios from "../api";

const NotificationsService = {
    async getAll(page ) {
        const res = await axios.get(`/messages/unread?page=${page}`);
        return res.data;
    },
    async getAllChats(page) {
        const res = await axios.get(`/messages/chats?page=${page}`);
        return res.data;
    },
    async sendMessage(id , data) {
        const res = await axios.post(`/messages/reply/${id}`, data , {
            headers: {
                headers: { "Content-Type": "multipart/form-data" },
            }
        } );
        return res.data;
    },
    async getAllChatsId(id) {
        const res = await axios.get(`/messages/chats/${id}`);
        return res.data;
    },
    async addRead(id ) {
        const res = await axios.post(`/messages/read/${id}`);
        return res.data;
    }

}


export default NotificationsService;
