import axios from "../api.js";

const AuthService = {
    async userLogin(user) {
        return axios.post("/login", user);
    },
    async userRegister(user) {
        return axios.post("users/register", user);
    },
    async getUser() {
        return axios.get("/user");

    },
};

export default AuthService;
