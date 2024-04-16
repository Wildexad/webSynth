import axios from "axios";

// Класс со статичными методами обращения к апи бд users
export default class UserService {
    static async GetAllUsers() {
        const response = await axios.get('http://localhost:8000/api/user/list');
        return response.data;
    }

    static async Login(login, password) {
        const response = await axios.post('http://localhost:8000/api/user/login',
            {data: {login: login, password: password}});
        console.log(response.data);
        return response.data;
    }

    static async RefreshToken(uuid) {
        const response = await axios.post('http://localhost:8000/api/user/refresh-token',
            {data: {uuid: uuid}});
        console.log(response.data);
        return response.data;
    }
    
    static async Logout() {
        const response = await axios.get('http://localhost:8000/api/user/logout');
        return response.data;
    }

    static async UserInfo() {
        const response = await axios.get('http://localhost:8000/api/user/info');
        return response.data;
    }
}