import OrdersService from "../orders/ordersService.js";
import axios from "../api.js";
import api from "../api.js";


const QueriesService = {
    async getAll(pageqq , search ) {
        let searchParams =`/queries?page=${pageqq}`
        if (search.search)  searchParams += `&search=${search.search}`;
        if (search.from)  searchParams += `&from=${search.from}`;
        if (search.to)  searchParams += `&to=${search.to}`;
        const res = await axios.get(searchParams);
        return res.data;
    },
    async getAllSelect(params) {
        const res = await axios.get(`/queries/create${params}`);
        return res.data;
    },
    async create(data) {
        const res = await axios.post(`/queries` , data);
        return res.data;
    },
    async queriesId(id) {
        const res = await axios.get(`/queries/${id}`);
        return res.data;
    },
    async createOrder(id) {
        const res = await axios.post(`/queries/createOrder/${id}`);
        return res.data;
    },
    async update(id , formData) {
        const res = await axios.put(`/queries/${id}` , formData);
        return res.data;
    },
    async exportQuerieExcel(  search ,selectedKeys) {
        const query = selectedKeys.map((k) => `export_keys[]=${k}`).join("&");
        let query2 =  ``
        if(search.search) query2 += `&search=${search.search}`;
        if(search.from)  query2 += `&from=${search.from}`;
        if(search.to)  query2 += `&to=${search.to}`;
        const newQuery = query2.slice(1);
        const res = await api.get(`/queries/export_excel?${newQuery}&${query}`, {
            responseType: "blob", // excel fayl blob bo'ladi
        });
        return res.data;
    }
}



export default QueriesService;