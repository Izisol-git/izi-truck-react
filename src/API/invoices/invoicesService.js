// services/InvoiceService.js
import axios from "../api";


class InvoiceService {
    async getAll(data) {
        const res = await axios.get(`/invoices?page=${data.pageqq}&status=${data.activeRadio}`);
        return res.data;
    }
    async getStatus(index) {
        const res = await axios.get(`/invoices?status=${index}`);
        return res.data;
    }
    async logout() {
        const res = await axios.delete(`/invoices/logout`);
        return res.data;
    }
}

export default new InvoiceService;
