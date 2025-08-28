import api from "../api";

class ClientsService {
    static async getAll(page) {
        const res = await api.get(`/clients?page=${page}`);
        return res.data;
    }

    static async add(data) {
        const res = await api.post("/clients", data);
        return res.data;
    }
    static async getClientsSelect() {
        const res = await api.get("/clients/create");
        return res.data;
    }

    static async update(id, data) {
        const res = await api.put(`/clients/${id}`, data);
        return res.data;
    }


    static async clientsId(id) {
        const res = await api.get(`/clients/${id}`);
        return res.data;
    }
}

export default ClientsService;
