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
    static async getSuggestions() {
        const res = await api.get(`/suggestions/once`);
        return res.data;
    }
}


export default suggestionsService;
