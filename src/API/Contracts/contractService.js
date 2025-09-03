import api from "../api";

class ContractService {
    static async getAll(page , search ) {
        const res = await api.get(`/contract/client?page=${page}&search=${search}`);
        return res.data;
    }
    static async search(data) {
        const res = await api.get(`/contract/client?search=${data}`);
        return res.data;
    }
    static async getContractsId(id) {
        const res = await api.get(`/contract/client/${id}`);
        return res.data;
    }
    static async editContracts(id , data) {
        const res = await api.put(`/contract/client/${id}` , data);
        return res.data;
    }
    static async addContracts(data) {
        const res = await api.post(`/contract/client`, data);
        return res.data;
    }

}

export default ContractService;
