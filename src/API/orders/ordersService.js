import api from "../api.js";


class OrdersService  {
    // GET – barcha orders

    static async getAll(page) {
        const res = await api.get(`/orders?page=${page}`);
        return res.data;
    }
    static async getShowOrdersId(id , db) {
        const res = await api.get(`/orders/${id}?db=${db}`);
        return res.data;
    }
    static async addDidox(id , obj) {
        const res = await api.post(`/orders/didox/${id}` , obj);
        return res.data;
    }
    static async add(data) {
        const res = await api.post(`/orders` , data);
        return res.data;
    }
    static async orderId(id ) {
        const res = await api.get(`/orders/edit/${id}`);
        return res.data;
    }
    static async actDataAdd(id , act_date) {
        const res = await api.post(`/orders/${id}/set_act_date` , act_date  );
        return res.data;
    }
    static async update(id , editData) {
        const res = await api.put(`/orders/${id}` , editData  );
        return res.data;
    }
    static async getSelect() {
        const res = await api.get(`/orders/create`);
        return res.data;
    }
    static async getSelectLocationState(id) {
        const res = await api.get(`/orders/create?country_of_departure=${id}`);
        return res.data;
    }
    static async getSelectLocationStateTwo(id) {
        const res = await api.get(`/orders/create?country_of_destination=${id}`);
        return res.data;
    }
    static async exportOrdersExcel(search, selectedKeys) {
        let query2 = ``;
        if (search.search) query2 += `&search=${search.search}`;
        if (search.db) query2 += `&db=${search.db}`;
        if (search.from_date ) query2 += `&from_date=${search.from_date}`;
        if (search.to_date) query2 += `&to_date=${search.to_date}`;
        if (search.search_status === 0 || search.search_status === 1) query2 += `&search_status=${search.search_status}`;
        const newQuery = query2.slice(1);
        const query = selectedKeys.map((k) => `export_keys[]=${k}`).join("&");
        const res = await api.get(`/orders/export_excel?${newQuery}&${query}`, {
            responseType: "blob", // excel fayl blob bo'ladi
        });
        return res.data;
    }

    // 🔥 Filter bilan olish
    static async getFiltered(filters = {} , pageqq ) {
        let query = `/orders?page=${pageqq}`;
        if (filters.search) query += `&search=${filters.search}`;
        if (filters.db) query += `&db=${filters.db}`;
        if (filters.from_date ) query += `&from_date=${filters.from_date}`;
        if (filters.to_date) query += `&to_date=${filters.to_date}`;
        if (filters.search_status === 0 || filters.search_status === 1) query += `&search_status=${filters.search_status}`;
        const res = await api.get(query)
        return res.data;
    }

};

export default OrdersService;
