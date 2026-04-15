import axios from "axios";

const api= axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true,
})

export const register = async ({email,password,username}) => {
    const response = await api.post("/api/auth/register", {
      email,password,username
    });
    return response.data;
}

export const login = async ({email,username,password}) => {
    const response = await api.post("/api/auth/login", {
      email,username,password
    });
    return response.data;
}

export const getme= async () => {
    const response = await api.get("/api/auth/getme");
    return response.data;
}

export const logout = async () => {
    const response = await api.get("/api/auth/logout");
    return response.data;
}

