import api from "../api";

class ClientsService {
    static async getAll(page , search) {
        const res = await api.get(`/clients?page=${page}&search=${search}`);
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
    static async deleteClients(id) {
        const res = await api.delete(`/clients/${id}`);
        return res.data;
    }

    static async exportClientExcel(  search ,selectedKeys) {
        const query = selectedKeys.map((k) => `export_keys[]=${k}`).join("&");
        const res = await api.get(`/clients/export_excel?search=${search}&${query}`, {
            responseType: "blob", // excel fayl blob bo'ladi
        });
        return res.data;
    }
}

export default ClientsService;
