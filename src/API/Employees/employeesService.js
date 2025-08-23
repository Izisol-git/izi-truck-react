import axios from "../api";

const EmployeeService = {
    async getAll(page ) {
        const res = await axios.get(`/employees?page=${page}`);
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
    async remove(id) {
        const res = await axios.delete(`/employees/${id}`);
        return res.data;
    },
};

export default EmployeeService;
