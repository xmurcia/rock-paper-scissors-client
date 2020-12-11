import { io } from 'socket.io-client';

const socket = io('http://localhost:3000');

socket.on('connected', () => console.log('is connected'));

export default socket;