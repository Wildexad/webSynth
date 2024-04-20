import axios from "axios";

// Класс со статичными методами обращения к апи бд users
export default class UserService {
    static async GetAllUsers() {
        const response = await axios.get('http://localhost:8000/api/user/list');
        return response.data;
    }

    // Работающий метод
    static async Login(login, password) {
        const response = await axios.post('http://localhost:8000/api/user/login',
            {login: login, password: password});
        return response.data;
    }

    static async RefreshToken(uuid) {
        const response = await axios.post('http://localhost:8000/api/user/refresh-token',
            {uuid: uuid});
        console.log(response.data);
        return response.data;
    }
    
    // Работающий метод
    static async Logout(token) {
        const response = await axios.get('http://localhost:8000/api/user/logout',
            {headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    }

    static async UserInfo(uuid) {
        const response = await axios.get('http://localhost:8000/api/user/info');
        return response.data;
    }
}