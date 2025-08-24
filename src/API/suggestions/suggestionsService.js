import api from "../api.js";

class suggestionsService {
    static async addsuggestions(data) {
        const res = await api.post(`/suggestions` , data);
        return res.data;
    }
}


export default suggestionsService;
