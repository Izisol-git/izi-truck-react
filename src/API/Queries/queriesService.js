import OrdersService from "../orders/ordersService.js";
import axios from "../api.js";


const QueriesService = {
    async getAll(pageqq , search ) {
        let searchParams =`/queries?page=${pageqq}`
        if (search.search)  searchParams += `&search=${search.search}`;
        if (search.from_date)  searchParams += `&from_date=${search.from_date}`;
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
}



export default QueriesService;