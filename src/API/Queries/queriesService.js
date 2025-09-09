import OrdersService from "../orders/ordersService.js";
import axios from "../api.js";


const QueriesService = {
    async getAll(page , search ) {
        const res = await axios.get(`/queries?page=${page}&search=${search}`);
        return res.data;
    },
}



export default QueriesService;