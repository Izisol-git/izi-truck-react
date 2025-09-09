import axios from "../api";
import api from "../api";

const EmployeeService = {
    async getAll(page , search ) {
        const res = await axios.get(`/employees?page=${page}&search=${search}`);
        return res.data;
    },
    async employeesId(id) {
        const res = await axios.get(`/employees/${id}`);
        return res.data;
    },
    async create(employeeData) {
        const res = await axios.post("/employees", employeeData);
        return res.data;
    },
    async update(id, employeeData) {
        const res = await axios.put(`/employees/${id}`, employeeData);
        return res.data;
    },
    async getContractId(id) {
        const res = await axios.get(`/employee_contracts/${id}`);
        return res.data;
    },
    async remove(id) {
        const res = await axios.delete(`/employees/${id}`);
        return res.data;
    },
    async exportEmployeeExcel(search ,selectedKeys) {
        const query = selectedKeys.map((k) => `export_keys[]=${k}`).join("&");
        const res = await api.get(`/employees/export_excel?search=${search}&${query}`, {
            responseType: "blob", // excel fayl blob bo'ladi
        });
        return res.data;
    }
};

export default EmployeeService;
