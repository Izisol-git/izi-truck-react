import axios from "../api.js";



const StatisticsService =  {
    async getAll(search) {
        let query = [];
        if (search.from) {
            query.push(`from=${search.from}`);
        }
        if (search.to) {
            query.push(`to=${search.to}`);
        }
        const queryString = query.length ? `?${query.join("&")}` : "";
        const resData = await axios.get(`/statistics${queryString}`);
        return resData.data;
    }
}

export default StatisticsService;