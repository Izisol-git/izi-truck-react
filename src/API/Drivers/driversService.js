import axios from "../api";
import api from "../api";


const DriversService = {
    async getAll(page , search) {
        const res = await axios.get(`/drivers?page=${page}&search=${search}`  );
        return res.data;
    },
    async driversId(id ) {
        const res = await axios.get(`/drivers/${id}`);
        return res.data;
    },
    async add(data) {
        const res = await axios.post(`/drivers`, data);
        return res.data
    },
    async update(id, data) {
        const res = await axios.put(`/drivers/${id}`, data);
        return res.data
    },
    async exportDriverExcel(  search ,selectedKeys) {
        const query = selectedKeys.map((k) => `export_keys[]=${k}`).join("&");
        const res = await api.get(`/drivers/export_excel?search=${search}&${query}`, {
            responseType: "blob", // excel fayl blob bo'ladi
        });
        return res.data;
    }
}


export default DriversService;
