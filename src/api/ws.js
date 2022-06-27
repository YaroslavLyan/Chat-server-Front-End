
import { store } from '../store';
import { sms } from '../reducers/reducer';

const client = new WebSocket('wss://chat-server-morse.herokuapp.com/ws');

client.onopen = () => {
    console.log('WebSocket Client Connected');
    // sendMessage(JSON.stringify({id:2555}))
};

client.onmessage = (message) => {
    try {
        store.dispatch(sms(JSON.parse(message.data)))
    } catch (e) {
            console.log(e);
        };      
};

client.onerror = function() {
    console.log('Connection Error');
};

export const sendMessage = (message) => {
    client.send(JSON.stringify(message));
}