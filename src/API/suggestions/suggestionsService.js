import api from "../api.js";

class suggestionsService {
    static async addsuggestions(data) {
        const res = await api.post(`/suggestions` , data);
        return res.data;
    }
    static async addSuggestionsReply(id , data) {
        const res = await api.post(`/suggestions/${id}/reply` , data);
        return res.data;
    }
    static async editSuggestions(id ) {
        const res = await api.put(`/suggestions/${id}`);
        return res.data;
    }
    static async getSuggestionsId(id ) {
        const res = await api.get(`/suggestions/show/${id}`);
        return res.data;
    }
    static async getSuggestionsUser(pageqq) {
        const res = await api.get(`/suggestions?page=${pageqq}`);
        return res.data;
    }
    static async getSuggestionsAdmin(pageqq) {
        const res = await api.get(`/admin/suggestions?page=${pageqq}`);
        return res.data;
    }
}


export default suggestionsService;
