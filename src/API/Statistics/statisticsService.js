import axios from "../api.js";



const StatisticsService =  {
    async getAll() {
        const res = await axios.get(`/statistics`);
        return res.data;
    },
}

export default StatisticsService;