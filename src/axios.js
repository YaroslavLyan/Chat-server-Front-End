import axios from 'axios'

const token = window.localStorage.getItem('token');

let instance = axios.create({
        baseURL: 'https://chat-server-morse.herokuapp.com/',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

export default instance;